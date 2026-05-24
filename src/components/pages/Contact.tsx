import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Mail, Phone, MapPin, Compass, MessageSquare, Shield, Clock, Send, CheckCircle, Smartphone } from "lucide-react";

export default function Contact() {
  const { submitContactForm, bookAppointment, services } = useData();

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Appointment Form State
  const [apptName, setApptName] = useState("");
  const [apptEmail, setApptEmail] = useState("");
  const [apptService, setApptService] = useState("");
  const [apptDateTime, setApptDateTime] = useState("");
  const [apptMessage, setApptMessage] = useState("");
  const [apptSuccess, setApptSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    await submitContactForm({
      name: contactName,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage
    });

    setContactSuccess(true);
    // Reset
    setContactName("");
    setContactEmail("");
    setContactSubject("");
    setContactMessage("");

    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleApptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apptName || !apptEmail || !apptService || !apptDateTime) return;

    await bookAppointment({
      name: apptName,
      email: apptEmail,
      service: apptService,
      dateTime: apptDateTime,
      message: apptMessage
    });

    setApptSuccess(true);
    setApptName("");
    setApptEmail("");
    setApptService("");
    setApptDateTime("");
    setApptMessage("");

    setTimeout(() => setApptSuccess(false), 5000);
  };

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-28 relative">
      
      {/* WhatsApp Floating Utility Button */}
      <a 
        href="https://wa.me/442079460192" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#25D366] hover:bg-white text-white hover:text-[#25D366] transition-all flex items-center justify-center shadow-[0_5px_25px_rgba(37,211,102,0.4)] md:scale-100 group"
        title="Direct Chat WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-350 font-mono text-xs font-bold pl-0 group-hover:pl-2 whitespace-nowrap uppercase">
          WhatsApp Chat
        </span>
      </a>

      {/* 1. HEADER HERO */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">CONNECT WITH US</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Initiate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange">Brand Blueprint</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          Submit project specifications or book an appointment timeslot below. Our executive directeurs check entries daily and provide coordinates in 24 hours.
        </p>
      </section>

      {/* 2. CONTACT DETAILS & MAP */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info blocks */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-xl bg-secondary-bg border border-white/5 space-y-2 text-left">
            <Mail className="w-5 h-5 text-neon-blue mb-1" />
            <span className="block text-[10px] font-mono text-gray-500 uppercase">DIRECT EMAIL CARDS</span>
            <span className="block text-sm font-display font-medium text-white select-all">hello@sterling-agency.com</span>
          </div>

          <div className="p-6 rounded-xl bg-secondary-bg border border-white/5 space-y-2 text-left">
            <Phone className="w-5 h-5 text-neon-orange mb-1" />
            <span className="block text-[10px] font-mono text-gray-500 uppercase">TELEPHONE BOUNDARIES</span>
            <span className="block text-sm font-display font-medium text-white select-all">+44 (20) 7946 0192</span>
          </div>

          <div className="p-6 rounded-xl bg-secondary-bg border border-white/5 space-y-2 text-left">
            <MapPin className="w-5 h-5 text-neon-gold mb-1" />
            <span className="block text-[10px] font-mono text-gray-500 uppercase">HQ Coordinates</span>
            <p className="text-xs text-gray-400 font-sans">
              14 Golden Square, Soho,<br />London, W1F 9JG, United Kingdom
            </p>
            <span className="block font-mono text-[9px] text-neon-gold">51.5121° N, 0.1362° W</span>
          </div>
        </div>

        {/* Cinematic Map Blueprint */}
        <div className="lg:col-span-8 p-1 rounded-2xl bg-secondary-bg border border-white/10 overflow-hidden relative">
          <div className="aspect-[16/9] w-full bg-neutral-950 rounded-xl relative flex flex-col justify-center items-center text-center p-8 overflow-hidden">
            {/* Visual aesthetic elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/30 via-black to-black opacity-80"></div>
            
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
            
            {/* Coordinates pointer */}
            <div className="relative z-10 space-y-4">
              <div className="w-10 h-10 rounded-full border border-neon-blue flex items-center justify-center mx-auto animate-ping">
                <span className="w-3 h-3 bg-neon-blue rounded-full"></span>
              </div>
              <div className="space-y-1">
                <span className="font-display font-medium text-white text-base tracking-widest block">STERLING OFFICE COORDINATES</span>
                <span className="text-[10px] font-mono text-neon-blue uppercase">LONDON UK / GLOBAL OPERATIONS DEP</span>
                <p className="text-[11px] text-gray-500 max-w-sm mx-auto leading-relaxed pt-2">Our physical design servers and custom paper vaults reside in London's historical Soho district, allowing full print check runs weekly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & BOOKING SLOTS FORM (SPLIT SECTIONS) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="p-8 md:p-12 rounded-2xl bg-secondary-bg border border-[#252525] space-y-8 relative overflow-hidden">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono text-neon-blue uppercase font-bold tracking-widest block">FORM INTEGRATION</span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold uppercase text-white">Write Your Parameters</h2>
          </div>

          {contactSuccess ? (
            <div className="p-6 rounded-lg bg-neon-blue/10 border border-neon-blue/20 flex flex-col items-center text-center space-y-4 font-sans text-xs">
              <CheckCircle className="w-8 h-8 text-neon-blue" />
              <div>
                <span className="font-display font-semibold text-white uppercase block">Parameters Dispatched</span>
                <span className="text-gray-400">Our senior architects have received your message and will read it during the morning review session.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Devon Sterling"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Your E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. devon@vortex.co"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Subject Reference</label>
                <input
                  type="text"
                  placeholder="E.g. Rebrand Vortex Luxury"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Project Scope Parameters</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your brand targets, estimated scale, and revision expectations..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-blue"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded bg-neon-blue text-black font-semibold uppercase text-xs tracking-wider font-mono hover:bg-white hover:text-black transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,240,255,0.2)]"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Appointment Form */}
        <div className="p-8 md:p-12 rounded-2xl bg-secondary-bg border border-[#252525] space-y-8 relative overflow-hidden">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-mono text-neon-orange uppercase font-bold tracking-widest block">SCHEDULER LINK</span>
            <h2 className="text-2xl md:text-3xl font-display font-semibold uppercase text-white">Book Visual Consult</h2>
          </div>

          {apptSuccess ? (
            <div className="p-6 rounded-lg bg-neon-orange/10 border border-neon-orange/20 flex flex-col items-center text-center space-y-4 font-sans text-xs">
              <CheckCircle className="w-8 h-8 text-neon-orange" />
              <div>
                <span className="font-display font-semibold text-white uppercase block">Meeting Slot Proposed</span>
                <span className="text-gray-400">The appointment entry was written in our calendar. An associate will confirm details over email shortly.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleApptSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Elena Vance"
                    value={apptName}
                    onChange={(e) => setApptName(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">E-mail Address</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. elena@metasense.io"
                    value={apptEmail}
                    onChange={(e) => setApptEmail(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Inquired Service</label>
                  <select
                    required
                    value={apptService}
                    onChange={(e) => setApptService(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-gray-450 focus:outline-none focus:border-neon-orange"
                  >
                    <option value="">Select Service...</option>
                    {services.map(s => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="General inquiry">Spatial Consultation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Consult Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={apptDateTime}
                    onChange={(e) => setApptDateTime(e.target.value)}
                    className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-gray-450 focus:outline-none focus:border-neon-orange"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-405 uppercase tracking-wider block">Meeting Brief Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Outline any key target URLs or physical items you expect to inspect on call..."
                  value={apptMessage}
                  onChange={(e) => setApptMessage(e.target.value)}
                  className="w-full p-3.5 rounded bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-neon-orange"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded bg-neon-orange text-black font-semibold uppercase text-xs tracking-wider font-mono hover:bg-white hover:text-black transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,122,0,0.2)]"
              >
                Schedule Consult <Clock className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
