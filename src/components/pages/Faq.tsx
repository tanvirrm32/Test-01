import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Hammer, DollarSign, RefreshCw, FileText } from "lucide-react";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const topics = [
    {
      category: "PRICING & COMMISSON",
      icon: DollarSign,
      items: [
        { q: "What is your default client onboarding budget?", a: "Our standard creative branding directives commence at $8,500, which guarantees bespoke typographic blueprints, spatial assets, and material handbook outlines. Shorter visual consultations start at $2,500." },
        { q: "Do you offer modular pricing structures?", a: "Yes. While we prefer compiling a unified brand signature, clients can commission selective verticals, e.g., only Glass packaging structural carving or only SaaS glowing layout perimeters." }
      ]
    },
    {
      category: "REVISIONS & COLLABORATION",
      icon: RefreshCw,
      items: [
        { q: "How do revisions operate?", a: "We provide 3 rounds of comprehensive, mathematical revisions on the chosen spatial draft directions. We refine grid margins, font curves, and foil layers until they present flawlessly under microscopic review." },
        { q: "On what platform do we collaborate?", a: "We host unified Figma teams containing structural component designs, alongside shared digital bins for tactile rendering papers and unboxing video clips." }
      ]
    },
    {
      category: "WORKFLOW & SPECS",
      icon: Hammer,
      items: [
        { q: "What is your typical project cycle?", a: "Visual identity guidelines take 4 - 6 weeks from intake call. High-contrast UI and design systems take 3 - 5 weeks. Package dielines span 4 weeks, excluding printing." }
      ]
    },
    {
      category: "DELIVERABLES FORMAT",
      icon: FileText,
      items: [
        { q: "Which vector extension files do we receive?", a: "You receive flat vector files (Adobe AI, EPS, SVG), interactive Figma design libraries, printable debossing/foil press templates (layered PDFs), and pristine 3D rotative renders (Webm/Lottie)." }
      ]
    }
  ];

  return (
    <div className="py-32 px-4 md:px-8 max-w-4xl mx-auto space-y-20 relative">
      
      {/* 1. HEADER HERO */}
      <section className="space-y-6 text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-gold uppercase tracking-widest text-neon-gold">SYSTEM WORKFLOW</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-neon-orange">Guidelines & QA</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Comprehensive disclosures regarding pricing parameters, handoff formats, layout guidelines, and structural unboxing revisions.
        </p>
      </section>

      {/* 2. TOPICS AND ACCORDIONS */}
      <div className="space-y-12 text-left">
        {topics.map((topic, tIdx) => (
          <div key={tIdx} className="space-y-6">
            <div className="flex items-center gap-2.5 text-xs font-mono text-neon-blue uppercase">
              <topic.icon className="w-4 h-4 text-neon-blue" />
              <span>{topic.category}</span>
            </div>
            
            <div className="space-y-4">
              {topic.items.map((item, iIdx) => {
                const uniqueIdx = tIdx * 10 + iIdx;
                const isOpen = openIndex === uniqueIdx;
                return (
                  <div key={iIdx} className="rounded-xl bg-secondary-bg border border-white/5 overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : uniqueIdx)}
                      className="w-full p-6 text-left flex justify-between items-center group cursor-pointer"
                    >
                      <span className="font-display font-medium text-white group-hover:text-neon-gold transition-colors text-xs sm:text-sm uppercase tracking-tight">
                        {item.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neon-gold" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-6 pt-0 border-t border-white/5 text-xs text-gray-400 leading-relaxed font-sans">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
