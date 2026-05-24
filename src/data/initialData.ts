import { PortfolioItem, Service, BlogPost, Testimonial, TeamMember, Career, SiteSettings } from "../types";

export const initialSettings: SiteSettings = {
  id: "general",
  heroTitle: "CREATIVE GRAPHIC DESIGNER & BRAND IDENTITY EXPERT",
  heroSubtitle: "We curate premium digital signatures and visual ecosystems for global luxury labels, high-end start-ups, and game-changing brands.",
  aboutText: "We are an award-winning international boutique creative studio working at the intersection of luxury, arts, and digital innovation. Since 2018, we have crafted distinct visual identities, architectural portfolios, and iconic physical layouts that command authority.",
  personalStoryName: "Devon Sterling",
  personalStoryTitle: "Founder & Executive Creative Director",
  personalStoryContent: "With over 12 years of crafting visual legacies for Fortune 100 fashion houses and technology outliers, Devon founded Sterling Agency around a single conviction: visuals aren't just assets; they are a currency. We reject template-level standardizations, focusing on custom typography, architectural negative space, and physical materials translated flawlessly to screen.",
  creativePhilosophy: "Design is not what it looks like; it is the silent logic that dictates premium pricing, client loyalty, and cultural legacy. We believe in meticulous detail, severe grid systems, and color accents that shock the gaze in a sea of monochrome noise.",
  activeAwardsCount: 14,
  completedProjectsCount: 142,
  happyClientsCount: 88,
  yearsExperience: 8,
};

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: "vortex-luxury",
    title: "VORTEX LUXURY APPAREL",
    description: "Rebranding of a premium sustainable streetwear house with custom visual languages and editorial design.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    client: "Vortex Co.",
    challenge: "The sustainable apparel brand was struggling to command premium price points in the high-fashion retail landscape due to an organic-focused visual language that felt clinical and lacked lifestyle appeal.",
    process: "We stripped away the pastel greens and raw cardboards. In their place, we introduced high-gloss premium carbon blacks, severe minimalist serif lettering inspired by architectural engravings, and a dynamic orange signature accent (#FF7A00). We designed custom shipping cartons with debossed silver lines and engineered interactive web catalogs.",
    mockupGallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "Sterling Agency took our brand from organic boutique to global collector status. Within 3 months of our rebrand launch, average cart value jumped by 54%.",
    year: "2025",
    tags: ["Visual Architecture", "Custom Typeface", "Sustainable Luxury", "Unboxing Design"],
    industry: "Luxury Apparel"
  },
  {
    id: "aether-packaging",
    title: "AETHER BOTANICAL SPIRITS",
    description: "Architectural glass curvature, metallic foil pressings, and tactile textured carton wrapping.",
    category: "Packaging",
    imageUrl: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80",
    client: "Aether Distilleries",
    challenge: "Aether is a micro-batch botanical gin brand that wanted to launch at $120 a bottle. They needed a shelf presence so striking that customers would buy it as a decorative centerpiece.",
    process: "We worked alongside glass artists to sculpt a heavy-bottomed, geometric bottle inspired by Gothic arches. The labels were letterpressed in gold foil (#FFD700) onto raw linen papers, combining tech-forward typography with traditional herbal catalogs.",
    mockupGallery: [
      "https://images.unsplash.com/photo-1569529465841-dfedd87500f7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "Pure physical theater. The bottle has won three design awards and sold out our initial 5,000-unit production run within two weeks.",
    year: "2024",
    tags: ["Tactile Paper", "Geometric Glass", "Gold Foil Pressing", "Bespoke Sculpting"],
    industry: "Fine Spirits"
  },
  {
    id: "metasense-ui",
    title: "METASENSE DIGITAL PLATFORM",
    description: "An interactive web experience and brand system for a futuristic neural interface headset.",
    category: "Website UI",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    client: "MetaSense Labs",
    challenge: "A tech startup wanted to showcase highly complex neurological signal models without intimidating non-technical enterprise adopters or looking like standard SaaS templates.",
    process: "We built an immersive black web grid framed with high-contrast cyan glowing boundaries (#00F0FF). We designed clean, oversized type interfaces with 'Space Grotesk' fonts paired with real-time reactive SVG wave nodes representing head signals.",
    mockupGallery: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "Outstanding response from venture capitalists during our Series A. The interface instantly communicates that we are 5 years ahead of the market.",
    year: "2025",
    tags: ["SaaS Luxury", "Framer Interactions", "Ambient Neon Glow", "Oversized Typography"],
    industry: "Neurotech & AI"
  },
  {
    id: "chronos-advertising",
    title: "CHRONOS METEORIC REVELATION",
    description: "A cinematic multi-city billboard campaign incorporating mechanical watch movements.",
    category: "Advertising",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    client: "Chronos Switzerland",
    challenge: "Launced a limited collection watch made from genuine meteorites. Traditional print ads read as too academic and failed to capture the astronomical scale of the product.",
    process: "We designed minimalist charcoal billboards consisting of high-definition macro photography of the watch dials, contrasted with a stark glowing neon perimeter and heavy modern serif taglines reading: 'STAMPED BY THE COSMOS.'",
    mockupGallery: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "The high-contrast posters drew lines outside our retail stores in Paris, Geneva, and Tokyo.",
    year: "2024",
    tags: ["Cinematic Billboards", "Macro Photography", "Luxury Timepieces", "Urban Takeover"],
    industry: "Luxury Accessories"
  },
  {
    id: "nomad-publishing",
    title: "NOMAD EDITORIAL PUBLISHING",
    description: "Premium coffee-table travel logs featuring silver-trimmed bindery and custom heavy layout spreads.",
    category: "Print Design",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    client: "Nomad Media",
    challenge: "In a digital-first era, print publications need to feel like structural trophies in order to thrive. Nomad needed custom grid books that felt like absolute art pieces.",
    process: "We designed books using a Swiss style grid layout with dramatic asymmetry, deep blind-embossed typography, and heavy silver ink trim accents. Page gutters were mathematically structured to emphasize photography of volcanic ridges.",
    mockupGallery: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "The binding structure and linen cover represent the zenith of independent travel logs. A collector's holy grail.",
    year: "2023",
    tags: ["Swiss Editorial", "Asymmetrical Grid", "Silver Foil Edging", "Art Collectibles"],
    industry: "High-End Publishing"
  },
  {
    id: "spectrum-social",
    title: "SPECTRUM ACOUSTICS REVELATION",
    description: "An animated audio wave identity and neon-framed digital banners for custom listening rooms.",
    category: "Social Media",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    client: "Spectrum Audio Systems",
    challenge: "Translate high-fidelity, room-filling sound dynamics into silent mobile screens on Instagram and Linkedin feed panels.",
    process: "We constructed clean, procedural layouts showing motion waves framed inside high-contrast borders with glowing neon orange accent lines. Every frame was crafted around geometric, technical measurements.",
    mockupGallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    feedback: "A dramatic visual upgrade. Our digital campaigns reached 1.2M targeted designers in weeks.",
    year: "2025",
    tags: ["Acoustic Waveforms", "Motion Layouts", "High-Contrast Feeds", "Tech-Forward Audio"],
    industry: "Acoustics & Sound"
  }
];

