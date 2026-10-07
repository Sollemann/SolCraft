import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenTracking: () => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenTracking,
  onOpenAdminLogin,
}) => {
  return (
    <footer className="bg-[#0B0C0E] border-t border-white/10 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Atelier Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold tracking-tight text-white">
                SolCraft<span className="text-[#D4A373]">.</span>Atelier
              </span>
              <span className="text-[10px] font-mono text-[#D4A373] tracking-widest uppercase pl-2 border-l border-white/15">
                Bespoke Cobbler
              </span>
            </div>

            <p className="text-stone-300 leading-relaxed max-w-sm text-xs">
              Atelier restorasi dan perbaikan sepatu premium di Jakarta. Kami memadukan teknik tradisional pengerjaan tangan master cobbler dengan material resmi berstandar internasional untuk memperpanjang usia sepatu berharga Anda.
            </p>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Garansi Resmi Tertulis 6 – 18 Bulan</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Komitmen Restorasi Sirkular Berkelanjutan</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigasi Layanan */}
          <div className="space-y-3">
            <div className="text-stone-200 font-serif font-semibold text-sm">
              Diagnosa & Layanan
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('diagnosa-anatomi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Diagnosa 10 Bagian Anatomi Lengkap
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diagnosa-anatomi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Restorasi Outsole & Midsole
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diagnosa-anatomi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Goodyear Welt Re-stitching
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diagnosa-anatomi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Peremajaan Suede & Leather Glacage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bahan-premium')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Katalog Material Vibram & Dainite
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pengiriman & Lacak */}
          <div className="space-y-3">
            <div className="text-stone-200 font-serif font-semibold text-sm">
              Akses Pelanggan
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#D4A373] transition-colors cursor-pointer text-left font-medium"
                >
                  Form Booking Online Praktis
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Lacak Status Order (#SC-xxxx)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notifikasi-wa')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Simulasi Notifikasi WhatsApp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('antar-jemput')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Standar Safety Box Antar-Jemput
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sebelum-sesudah')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Galeri Sebelum & Sesudah
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Workshop & Jam Operasional */}
          <div className="space-y-3">
            <div className="text-stone-200 font-serif font-semibold text-sm">
              Lokasi Atelier
            </div>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>
                  Jl. Senopati Raya No. 42B, Kebayoran Baru, Jakarta Selatan 12190
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>Senin – Sabtu: 09.00 – 19.00 WIB</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span className="font-mono">WhatsApp: +62 812-8934-5712</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>concierge@solcraft-atelier.id</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Editorial Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} SolCraft Atelier. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4">
            <span>Standar Keamanan Transaksi Digital Terverifikasi</span>
            <span aria-hidden="true">·</span>
            <span>Garansi Rekat 100% Bebas Mangap</span>
            {onOpenAdminLogin && (
              <>
                <span aria-hidden="true" className="text-stone-700">·</span>
                <button
                  onClick={onOpenAdminLogin}
                  className="text-stone-600 hover:text-[#D4A373] transition-colors flex items-center gap-1 cursor-pointer font-mono"
                  title="Akses Staf Pengelola (Ctrl+Shift+A)"
                >
                  <Lock className="w-3 h-3" />
                  <span>Akses Pengelola</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
