import { useState, useEffect } from "react";
import { DataProvider, useData } from "./context/DataContext";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Services from "./components/pages/Services";
import Portfolio from "./components/pages/Portfolio";
import Blog from "./components/pages/Blog";
import Testimonials from "./components/pages/Testimonials";
import Team from "./components/pages/Team";
import Faq from "./components/pages/Faq";
import AdminPanel from "./components/AdminPanel";
import { 
  Compass, Menu, X, ArrowRight, Shield, Heart, Clock, Mail, Phone, MapPin, ExternalLink, Activity, Database
} from "lucide-react";

type PageId = "home" | "about" | "services" | "portfolio" | "blog" | "testimonials" | "team" | "faq" | "admin";

function NavigationHub() {
  const { settings, portfolio, blog, contactSubmissions, appointments, seedFirebaseDatabase, isAdminUser } = useData();
  const [activePage, setActivePage] = useState<PageId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom states to handle deep linking/triggering case studies immediately on state transition
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Custom Cursor follow position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch based
    const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobileDevice(touchCheck);

    if (!touchCheck) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = target.closest("button, a, input, select, textarea, [role='button']");
        setCursorHovered(!!isClickable);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseOver);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, []);

  // Quick deep navigate trigger for CTA buttons or previews
  const navigateToPage = (page: PageId, projectId?: string | null, blogId?: string | null) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActivePage(page);
    setMobileMenuOpen(false);
    if (projectId) setSelectedProjectId(projectId);
    if (blogId) setSelectedBlogId(blogId);
  };

  const menuItems: { id: PageId; label: string }[] = [
    { id: "home", label: "Overview" },
    { id: "about", label: "Agency story" },
    { id: "services", label: "Services Catalog" },
    { id: "portfolio", label: "Portfolios" },
    { id: "blog", label: "Visual Journals" },
    { id: "testimonials", label: "Client Verdicts" },
    { id: "team", label: "The Ensemble" },
    { id: "faq", label: "QA" }
  ];

  return (
    <div className="min-h-screen bg-primary-bg text-white relative flex flex-col justify-between overflow-x-hidden selection:bg-neon-orange selection:text-black">
      
      {/* 1. CUSTOM GLOWING NEON CURSOR (MOBILE DISABLER APPLIED) */}
      {!isMobileDevice && (
        <>
          {/* Main Dot */}
          <div 
            className="fixed w-2 h-2 bg-neon-orange rounded-full pointer-events-none z-50 transition-transform duration-75 mix-blend-difference"
            style={{ 
              transform: `translate3d(${mousePos.x - 4}px, ${mousePos.y - 4}px, 0)`,
            }}
          ></div>
          {/* Delayed follow ring */}
          <div 
            className={`fixed rounded-full pointer-events-none z-50 transition-all duration-300 border border-neon-blue mix-blend-screen ${
              cursorHovered ? "w-12 h-12 -translate-x-6 -translate-y-6 bg-neon-blue/10 border-transparent scale-125" : "w-6 h-6 -translate-x-3 -translate-y-3"
            }`}
            style={{ 
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            }}
          ></div>
        </>
      )}

      {/* 2. FLOATING NAVIGATOR BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-primary-bg/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          
          {/* Agency Signature */}
          <div 
            onClick={() => navigateToPage("home")} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neon-orange group-hover:bg-neon-orange group-hover:text-black transition-colors duration-300">
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <span className="font-display font-black tracking-tighter text-white text-base group-hover:text-neon-orange transition-colors">
                STERLING <span className="text-[10px] font-mono text-neon-blue font-semibold">[AGENCY]</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Paths */}
          <nav className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className={`relative text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive ? "text-neon-orange" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-neon-orange"></span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => navigateToPage("admin")}
              className={`px-3 py-1.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                activePage === "admin" ? "bg-neon-blue/10 text-neon-blue border-neon-blue/20" : "text-neon-blue hover:bg-neon-blue hover:text-black"
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Administrative
              { (contactSubmissions.length > 0 || appointments.length > 0) && (
                <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-pulse"></span>
              )}
            </button>
          </nav>

          {/* Mobile open trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => navigateToPage("admin")}
              className="p-2 rounded bg-white/5 text-neon-blue text-xs uppercase cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 rounded-lg border border-white/10 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drop-drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-primary-bg border-t border-white/5 p-6 space-y-4 text-left animate-fade-in relative z-50">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className="w-full py-2.5 text-xs font-mono font-bold uppercase text-gray-300 hover:text-neon-orange border-b border-white/5 cursor-pointer text-left"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigateToPage("admin")}
                className="w-full py-3 px-4 bg-neon-blue text-black font-semibold text-xs rounded font-mono uppercase tracking-widest text-center cursor-pointer"
              >
                ADMIN WORKROOM
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. CORE ROUTER PAGE CONTENT */}
      <main className="flex-grow">
        {activePage === "home" && (
          <Home 
            onNavigate={(page) => {
              if (page === "contact") {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              } else {
                navigateToPage(page as PageId);
              }
            }}
            onSelectProject={(id) => navigateToPage("portfolio", id)}
            onSelectBlog={(id) => navigateToPage("blog", null, id)}
          />
        )}
        {activePage === "about" && <About />}
        {activePage === "services" && <Services />}
        {activePage === "portfolio" && (
          <Portfolio 
            selectedProjectId={selectedProjectId}
            onClearProjectSelection={() => setSelectedProjectId(null)}
          />
        )}
        {activePage === "blog" && (
          <Blog 
            selectedBlogId={selectedBlogId}
            onClearBlogSelection={() => setSelectedBlogId(null)}
          />
        )}
        {activePage === "testimonials" && <Testimonials />}
        {activePage === "team" && <Team />}
        {activePage === "faq" && <Faq />}
        {activePage === "admin" && <AdminPanel />}
      </main>

      {/* 4. PREMIUM DEEP CHARCOAL FOOTER */}
      <footer className="bg-secondary-bg border-t border-white/5 pt-20 pb-8 text-left text-xs text-gray-500 font-sans z-10 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-16">
          
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-neon-orange">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-black tracking-tight text-white uppercase text-base">STERLING</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              Symmetrical visual alignment masterminds. We author premium graphic dielines, clean layouts, and luxury bottle curvatures commanding peak industry valuations.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-neon-blue">
              <Clock className="w-4 h-4 text-neon-blue" />
              <span>GMT UTC TIME: {new Date().toUTCString().slice(17, 22)}</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="block font-display font-extrabold text-white text-xs uppercase tracking-wider">OFFICE COORDINATES</span>
            <ul className="space-y-3 dark-link text-gray-410">
              <li className="flex gap-2 items-start text-xs text-gray-400">
                <MapPin className="w-4 h-4 text-neon-gold shrink-0 pt-0.5" />
                <span>14 Golden Square, Soho, London, UK</span>
              </li>
              <li className="flex gap-2 items-center text-xs text-gray-400">
                <Mail className="w-4 h-4 text-neon-blue" />
                <span className="select-all">hello@sterling-agency.com</span>
              </li>
              <li className="flex gap-2 items-center text-xs text-gray-400">
                <Phone className="w-4 h-4 text-neon-orange" />
                <span className="select-all">+44 (20) 7946 0192</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <span className="block font-display font-extrabold text-white text-xs uppercase tracking-wider">THE CORE SYSTEM</span>
            <ul className="space-y-2 font-mono text-[10px] uppercase">
              <li><button onClick={() => navigateToPage("home")} className="hover:text-neon-orange cursor-pointer">Overview</button></li>
              <li><button onClick={() => navigateToPage("about")} className="hover:text-neon-orange cursor-pointer">Story context</button></li>
              <li><button onClick={() => navigateToPage("services")} className="hover:text-neon-orange cursor-pointer">Catalog specs</button></li>
              <li><button onClick={() => navigateToPage("portfolio")} className="hover:text-neon-orange cursor-pointer">Portfolios gallery</button></li>
              <li><button onClick={() => navigateToPage("blog")} className="hover:text-neon-orange cursor-pointer">Journals blog</button></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="block font-display font-extrabold text-white text-xs uppercase tracking-wider">ADMIN ACTIONS</span>
            <p className="text-[11px] text-gray-500 leading-relaxed pb-2">Modify homepage copy, write portfolio stories, or approve consultations immediately.</p>
            <button
              onClick={() => navigateToPage("admin")}
              className="px-4 py-2 bg-white/5 hover:bg-neon-orange hover:text-black border border-white/10 hover:border-transparent rounded text-[10px] font-mono font-bold uppercase transition-all tracking-wider cursor-pointer"
            >
              LAUNCH AGENCY ADMIN WORKROOM
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-neon-gold">SYSTEM SYNC: ACTIVE</span>
          </div>
          <span className="font-mono text-[10px] uppercase">
            &copy; 2026 STERLING CREATIVE AGENCY. ALL RIGIDITIES REGISTERED.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <NavigationHub />
    </DataProvider>
  );
}
