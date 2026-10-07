import React, { useState } from 'react';
import { MessageCircle, CheckCheck, Camera, ShieldCheck, Truck, Bell, ArrowRight } from 'lucide-react';

interface WhatsAppShowcaseSectionProps {
  onOpenTracking: () => void;
  onOpenBooking: () => void;
}

export const WhatsAppShowcaseSection: React.FC<WhatsAppShowcaseSectionProps> = ({
  onOpenTracking,
  onOpenBooking,
}) => {
  const [activeStage, setActiveStage] = useState<number>(3);

  const STAGES = [
    {
      step: 1,
      title: '1. Verifikasi & Kurir Ditugaskan',
      time: '09:20 WIB',
      bubble:
        '✨ Pesanan #SC-88341 dikonfirmasi. Kurir khusus SolCraft (Budi) membawa Safety Hardbox menuju lokasi Anda.',
      tag: 'Penjemputan Aman',
    },
    {
      step: 2,
      title: '2. Tiba & Foto Makro Kerusakan',
      time: '13:00 WIB',
      bubble:
        '🔬 Unit Red Wing Iron Ranger tiba di meja atelier. Foto makro abrasi sol & serat kulit telah diunggah ke log kerja.',
      tag: 'Inspeksi Mikroskopis',
      hasPhoto: true,
      photoTitle: 'Foto Makro: Kondisi Aus Sol Nitrile Cork',
    },
    {
      step: 3,
      title: '3. Pengerjaan Master Cobbler',
      time: '16:30 WIB',
      bubble:
        '⚙️ Pelepasan sol lama selesai. Sedang proses 2-needle hand stitching dengan benang Barbour Irish Waxed Linen & lem Renia Jerman.',
      tag: 'Proses Pengerjaan',
      hasVideo: true,
      videoTitle: 'Cuplikan Video Pengerjaan Goodyear Welted',
    },
    {
      step: 4,
      title: '4. Lolos Uji QC & Sertifikat Fisik',
      time: 'Hari ke-3, 11:00 WIB',
      bubble:
        '✅ Uji fleksibilitas 30-titik LOLOS 100%. Sepatu diberi nutrisi Saphir Médaille d’Or 1925 dan dimasukkan ke dustbag pelindung.',
      tag: 'Quality Control',
      hasQC: true,
    },
    {
      step: 5,
      title: '5. Pengantaran Balik ke Rumah',
      time: 'Hari ke-3, 14:00 WIB',
      bubble:
        '🛵 Sepatu dalam perjalanan pulang ke alamat Anda. Klik link resi untuk memantau kurir secara real-time di peta.',
      tag: 'Pengantaran Kembali',
    },
  ];

  return (
    <section id="notifikasi-wa" className="py-20 bg-[#0E0F12] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Explanatory Copy & Stage Selector Buttons (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Notifikasi Real-Time Tanpa Cemas</span>
              <span aria-hidden="true">·</span>
              <span>WhatsApp Direct</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F5] tracking-tight">
              Pantau Setiap Tahap Perbaikan Langsung di WhatsApp Anda
            </h2>

            <p className="text-stone-300 text-base leading-relaxed font-normal">
              Tidak ada lagi rasa khawatir mengenai apa yang terjadi pada sepatu mewah kesayangan Anda. Sistem kami secara otomatis mengirimkan dokumentasi foto kondisi awal, video pengerjaan cobbler, hingga sertifikat kelulusan uji mutu langsung ke nomor WhatsApp pribadi Anda.
            </p>

            {/* Stage Selector Buttons */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-stone-400 uppercase">
                Klik untuk Melihat Contoh Pesan Tiap Tahap:
              </div>

              {STAGES.map((st) => (
                <button
                  key={st.step}
                  onClick={() => setActiveStage(st.step)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    activeStage === st.step
                      ? 'bg-[#1A242B] border-emerald-500/50 shadow-md text-white'
                      : 'bg-[#14161C] border-white/5 hover:border-white/10 text-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center ${
                        activeStage === st.step
                          ? 'bg-emerald-500 text-stone-950 font-bold'
                          : 'bg-white/5 text-stone-400'
                      }`}
                    >
                      {st.step}
                    </span>
                    <span className="text-xs font-medium">{st.title}</span>
                  </div>

                  <span className="text-[11px] font-mono text-emerald-400">{st.tag}</span>
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenTracking}
                className="px-5 py-3 text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Buka Simulator WhatsApp Lengkap</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="px-5 py-3 text-xs font-semibold text-[#0E0F12] bg-[#D4A373] hover:bg-[#E7B788] rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Pesan Servis Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Phone Frame with WhatsApp Interactive Live Message Mockup (6 cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] p-3 bg-[#1F232B] border-4 border-[#333845] shadow-2xl relative">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-[#111317] rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-10 h-1 bg-stone-700 rounded-full"></div>
              </div>

              {/* Screen Container */}
              <div className="rounded-[28px] overflow-hidden bg-[#0B141A] border border-white/10 flex flex-col h-[520px]">
                {/* WA Top Bar */}
                <div className="bg-[#202C33] px-3 py-2.5 flex items-center justify-between border-b border-[#2A3942]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1A382B] flex items-center justify-center font-serif text-xs font-bold text-[#D4A373]">
                      SC
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-xs font-bold text-white">
                        <span>SolCraft Atelier</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-black flex items-center justify-center text-[8px] font-bold">
                          ✓
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">online</div>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400 font-mono">#SC-88341</span>
                </div>

                {/* WA Chat Body */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[radial-gradient(#1A242B_1px,transparent_1px)] [background-size:14px_14px]">
                  {/* Encrypted Notice */}
                  <div className="text-center">
                    <span className="bg-[#182229] text-[#8696A0] text-[9px] px-2 py-0.5 rounded font-mono">
                      Notifikasi Otomatis Terverifikasi
                    </span>
                  </div>

                  {/* Render messages up to the active stage */}
                  {STAGES.filter((s) => s.step <= activeStage).map((msg) => (
                    <div key={msg.step} className="flex flex-col items-start animate-fade-in">
                      <div className="bg-[#202C33] text-[#E9EDEF] rounded-2xl rounded-tl-none p-3 text-xs max-w-[92%] border border-[#2A3942] shadow space-y-1.5">
                        {/* Media if any */}
                        {msg.hasPhoto && (
                          <div className="p-2 rounded-lg bg-[#111B21] border border-white/5 text-center">
                            <div className="aspect-[16/9] bg-gradient-to-tr from-[#161D22] to-[#253238] rounded flex flex-col items-center justify-center text-stone-300">
                              <Camera className="w-5 h-5 text-[#D4A373] mb-1" />
                              <span className="text-[10px] font-mono text-stone-300">
                                {msg.photoTitle}
                              </span>
                            </div>
                          </div>
                        )}

                        {msg.hasVideo && (
                          <div className="p-2 rounded-lg bg-[#111B21] border border-white/5 text-center">
                            <div className="aspect-[16/9] bg-[#161D22] rounded flex flex-col items-center justify-center text-stone-300">
                              <span className="w-8 h-8 rounded-full bg-[#D4A373] text-black flex items-center justify-center font-bold text-xs mb-1">
                                ▶
                              </span>
                              <span className="text-[10px] font-mono text-stone-300">
                                {msg.videoTitle}
                              </span>
                            </div>
                          </div>
                        )}

                        {msg.hasQC && (
                          <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                            <div className="text-[10px] text-emerald-300 font-mono">
                              Sertifikat Garansi 18 Bulan Aktif
                            </div>
                          </div>
                        )}

                        <p className="text-[11px] leading-relaxed text-stone-200">
                          {msg.bubble}
                        </p>

                        <div className="flex items-center justify-end gap-1 text-[9px] text-[#8696A0]">
                          <span>{msg.time}</span>
                          <CheckCheck className="w-3 h-3 text-sky-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WA Footer Mockup */}
                <div className="p-2 bg-[#202C33] border-t border-[#2A3942] flex items-center justify-between text-[11px] text-[#8696A0]">
                  <span className="truncate">Balas untuk berkonsultasi dengan Cobbler...</span>
                  <span className="text-emerald-400 font-mono text-[10px] shrink-0">Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