export const initialServices: Service[] = [
  {
    id: "brand-identity",
    title: "Brand Identity Design",
    description: "We create entire visual signatures. From raw typography blueprints to custom material unboxing and guidelines, we build cohesive, timeless aesthetic ecosystems.",
    iconName: "Shield",
    price: "$8,500+",
    features: [
      "Strategic Positioning Audits",
      "Logomark & Custom Typography Curations",
      "Accent Palettes with Neon Highlights",
      "Full Digital & Print Style Handbooks",
      "Pre-rendered Stationery & Box Layouts",
      "3 Rounds of Architectural Revisions"
    ],
    faq: [
      { question: "What files do we get?", answer: "All vector source formats (AI, EPS, SVG) alongside fully packaged PDFs, web assets, and dynamic guidelines." },
      { question: "How long does the branding project take?", answer: "Typically 4 to 6 weeks, which includes extensive brand research, structural drafts, and fine modifications." }
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Architecture & Interfaces",
    description: "High-contrast website layouts and mobile wireframes driven by a meticulous human-centered logic and spectacular visual styling.",
    iconName: "Layout",
    price: "$12,000+",
    features: [
      "Wireframing & Structural Logic Mapping",
      "Immersive Dark & Cinematic User Interfaces",
      "Reactive Dynamic Icons & Components",
      "Design Systems (Figma Components & Tokens)",
      "High-Fidelity Interactive Mockups",
      "Direct Developer Handoff Handshake"
    ],
    faq: [
      { question: "Do you build or code the websites?", answer: "We focus on ultra-premium visual layout design. However, we have in-house React/Vite engineers who can convert drawings to pristine code if requested." },
      { question: "Can you design in Light Mode instead?", answer: "While we believe dark-mode interfaces command a higher sensory luxury premium, we can adapt layouts to support striking contrast levels in light schemes." }
    ]
  },
  {
    id: "packaging-design",
    title: "Luxury Packaging & Tactility",
    description: "Physical packaging architecture designed to be treasured. Emphasizing premium foils, weight ratios, textured boxes, and organic linen labels.",
    iconName: "Package",
    price: "$6,500+",
    features: [
      "Heavy Glass & Custom Bottle Curved Blueprints",
      "Vector Dielines & Flat Paper Mockups",
      "Technical Foil, Debossed, & Embossed Layer Files",
      "Material, Paperweight, & Ink Guide Specifications",
      "3D Photorealistic Rotational Renders",
      "Print Provider Coordination Support"
    ],
    faq: [
      { question: "Do you supply the packaging paper?", answer: "We handle the structural design and foil mapping, then coordinate with top-tier international luxury paper companies and printers to craft the final physical product." }
    ]
  },
  {
    id: "motion-graphics",
    title: "High-End Motion & Cinematic Graphics",
    description: "Bring static brands to active life with kinetic typography, audio wave projections, and elegant transitions built for events and socials.",
    iconName: "Zap",
    price: "$5,000+",
    features: [
      "Cinematic Logo Reveal Videos",
      "Kinetic Typography Slogans",
      "Interactive Social Reels Formats",
      "Technical Wave & Dynamic Signal Mapping",
      "Lottie Vectors for Frontend Developers",
      "HQ Audio-Design Sync"
    ],
    faq: [
      { question: "What is the duration of motion projects?", answer: "Most deliverables range from 5 to 30 seconds of extreme density animation, delivered in standard MP4, ProRes, or SVG Lottie layers." }
    ]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "Genevieve Dubois",
    role: "Chief Marketing Officer",
    company: "Vortex Apparel Group",
    feedback: "The level of visual conceptualization is unmatched. Devon and his crew design in a dimension of luxury and precision that standard agencies cannot grasp. Our brand transition was synchronous and absolutely explosive on sales charts.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "testi-2",
    name: "Marcus Vance",
    role: "Co-Founder",
    company: "MetaSense Labs",
    feedback: "We wanted a visual representation that matched our neural-tech hardware's futuristic nature. They created a cyan glowing universe that absolute stole the show at our fundraising rounds. Truly spectacular.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "testi-3",
    name: "Kaito Shinomoto",
    role: "Creative Director",
    company: "Chronos Switzerland",
    feedback: "Precision engineering. Every pixel in their layouts felt crafted down to the microscopic level. The billboard campaign was an absolute masterclass in luxury arts storytelling.",
    rating: 5,
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: "devon-sterling",
    name: "Devon Sterling",
    role: "Founder & Creative Director",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    skills: [
      { name: "Visual Identity & Concept", percentage: 98 },
      { name: "Typography Curations", percentage: 95 },
      { name: "Symphonic Color Accentuation", percentage: 92 }
    ],
    bio: "Ex-creative director at Milan boutique style agencies. Leads Devon's signature grid guidelines on and off screen.",
    socials: { twitter: "https://twitter.com", linkedin: "https://linkedin.com", behance: "https://behance.net" }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Principal Brand Architect",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    skills: [
      { name: "Packaging Geometry", percentage: 96 },
      { name: "Dielines & Tactile Craft", percentage: 94 },
      { name: "Luxury Bottle Sculpting", percentage: 90 }
    ],
    bio: "Trained in industrial glass shaping in Venice. Elena brings intense structural physics calculations into packaging boxes.",
    socials: { linkedin: "https://linkedin.com", behance: "https://behance.net", instagram: "https://instagram.com" }
  },
  {
    id: "kai-chen",
    name: "Kai Chen",
    role: "Lead UI/UX Mastermind",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    skills: [
      { name: "Figma System Engineering", percentage: 97 },
      { name: "Dynamic Web Sizing", percentage: 92 },
      { name: "Kinetic Components", percentage: 88 }
    ],
    bio: "Passionate about severe Swiss grids. Kai builds interaction triggers that guide click paths naturally.",
    socials: { behance: "https://behance.net", instagram: "https://instagram.com" }
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "luxury-identities-2026",
    title: "THE CURATORS OF GRAVITY: SCIENTIFIC TYPOGRAPHY IN MODERN LUXURY",
    excerpt: "Why premium brands are ditching standard circular loops and pastel gradients for architectural serif symbols and neon borders.",
    content: "## The Visual Currency of High-Contrast\n\nIn the noise saturated ecosystem of 2026, standard design templates have lost their ability to hold human attention. A custom brand logo is no longer just a visual banner; it is a silent, subconscious signature that dictates luxury pricing, customer gravity, and brand valuation.\n\n### The Shift to Pure Architecture\nWe have seen an intense migration toward structural typography. Brands like Saint Laurent and Balenciaga proved that stripping away unnecessary decoration is the ultimate power move. Under Sterling Agency's creative guidelines, we emphasize:\n\n1. **Severe Grid Symmetrical Alignments**: Creating immediate structural trust.\n2. **Extreme Negative Space**: Giving elements the room to command attention.\n3. **Glowing Focal Outlines**: Highlights in neon cyan (#00F0FF) that direct curiosity instantly on dark screen layouts.\n\n### Tactile Depth in the Digital Age\nWhen packaging travels from logistics points to physical tables, tactility is king. Blind embossing, gold leaf foil presses, and heavy raw uncoated textured cardboards create deep psychological anchors. Digital websites must capture this: using high-definition, micro-scaled lighting and organic shadows behind mockups.",
    category: "Branding",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    readTime: "4 min read",
    author: "Devon Sterling",
    date: "May 20, 2026",
    likes: 42,
    commentsCount: 6,
    comments: [
      { author: "Adrian Finch", content: "This is pure gold. Asymmetrical Swiss grids represent the next major wave.", date: "May 21, 2026" },
      { author: "Sabrina Wells", content: "The emphasis on tactile unboxing is highly underrated. Great writeup!", date: "May 22, 2026" }
    ]
  },
  {
    id: "ux-dark-philosophy",
    title: "DARK PATTERNS vs. CINEMATIC DARK UI: COMMANDING RESPECT ONLINE",
    excerpt: "Designing eye-safe, deep-canvas luxury interfaces that maximize exploration duration without fatiguing the eye or resorting to patterns.",
    content: "## The Psychology of the Abyss\n\nClassic web design was founded on simulating white pieces of letter paper. While logical for documentation, white pages fatigue the optic nerve and treat screens like books.\n\n### The Immersive Canvas\nBy using pure blacks (#000000) and deep charcoal grays (#0B0B0B), we construct deep, limitless spaces. Interfaces feel premium, sleek, and cinematic, reminiscent of high-end art gallery hallways where spotlight projections highlight the paintings.\n\n### Accent Splashes\nOn dark surfaces, color acquires spectacular energy. A mere 2px glowing margin line in **Neon Cyan** or **Solar Orange** can guide eye movement and drive call-to-action click completions 40% faster than standard saturated buttons.",
    category: "Website UI",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    readTime: "6 min read",
    author: "Kai Chen",
    date: "April 18, 2026",
    likes: 88,
    commentsCount: 12,
    comments: [
      { author: "Klaus M.", content: "Dark mode has literally doubled my screen time. Visually beautiful.", date: "April 19, 2026" }
    ]
  }
];

