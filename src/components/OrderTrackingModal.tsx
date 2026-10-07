import React, { useState } from 'react';
import { RepairOrder, OrderStatusStep } from '../types/shoe';
import { WhatsAppSimulator } from './WhatsAppSimulator';
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Package,
  Wrench,
  X,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  MapPin,
  Navigation,
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: RepairOrder[];
  selectedTrackingCode?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  selectedTrackingCode,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(selectedTrackingCode || orders[0]?.trackingCode || 'SC-88341');
  const [activeTab, setActiveTab] = useState<'timeline' | 'whatsapp'>('timeline');

  if (!isOpen) return null;

  const currentOrder =
    orders.find((o) => o.trackingCode.toLowerCase() === searchQuery.trim().toLowerCase()) ||
    orders[0];

  const getStatusIcon = (step: OrderStatusStep) => {
    switch (step) {
      case 'booking_confirmed':
        return <Package className="w-4 h-4" />;
      case 'pickup_scheduled':
      case 'courier_picked_up':
        return <Truck className="w-4 h-4" />;
      case 'arrived_atelier':
      case 'visual_inspection':
        return <Search className="w-4 h-4" />;
      case 'cobbler_repair':
        return <Wrench className="w-4 h-4" />;
      case 'qc_passed':
        return <ShieldCheck className="w-4 h-4" />;
      case 'secure_packaging':
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#14161C] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#101115]">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
                Sistem Pelacakan Real-Time
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                Status Perbaikan Sepatu & Notifikasi WhatsApp
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Search & Quick Select bar */}
        <div className="p-4 bg-[#0D0E12] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan Kode Tracking (Contoh: SC-88341)..."
                className="w-full bg-[#17181F] border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373] font-mono"
              />
            </div>
          </div>

          {/* Quick selection chips for pre-loaded orders */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none text-xs">
            <span className="text-stone-400 font-mono text-[11px] shrink-0">Contoh Order:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSearchQuery(o.trackingCode)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer transition-colors shrink-0 ${
                  currentOrder?.trackingCode === o.trackingCode
                    ? 'bg-[#D4A373] text-[#0E0F12] font-semibold'
                    : 'bg-white/5 text-stone-300 hover:text-white border border-white/5'
                }`}
              >
                {o.trackingCode} ({o.shoeBrandModel.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Linimasa vs Live WhatsApp Simulator */}
        <div className="px-6 py-2.5 bg-[#121318] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-white/15 text-white'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Linimasa Proses Pengerjaan (8 Tahap)
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Notifikasi WhatsApp Langsung</span>
            </button>
          </div>

          <div className="hidden sm:block text-xs font-mono text-stone-400">
            Unit: <span className="text-white font-medium">{currentOrder.shoeBrandModel}</span>
          </div>
        </div>

        {/* Modal Main View */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'whatsapp' ? (
            /* Live WhatsApp Feed Simulator View */
            <WhatsAppSimulator order={currentOrder} />
          ) : (
            /* Order Timeline View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Order Info & Summary Card (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#16181F] rounded-2xl p-5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">Status Saat Ini:</span>
                    <span className="text-emerald-400 font-bold capitalize">
                      {currentOrder.currentStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white">
                    {currentOrder.shoeBrandModel}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-white/5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Pemilik:</span>
                      <span>{currentOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Nomor WhatsApp:</span>
                      <span className="text-[#D4A373]">{currentOrder.whatsappNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Alamat Kirim:</span>
                      <span className="text-right text-[11px] max-w-[150px] truncate">{currentOrder.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Total Biaya:</span>
                      <span className="text-[#D4A373] font-bold">
                        Rp {currentOrder.totalPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* List of Repair damages */}
                  <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
                    <span className="text-[11px] font-mono text-stone-400 uppercase">
                      Bagian yang Diperbaiki:
                    </span>
                    {currentOrder.selectedDamages.map((d, i) => (
                      <div key={i} className="text-stone-300 text-[11px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]"></span>
                        <span>{d.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Materials */}
                  <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                    <span className="text-[11px] font-mono text-stone-400 uppercase">
                      Bahan Premium Dipasang:
                    </span>
                    {currentOrder.selectedMaterials.map((m, i) => (
                      <div key={i} className="text-emerald-300 text-[11px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{m.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Location & GPS Navigation Block */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-400 uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>Titik Jemput Kurir:</span>
                      </span>
                      {currentOrder.mapsUrl ? (
                        <a
                          href={currentOrder.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Buka Maps</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : null}
                    </div>

                    <div className="text-[11px] text-stone-300 bg-[#0E0F13] p-2 rounded-lg border border-white/5">
                      {currentOrder.locationPin ? (
                        <span>Pin GPS: {currentOrder.locationPin.lat}, {currentOrder.locationPin.lng}</span>
                      ) : (
                        <span className="text-stone-400">{currentOrder.address}</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const lat = currentOrder.locationPin?.lat || -6.230489;
                        const lng = currentOrder.locationPin?.lng || 106.812304;
                        const mapsLink = currentOrder.mapsUrl || `https://maps.google.com/?q=${lat},${lng}`;
                        const text = `*UPDATE TITIK LOKASI PENJEMPUTAN*\nHalo Admin & Kurir SolCraft,\nBerikut titik GPS lokasi akurat untuk order #${currentOrder.trackingCode}:\n\n📍 Link Google Maps: ${mapsLink}\n🏠 Alamat: ${currentOrder.address}\n👤 Nama: ${currentOrder.customerName}\n\nMohon armada kurir merujuk titik ini agar akurat. Terima kasih!`;
                        window.open(`https://wa.me/6281289345712?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full py-1.5 px-2 bg-[#00A884]/20 hover:bg-[#00A884]/30 text-emerald-300 border border-[#00A884]/30 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <Navigation className="w-3 h-3 text-emerald-400" />
                      <span>Kirim / Update Titik GPS via WA</span>
                    </button>
                  </div>

                  {/* Button to view WhatsApp Stream */}
                  <button
                    onClick={() => setActiveTab('whatsapp')}
                    className="w-full mt-2 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Lihat Riwayat Chat WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Right: 8-Step Timeline with Cobbler Notes (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-sm font-serif font-bold text-white">
                    Perjalanan Restorasi Unit (#{currentOrder.trackingCode})
                  </h4>
                  <span className="text-xs font-mono text-emerald-400">
                    Notifikasi Real-Time Aktif
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  {currentOrder.timeline.map((evt, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot icon */}
                      <div
                        className={`absolute -left-6 top-0 w-4 h-4 rounded-full flex items-center justify-center ${
                          evt.completed
                            ? 'bg-emerald-500 text-stone-950 ring-4 ring-emerald-500/20'
                            : 'bg-[#252833] text-stone-400 border border-white/20'
                        }`}
                      >
                        {evt.completed && <CheckCircle2 className="w-3 h-3 text-black" />}
                      </div>

                      {/* Timeline card content */}
                      <div
                        className={`p-4 rounded-xl border transition-all ${
                          evt.completed
                            ? 'bg-[#16181F] border-white/10'
                            : 'bg-[#101115] border-white/5 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1">
                          <span
                            className={
                              evt.completed ? 'text-emerald-400 font-semibold' : 'text-stone-400'
                            }
                          >
                            Tahap 0{idx + 1}
                          </span>
                          <span className="text-stone-400">{evt.timestamp}</span>
                        </div>

                        <h5 className="text-sm font-semibold text-white">{evt.title}</h5>
                        <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                          {evt.description}
                        </p>

                        {/* Cobbler internal micro-log if any */}
                        {evt.cobblerNote && (
                          <div className="mt-2.5 p-2.5 rounded-lg bg-[#0D0E12] border border-amber-500/20 text-xs font-mono text-amber-200/90 space-y-0.5">
                            <span className="text-[10px] text-[#D4A373] uppercase block font-bold">
                              Catatan Master Cobbler:
                            </span>
                            <span>{evt.cobblerNote}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
