import React, { useState } from 'react';
import { PREMIUM_MATERIALS } from '../data/premiumMaterials';
import { PremiumMaterial } from '../types/shoe';
import { ShieldCheck, Award, CheckCircle2, XCircle, Sparkles, Plus, Check } from 'lucide-react';

interface MaterialShowcaseProps {
  onToggleMaterialAddon?: (material: PremiumMaterial) => void;
  selectedMaterialsList?: PremiumMaterial[];
}

export const MaterialShowcase: React.FC<MaterialShowcaseProps> = ({
  onToggleMaterialAddon,
  selectedMaterialsList = [],
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMaterials = PREMIUM_MATERIALS.filter((mat) => {
    if (activeCategory === 'all') return true;
    return mat.category === activeCategory;
  });

  const isMaterialSelected = (id: string) => {
    return selectedMaterialsList.some((m) => m.id === id);
  };

  return (
    <section id="bahan-premium" className="py-20 bg-[#121318] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#D4A373] mb-2">
            <span>Jaminan Keawetan Jangka Panjang</span>
            <span aria-hidden="true">·</span>
            <span>Material Orisinil Bersertifikat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F5] tracking-tight">
            Pilihan Bahan Premium untuk Keawetan Maksimal
          </h2>
          <p className="mt-3 text-stone-300 text-base leading-relaxed">
            Keawetan restorasi sepatu ditentukan oleh integritas bahan. Kami tidak menggunakan lem sintetis murah atau karet daur ulang yang mengeras. Setiap sol, benang, lem, dan lilin nutrisi dipilih secara teliti dari pabrikan bereputasi tinggi di Eropa & Amerika Serikat.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          {[
            { id: 'all', label: 'Semua Bahan Premium' },
            { id: 'sol', label: 'Outsoles (Vibram, Dainite, JR Leather)' },
            { id: 'perekat', label: 'Lem Polimer Industri (Renia Jerman)' },
            { id: 'jahitan', label: 'Benang Welted (Barbour Irish Linen)' },
            { id: 'perawatan', label: 'Nutrisi & Pewarna (Saphir 1925 Prancis)' },
            { id: 'cushion', label: 'Bantalan Medis (Poron XRD & OrthoLite)' },
            { id: 'hardware', label: 'Hardware Logam (Solid Brass & YKK Excella)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#D4A373] text-[#0E0F12] font-semibold'
                  : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((mat) => {
            const isSelected = isMaterialSelected(mat.id);
            return (
              <div
                key={mat.id}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-[#1C1F28] border-[#D4A373] shadow-lg shadow-amber-950/20'
                    : 'bg-[#16181F] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Origin & Brand */}
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5 font-mono">
                    <span className="text-[#D4A373]">{mat.origin}</span>
                    <span className="text-stone-400">{mat.brand}</span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-3">
                    <h3 className="text-base font-serif font-bold text-stone-100 leading-snug">
                      {mat.name}
                    </h3>
                    <p className="text-xs text-[#D4A373] mt-1 font-medium">
                      {mat.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 mt-2.5 leading-relaxed line-clamp-3">
                    {mat.description}
                  </p>

                  {/* Key Advantages */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    <div className="text-[11px] font-mono text-stone-400 uppercase">
                      Keunggulan Spesifikasi:
                    </div>
                    {mat.keyAdvantages.slice(0, 3).map((adv, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{adv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal For */}
                  <div className="mt-3 p-2 bg-black/30 rounded-lg border border-white/5 text-[11px] text-stone-400">
                    <span className="text-[#D4A373] font-mono">Cocok Untuk:</span> {mat.idealFor}
                  </div>
                </div>

                {/* Footer with Price Addon & Action */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-stone-400">Upgrade Biaya:</div>
                    <div className="text-sm font-mono font-bold text-[#D4A373] tabular-nums">
                      +Rp {mat.priceAddon.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      {mat.warrantyPeriod}
                    </div>
                  </div>

                  {onToggleMaterialAddon && (
                    <button
                      onClick={() => onToggleMaterialAddon(mat)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400'
                          : 'bg-white/10 hover:bg-[#D4A373] text-stone-200 hover:text-[#0E0F12]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Dipilih</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambahkan</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table: Standard Cobbler vs. SolCraft Atelier Premium */}
        <div className="mt-16 bg-[#16181F] border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <div className="text-xs font-mono text-[#D4A373] uppercase">
              Standar Integritas Pengerjaan
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
              Perbandingan Reparasi Biasa vs. SolCraft Atelier
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Kenapa sepatu yang diperbaiki di tempat lain seringkali rusak atau mangap lagi dalam 1–2 bulan?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 font-mono text-xs">
                  <th className="py-3 px-4">Aspek Perbaikan</th>
                  <th className="py-3 px-4 text-rose-400/80">Sol Sepatu Konvensional</th>
                  <th className="py-3 px-4 text-[#D4A373]">SolCraft Master Atelier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Lem & Perekat</td>
                  <td className="py-3.5 px-4 text-stone-400">
                    <div className="flex items-center gap-1.5 text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Lem kuning sintetis / aibon berbau tajam, mengkristal kaku saat kering dan mudah mangap kena air.</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Renia Aquilim 315 Jerman (Polyurethane Elastomer) elastis 300%, tahan air, anti-kering rapuh.</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Kualitas Sol Luar</td>
                  <td className="py-3.5 px-4 text-stone-400">
                    <div className="flex items-center gap-1.5 text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Karet cetak daur ulang lokal tanpa grade abrasi, licin di keramik, cepat habis dalam 3 bulan.</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>100% Vibram® Italia, Dainite® Inggris, atau JR Oak Bark Jerman bersertifikat pabrikan asli.</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Benang & Jahitan Welt</td>
                  <td className="py-3.5 px-4 text-stone-400">
                    <div className="flex items-center gap-1.5 text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Benang nilon/katun biasa yang tembus air dan lapuk busuk karena asam keringat telapak kaki.</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Barbour Irish Waxed Linen & Kevlar Core tahan tarik 45kg dan kedap air secara alami.</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Pembersihan & Nutrisi Kulit</td>
                  <td className="py-3.5 px-4 text-stone-400">
                    <div className="flex items-center gap-1.5 text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Deterjen pakaian agresif yang merusak lapisan pelindung kulit dan membuat kulit retak keras.</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Saphir Médaille d’Or 1925 (Mink Oil & Beeswax) memulihkan kelenturan serat kulit terdalam.</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-medium text-white">Jaminan Garansi</td>
                  <td className="py-3.5 px-4 text-stone-400">
                    <div className="flex items-center gap-1.5 text-rose-300">
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Tanpa garansi atau garansi verbal 7 hari tanpa komitmen ganti rugi.</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Garansi Resmi 6–18 Bulan Tertulis dengan kartu sertifikat fisik & database digital.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Durability Laboratory & Written Warranty Standards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#15171E] border border-amber-500/20 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Uji Rekat SATRA TM404</span>
            </div>
            <div className="text-xl font-bold font-serif text-white">180 N/cm Daya Rekat</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Kekuatan ikatan lem polimer Jerman 3x lipat standar pabrikan komersial. Tidak akan mangap walau terkena aspal panas 55°C atau genangan hujan lebat.
            </p>
          </div>

          <div className="bg-[#15171E] border border-amber-500/20 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5 uppercase">
              <Award className="w-4 h-4 text-[#D4A373]" />
              <span>Uji Fleksibilitas Tekuk</span>
            </div>
            <div className="text-xl font-bold font-serif text-white">50.000 Siklus Langkah</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Struktur sambungan welt & outsole diuji mesin flex simulator tanpa retak mikro atau delaminasi garis lipatan kaki.
            </p>
          </div>

          <div className="bg-[#15171E] border border-amber-500/20 rounded-2xl p-5 space-y-2 shadow-lg">
            <div className="text-xs font-mono text-[#D4A373] flex items-center gap-1.5 uppercase">
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Sertifikat Garansi Resmi</span>
            </div>
            <div className="text-xl font-bold font-serif text-white">Garansi s/d 18 Bulan</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Setiap pasang sepatu yang keluar dari atelier kami disertai kartu fisik bernomor seri resmi & terdaftar di sistem pelacakan digital SolCraft Atelier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
