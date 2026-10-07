import React, { useState } from 'react';
import {
  ArrowLeftRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Search,
  Eye,
  Layers,
  ZoomIn,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  shoeName: string;
  category: string;
  initialIssues: string[];
  materialsUsed: string[];
  masterTechnique: string;
  longevityGain: string;
  warranty: string;
  duration: string;
  beforeStats: {
    condition: string;
    gripRating: string;
    comfortScore: string;
  };
  afterStats: {
    condition: string;
    gripRating: string;
    comfortScore: string;
  };
  macroHighlights: {
    title: string;
    desc: string;
  }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-redwing',
    shoeName: 'Red Wing Heritage Iron Ranger 8111',
    category: 'Boots Kulit & Workwear',
    initialIssues: [
      'Sol Nitrile Cork aus botak rata dan sangat licin saat hujan',
      'Benang jahitan Goodyear welt putus di 4 titik lekukan kaki',
      'Kulit mengering kaku dan retak halus di area vamp depan',
    ],
    materialsUsed: [
      'Vibram Christy Morflex 4014 Asli Albizzate Italia',
      'Barbour Irish Waxed Linen Thread 45kg Tensile',
      'Saphir Médaille d’Or 1925 Renovateur Mink Oil',
      'Midsole Vegetable-Tanned Leather 4mm Import',
    ],
    masterTechnique: 'Full Goodyear Welt De-construction & 2-Needle Hand-Welted Restitching',
    longevityGain: '+4 Tahun Pemakaian Harian Ekstrem',
    warranty: '18 Bulan Garansi Resmi Tertulis',
    duration: '4 Hari Pengerjaan',
    beforeStats: {
      condition: 'Kritis (Licin & Retak)',
      gripRating: '2 / 10',
      comfortScore: '4 / 10',
    },
    afterStats: {
      condition: 'Restorasi Sempurna (Seperti Baru)',
      gripRating: '9.8 / 10 (Vibram Morflex Traction)',
      comfortScore: '9.5 / 10 (Air Pillow Cushion)',
    },
    macroHighlights: [
      {
        title: 'Jahitan Welt Hand-Stitch 7 SPI',
        desc: 'Benang Barbour rami dilapisi lilin lebah murni menyegel lubang jarum dari air hujan.',
      },
      {
        title: 'Ikatan Lem Renia Aquilim 180 N/cm',
        desc: 'Formula polimer Köln Jerman diaktivasi panas inframerah 65°C tanpa resiko delaminasi.',
      },
    ],
  },
  {
    id: 'case-jordan',
    shoeName: 'Nike Air Jordan 1 High Retro OG Chicago',
    category: 'Sneakers & Streetwear',
    initialIssues: [
      'Midsole mengalami yellowing parah (oksidasi pekat kecokelatan)',
      'Outsole bagian depan mangap terangkat 5 cm (delaminasi lem pabrik)',
      'Insole amblas, busa kerah leher kempes dan bau lembab',
    ],
    materialsUsed: [
      'Renia Aquilim 315 Polyurethane Adhesive (Köln, Jerman)',
      'SolCraft Active Oxygen De-Oxidation Gel & UV 365nm',
      'OrthoLite & Poron XRD High-Rebound Insole Busa Medis',
    ],
    masterTechnique: '360° Controlled UV Chamber Curing & Cold-Pressure Hydraulic Reglue',
    longevityGain: '+3 Tahun Daya Pakai Sneakers',
    warranty: '12 Bulan Garansi Rekat Anti-Mangap',
    duration: '2 Hari Pengerjaan',
    beforeStats: {
      condition: 'Kusam Menguning & Mangap',
      gripRating: '5 / 10',
      comfortScore: '5 / 10',
    },
    afterStats: {
      condition: 'Putih Bersih Orisinil & Solid',
      gripRating: '9.2 / 10',
      comfortScore: '9.6 / 10 (Poron XRD)',
    },
    macroHighlights: [
      {
        title: 'Un-yellowing Oksigen Aktif',
        desc: 'Mengembalikan polimer karet ke warna murni aslinya tanpa mengikis lapisan luar midsole.',
      },
      {
        title: 'Pres Hidrolik 4.5 Bar',
        desc: 'Pengepresan kontur merata memastikan tidak ada rongga udara penyebab sol mangap berulang.',
      },
    ],
  },
  {
    id: 'case-allenedmonds',
    shoeName: 'Allen Edmonds Park Avenue Cap-Toe Oxford',
    category: 'Sepatu Kulit Formal (Gentlemen)',
    initialIssues: [
      'Sol kulit berlubang tembus air di telapak depan',
      'Heel block kayu-karet aus miring ke luar 12 derajat',
      'Baret trotoar dalam pada cap-toe dan kulit kusam kehilangan patina',
    ],
    materialsUsed: [
      'JR (Joh. Rendenbach) Oak Bark Leather Sole (Trier, Jerman)',
      'Dainite Rubber Top-Lift Heel Wedge (Inggris)',
      'Saphir Mirror Gloss Pate de Luxe French Glacage',
    ],
    masterTechnique: 'Full Recrafting JR Leather Sole, Channel Stitching & French Mirror Gloss Polish',
    longevityGain: '+5 Tahun Pemakaian Kantor Aktif',
    warranty: '14 Bulan Garansi Kulit Sol',
    duration: '5 Hari Pengerjaan',
    beforeStats: {
      condition: 'Sol Jebol Tembus Kaus Kaki',
      gripRating: '3 / 10',
      comfortScore: '4 / 10',
    },
    afterStats: {
      condition: 'Artisanal Bespoke Finish Mewah',
      gripRating: '9.5 / 10 (JR Oak Bark Dense)',
      comfortScore: '9.8 / 10 (Custom Molded Cork)',
    },
    macroHighlights: [
      {
        title: 'Kulit Sol Samak Pohon Ek Jerman',
        desc: 'Fermentasi 365 hari menghasilkan kepadatan serat kulit terpadat yang tahan gesek aspal.',
      },
      {
        title: 'Glacage Cermin Saphir Prancis',
        desc: 'Lapisan lilin carnauba mikro menghasilkan refleksi kilau kaca mewah di ujung sepatu.',
      },
    ],
  },
  {
    id: 'case-drmartens',
    shoeName: 'Dr. Martens 1460 8-Eye Smooth Leather Boots',
    category: 'Boots Kulit & Workwear',
    initialIssues: [
      'Sol air-cushioned beralur pecah melintang di bawah telapak',
      'Ring eyelet lubang tali copot dan kulit robek',
      'Lapisan pigmen kulit pecah-pecah di area tekukan jari',
    ],
    materialsUsed: [
      'Heat-Welded PVC Lug Replacement Sole',
      'Solid Brass Eyelets with Backing Washers',
      'Saphir Creme 1925 Leather Binder & Yellow Welt Stitch Revival',
    ],
    masterTechnique: 'Thermal Hot-Blade Sole Welding & Eyelet Reinforcement Webbing',
    longevityGain: '+4 Tahun Ketahanan Pemakaian',
    warranty: '12 Bulan Garansi Rekat & Hardware',
    duration: '3 Hari Pengerjaan',
    beforeStats: {
      condition: 'Sol Pecah Masuk Air & Eyelet Jebol',
      gripRating: '4 / 10',
      comfortScore: '5 / 10',
    },
    afterStats: {
      condition: 'Kokoh Solid & Cengkeram Anti-Slip',
      gripRating: '9.4 / 10',
      comfortScore: '9.2 / 10',
    },
    macroHighlights: [
      {
        title: 'Thermal Sole Fusion 220°C',
        desc: 'Pengelasan termal menyatukan sol PVC dengan welt tanpa mengorbankan fleksibilitas sol.',
      },
      {
        title: 'Eyelet Kuningan Padat Anti-Karat',
        desc: 'Kuningan murni tahan tarikan tali kencang tanpa resiko karat atau kelupas.',
      },
    ],
  },
  {
    id: 'case-berluti',
    shoeName: 'Berluti Alessandro Wholecut Oxford (Venezia Leather)',
    category: 'Sepatu Kulit Formal (Gentlemen)',
    initialIssues: [
      'Warna patina orisinil pudar menjadi abu-abu kusam terkena panas',
      'Bercak noda air hujan dan alkohol menodai sisi lateral',
      'Ujung hak kulit aus tergerus lantai marmer',
    ],
    materialsUsed: [
      'Saphir Teinture Française Bespoke Multi-Layer Alcohol Dyes',
      'JR Oak Bark Heel Lift with Brass Nails',
      'Pure Beeswax & Mink Oil Moisture Lock Balm',
    ],
    masterTechnique: 'Artisanal Hand-Painted Emerald & Tobacco Patina Gradation with 4-Layer Glacage',
    longevityGain: '+5 Tahun Keindahan Karya Seni',
    warranty: '12 Bulan Garansi Ketahanan Warna',
    duration: '4 Hari Pengerjaan',
    beforeStats: {
      condition: 'Warna Belang Kusam & Dehidrasi',
      gripRating: '5 / 10',
      comfortScore: '6 / 10',
    },
    afterStats: {
      condition: 'Gradasi Patina Eksklusif Mewah',
      gripRating: '9.6 / 10',
      comfortScore: '9.9 / 10 (Supple Leather)',
    },
    macroHighlights: [
      {
        title: 'Gradasi Warna Berluti-Style',
        desc: 'Pewarna meresap jauh ke dalam pori kulit calfskin tanpa menutup serat bernapas alami.',
      },
      {
        title: 'Paku Kuningan Penahan Hak',
        desc: 'Dudukan hak dipaku dengan kuningan anti-aus bergaya artisan bespoke Eropa.',
      },
    ],
  },
];

