# Firebase Security Specifications: Graphic Designer & Creative Agency Platform

This document describes the Attribute-Based Access Control (ABAC) definitions, data invariants, and experimental security test payloads designed to verify security policies for the Firestore database.

## 1. Data Invariants

- **General Deny-All**: All paths are closed by default. Access must be explicitly allowed.
- **Admin Supremacy**: Users registered in the administrator collection `/admins/{uid}` can modify all agency offerings, articles, service listings, details, team members, careers, and settings.
- **Client Privilege Boundaries**: 
  - Readers can read `portfolio`, `services`, `blog`, `testimonials`, `team`, `careers`, and `settings` collections.
  - Clients can create records in `contact_submissions` and `appointments` collections, providing validation is strictly validated for size and presence.
  - Users are forbidden from modifying or deleting their comments, likes, bookings, or inquiries once submitted, unless validated as Owner or Admin.
  - System fields like `createdAt` and `status` are protected against arbitrary manipulation.
- **User Verification**: User operations that require modification must authenticate securely and inspect email verification states (`request.auth.token.email_verified == true`).

---

## 2. The "Dirty Dozen" Malicious Payloads

The system is tested against these 12 malicious payloads to ensure they are blocked.

### Identity Spoofing (Columns: Portfolio, Team, Blog)
1. **Malicious Portfolio Creation by Non-Admin**:
   - `auth.uid`: "regular_user_123" (Verified: true)
   - `collection`: `/portfolio`
   - `payload`: `{"id":"test-1","title":"Malicious Project", "category":"Branding", "imageUrl":"badurl"}` (Attempting to bypass Admin permission checks)
2. **Settings Override by Authenticated Non-Admin**:
   - `auth.uid`: "some_user" (Verified: true)
   - `collection`: `/settings`
   - `payload`: `{"id":"general","heroTitle":"Hacked Hero Heading"}` (Attempting to corrupt homepage contents)
3. **Team Profile Injector**:
   - `auth.uid`: "fraud_designer" (Verified: true)
   - `collection`: `/team`
   - `payload`: `{"id": "fraud", "name": "Fake Director", "role": "Super Boss", "imageUrl": "hack"}` (Attempting to write own profile in team list)

### State Shortcutting & Outcome Tampering
4. **Immediate Message Resolution Bypass**:
   - `auth.uid`: "spammer_99" (Verified: true)
   - `collection`: `/contact_submissions`
   - `payload`: `{"id":"msg-abc","name":"Spam","email":"spam@spam.com","message":"Buy now!","status":"completed"}` (Attempting to pre-approve or flag their message status as 'completed')
5. **Locked State Mutation (Appointment hijacking)**:
   - `auth.uid`: "client_55" (Verified: true)
   - `collection`: `/appointments`
   - `payload`: `{"id":"appt-001","status":"confirmed"}` (Trying to self-confirm appointment without Admin authorization)

### Resource Poisoning (Denial of Wallet Attacks)
6. **Mega String payload in Contact Subject**:
   - `auth.uid`: "anonymous" / Null
   - `collection`: `/contact_submissions`
   - `payload`: `{"id":"msg-999","name":"A","email":"b@c.com","message":"*repeat 100000 times*"}` (Vulnerability to payload limits)
7. **Banned Character IDs**:
   - `auth.uid`: "guest"
   - `collection`: `/contact_submissions/$$$__malicious_id__$$$/`
   - `payload`: `{"name":"A","email":"b@c.com","message":"test"}` (Attempt to inject raw bad character sequences in resource paths)
8. **Underflow Empty Fields Injection**:
   - `auth.uid`: "guest"
   - `collection`: `/appointments`
   - `payload`: `{"id":"appt-null","name":"","email":"","service":"", "dateTime":""}` (Attempting to force Null conditions or crash application renderers)

### Privilege Escalation
9. **Self-Admin Promotion**:
   - `auth.uid`: "guest_user_abc" (Verified: true)
   - `collection`: `/admins`
   - `payload`: `{"role":"admin"}` (Attempting write access in super privileges list)
10. **System Timestamp Modification**:
    - `auth.uid`: "regular_user_1" (Verified: true)
    - `collection`: `/contact_submissions`
    - `payload`: `{"id":"ms-7","name":"Test","email":"a@b.com","message":"msg","createdAt":"2001-01-01"}` (Attempting to bypass server timestamp validation and forge time)

### PII Extraction & Scraping
11. **Direct Read on Private Form Submissions**:
    - `auth.uid`: "unauthorized_user_11"
    - `collection`: `/contact_submissions/msg-abc` (Attempting to read or sniff other clients' email inquiries)
12. **Appointment Scraping**:
    - `auth.uid`: "competitor_agency"
    - `collection`: `/appointments` (Attempting O(n) list queries on client-booked timeslots)

---

## 3. Policy Resolution Pattern (Rules Draft)

All operations MUST satisfy:
1. `request.auth != null` for secure mutations.
2. Invariant shape check: Valid ID sizes (`matches('^[a-zA-Z0-9_\\-]+$')` & string bounds).
3. Immutable variables constraints (preserving `ownerId`, `createdAt`, values).
4. `exists()` validation on related structural collections.
