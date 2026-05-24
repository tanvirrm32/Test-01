import { motion } from "motion/react";
import { useData } from "../../context/DataContext";
import { ArrowRight, ChevronDown, CheckCircle, ExternalLink, Play, Code, Star, Heart, MessageSquare } from "lucide-react";

interface HomeProps {
  onNavigate: (page: string) => void;
  onSelectProject: (id: string) => void;
  onSelectBlog: (id: string) => void;
}

export default function Home({ onNavigate, onSelectProject, onSelectBlog }: HomeProps) {
  const { settings, portfolio, services, testimonials, blog } = useData();

  // Highlight top 3 portfolio items
  const featuredPortfolio = portfolio.slice(0, 3);
  // Highlight top 2 blogs
  const featuredBlogs = blog.slice(0, 2);

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-neon-gold/5 blur-3xl" style={{ animationDelay: "4s" }}></div>
        
        {/* Particle Canvas Dots */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1 h-1 rounded-full bg-white animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 7}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 text-center pt-24 pb-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neon-blue uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
            Awwwards-Inspired Agency Studio
          </div>

          {/* Core Large Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter leading-none mb-8">
            <span className="text-white block">CREATIVE</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-gold to-neon-orange h-[1.1em] block font-extrabold uppercase drop-shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              {settings.heroTitle}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-400 font-sans max-w-3xl mx-auto mb-12 leading-relaxed">
            {settings.heroSubtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={() => onNavigate("portfolio")}
              className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="group px-8 py-4 bg-transparent border border-white/20 hover:border-neon-blue text-white hover:text-neon-blue font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex items-center gap-2"
            >
              Start Project <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono text-gray-500 animate-bounce cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}>
          <span>SCROLL DISCOVERY</span>
          <ChevronDown className="w-4 h-4 text-neon-blue" />
        </div>
      </section>

      {/* 2. SPEC Showcase banner */}
      <section className="py-12 bg-secondary-bg/50 border-y border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { metric: `${settings.yearsExperience}+`, label: "YEARS CONCURRENTLY ACTIVE" },
            { metric: `${settings.completedProjectsCount}+`, label: "DELIVERED OUTLIER PROJECTS" },
            { metric: `${settings.happyClientsCount}+`, label: "GLOBAL BRANDS REBRANDED" },
            { metric: `${settings.activeAwardsCount}+`, label: "AWWWARDS & BEHANCE MEDALS" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight">
                {item.metric}
              </span>
              <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-widest text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT PREVIEW */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-mono text-neon-orange uppercase tracking-widest">ABOUT THE STUDIO</div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight leading-tight">
            We reject templated standardizations to sculpt pristine visual legacies.
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            {settings.aboutText}
          </p>
          <p className="text-gray-500 leading-relaxed">
            {settings.creativePhilosophy}
          </p>
          <div>
            <button
              onClick={() => onNavigate("about")}
              className="text-white hover:text-neon-blue font-semibold flex items-center gap-2 cursor-pointer transition-colors group text-sm"
            >
              LEARN MORE ABOUT US <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 group">
            <img 
              src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=650&q=80" 
              alt="Designer Showcase" 
              className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Ambient frames */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
              <span className="block font-display font-medium text-white text-sm">DEVON STERLING OFFICE</span>
              <span className="block font-mono text-[10px] text-neon-blue uppercase">Creative Strategy HQ - London</span>
            </div>
          </div>
          {/* Background decorative square */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border border-neon-blue/25 rounded-2xl -z-10 animate-pulse"></div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW CARDS */}
      <section className="py-24 bg-secondary-bg/25 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4">
              <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">AGENCY CAPABILITIES</div>
              <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Our Premium Creative Verticals</h2>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="text-gray-400 hover:text-neon-blue text-sm uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer group"
            >
              View Detailed Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((sv, idx) => (
              <div 
                key={sv.id} 
                className="p-8 rounded-xl bg-secondary-bg border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group h-96 relative overflow-hidden"
              >
                {/* Glow layer on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                
                <div className="space-y-6">
                  {/* Service Number Accent */}
                  <span className="block font-mono text-xs text-gray-600 font-bold">0{idx + 1}.</span>
                  <h3 className="text-xl font-display font-semibold text-white group-hover:text-neon-blue transition-colors">
                    {sv.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-4">
                    {sv.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-auto">
                  <span className="text-sm font-mono text-neon-orange font-bold uppercase">{sv.price}</span>
                  <span className="p-2 rounded-full bg-white/5 group-hover:bg-neon-blue group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PORTFOLIO SLIDER */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="text-xs font-mono text-neon-gold uppercase tracking-widest">SELECTED GALLERY</div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Featured Case Studies</h2>
          </div>
          <button
            onClick={() => onNavigate("portfolio")}
            className="text-gray-400 hover:text-neon-gold text-sm uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer group"
          >
            Explore Complete Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredPortfolio.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer rounded-xl overflow-hidden border border-white/5 bg-neutral-900 flex flex-col justify-between h-[500px]"
              onClick={() => onSelectProject(item.id)}
            >
              {/* Image Section */}
              <div className="relative h-[250px] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 text-[10px] font-mono text-neon-blue uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 space-y-4 bg-secondary-bg flex-grow flex flex-col justify-between border-t border-white/5">
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono text-gray-500 uppercase">{item.client} / {item.year}</span>
                  <h3 className="text-2xl font-display font-medium text-white group-hover:text-neon-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
                
                {/* Reveal overlay on hover */}
                <div className="flex items-center gap-2 text-xs font-mono text-neon-gold font-bold uppercase pt-4 transition-all duration-300">
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SKILLS PROGRESS BARS */}
      <section className="py-24 bg-secondary-bg/25 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">TECHNICAL STACK DEEPER</div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Software Expertise & Industry Leverage</h2>
            <p className="text-gray-400 leading-relaxed">
              We operate at the forefront of creative production. Our tools allow us to achieve extreme physics accuracy, rapid prototyping, and letterpress precision on both print materials and high-contrast digital devices.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6">
              {["Figma", "Adobe CC", "Blender 3D", "Cinema 4D", "HTML5 & React", "SVG Vector Animation"].map((tool, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-black/50 border border-white/5 text-center text-xs font-mono text-gray-300 hover:border-neon-blue transition-colors">
                  {tool}
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-6 space-y-8">
            {[
              { skill: "Brand Architecture & Typography", percentage: 98, color: "bg-neon-blue" },
              { skill: "UI/UX & Interactive Design Systems", percentage: 94, color: "bg-neon-orange" },
              { skill: "Packaging Engineering & Tactility", percentage: 91, color: "bg-neon-gold" },
              { skill: "Motion Graphics & Cinematic Reveals", percentage: 86, color: "bg-purple-500" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-mono text-gray-300">
                  <span>{item.skill}</span>
                  <span className="font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: idx * 0.1 }}
                    className={`h-full ${item.color}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WORK PROCESS TIMELINE */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="text-xs font-mono text-neon-orange uppercase tracking-widest">HOW WE ENGAGE</div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Our Work Blueprint Workflow</h2>
          <p className="text-gray-400">Our structured sequence from original intake consult to visual deployment launch.</p>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-1/2 md:border-l-0 md:before:absolute md:before:h-full md:before:w-[1px] md:before:bg-white/10 md:before:left-1/2 md:before:-translate-x-1/2">
          {[
            { step: "01", title: "Intake & Discovery Call", desc: "A 45-minute deep-immersion meeting to discover your market bottlenecks, target audiences, and project parameters." },
            { step: "02", title: "Symmetrical Logic Prototypes", desc: "Building structural frames, typography mockups, and black-and-white layouts to establish visual boundaries without color distraction." },
            { step: "03", title: "Visual Accents & Execution", desc: "Infusing beautiful neon colors, luxury textures, packaging bottle shapes, and tactile paper recommendations." },
            { step: "04", title: "Pragmatic Handoff & Launch", desc: "Comprehensive asset deliveries containing optimized vectors, React component guides, and print coordination support." }
          ].map((item, idx) => (
            <div key={idx} className={`relative mb-12 md:w-1/2 ${idx % 2 === 0 ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12"} pl-8 md:pl-0`}>
              <div className={`absolute top-0 left-0 md:left-auto ${idx % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"} -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center font-mono text-xs text-white`}>
                {item.step}
              </div>
              <div className="p-6 rounded-xl bg-secondary-bg border border-white/5 hover:border-white/15 transition-all text-left">
                <h3 className="text-lg font-display font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BRAND LOGOS SECTION */}
      <section className="py-16 bg-black z-10 relative border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center text-xs font-mono text-gray-500 uppercase tracking-widest mb-10">TRUSTED BY INNOVATION LEADERS</div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-300">
            {["Vortec Systems", "Aether Spirits", "Chronos Co", "Horizon Tech", "Nomad Travel"].map((brand, i) => (
              <span key={i} className="font-display font-extrabold text-xl gap-2 md:text-3xl tracking-tighter text-white inline-flex items-center">
                <Code className="w-5 h-5 text-neon-blue" />
                {brand.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LATEST BLOG PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">LATEST FROM THE STUDIO</div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Aesthetic Logs & Insights</h2>
          </div>
          <button
            onClick={() => onNavigate("blog")}
            className="text-gray-400 hover:text-neon-blue text-sm uppercase tracking-wider font-mono flex items-center gap-2 cursor-pointer group"
          >
            Read All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredBlogs.map((post) => (
            <div 
              key={post.id} 
              className="group cursor-pointer rounded-xl bg-secondary-bg border border-white/5 overflow-hidden hover:border-white/15 transition-all"
              onClick={() => onSelectBlog(post.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 text-[10px] font-mono text-neon-orange uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <span className="text-xs font-mono text-gray-500">{post.date} &bull; {post.readTime}</span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-neon-blue transition-colors leading-tight uppercase">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-450 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="border-t border-white/5 pt-4 flex gap-6 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-neon-orange" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4 text-neon-blue" /> {post.commentsCount} Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CONTACT CTA BANNER */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="p-12 md:p-24 rounded-2xl bg-gradient-to-tr from-secondary-bg to-neutral-900 border border-white/10 text-center space-y-8 relative overflow-hidden">
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-neon-blue/10 blur-3xl"></div>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-neon-orange/10 blur-3xl"></div>
          
          <div className="text-xs font-mono text-neon-gold uppercase tracking-widest relative z-10">HAVE A LEGACY TO BUILD?</div>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-white tracking-tight relative z-10">Let's create something striking and iconic.</h2>
          
          <p className="text-gray-450 max-w-xl mx-auto leading-relaxed relative z-10">
            Submit an appoitment consultation booking or write directly about your parameters. Our senior architects reply in 24 hours.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-4 rounded-lg bg-neon-blue text-black font-semibold hover:bg-white hover:text-black transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,240,255,0.2)]"
            >
              BOOK CONSULTATION
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("footer-contact-info");
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-lg bg-transparent border border-white/20 hover:border-white text-white transition-all cursor-pointer"
            >
              DIRECT CONTACT CARD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
