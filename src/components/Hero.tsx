import React from 'react';
import { ArrowRight, ShieldCheck, Truck, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartDiagnostic: () => void;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartDiagnostic,
  onOpenBooking,
  onOpenTracking,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-white/5 bg-radial from-[#1A1C23] via-[#0E0F12] to-[#0E0F12]">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed kicker with typographic dot separator (Zero-Pill compliant) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#D4A373]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Workshop Terbuka
              </span>
              <span aria-hidden="true">·</span>
              <span>Atelier Servis Sepatu Premium</span>
              <span aria-hidden="true">·</span>
              <span>Master Cobbler Craftsmanship</span>
              <span aria-hidden="true">·</span>
              <span>Jakarta</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] font-serif font-bold text-[#FDFCF7] tracking-tight text-balance">
              Restorasi Presisi Setiap Bagian Sepatu dengan Standar Master Cobbler.
            </h1>

            <p className="text-base sm:text-lg text-stone-300 leading-relaxed max-w-2xl font-normal">
              Dari sol aus, midsole amblas, kulit pecah hingga jahitan welt lepas. Kami mendiagnosa kerusakan secara anatomis mikro dan memperbaiki sepatu kesayangan Anda menggunakan bahan orisinil Vibram®, Dainite®, lem industri Jerman Renia®, dan nutrisi kulit Prancis Saphir Médaille d’Or®.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartDiagnostic}
                className="px-6 py-3.5 text-sm font-semibold text-[#0E0F12] bg-[#D4A373] hover:bg-[#E7B788] active:scale-[0.98] rounded-xl transition-all shadow-lg shadow-amber-950/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Diagnosa Kerusakan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-medium text-stone-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span>Pesan Servis Langsung</span>
              </button>
            </div>

            {/* 4 Pillars Trust Grid (Unboxed, clean typographic structure) */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Diagnosa Mikro</span>
                </div>
                <div className="text-xs text-stone-400">10 Bagian Anatomi Lengkap</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Bahan Premium</span>
                </div>
                <div className="text-xs text-stone-400">Garansi Rekat s/d 18 Bulan</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Antar-Jemput Aman</span>
                </div>
                <div className="text-xs text-stone-400">Safety Hardbox & Anti-Air</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Update WA Live</span>
                </div>
                <div className="text-xs text-stone-400">Notifikasi Foto Tiap Tahap</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Craft Atelier Card & Quick Interactive Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 bg-[#16181F] border border-white/10 shadow-2xl overflow-hidden">
              {/* Header of Atelier Showcase */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">Spesialis Restorasi</div>
                  <h3 className="text-base font-serif font-semibold text-stone-100">SolCraft Master Workshop</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400">● Menerima Unit</span>
                  <div className="text-[11px] text-stone-400">Antar Jemput Se-Indonesia</div>
                </div>
              </div>

              {/* Shoe Graphic Silhouette Illustration */}
              <div className="py-6 px-2 flex flex-col items-center justify-center relative">
                <div className="w-full max-w-sm aspect-[16/10] rounded-xl bg-gradient-to-b from-[#20232B] to-[#121317] border border-white/5 p-4 flex flex-col items-center justify-center relative group">
                  {/* Stylized SVG Shoe Anatomy Hero Blueprint */}
                  <svg
                    viewBox="0 0 400 240"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-xl"
                  >
                    {/* Upper shoe silhouette */}
                    <path
                      d="M60 145 C60 110, 85 85, 130 90 C160 92, 190 75, 230 45 C255 25, 290 28, 305 65 C315 90, 320 125, 335 145 Z"
                      fill="#2C2F3A"
                      stroke="#484E5E"
                      strokeWidth="2"
                    />
                    {/* Leather Collar & Tongue */}
                    <path
                      d="M245 40 L285 45 C295 70, 305 90, 312 120"
                      stroke="#D4A373"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                    {/* Eyelets and Laces */}
                    <circle cx="210" cy="80" r="3" fill="#D4A373" />
                    <circle cx="230" cy="65" r="3" fill="#D4A373" />
                    <circle cx="250" cy="52" r="3" fill="#D4A373" />
                    <path d="M205 82 L225 67 L245 54" stroke="#D4A373" strokeWidth="1.5" />
                    
                    {/* Midsole Layer */}
                    <path
                      d="M50 145 L345 145 C350 160, 345 170, 335 175 L55 175 C45 168, 45 155, 50 145 Z"
                      fill="#1E2028"
                      stroke="#8D92A0"
                      strokeWidth="2"
                    />
                    
                    {/* Outsole Tread / Vibram Lug Profile */}
                    <path
                      d="M48 175 L338 175 L342 195 L320 195 L315 188 L305 188 L300 195 L280 195 L275 188 L265 188 L260 195 L240 195 L235 188 L225 188 L220 195 L200 195 L195 188 L185 188 L180 195 L160 195 L155 188 L145 188 L140 195 L120 195 L115 188 L105 188 L100 195 L80 195 L75 188 L65 188 L60 195 L45 195 Z"
                      fill="#D4A373"
                      stroke="#E7B788"
                      strokeWidth="2"
                    />
                    
                    {/* Goodyear Welt Stitching Line */}
                    <path
                      d="M52 150 L342 150"
                      stroke="#FAF9F5"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />

                    {/* Interactive Anatomy Markers */}
                    <g className="cursor-pointer">
                      <circle cx="100" cy="115" r="7" fill="#D4A373" fillOpacity="0.3" />
                      <circle cx="100" cy="115" r="3" fill="#D4A373" />
                    </g>
                    <g className="cursor-pointer">
                      <circle cx="200" cy="188" r="7" fill="#D4A373" fillOpacity="0.3" />
                      <circle cx="200" cy="188" r="3" fill="#D4A373" />
                    </g>
                    <g className="cursor-pointer">
                      <circle cx="310" cy="110" r="7" fill="#D4A373" fillOpacity="0.3" />
                      <circle cx="310" cy="110" r="3" fill="#D4A373" />
                    </g>
                  </svg>

                  {/* Overlay Tags */}
                  <div className="absolute bottom-2 left-3 text-[10px] font-mono text-stone-400">
                    Konstruksi: Goodyear Welted & Sneaker Cupsole
                  </div>
                  <div className="absolute top-2 right-3 text-[10px] font-mono text-[#D4A373]">
                    100% Genuine Vibram® Outsole
                  </div>
                </div>
              </div>

              {/* Live Status Card: Red Wing Boot Repair Example */}
              <div className="bg-[#101115] rounded-xl p-3.5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-400">Kasus Restorasi Aktif</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    QC Lolos 100%
                  </span>
                </div>
                <div className="text-sm font-medium text-stone-200">
                  Red Wing Iron Ranger 8111 — Full Re-sole Vibram Morflex & Nourish
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-white/5 font-mono">
                  <span>Estimasi Ketahanan: +4 Tahun</span>
                  <span className="text-[#D4A373]">Garansi 12 Bulan</span>
                </div>
              </div>

              {/* Button to explore tracking */}
              <button
                onClick={onOpenTracking}
                className="w-full mt-4 py-2.5 text-xs font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors text-center cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Lihat Simulasi Pelacakan WhatsApp Real-time</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
