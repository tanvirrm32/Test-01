import { Compass, ArrowRight } from "lucide-react";

export default function NotFound({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 pt-24 text-center space-y-6 relative">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-neon-orange/5 blur-3xl pointer-events-none"></div>

      <span className="text-[10px] font-mono text-neon-orange uppercase tracking-[0.3em] font-bold">GRID VULNERABILITY DETECTED</span>
      <h1 className="text-7xl sm:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-gold tracking-tighter">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-display text-white uppercase tracking-tight">
        Spatial Coordinate Out of Bounds
      </h2>
      <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-sans pb-4">
        The portfolio spread, journal node, or service block you are targeting has been archived, relocated, or deleted by admin guidelines.
      </p>

      <button
        onClick={() => onNavigate("home")}
        className="px-6 py-3 rounded-lg bg-white hover:bg-neon-orange hover:text-black text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_5px_15px_rgba(255,255,255,0.1)]"
      >
        BACK TO MAIN GROUND <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
