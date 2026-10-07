import React, { useState } from 'react';
import { SHOE_PARTS, DAMAGE_CATALOG } from '../data/shoeDamageCatalog';
import { ShoePartId, ShoeCategory, DamageItem } from '../types/shoe';
import {
  AlertCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronRight,
  Layers,
  Search,
  Wrench,
  Award,
  Zap,
} from 'lucide-react';

interface InteractiveShoeAnatomyProps {
  onSelectDamageForBooking: (damage: DamageItem) => void;
  selectedDamagesList: DamageItem[];
}

const CATEGORY_TABS: { id: ShoeCategory; label: string }[] = [
  { id: 'sneakers', label: 'Sneakers & Streetwear' },
  { id: 'leather_boots', label: 'Boots Kulit & Workwear' },
  { id: 'dress_shoes', label: 'Sepatu Kulit Formal (Dress)' },
  { id: 'running_performance', label: 'Running & Performance' },
  { id: 'luxury_heels', label: 'Designer & Luxury Heels' },
];

export const InteractiveShoeAnatomy: React.FC<InteractiveShoeAnatomyProps> = ({
  onSelectDamageForBooking,
  selectedDamagesList,
}) => {
  const [activePart, setActivePart] = useState<ShoePartId>('outsole');
  const [selectedCategory, setSelectedCategory] = useState<ShoeCategory>('sneakers');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchSymptom, setSearchSymptom] = useState<string>('');

  const currentPartMeta = SHOE_PARTS.find((p) => p.id === activePart) || SHOE_PARTS[0];

  // Filter damages based on active part and category compatibility
  const filteredDamages = DAMAGE_CATALOG.filter((d) => {
    if (d.partId !== activePart) return false;
    if (!d.shoeCompatibility.includes(selectedCategory)) return false;
    if (severityFilter !== 'all' && d.severity !== severityFilter) return false;
    if (searchSymptom.trim() !== '') {
      const q = searchSymptom.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchDesc = d.description.toLowerCase().includes(q);
      const matchSymptoms = d.symptoms.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchSymptoms) return false;
    }
    return true;
  });

  const isDamageSelected = (id: string) => {
    return selectedDamagesList.some((item) => item.id === id);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'kritis':
        return (
          <span className="text-rose-400 font-mono text-xs bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/20">
            Kritis (Kerusakan Parah)
          </span>
        );
      case 'berat':
        return (
          <span className="text-amber-400 font-mono text-xs bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/20">
            Kerusakan Berat
          </span>
        );
      case 'sedang':
        return (
          <span className="text-blue-400 font-mono text-xs bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">
            Kerusakan Sedang
          </span>
        );
      default:
        return (
          <span className="text-emerald-400 font-mono text-xs bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
            Perawatan Ringan
          </span>
        );
    }
  };

  return (
    <section id="diagnosa-anatomi" className="py-20 bg-[#0E0F12] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#D4A373] mb-2">
            <span>Sistem Diagnosa Presisi</span>
            <span aria-hidden="true">·</span>
            <span>10 Bagian Struktural Sepatu Terlengkap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF9F5] tracking-tight">
            Pilih Bagian Sepatu & Analisa Diagnosa Kerusakan Klinis
          </h2>
          <p className="mt-3 text-stone-300 text-base leading-relaxed">
            Setiap komponen sepatu menuntut formulasi teknik cobbler yang berbeda dan pemilihan material presisi. Pilih bagian anatomi di bawah untuk mempelajari diagnosa mikro, teknik pengerjaan, dan jaminan keawetan bergaransi tertulis hingga 18 bulan.
          </p>
        </div>

        {/* Shoe Category Filter Tabs (Single line button controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          <span className="text-xs font-mono text-stone-400 mr-2 shrink-0">Kategori Sepatu:</span>
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                selectedCategory === tab.id
                  ? 'bg-[#D4A373] text-[#0E0F12] font-semibold shadow-md shadow-amber-950/30'
                  : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Anatomy Selector & Diagram (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Interactive Shoe Diagram Card */}
            <div className="bg-[#15171D] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-xs font-mono text-[#D4A373] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
                  <span>Diagram Anatomi Interaktif</span>
                </div>
                <div className="text-xs font-mono text-stone-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  {currentPartMeta.name}
                </div>
              </div>

              {/* Interactive SVG Diagram with Highlighted Part & Clickable Hotspots */}
              <div className="my-6 relative flex items-center justify-center bg-[#0C0D10] rounded-xl p-4 border border-white/5">
                <svg
                  viewBox="0 0 500 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto select-none"
                >
                  {/* Upper Body Area */}
                  <path
                    d="M70 170 C70 130, 110 100, 160 105 C200 110, 240 85, 290 50 C320 30, 365 35, 385 80 C400 110, 405 150, 420 170 Z"
                    fill={activePart === 'upper' ? '#D4A373' : '#2A2D38'}
                    fillOpacity={activePart === 'upper' ? 0.45 : 0.8}
                    stroke={activePart === 'upper' ? '#D4A373' : '#454B5D'}
                    strokeWidth={activePart === 'upper' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    onClick={() => setActivePart('upper')}
                  />

                  {/* Toe Cap Area */}
                  <path
                    d="M70 170 C70 140, 95 125, 130 128 L125 170 Z"
                    fill={activePart === 'toecap' ? '#D4A373' : '#333744'}
                    fillOpacity={activePart === 'toecap' ? 0.65 : 0.4}
                    stroke={activePart === 'toecap' ? '#D4A373' : '#5E667C'}
                    strokeWidth={activePart === 'toecap' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActivePart('toecap')}
                  />

                  {/* Heel Counter Area */}
                  <path
                    d="M370 100 C390 120, 405 145, 420 170 L360 170 C360 140, 365 120, 370 100 Z"
                    fill={activePart === 'heel' ? '#D4A373' : '#333744'}
                    fillOpacity={activePart === 'heel' ? 0.65 : 0.4}
                    stroke={activePart === 'heel' ? '#D4A373' : '#5E667C'}
                    strokeWidth={activePart === 'heel' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActivePart('heel')}
                  />

                  {/* Tongue & Collar Padding Area */}
                  <path
                    d="M310 60 C325 45, 360 50, 375 75 L350 95 Z"
                    fill={activePart === 'tongue_collar' ? '#D4A373' : '#383C4A'}
                    fillOpacity={activePart === 'tongue_collar' ? 0.75 : 0.5}
                    stroke={activePart === 'tongue_collar' ? '#D4A373' : '#656D84'}
                    strokeWidth={activePart === 'tongue_collar' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActivePart('tongue_collar')}
                  />

                  {/* Insole & Interior Footbed Indicator */}
                  <path
                    d="M90 162 L400 162"
                    stroke={activePart === 'insole' ? '#D4A373' : '#8A90A2'}
                    strokeWidth={activePart === 'insole' ? '4' : '2'}
                    strokeDasharray="6 4"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActivePart('insole')}
                  />

                  {/* Welt Stitching Line / Lining */}
                  <path
                    d="M60 173 L430 173"
                    stroke={activePart === 'lining_stitching' ? '#FDFCF7' : '#B08968'}
                    strokeWidth={activePart === 'lining_stitching' ? '3.5' : '1.5'}
                    strokeDasharray="4 3"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setActivePart('lining_stitching')}
                  />

                  {/* Midsole Layer */}
                  <path
                    d="M60 172 L430 172 C435 190, 430 205, 415 210 L70 210 C55 200, 55 185, 60 172 Z"
                    fill={activePart === 'midsole' ? '#D4A373' : '#1F222B'}
                    fillOpacity={activePart === 'midsole' ? 0.55 : 0.9}
                    stroke={activePart === 'midsole' ? '#D4A373' : '#4F566B'}
                    strokeWidth={activePart === 'midsole' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    onClick={() => setActivePart('midsole')}
                  />

                  {/* Outsole Tread / Vibram Lug Layer */}
                  <path
                    d="M58 210 L418 210 L422 235 L395 235 L390 225 L380 225 L375 235 L350 235 L345 225 L335 225 L330 235 L305 235 L300 225 L290 225 L285 235 L260 235 L255 225 L245 225 L240 235 L215 235 L210 225 L200 225 L195 235 L170 235 L165 225 L155 225 L150 235 L125 235 L120 225 L110 225 L105 235 L80 235 L75 225 L65 225 L60 235 L52 235 Z"
                    fill={activePart === 'outsole' ? '#D4A373' : '#14161C'}
                    fillOpacity={activePart === 'outsole' ? 0.75 : 0.9}
                    stroke={activePart === 'outsole' ? '#D4A373' : '#6A728A'}
                    strokeWidth={activePart === 'outsole' ? '3' : '1.5'}
                    className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    onClick={() => setActivePart('outsole')}
                  />

                  {/* Laces, Eyelets & Speed Hooks Area */}
                  <path d="M255 95 L285 75 L315 58" stroke={activePart === 'hardware_eyelet' ? '#D4A373' : '#8D92A0'} strokeWidth={activePart === 'hardware_eyelet' ? '3' : '2'} />
                  <circle cx="255" cy="95" r="4" fill={activePart === 'hardware_eyelet' ? '#D4A373' : '#B08968'} stroke="#FAF9F5" strokeWidth="1" />
                  <circle cx="285" cy="75" r="4" fill={activePart === 'hardware_eyelet' ? '#D4A373' : '#B08968'} stroke="#FAF9F5" strokeWidth="1" />
                  <circle cx="315" cy="58" r="4" fill={activePart === 'hardware_eyelet' ? '#D4A373' : '#B08968'} stroke="#FAF9F5" strokeWidth="1" />

                  {/* Patina & Deep Care Glow Area */}
                  {activePart === 'deep_care_patina' && (
                    <circle cx="170" cy="130" r="40" fill="#D4A373" fillOpacity="0.25" filter="blur(10px)" />
                  )}

                  {/* Hotspots clickable pins with number labels */}
                  {/* 1. Outsole */}
                  <g className="cursor-pointer" onClick={() => setActivePart('outsole')}>
                    <circle cx="250" cy="225" r="10" fill={activePart === 'outsole' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="250" y="229" fill={activePart === 'outsole' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
                  </g>

                  {/* 2. Midsole */}
                  <g className="cursor-pointer" onClick={() => setActivePart('midsole')}>
                    <circle cx="250" cy="190" r="10" fill={activePart === 'midsole' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="250" y="194" fill={activePart === 'midsole' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
                  </g>

                  {/* 3. Upper */}
                  <g className="cursor-pointer" onClick={() => setActivePart('upper')}>
                    <circle cx="190" cy="120" r="10" fill={activePart === 'upper' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="190" y="124" fill={activePart === 'upper' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">3</text>
                  </g>

                  {/* 4. Insole */}
                  <g className="cursor-pointer" onClick={() => setActivePart('insole')}>
                    <circle cx="310" cy="158" r="10" fill={activePart === 'insole' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="310" y="162" fill={activePart === 'insole' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">4</text>
                  </g>

                  {/* 5. Heel */}
                  <g className="cursor-pointer" onClick={() => setActivePart('heel')}>
                    <circle cx="395" cy="135" r="10" fill={activePart === 'heel' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="395" y="139" fill={activePart === 'heel' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">5</text>
                  </g>

                  {/* 6. Toe Cap */}
                  <g className="cursor-pointer" onClick={() => setActivePart('toecap')}>
                    <circle cx="95" cy="150" r="10" fill={activePart === 'toecap' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="95" y="154" fill={activePart === 'toecap' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">6</text>
                  </g>

                  {/* 7. Welt Stitching */}
                  <g className="cursor-pointer" onClick={() => setActivePart('lining_stitching')}>
                    <circle cx="140" cy="173" r="10" fill={activePart === 'lining_stitching' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="140" y="177" fill={activePart === 'lining_stitching' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">7</text>
                  </g>

                  {/* 8. Hardware & Eyelet */}
                  <g className="cursor-pointer" onClick={() => setActivePart('hardware_eyelet')}>
                    <circle cx="285" cy="75" r="10" fill={activePart === 'hardware_eyelet' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="285" y="79" fill={activePart === 'hardware_eyelet' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">8</text>
                  </g>

                  {/* 9. Tongue & Collar */}
                  <g className="cursor-pointer" onClick={() => setActivePart('tongue_collar')}>
                    <circle cx="350" cy="75" r="10" fill={activePart === 'tongue_collar' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="350" y="79" fill={activePart === 'tongue_collar' ? '#0E0F12' : '#FFF'} fontSize="10" fontWeight="bold" textAnchor="middle">9</text>
                  </g>

                  {/* 10. Deep Care & Patina */}
                  <g className="cursor-pointer" onClick={() => setActivePart('deep_care_patina')}>
                    <circle cx="160" cy="110" r="10" fill={activePart === 'deep_care_patina' ? '#D4A373' : '#1F222B'} stroke="#FAF9F5" strokeWidth="2" />
                    <text x="160" y="114" fill={activePart === 'deep_care_patina' ? '#0E0F12' : '#FFF'} fontSize="9" fontWeight="bold" textAnchor="middle">10</text>
                  </g>
                </svg>
              </div>

              {/* Part description summary */}
              <div className="space-y-2 pt-2">
                <div className="text-sm font-semibold text-stone-100 flex items-center justify-between">
                  <span>{currentPartMeta.name} — {currentPartMeta.indonesianName}</span>
                  <span className="text-xs font-mono text-[#D4A373] bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                    {currentPartMeta.damageCount} Pilihan Masalah
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentPartMeta.shortDesc}
                </p>
                <div className="text-xs text-stone-400 bg-black/40 p-3 rounded-xl border border-white/5 font-mono">
                  <span className="text-[#D4A373] font-semibold">Peran Kritis & Fungsi:</span> {currentPartMeta.criticalRole}
                </div>
              </div>
            </div>

            {/* List of 10 Anatomy Parts to Click Directly */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Pilih dari 10 Bagian Anatomi:</span>
                <span className="text-[#D4A373] text-[11px]">Klik untuk Diagnosa</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SHOE_PARTS.map((part, index) => {
                  const isActive = activePart === part.id;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setActivePart(part.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#1D2028] border-[#D4A373] shadow-md shadow-amber-950/30'
                          : 'bg-[#14161C] border-white/5 hover:border-white/15 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-6 h-6 rounded-md font-mono text-xs shrink-0 flex items-center justify-center ${
                            isActive
                              ? 'bg-[#D4A373] text-[#0E0F12] font-bold'
                              : 'bg-white/5 text-stone-400'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div className="truncate">
                          <div
                            className={`text-xs font-medium truncate ${
                              isActive ? 'text-white' : 'text-stone-200'
                            }`}
                          >
                            {part.name}
                          </div>
                          <div className="text-[10px] text-stone-400 truncate">
                            {part.indonesianName}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? 'text-[#D4A373]' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Damage Cards & Repair Protocols (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Filter & Search Bar */}
            <div className="bg-[#15171D] border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#D4A373]" />
                  <span className="text-sm font-semibold text-white">
                    Kerusakan Teridentifikasi: {currentPartMeta.name} ({filteredDamages.length})
                  </span>
                </div>

                {/* Segmented Filter (buttons) */}
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 shrink-0 overflow-x-auto">
                  {['all', 'ringan', 'sedang', 'berat', 'kritis'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setSeverityFilter(sev)}
                      className={`px-2.5 py-1 text-xs rounded-md capitalize transition-colors cursor-pointer shrink-0 ${
                        severityFilter === sev
                          ? 'bg-[#D4A373] text-[#0E0F12] font-semibold'
                          : 'text-stone-400 hover:text-white'
                      }`}
                    >
                      {sev === 'all' ? 'Semua' : sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyword symptom search */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchSymptom}
                  onChange={(e) => setSearchSymptom(e.target.value)}
                  placeholder="Cari kata kunci keluhan (contoh: licin, mangap, yellowing, resleting, sobek, bau)..."
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#D4A373]"
                />
              </div>
            </div>

            {/* Empty state if no damages match filter */}
            {filteredDamages.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-[#14161C] border border-white/5 text-stone-400 space-y-2">
                <AlertCircle className="w-8 h-8 text-stone-500 mx-auto" />
                <p className="text-sm">Tidak ada jenis kerusakan dengan filter ini untuk kategori {selectedCategory}.</p>
                <button
                  onClick={() => {
                    setSeverityFilter('all');
                    setSearchSymptom('');
                  }}
                  className="text-xs text-[#D4A373] underline cursor-pointer"
                >
                  Reset filter pencarian
                </button>
              </div>
            )}

            {/* Damage Cards Grid */}
            <div className="space-y-4">
              {filteredDamages.map((dmg) => {
                const selected = isDamageSelected(dmg.id);
                return (
                  <div
                    key={dmg.id}
                    className={`rounded-2xl p-5 border transition-all ${
                      selected
                        ? 'bg-[#1A1D25] border-[#D4A373] shadow-lg shadow-amber-950/20'
                        : 'bg-[#15171D] border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Header Card: Title, Severity, Price */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/5">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {getSeverityBadge(dmg.severity)}
                          <span className="text-xs text-stone-500 font-mono">·</span>
                          <span className="text-xs font-mono text-stone-300 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4A373]" />
                            {dmg.estimatedDuration}
                          </span>
                        </div>
                        <h3 className="text-base font-serif font-semibold text-stone-100">
                          {dmg.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          {dmg.subtitle}
                        </p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs text-stone-400 font-mono">Estimasi Biaya Mulai:</div>
                        <div className="text-lg font-mono font-bold text-[#D4A373] tabular-nums">
                          Rp {dmg.estimatedCost.toLocaleString('id-ID')}
                        </div>
                        <div className="text-[11px] text-emerald-400 font-mono flex items-center sm:justify-end gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Garansi {dmg.warrantyMonths} Bulan</span>
                        </div>
                      </div>
                    </div>

                    {/* Description & Symptoms */}
                    <div className="py-3 space-y-2.5">
                      <p className="text-xs text-stone-300 leading-relaxed">
                        {dmg.description}
                      </p>

                      <div className="bg-[#0F1014] p-3 rounded-xl border border-white/5 space-y-1.5">
                        <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wide">
                          Gejala Klinis yang Kerap Dialami:
                        </div>
                        <ul className="text-xs text-stone-300 space-y-1 list-disc list-inside">
                          {dmg.symptoms.map((sym, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {sym}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Cobbler Solution & Materials */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                        <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                          <span className="text-[#D4A373] font-mono block mb-1">Teknik Master Cobbler:</span>
                          <span className="text-stone-300 leading-relaxed block text-[11px]">
                            {dmg.restorationTechnique}
                          </span>
                        </div>

                        <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                          <span className="text-[#D4A373] font-mono block mb-1">Material Rekomendasi:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {dmg.recommendedMaterials.map((mat, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] text-stone-200 bg-white/10 px-1.5 py-0.5 rounded border border-white/5"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer: Add to Repair Order */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3 flex-wrap">
                      <div className="text-xs text-stone-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Termasuk Deep Cleaning & Sterilisasi Higienis</span>
                      </div>

                      <button
                        onClick={() => onSelectDamageForBooking(dmg)}
                        className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                          selected
                            ? 'bg-emerald-500 text-stone-950 font-bold hover:bg-emerald-400'
                            : 'bg-[#D4A373] text-[#0E0F12] hover:bg-[#E7B788]'
                        }`}
                      >
                        {selected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Terpilih di Rencana Servis</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Pilih untuk Diperbaiki</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

