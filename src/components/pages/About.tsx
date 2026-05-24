import { motion } from "motion/react";
import { useData } from "../../context/DataContext";
import { Calendar, Award, Compass, HardDrive, Cpu, Check, Download } from "lucide-react";
import { useState } from "react";

export default function About() {
  const { settings, team } = useData();
  const [downloading, setDownloading] = useState(false);

  // Experience timeline data
  const timeline = [
    { year: "2023 - Present", title: "Executive Creative Director", agency: "Sterling Agency", text: "Directing strategic rebrands for tier-1 luxury spirits, clean fintechs, and award-winning architecture ensembles." },
    { year: "2020 - 2023", title: "Principal Brand Designer", agency: "Milan Luxury Labs", text: "Managed packaging mockups and graphic campaigns for high-fashion outerwear brands in Italy." },
    { year: "2018 - 2020", title: "Senior Graphic Designer", agency: "Studio Nord", text: "Crafted meticulous Swiss-style grid visual posters, and books." },
    { year: "2015 - 2018", title: "Visual Designer", agency: "Alpha Media Geneva", text: "Asymmetrical dieline creation, heavy card typography stamping." }
  ];

  const handleDownloadCV = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Simulate real file download
      const link = document.createElement("a");
      link.href = "#";
      alert("Design-Curriculum-Vitae-2026.pdf has been prepared and downloaded successfully in high-fidelity layout.");
    }, 1500);
  };

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-28 relative">
      
      {/* 1. HEADER SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-white/5 pb-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs text-neon-blue font-mono uppercase tracking-widest">
            <Compass className="w-3 h-3 text-neon-blue" />
            OUR MANIFESTO
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
            We Craft Distinct <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-gold">Aesthetic Legacies</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            {settings.aboutText}
          </p>
          <div className="pt-4">
            <button
              onClick={handleDownloadCV}
              disabled={downloading}
              className="px-6 py-3 rounded-lg bg-white hover:bg-neon-blue text-black font-semibold flex items-center gap-2 transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              {downloading ? (
                <>Preparing Assets...</>
              ) : (
                <>
                  Download Design CV <Download className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative group bg-neutral-900">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
              alt="Devon Portrait" 
              className="w-full h-full object-cover grayscale brightness-90 transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
              <span className="block font-display font-medium text-white">{settings.personalStoryName}</span>
              <span className="block font-mono text-[10px] text-neon-gold uppercase">{settings.personalStoryTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERSONAL STORY & PHILOSOPHY */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="p-8 md:p-12 rounded-2xl bg-secondary-bg border border-white/5 space-y-6">
          <h2 className="text-2xl font-display font-semibold text-white uppercase tracking-tight text-neon-orange">Our Creative Story</h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            {settings.personalStoryContent}
          </p>
        </div>

        <div className="p-8 md:p-12 rounded-2xl bg-secondary-bg border border-white/5 space-y-6">
          <h2 className="text-2xl font-display font-semibold text-white uppercase tracking-tight text-neon-gold">Creative Philosophy</h2>
          <p className="text-gray-400 leading-relaxed text-sm">
            {settings.creativePhilosophy}
          </p>
        </div>
      </section>

      {/* 3. EXPERIENCE TIMELINE */}
      <section className="space-y-12">
        <div className="text-left space-y-4">
          <div className="text-xs font-mono text-neon-blue uppercase tracking-widest">VISUAL HISTORY</div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Our Milestone Curations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((item, idx) => (
            <div key={idx} className="p-8 rounded-xl bg-secondary-bg border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all group">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neon-blue">
                  <Calendar className="w-3 h-3 text-neon-blue" />
                  {item.year}
                </span>
                <h3 className="text-lg font-display font-semibold text-white group-hover:text-neon-blue transition-colors uppercase pt-2">
                  {item.title}
                </h3>
                <span className="block text-xs font-mono text-gray-500 uppercase">{item.agency}</span>
                <p className="text-xs text-gray-405 leading-relaxed pt-2">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TEAM MEMBERS */}
      <section className="space-y-12 bg-secondary-bg/25 p-12 rounded-2xl border border-white/5">
        <div className="text-left space-y-4">
          <div className="text-xs font-mono text-neon-orange uppercase tracking-widest">THE CORE DESIGN ENSEMBLE</div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">Meet the Elite Minds</h2>
          <p className="text-gray-405 max-w-xl text-sm">
            We operate as a high-velocity collective of graphic artists, spatial engineers, and packaging masterminds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {team.map((member) => (
            <div key={member.id} className="p-6 rounded-xl bg-black/60 border border-white/5 hover:border-white/15 transition-all group flex flex-col justify-between">
              <div>
                <div className="aspect-square rounded-lg overflow-hidden mb-6 bg-neutral-900">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 duration-500 transition-transform" />
                </div>
                <h3 className="text-xl font-display font-medium text-white group-hover:text-neon-orange transition-colors">{member.name}</h3>
                <span className="text-xs font-mono text-gray-500 uppercase block mb-4">{member.role}</span>
                <p className="text-xs text-gray-400 mb-6 leading-relaxed bg-white/5 p-3 rounded">{member.bio}</p>
              </div>

              {/* Skills breakdown */}
              <div className="space-y-3 mt-auto">
                {member.skills?.map((sk, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-gray-400">
                      <span>{sk.name}</span>
                      <span>{sk.percentage}%</span>
                    </div>
                    <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-neon-orange" style={{ width: `${sk.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AWARDS & SPEC CERTIFICATIONS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="text-xs font-mono text-neon-gold uppercase tracking-widest">INDUSTRY EXCELLENCE</div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">Awards & Accolades</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our visual and physical designs undergo intensive external review cycles, resulting in international design awards and showcase features in global luxury design publications.
          </p>
          <div className="p-6 rounded-xl bg-secondary-bg border-l-2 border-neon-gold border-y border-r border-white/5 space-y-2">
            <span className="text-xs font-mono text-neon-gold uppercase block">TOP STUDIO MARK</span>
            <p className="text-xs text-amber-100 italic">"Ranked #3 Boutique Design Studio at the Paris Visual Design forum 2025."</p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {[
            { title: "Boutique Studio of the Year", source: "Paris Design Forum", year: "2025" },
            { title: "Best Brand Identity Concept", source: "Behance Curated", year: "2025" },
            { title: "Elite Packaging Glass Award", source: "Aether spirits bottle curvature, Luxury Glass Expo", year: "2024" },
            { title: "Swiss Symmetrical Swiss Grid Medal", source: "Awwwards Executive Choice", year: "2023" }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-6 rounded-xl bg-secondary-bg/50 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <Award className="w-5 h-5 text-neon-gold shrink-0" />
                <div>
                  <span className="block font-display font-medium text-white uppercase text-sm">{item.title}</span>
                  <span className="block font-mono text-[10px] text-gray-500 uppercase">{item.source}</span>
                </div>
              </div>
              <span className="font-mono text-xs text-neon-blue">{item.year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