export const initialCareers: Career[] = [
  {
    id: "snr-brand-designer",
    title: "Senior Brand & Visual Identity Designer",
    department: "Creative Studio",
    location: "London / Hybrid",
    type: "Full-Time",
    salary: "£65,000 - £75,000",
    description: "We are seeking a typographic purist and visual architect capable of shaping brand ecosystems for high-end beauty, spirit, and tech client portfolios.",
    requirements: [
      "5+ years agency experience branding elite or luxury brands.",
      "Extreme proficiency with Figma, Adobe Illustrator, and physical layout prototyping.",
      "An award-winning visual portfolio on Behance, Dribbble, or custom domain.",
      "Firm grasp of Swiss typography grids and modern neon contrast accents."
    ]
  },
  {
    id: "motion-director",
    title: "Lead Kinetic Motion & 3D Designer",
    department: "Interactive Design",
    location: "Remote",
    type: "Contract",
    salary: "$80 - $110 / Hour",
    description: "Responsible for leading active kinetic motion guides, animated web SVGs, packaging renders, and social reel perimeters.",
    requirements: [
      "Expertise with After Effects, Cinema 4D, Blender, Lottie, and spline wave projections.",
      "Ability to sync auditory design signals with visual motion transitions smoothly.",
      "Strong understanding of modern dark aesthetic layouts."
    ]
  }
];
