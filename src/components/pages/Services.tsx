import { useState } from "react";
import { useData } from "../../context/DataContext";
import { Check, Shield, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Zap, Info, Clock, RefreshCw, X } from "lucide-react";
import { Service } from "../../types";

export default function Services() {
  const { services } = useData();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // High-fidelity general agency FAQs
  const faqAccordion = [
    { q: "What is your revision policy?", a: "We provide 3 rounds of comprehensive, structural revisions with each standard project scope. Revisions represent refining the chosen visual concept rather than drafting entirely new directions from scratch." },
    { q: "How are files delivered?", a: "All vectors are handed off in standard industry extension packages (Adobe AI, high-poly SVGs, PDF prints, and Figmas). We also provide a custom Brand Style Handbook outlining exact margins and ratios." },
    { q: "Do you deliver physical paper materials?", a: "We design, map layers, and prepare files, then coordinate directly with premium international paper companies and printing houses (such as Fedrigoni in Italy) to oversee the actual physical embossing or hot foil press operations." },
    { q: "What is the typical delivery timeframe?", a: "A standard visual rebrand takes 4 - 6 weeks from receipt of deposit. UI/UX layouts range from 3 - 5 weeks. Consultation blueprints are delivered inside 10 business days." },
    { q: "What are your payment terms?", a: "Our default workflow requires a 50% upfront deposit to secure scheduling, and the remaining 50% only after final milestone approval and file handoffs." }
  ];

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-28 relative">
      
      {/* 1. HEADER HERO */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-neon-orange font-mono uppercase tracking-widest animate-pulse">
          <Zap className="w-3 h-3 text-neon-orange" />
          SERVICES CATALOG
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Visual Verticals <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-gold">Commanding Premium Pricing</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          Explore our selective design vectors. From tactile materials to clean, glowing dark mode interfaces, we prioritize sensory impact, Swiss grid alignment, and ultimate aesthetic luxury.
        </p>
      </section>

      {/* 2. HOVER CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((sv) => (
          <div 
            key={sv.id} 
            className="p-10 rounded-2xl bg-secondary-bg border border-white/5 hover:border-neon-orange/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-orange/2 rounded-full blur-2xl group-hover:bg-neon-orange/10 transition-colors"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center">
                <span className="p-3 bg-white/5 group-hover:bg-neon-orange group-hover:text-black transition-all rounded-lg text-neon-orange">
                  <Shield className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono text-gray-500 font-bold uppercase">PREMIUM SERVICE</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white group-hover:text-neon-orange transition-colors uppercase">
                {sv.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {sv.description}
              </p>

              {/* Highlights snippet */}
              <ul className="space-y-2 pt-4">
                {sv.features?.slice(0, 3).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-450">
                    <Check className="w-3.5 h-3.5 text-neon-orange shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/5 mt-8 flex justify-between items-center mt-auto relative z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">MINIMUM BUDGET</span>
                <span className="text-xl font-display font-bold text-white tracking-tight">{sv.price}</span>
              </div>
              <button
                onClick={() => setSelectedService(sv)}
                className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-neon-orange hover:text-black text-xs font-mono font-bold tracking-wider text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                EXPLORE DETAILS <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 3. CORE PERFORMANCE METRICS / WORKFLOW */}
      <section className="p-12 rounded-2xl bg-secondary-bg border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Clock, title: "45-Min Discovery", text: "Swift alignment call to dissect your exact positioning targets." },
          { icon: RefreshCw, title: "3 Iteration Rounds", text: "Meticulous revisions mapping layer updates on the chosen concept." },
          { icon: Shield, title: "Secure Vector Delivery", text: "Packaged master logs, style books, and developers coordinate rules." }
        ].map((item, idx) => (
          <div key={idx} className="space-y-4">
            <span className="p-3 bg-white/5 rounded-lg inline-block text-neon-blue">
              <item.icon className="w-5 h-5" />
            </span>
            <h4 className="text-lg font-display font-semibold text-white uppercase">{item.title}</h4>
            <p className="text-xs text-gray-450 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* 4. FAQ ACCORDION */}
      <section className="space-y-12">
        <div className="text-left space-y-4">
          <div className="text-xs font-mono text-neon-gold uppercase tracking-widest">CREATIVE QA</div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Frequently Asked Queries</h2>
        </div>

        <div className="max-w-4xl space-y-4">
          {faqAccordion.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="rounded-xl bg-secondary-bg/55 border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center group cursor-pointer"
                >
                  <span className="font-display font-medium text-white group-hover:text-neon-gold transition-colors text-sm uppercase">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-neon-gold" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-6 pt-0 border-t border-white/5 text-xs text-gray-450 leading-relaxed font-sans">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SERVICE DETAIL POPUP MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-secondary-bg border border-white/10 rounded-2xl max-w-2xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">DETAILED SPEC SHEET</span>
            <h3 className="text-3xl font-display font-bold text-white uppercase border-b border-white/5 pb-4 mr-8">
              {selectedService.title}
            </h3>

            <div className="space-y-4 text-xs text-gray-300 leading-relaxed font-sans">
              <p>{selectedService.description}</p>
              
              <div className="space-y-2 pt-4">
                <span className="block font-mono font-bold text-white uppercase text-neon-gold">WHAT IS INCLUDED:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features?.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-black/35 p-3 rounded border border-white/5">
                      <Check className="w-3.5 h-3.5 text-neon-orange" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedService.faq && selectedService.faq.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <span className="block font-mono font-bold text-white uppercase text-neon-blue">SPECIFIC FAQS:</span>
                  {selectedService.faq.map((fq, i) => (
                    <div key={i} className="space-y-1">
                      <span className="block font-display font-medium text-white text-xs">{fq.question}</span>
                      <p className="text-gray-400 text-[11px] font-sans">{fq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-left">
                <span className="block text-[10px] font-mono text-gray-500 uppercase">TIER PRICE</span>
                <span className="text-xl font-display font-bold text-white">{selectedService.price}</span>
              </div>
              <button 
                onClick={() => setSelectedService(null)} 
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-neon-orange hover:bg-white text-black font-semibold transition-all cursor-pointer"
              >
                Close Spec Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
