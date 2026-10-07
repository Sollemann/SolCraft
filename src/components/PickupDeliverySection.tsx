import React from 'react';
import { Truck, ShieldCheck, Box, Lock, MessageCircle, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

interface PickupDeliverySectionProps {
  onOpenBooking: () => void;
  onOpenTracking: () => void;
}

export const PickupDeliverySection: React.FC<PickupDeliverySectionProps> = ({
  onOpenBooking,
  onOpenTracking,
}) => {
  return (
    <section id="antar-jemput" className="py-20 bg-[#121318] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#D4A373] mb-2">
            <span>Protokol Logistik & Keamanan Unit</span>
            <span aria-hidden="true">·</span>
            <span>Garansi Keselamatan 100%</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F5] tracking-tight">
            Pengiriman Antar-Jemput yang Aman & Higienis
          </h2>
          <p className="mt-3 text-stone-300 text-base leading-relaxed">
            Sepatu Anda adalah investasi berharga. Kami merancang sistem penjemputan khusus yang memastikan sepatu terlindung dari risiko basah, tertindih, atau hilang sejak diserahkan hingga kembali ke tangan Anda.
          </p>
        </div>

        {/* 3 Pillars of Safety Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-[#16181F] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#D4A373] border border-amber-500/20 flex items-center justify-center">
              <Box className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono text-stone-400 uppercase">Protokol Wadah</div>
              <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                SolCraft Safety Hardbox Anti-Air
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Armada penjemput dilengkapi boks komposit kaku kedap air dengan bantalan busa moulded anti-benturan. Sepatu tidak akan ditumpuk secara sembarangan dalam kantong plastik tipis.
            </p>

            <ul className="space-y-1.5 text-xs text-stone-400 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kedap air hujan 100%</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Penyerap kelembaban silica aktif</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#16181F] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono text-stone-400 uppercase">Verifikasi Keamanan</div>
              <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                Segel Tamper-Evident & Barcode
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Setiap pasang sepatu disegel di hadapan pelanggan dengan stiker segel ber-nomor seri unik yang hanya boleh dirusak oleh Intake Inspector saat tiba di meja kerja atelier.
            </p>

            <ul className="space-y-1.5 text-xs text-stone-400 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Nomor seri segel dicatat di invoice WA</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Asuransi proteksi s/d Rp 15.000.000</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#16181F] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono text-stone-400 uppercase">Transparansi Nyata</div>
              <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                Update Otomatis ke WhatsApp Anda
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Anda tidak perlu cemas menebak keberadaan sepatu. Setiap pergerakan kurir, foto makro kondisi awal, video penjahitan cobbler, hingga sertifikat QC dikirim langsung ke WhatsApp Anda.
            </p>

            <ul className="space-y-1.5 text-xs text-stone-400 font-mono pt-2 border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Foto HD saat tiba di atelier</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Resi dan live map kurir pengantaran</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Banner for Pickup Booking */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1A1C24] via-[#1E222C] to-[#16181F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-emerald-400">
              ● PROMO: GRATIS ONGKOS ANTAR-JEMPUT UNTUK ORDER DI ATAS RP 500.000
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Siap Mengembalikan Sepatu Kesayangan Anda ke Kondisi Terbaik?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Cukup pilih waktu dan alamat penjemputan. Kurir kami akan datang membawa safety box tanpa Anda perlu repot keluar rumah.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 text-xs font-bold text-[#0E0F12] bg-[#D4A373] hover:bg-[#E7B788] rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Jadwalkan Penjemputan</span>
            </button>

            <button
              onClick={onOpenTracking}
              className="px-5 py-3.5 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors cursor-pointer"
            >
              <span>Lacak Sepatu Saya</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
