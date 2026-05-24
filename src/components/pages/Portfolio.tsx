import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { X, ArrowRight, ExternalLink, Calendar, Users, Star, CheckCircle, Eye } from "lucide-react";
import { PortfolioItem } from "../../types";

interface PortfolioProps {
  selectedProjectId?: string | null;
  onClearProjectSelection?: () => void;
}

export default function Portfolio({ selectedProjectId, onClearProjectSelection }: PortfolioProps) {
  const { portfolio } = useData();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
  // Before / After Slider State (gorgeous interactive rebrand component)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // If a project is pre-selected (called from Home or elsewhere), open it right away
  useState(() => {
    if (selectedProjectId) {
      const found = portfolio.find(p => p.id === selectedProjectId);
      if (found) {
        setSelectedProject(found);
      }
    }
  });

  const categories = ["All", "Branding", "Packaging", "Social Media", "Print Design", "Website UI", "Advertising"];

  const filteredPortfolio = activeCategory === "All" 
    ? portfolio 
    : portfolio.filter(item => item.category === activeCategory);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-24 relative">
      
      {/* 1. HEADER HERO */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-gold uppercase tracking-widest">CREATIVE SHOWCASE</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Symmetrical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-blue">Visual Landmarks</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          From corporate carbon-black visual guidelines to sculptured container glass, explore our showcase cases highlighting aesthetic metrics and pristine execution.
        </p>
      </section>

      {/* 2. CORE BEFORE & AFTER INTERACTIVE SLIDER */}
      <section className="p-8 rounded-2xl bg-secondary-bg border border-white/10 space-y-8">
        <div className="max-w-2xl text-left space-y-2">
          <span className="text-xs font-mono text-neon-blue uppercase tracking-widest block">INTERACTIVE CASE LABS</span>
          <h2 className="text-2xl font-display font-bold text-white uppercase">Typography Rebrand Comparative</h2>
          <p className="text-xs text-gray-400">Hover or drag across the panel below to witness our transition from client raw blueprint to premium orange custom typeface.</p>
        </div>

        {/* The Slider Compartment */}
        <div 
          className="relative max-w-3xl aspect-[16/9] w-full mx-auto rounded-xl overflow-hidden border border-white/10 cursor-ew-resize select-none"
          onMouseMove={(e) => { if (isDragging || e.buttons === 1) handleSliderMove(e); }}
          onTouchMove={handleSliderMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Legacy Brand (Background) */}
          <div className="absolute inset-0 bg-neutral-900 flex justify-center items-center">
            <div className="text-center grayscale opacity-30 select-none">
              <span className="font-sans font-bold text-gray-500 tracking-wider text-xl uppercase block">OLD DRY TYPEFACE</span>
              <span className="text-[10px] font-mono block pt-1 text-gray-500">Standard Editorial (Pastel Greens / Clinical Circles)</span>
            </div>
          </div>

          {/* New Rebrand (Overlay clipping) */}
          <div 
            className="absolute inset-y-0 left-0 bg-[#0c0c0c] flex justify-center items-center overflow-hidden transition-all pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Needs constant container size to prevent scale jump */}
            <div className="absolute w-[800px] h-full flex justify-center items-center text-center">
              <div>
                <span className="font-display font-black text-white text-3xl sm:text-5xl tracking-tighter block uppercase">
                  VORTEX <span className="text-neon-orange">LUXURY</span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-neon-blue uppercase block pt-2 tracking-widest">
                  [ 2px Neon Perimeters + Debossed Carbon Stamping ]
                </span>
              </div>
            </div>
          </div>

          {/* Bar separator and handle button */}
          <div 
            className="absolute inset-y-0 w-1 bg-neon-blue pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border-2 border-neon-blue flex items-center justify-center font-mono text-xs text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              &harr;
            </div>
          </div>

          {/* Relative labels */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-gray-500 uppercase">
            BEFORE (CLIENT LOGO)
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-mono text-neon-blue uppercase">
            AFTER (STERLING REBRAND)
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SELECTOR */}
      <section className="space-y-12">
        <div className="flex flex-wrap gap-2 justify-start border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat 
                  ? "bg-neon-gold text-black shadow-[0_4px_15px_rgba(255,215,0,0.25)]" 
                  : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4. MASONRY GRID PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between h-[500px]"
              onClick={() => setSelectedProject(item)}
            >
              {/* Image box */}
              <div className="relative h-[280px] overflow-hidden bg-neutral-950">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 text-[10px] font-mono text-neon-blue uppercase tracking-wider">
                  {item.category}
                </div>
                <div className="absolute bottom-4 right-4 p-2 bg-black/80 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-4 h-4 text-neon-blue" />
                </div>
              </div>

              {/* Text compartment */}
              <div className="p-8 bg-secondary-bg flex-grow flex flex-col justify-between border-t border-white/5">
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono text-gray-500 uppercase">{item.client} / {item.year}</span>
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white group-hover:text-neon-gold transition-colors leading-tight uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-neon-gold uppercase font-bold pt-4">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CASE STUDY DETAIL POPUP MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-secondary-bg border border-white/10 rounded-2xl max-w-4xl w-full p-8 md:p-12 space-y-8 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => {
                setSelectedProject(null);
                if (onClearProjectSelection) onClearProjectSelection();
              }}
              className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header info */}
            <div className="space-y-4 mr-8 border-b border-white/5 pb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded bg-neon-blue/10 text-neon-blue font-mono text-[10px] uppercase">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-gray-500 uppercase">DELIVERED IN {selectedProject.year}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                {selectedProject.title}
              </h2>
            </div>

            {/* Meta Parameters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl bg-black/50 border border-white/5">
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block">CLIENT PARTNER</span>
                <span className="text-sm font-display font-medium text-white uppercase">{selectedProject.client}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block">TARGET INDUSTRY</span>
                <span className="text-sm font-display font-medium text-white uppercase">{selectedProject.industry || "Luxury Goods"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block">YEAR ACTIVE</span>
                <span className="text-sm font-display font-medium text-white">{selectedProject.year}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 uppercase block">DELIVERABLE RATING</span>
                <span className="text-sm font-display font-medium text-amber-400 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 5.0 Perfect
                </span>
              </div>
            </div>

            {/* In-Depth Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-gray-300 leading-relaxed font-sans pt-4">
              <div className="space-y-4">
                <span className="font-mono font-bold text-white uppercase block text-neon-orange">I. The Design Challenge</span>
                <p>{selectedProject.challenge}</p>
              </div>
              <div className="space-y-4">
                <span className="font-mono font-bold text-white uppercase block text-neon-blue">II. The Architectural Process</span>
                <p>{selectedProject.process}</p>
              </div>
            </div>

            {/* Mockup Showcase Carousel */}
            {selectedProject.mockupGallery && selectedProject.mockupGallery.length > 0 && (
              <div className="space-y-4 pt-6">
                <span className="block font-mono font-semibold text-white uppercase text-neon-gold text-xs">III. PROJECT MOCKUP FILES & RENDERS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.mockupGallery.map((img, index) => (
                    <div key={index} className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-neutral-900">
                      <img src={img} alt={`Mockup ${index + 1}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Client Feedback Citation */}
            {selectedProject.feedback && (
              <div className="p-8 rounded-xl bg-neon-gold/5 border-l-2 border-neon-gold border-y border-r border-white/5 space-y-4 pt-6">
                <span className="block font-mono text-neon-gold text-[10px] uppercase font-bold tracking-widest">AUTHENTIFIED CLIENT VERDICT</span>
                <p className="text-sm text-amber-100 italic leading-relaxed">
                  "{selectedProject.feedback}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="w-6 h-6 rounded-full bg-neon-gold/20 flex items-center justify-center text-neon-gold text-xs font-bold">✓</span>
                  <span className="text-xs font-mono text-gray-400 uppercase">DIRECT REVIEW SYNCED</span>
                </div>
              </div>
            )}

            {/* Footer buttons */}
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                {selectedProject.tags?.map((tg, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500 uppercase">
                    {tg}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => {
                  setSelectedProject(null);
                  if (onClearProjectSelection) onClearProjectSelection();
                }} 
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white hover:bg-neon-gold hover:text-black text-black font-semibold transition-all cursor-pointer text-center"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
