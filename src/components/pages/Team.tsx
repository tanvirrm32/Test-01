import { useData } from "../../context/DataContext";
import { Star, Mail, Award, Compass, Heart, Activity } from "lucide-react";

export default function Team() {
  const { team, careers } = useData();

  return (
    <div className="py-32 px-4 md:px-8 max-w-7xl mx-auto space-y-28 relative">
      
      {/* 1. HEADER HERO */}
      <section className="space-y-6 max-w-4xl text-left border-b border-white/5 pb-16">
        <div className="text-xs font-mono text-neon-orange uppercase tracking-widest">TEAM CULTURE</div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tight leading-none leading-tight">
          The Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-gold">Ensemble & Careers</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          Meet our world-class, multi-disciplinary collective of visual artisans, typographic purists, spatial modelers, and backend design system engineers.
        </p>
      </section>

      {/* 2. TEAM MEMBERS GRID */}
      <section className="space-y-12">
        <div className="text-left space-y-4">
          <span className="text-xs font-mono text-neon-blue uppercase tracking-widest block">CORE MASTERMINDS</span>
          <h2 className="text-3xl font-display font-bold text-white uppercase">The Brain Trust</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="p-8 rounded-xl bg-secondary-bg border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all group">
              <div>
                <div className="aspect-square rounded-lg overflow-hidden bg-neutral-900 mb-6">
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 duration-500 transition-transform" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white uppercase group-hover:text-neon-orange transition-all">{member.name}</h3>
                <span className="block font-mono text-xs text-gray-500 uppercase mb-4">{member.role}</span>
                <p className="text-xs text-gray-400 mb-8 leading-relaxed bg-black/40 p-4 rounded border border-white/5">
                  {member.bio}
                </p>
              </div>

              {/* Skill matrix indicator */}
              <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest">TACTICAL MATRIX</span>
                {member.skills?.map((sk, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-gray-405">
                      <span>{sk.name}</span>
                      <span className="font-bold">{sk.percentage}%</span>
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

      {/* 3. CULTURE SHOWCASE */}
      <section className="p-12 rounded-2xl bg-secondary-bg border border-white/5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-mono text-neon-gold uppercase tracking-widest font-bold">INSIDE STERLING LABS</span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white uppercase">Our Agency Culture Manifest</h3>
          
          <ul className="space-y-4 text-xs text-gray-405">
            <li className="flex items-start gap-3 bg-black/35 p-4 rounded border border-white/5">
              <Compass className="w-5 h-5 text-neon-gold shrink-0" />
              <div>
                <span className="block font-display font-semibold text-white uppercase">Swiss Grid Rigidity</span>
                <span className="block text-gray-400">All elements must satisfy asymmetrical vertical boundaries. 0-pixel approximations are forbidden.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-black/35 p-4 rounded border border-white/5">
              <Award className="w-5 h-5 text-neon-blue shrink-0" />
              <div>
                <span className="block font-display font-semibold text-white uppercase">Tactile unboxings first</span>
                <span className="block text-gray-400">We prototyping boxes physically using thick raw cardboards to sense kinetic weights before mapping coordinates in illustrator sheets.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
          <img src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80" alt="Culture design" className="w-full h-full object-cover grayscale" />
        </div>
      </section>

      {/* 4. CAREER COLLAR & LISTINGS */}
      <section id="careers-listings" className="space-y-12">
        <div className="text-left space-y-4">
          <span className="text-xs font-mono text-neon-orange uppercase tracking-widest block">JOIN THE STUDIO</span>
          <h2 className="text-3xl font-display font-bold text-white uppercase">We Are Hiring Designers</h2>
          <p className="text-xs text-gray-400">Review open selective rosters below. To apply, write your credentials directly through our contacts page or submit an inquiry.</p>
        </div>

        <div className="space-y-6">
          {careers.map((cr) => (
            <div 
              key={cr.id} 
              className="p-8 rounded-xl bg-secondary-bg/50 border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2 text-left">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neon-blue">
                    {cr.type}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{cr.department} &bull; {cr.location}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white uppercase">{cr.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed max-w-xl">{cr.description}</p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <span className="text-xs font-mono text-neon-orange font-bold uppercase">{cr.salary}</span>
                <button 
                  onClick={() => alert(`To apply for ${cr.title}, please write about your portfolios via our contact page form.`)} 
                  className="px-5 py-2.5 rounded bg-white hover:bg-neon-orange hover:text-black text-black font-semibold text-xs uppercase cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
