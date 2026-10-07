import React from 'react';
import { Sparkles, Search, MessageSquare, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenTracking,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0E0F12]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element in display font) */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-serif font-bold tracking-tight text-[#FAF9F5] hover:text-[#D4A373] transition-colors"
          >
            SolCraft<span className="text-[#D4A373]">.</span>Atelier
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-[#D4A373] tracking-widest uppercase pl-2 border-l border-white/15">
            Bespoke Cobbler
          </span>
        </div>

        {/* Zone 2: Clean 4-6 Nav Links (Single line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onNavigate('diagnosa-anatomi')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Diagnosa Anatomi
          </button>
          <button
            onClick={() => onNavigate('bahan-premium')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Bahan Premium
          </button>
          <button
            onClick={() => onNavigate('sebelum-sesudah')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Hasil Restorasi
          </button>
          <button
            onClick={() => onNavigate('antar-jemput')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            Antar-Jemput Aman
          </button>
          <button
            onClick={() => onNavigate('notifikasi-wa')}
            className="hover:text-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Pelacakan WA
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTracking}
            className="px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Lacak Order</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-[#0E0F12] bg-[#D4A373] hover:bg-[#E7B788] active:scale-[0.98] rounded-lg transition-all shadow-md shadow-amber-950/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pesan Servis</span>
          </button>
        </div>
      </div>
    </header>
  );
};