export const BeforeAfterGallery: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100 percentage
  const [isZoomMode, setIsZoomMode] = useState<boolean>(false);

  return (
    <section id="sebelum-sesudah" className="py-20 bg-[#0E0F12] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#D4A373] mb-2">
            <span>Standar Pengerjaan Master Cobbler</span>
            <span aria-hidden="true">·</span>
            <span>5 Studi Kasus Restorasi Ikonik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F5] tracking-tight">
            Transformasi Sebelum & Sesudah: Bukti Keawetan Nyata
          </h2>
          <p className="mt-3 text-stone-300 text-base leading-relaxed">
            Geser slider interaktif di bawah untuk melihat detail perbandingan sebelum dan sesudah sepatu diperbaiki oleh artisan kami menggunakan material berstandar internasional.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => {
                setSelectedCase(cs);
                setSliderPos(50);
              }}
              className={`px-4 py-2.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCase.id === cs.id
                  ? 'bg-[#D4A373] text-[#0E0F12] font-semibold shadow-md shadow-amber-950/30'
                  : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cs.shoeName}
            </button>
          ))}
        </div>

        {/* Interactive Case Showcase Card */}
        <div className="bg-[#15171D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Graphic Viewport with Draggable Split Slider */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-300">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Geser Pembanding Interaktif (Slider):</span>
                </div>

                {/* Macro Zoom Toggle */}
                <button
                  onClick={() => setIsZoomMode(!isZoomMode)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isZoomMode
                      ? 'bg-amber-500/20 text-[#D4A373] border border-amber-500/40'
                      : 'bg-white/5 text-stone-400 hover:text-white border border-white/5'
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>{isZoomMode ? 'Zoom Makro: Aktif' : 'Detail Makro'}</span>
                </button>
              </div>

              {/* Visual Split Screen Display Container */}
              <div className="relative aspect-[4/3] rounded-2xl bg-[#0D0E12] border border-white/10 overflow-hidden select-none">
                {/* SVG Visual Graphic Rendering */}
                <div className={`w-full h-full p-6 flex flex-col justify-between transition-transform duration-300 ${isZoomMode ? 'scale-125 origin-center' : 'scale-100'}`}>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between text-xs font-mono relative z-20 pointer-events-none">
                    <span className="bg-rose-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30 text-[11px]">
                      KIRI: SEBELUM (RUSAK)
                    </span>
                    <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]">
                      KANAN: SESUDAH (RESTORED)
                    </span>
                  </div>

                  {/* SVG Illustration Container */}
                  <div className="relative w-full h-48 flex items-center justify-center">
                    <svg
                      viewBox="0 0 360 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-auto drop-shadow-2xl"
                    >
                      {/* Left Side (Before): Distressed & Broken */}
                      <g>
                        {/* Upper Body Before */}
                        <path
                          d="M50 120 C50 85, 80 65, 120 70 C150 72, 180 55, 215 30 C240 15, 270 20, 285 50 C295 70, 300 100, 310 120 Z"
                          fill="#1E2026"
                          stroke="#484C58"
                          strokeWidth="2"
                        />
                        {/* Red Cracks on Upper */}
                        <g stroke="#E11D48" strokeWidth="1.8" strokeDasharray="2 2">
                          <path d="M100 80 L115 105" />
                          <path d="M120 76 L135 102" />
                          <path d="M135 83 L150 106" />
                        </g>

                        {/* Welt Stitching Broken */}
                        <path
                          d="M45 125 L315 125"
                          stroke="#8B4545"
                          strokeWidth="1.5"
                          strokeDasharray="8 6"
                        />

                        {/* Midsole Stained */}
                        <path
                          d="M42 125 L318 125 L314 148 L46 148 Z"
                          fill="#4A3F24"
                          stroke="#5C4D2C"
                          strokeWidth="1.5"
                        />

                        {/* Worn Slick Thin Outsole */}
                        <path
                          d="M44 148 L314 148 L312 155 L44 155 Z"
                          fill="#2C2E38"
                          stroke="#444957"
                          strokeWidth="1.5"
                        />
                      </g>

                      {/* Right Side (After): Flawless & Vibram Lug (Clipped by slider percentage) */}
                      <g style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}>
                        {/* Rich Restored Upper */}
                        <path
                          d="M50 120 C50 85, 80 65, 120 70 C150 72, 180 55, 215 30 C240 15, 270 20, 285 50 C295 70, 300 100, 310 120 Z"
                          fill="#313642"
                          stroke="#D4A373"
                          strokeWidth="2.5"
                        />

                        {/* Pristine Welt Stitching */}
                        <path
                          d="M45 125 L315 125"
                          stroke="#FAF9F5"
                          strokeWidth="2.5"
                          strokeDasharray="4 3"
                        />

                        {/* Clean Deep Midsole */}
                        <path
                          d="M42 125 L318 125 L314 148 L46 148 Z"
                          fill="#1A1C22"
                          stroke="#9DA3B4"
                          strokeWidth="1.5"
                        />

                        {/* Bold Vibram Morflex / Lug Outsole */}
                        <path
                          d="M40 148 L320 148 L324 175 L295 175 L290 165 L275 165 L270 175 L245 175 L240 165 L225 165 L220 175 L195 175 L190 165 L175 165 L170 175 L145 175 L140 165 L125 165 L120 175 L95 175 L90 165 L75 165 L70 175 L38 175 Z"
                          fill="#D4A373"
                          stroke="#F2C598"
                          strokeWidth="2"
                        />

                        {/* Gold artisan shine dots */}
                        <g fill="#D4A373">
                          <circle cx="270" cy="25" r="2.5" />
                          <circle cx="290" cy="110" r="1.8" />
                          <circle cx="220" cy="40" r="2" />
                        </g>
                      </g>
                    </svg>
                  </div>

                  {/* Footwear Category Watermark */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 border-t border-white/5 pt-2">
                    <span>{selectedCase.category}</span>
                    <span className="text-emerald-400">● 100% QC PASSED & CERTIFIED</span>
                  </div>
                </div>

                {/* Vertical Divider Line with Drag Knob */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#D4A373] pointer-events-none z-30 shadow-[0_0_12px_#D4A373]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#D4A373] border-2 border-white shadow-xl flex items-center justify-center text-[#0E0F12]">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Range Slider Controller */}
              <div className="space-y-1.5 pt-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full accent-[#D4A373] cursor-ew-resize h-1.5 bg-stone-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>← Tarik ke Kiri: Lihat Rusak</span>
                  <span className="text-[#D4A373] font-bold">{sliderPos}% Restorasi</span>
                  <span>Tarik ke Kanan: Lihat Hasil →</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Case Breakdown (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
                  Detail Rekayasa Restorasi Cobbler
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mt-1">
                  {selectedCase.shoeName}
                </h3>
                <p className="text-xs text-stone-400 mt-1 font-mono">
                  {selectedCase.masterTechnique}
                </p>
              </div>

              {/* Initial Issues vs Solution */}
              <div className="space-y-3">
                <div className="bg-[#0F1014] p-3.5 rounded-xl border border-white/5 space-y-1.5">
                  <div className="text-xs font-mono text-rose-400 uppercase">
                    Kondisi Awal Saat Diterima (Intake):
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1">
                    {selectedCase.initialIssues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0F1014] p-3.5 rounded-xl border border-white/5 space-y-1.5">
                  <div className="text-xs font-mono text-[#D4A373] uppercase">
                    Material Rekomendasi yang Diaplikasikan:
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1">
                    {selectedCase.materialsUsed.map((mat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Macro Craftsmanship Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs font-mono">
                  {selectedCase.macroHighlights.map((hl, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                      <div className="text-[#D4A373] font-semibold text-[11px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{hl.title}</span>
                      </div>
                      <p className="text-stone-300 text-[10px] leading-relaxed font-sans">
                        {hl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proof stats & warranty */}
              <div className="pt-2 grid grid-cols-3 gap-3 border-t border-white/5 font-mono text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Pertambahan Usia:</span>
                  <span className="text-[#D4A373] font-semibold">{selectedCase.longevityGain}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Durasi Servis:</span>
                  <span className="text-stone-200">{selectedCase.duration}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[11px]">Garansi Pengerjaan:</span>
                  <span className="text-emerald-400">{selectedCase.warranty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

