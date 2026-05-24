import { useState } from "react";
import { useData } from "../../context/DataContext";
import { Star, MessageSquare, Quote, Play, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const { testimonials } = useData();
  const [activeReviewIndex, setActiveReviewIndex] = useState<number>(0);
  const [playingVideo, setPlayingVideo] = useState<boolean>(false);

  const activeReview = testimonials[activeReviewIndex] || testimonials[0];

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-24 relative">
      
      {/* 1. HEADER SECTION */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">CLIENT VERDICTS</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-orange">Success Catalog</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          Read reviews from innovation leads, founders, and public brands regarding our branding metrics, packaging dielines, and component UI accuracy.
        </p>
      </section>

      {/* 2. DYNAMIC REVIEW SLIDER */}
      {activeReview && (
        <section className="p-8 md:p-16 rounded-2xl bg-secondary-bg border border-white/5 flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden">
          {/* Ambient Quote Mark */}
          <Quote className="absolute -top-10 -right-10 w-48 h-48 text-white/5 pointer-events-none" />

          {/* Portrait Section */}
          <div className="w-full lg:w-1/3 shrink-0">
            <div className="aspect-square rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
              <img src={activeReview.imageUrl} alt={activeReview.name} className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          {/* Feedback details */}
          <div className="w-full lg:w-2/3 space-y-6 text-left">
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(activeReview.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-neon-gold text-neon-gold" />
              ))}
            </div>

            {/* Critique text */}
            <p className="text-lg md:text-2xl text-white italic leading-relaxed font-sans font-light">
              "{activeReview.feedback}"
            </p>

            {/* Signature */}
            <div>
              <span className="block font-display font-extrabold text-white uppercase tracking-tight text-sm">
                {activeReview.name}
              </span>
              <span className="block font-mono text-xs text-neon-blue uppercase tracking-wider">
                {activeReview.role} &bull; {activeReview.company}
              </span>
            </div>

            {/* Slider Switch Toggles */}
            <div className="flex gap-4 pt-6">
              <button 
                onClick={handlePrevReview}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer"
              >
                &larr;
              </button>
              <button 
                onClick={handleNextReview}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-white text-white flex items-center justify-center transition-all cursor-pointer"
              >
                &rarr;
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. CINEMATIC VIDEO REVIEW PLAYBACK PORTAL */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-black p-12 rounded-2xl border border-white/5">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">CINEMATIC DIALOGS</span>
          <h3 className="text-2xl md:text-3xl font-display font-semibold uppercase text-white">Live Client Debriefs</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Click play on the cinema node to see Marcus Vance, Co-Founder at MetaSense Tech, explain his experience transitioning their neural interface software with Sterling Agency's cyan boundaries guidelines.
          </p>
          <div className="p-4 rounded-lg bg-secondary-bg border border-white/5 flex gap-3 text-xs text-gray-300">
            <CheckCircle className="w-5 h-5 text-neon-orange shrink-0" />
            <span>Fully authentic video sessions recorded at our creative strategy headquarters in London.</span>
          </div>
        </div>

        <div className="lg:col-span-7 relative">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-neutral-900 group">
            {playingVideo ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-black/95 p-6 text-center space-y-4">
                <span className="font-mono text-xs text-neon-orange animate-pulse uppercase">CINEMA PLAYBACK CONNECTED</span>
                <p className="text-xs text-gray-400 max-w-sm">"The visual design and cyan perimeters designed by Devon Sterling completely shifted how venture capital funds value our Series A."</p>
                <button 
                  onClick={() => setPlayingVideo(false)}
                  className="px-4 py-2 border border-white/20 rounded text-[10px] font-mono hover:bg-white/10 text-white cursor-pointer"
                >
                  PAUSE STREAM
                </button>
              </div>
            ) : (
              <>
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" alt="Video review placeholder" className="w-full h-full object-cover grayscale brightness-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setPlayingVideo(true)}
                    className="w-16 h-16 rounded-full bg-neon-orange border-none text-black flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(255,122,0,0.4)] group-hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-black" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 5. CLIENT PORTAL COMPANY LOGOS */}
      <section className="space-y-6">
        <div className="text-center text-xs font-mono text-gray-500 uppercase tracking-widest">SYNCED ENTERPRISE CO-LABS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Vortex Apparel Group", "Aether Botanics", "Chronos Switzerland", "MetaSense Labs"].map((brand, bIdx) => (
            <div key={bIdx} className="p-6 rounded-lg bg-secondary-bg/50 border border-white/5 flex items-center justify-center font-display font-medium text-white tracking-widest uppercase text-xs">
              {brand}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
