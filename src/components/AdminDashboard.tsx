import React, { useState } from 'react';
import { RepairOrder, OrderStatusStep, DamageItem, PremiumMaterial } from '../types/shoe';
import { DAMAGE_CATALOG } from '../data/shoeDamageCatalog';
import { PREMIUM_MATERIALS } from '../data/premiumMaterials';
import {
  Users,
  Package,
  Wrench,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Truck,
  LogOut,
  ChevronRight,
  Filter,
  Eye,
  Edit3,
  Send,
  X,
  FileText,
  MapPin,
  Navigation,
  Locate,
  Printer,
} from 'lucide-react';

interface AdminDashboardProps {
  orders: RepairOrder[];
  onUpdateOrder: (updatedOrder: RepairOrder) => void;
  onAddNewOrder: (newOrder: RepairOrder) => void;
  onLogout: () => void;
  adminEmail: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  onUpdateOrder,
  onAddNewOrder,
  onLogout,
  adminEmail,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<RepairOrder | null>(null);
  const [selectedOrderForWhatsApp, setSelectedOrderForWhatsApp] = useState<RepairOrder | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<RepairOrder | null>(null);
  const [customWhatsAppMessage, setCustomWhatsAppMessage] = useState<string>('');
  const [isManualIntakeOpen, setIsManualIntakeOpen] = useState<boolean>(false);

  // Manual intake form states
  const [manualName, setManualName] = useState<string>('');
  const [manualWa, setManualWa] = useState<string>('');
  const [manualShoe, setManualShoe] = useState<string>('');
  const [manualCategory, setManualCategory] = useState<string>('leather_boots');
  const [manualAddress, setManualAddress] = useState<string>('Jakarta');
  const [manualDamageIds, setManualDamageIds] = useState<string[]>(['dmg-out-1']);
  const [manualMaterialIds, setManualMaterialIds] = useState<string[]>(['mat-vibram-morflex']);
  const [manualNotes, setManualNotes] = useState<string>('');
  const [manualLat, setManualLat] = useState<number>(-6.230489);
  const [manualLng, setManualLng] = useState<number>(106.812304);
  const [isManualGpsDetecting, setIsManualGpsDetecting] = useState<boolean>(false);

  const handleDetectManualGps = () => {
    setIsManualGpsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setManualLat(parseFloat(pos.coords.latitude.toFixed(6)));
          setManualLng(parseFloat(pos.coords.longitude.toFixed(6)));
          setIsManualGpsDetecting(false);
        },
        () => {
          setIsManualGpsDetecting(false);
          setManualLat(-6.230489);
          setManualLng(106.812304);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setIsManualGpsDetecting(false);
    }
  };

  const handleRequestLocationViaWA = (ord: RepairOrder) => {
    const cleanPhone = ord.whatsappNumber.replace(/^0/, '62').replace(/\D/g, '');
    const textPrompt = `*PERMINTAAN SHARE-LOCATION KURIR*\nHalo Kak ${ord.customerName},\n\nArmada penjemput/pengantar SolCraft Atelier sedang menjadwalkan penjemputan unit *${ord.shoeBrandModel}* (Order #${ord.trackingCode}).\n\nAgar kurir kami dapat tiba tepat di depan gerbang/rumah Anda tanpa tersasar, mohon bantuannya untuk membagikan *Share Location (Titik GPS Google Maps)* di chat WhatsApp ini ya Kak. 🙏\n\nTerima kasih banyak!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(textPrompt)}`, '_blank', 'noopener,noreferrer');
  };

  // Status transitions
  const advanceOrderStatus = (order: RepairOrder, nextStep: OrderStatusStep, cobblerNote?: string) => {
    const updatedTimeline = order.timeline.map((evt) => {
      if (evt.step === nextStep) {
        return {
          ...evt,
          completed: true,
          timestamp: new Date().toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WIB',
          cobblerNote: cobblerNote || evt.cobblerNote,
        };
      }
      return evt;
    });

    const updatedOrder: RepairOrder = {
      ...order,
      currentStatus: nextStep,
      timeline: updatedTimeline,
    };

    onUpdateOrder(updatedOrder);

    if (selectedOrderForDetail?.id === order.id) {
      setSelectedOrderForDetail(updatedOrder);
    }
  };

  // Open WhatsApp template sender
  const handleOpenWhatsAppModal = (order: RepairOrder) => {
    setSelectedOrderForWhatsApp(order);
    const template = `*SOLCRAFT ATELIER OFFICIAL*\nHalo Kak ${order.customerName},\n\nUpdate perbaikan sepatu *${order.shoeBrandModel}* (Resi: #${order.trackingCode}):\n\n📌 *Status:* ${order.currentStatus.toUpperCase().replace('_', ' ')}\n🛠️ *Penanganan:* ${order.selectedDamages.map((d) => d.title).join(', ')}\n💎 *Material:* ${order.selectedMaterials.map((m) => m.name).join(', ')}\n\nKondisi unit dipastikan prima dengan garansi resmi SolCraft. Hubungi kami jika ada pertanyaan tambahan. Terima kasih!`;
    setCustomWhatsAppMessage(template);
  };

  const handleSendRealWhatsApp = () => {
    if (!selectedOrderForWhatsApp) return;
    const cleanPhone = selectedOrderForWhatsApp.whatsappNumber.replace(/^0/, '62').replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWhatsAppMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSelectedOrderForWhatsApp(null);
  };

  // Submit manual new customer intake
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualWa || !manualShoe) return;

    const chosenDamages = DAMAGE_CATALOG.filter((d) => manualDamageIds.includes(d.id));
    const chosenMaterials = PREMIUM_MATERIALS.filter((m) => manualMaterialIds.includes(m.id));

    const damageTotal = chosenDamages.reduce((sum, d) => sum + d.estimatedCost, 0);
    const materialTotal = chosenMaterials.reduce((sum, m) => sum + m.priceAddon, 0);
    const grandTotal = damageTotal + materialTotal;

    const randomCode = `SC-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: RepairOrder = {
      id: `ord-${Date.now()}`,
      trackingCode: randomCode,
      customerName: manualName,
      phoneNumber: manualWa,
      whatsappNumber: manualWa,
      email: `${manualName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      address: manualAddress,
      city: 'Jakarta Selatan',
      postalCode: '12190',
      notes: manualNotes,
      shoeBrandModel: manualShoe,
      shoeCategory: manualCategory as any,
      shoeColor: 'Standard Color',
      selectedDamages: chosenDamages,
      selectedMaterials: chosenMaterials,
      pickupMethod: 'atelier_dropoff',
      pickupDate: new Date().toISOString().split('T')[0],
      pickupTimeSlot: 'Drop-off Langsung',
      paymentMethod: 'qris',
      paymentStatus: 'paid',
      totalPrice: grandTotal,
      createdAt: new Date().toISOString(),
      currentStatus: 'arrived_atelier',
      whatsappNotificationsEnabled: true,
      mapsUrl: `https://maps.google.com/?q=${manualLat},${manualLng}`,
      locationPin: {
        lat: manualLat,
        lng: manualLng,
        addressDetail: manualAddress,
      },
      timeline: [
        {
          step: 'booking_confirmed',
          title: 'Pelanggan Diterima di Atelier (Intake)',
          description: `Pesanan #${randomCode} untuk ${manualShoe} diterima langsung oleh pengelola.`,
          timestamp: 'Baru saja',
          completed: true,
        },
        {
          step: 'arrived_atelier',
          title: 'Unit Diterima di Meja Master Cobbler',
          description: 'Pemeriksaan fisik langsung dan penimbangan sepatu.',
          timestamp: 'Baru saja',
          completed: true,
        },
        {
          step: 'visual_inspection',
          title: 'Diagnosa Visual Makro',
          description: 'Inspeksi mikroskopis sebelum penanganan perbaikan.',
          timestamp: 'Menunggu',
          completed: false,
        },
        {
          step: 'cobbler_repair',
          title: 'Pengerjaan Master Cobbler',
          description: 'Pengerjaan dengan bahan premium yang dipilih.',
          timestamp: 'Menunggu',
          completed: false,
        },
        {
          step: 'qc_passed',
          title: 'Uji Mutu Fleksibilitas QC',
          description: 'Pemberian sertifikat garansi tertulis.',
          timestamp: 'Menunggu',
          completed: false,
        },
        {
          step: 'delivered',
          title: 'Pengambilan / Pengantaran ke Pelanggan',
          description: 'Sepatu selesai dan siap digunakan.',
          timestamp: 'Menunggu',
          completed: false,
        },
      ],
    };

    onAddNewOrder(newOrder);
    setIsManualIntakeOpen(false);
    // Reset form
    setManualName('');
    setManualWa('');
    setManualShoe('');
    setManualNotes('');
  };

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.currentStatus !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchCode = o.trackingCode.toLowerCase().includes(q);
      const matchShoe = o.shoeBrandModel.toLowerCase().includes(q);
      const matchWa = o.whatsappNumber.includes(q);
      if (!matchName && !matchCode && !matchShoe && !matchWa) return false;
    }
    return true;
  });

  // Calculated metrics
  const totalIncome = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const inProgressCount = orders.filter(
    (o) => o.currentStatus === 'cobbler_repair' || o.currentStatus === 'visual_inspection'
  ).length;
  const awaitingPickupCount = orders.filter(
    (o) => o.currentStatus === 'booking_confirmed' || o.currentStatus === 'pickup_scheduled'
  ).length;
  const completedCount = orders.filter(
    (o) => o.currentStatus === 'qc_passed' || o.currentStatus === 'delivered'
  ).length;

  return (
    <div className="min-h-screen bg-[#0C0D10] text-[#E5E5E2] font-sans antialiased p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Admin Top Bar */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
              SolCraft Master Control · Internal Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Dashboard Penerimaan & Manajemen Pelanggan
          </h1>
          <p className="text-xs text-stone-400">
            Kelola pesanan masuk, tugaskan kurir, update tahapan pengerjaan cobbler, dan kirim notifikasi WhatsApp otomatis.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* User badge (No email displayed as requested) */}
          <div className="bg-[#16181F] border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono">
            <span className="text-stone-400">Hak Akses:</span>
            <span className="text-[#D4A373] font-medium">Master Cobbler Administrator</span>
          </div>

          {/* Button: Terima Pelanggan Baru (Manual Intake) */}
          <button
            onClick={() => setIsManualIntakeOpen(true)}
            className="px-4 py-2 bg-[#D4A373] hover:bg-[#E7B788] text-[#0E0F12] font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Terima Pelanggan Baru (Walk-in / WA)</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-3.5 py-2 bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 border border-white/10 rounded-xl text-xs font-medium text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </header>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#14161C] border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
            <span>Total Pelanggan Terdaftar</span>
            <Users className="w-4 h-4 text-[#D4A373]" />
          </div>
          <div className="text-2xl font-mono font-bold text-white tabular-nums">
            {orders.length}
          </div>
          <div className="text-[11px] text-stone-400">Unit sepatu dalam database</div>
        </div>

        <div className="bg-[#14161C] border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
            <span>Menunggu Penjemputan</span>
            <Truck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-amber-300 tabular-nums">
            {awaitingPickupCount}
          </div>
          <div className="text-[11px] text-stone-400">Perlu penugasan armada</div>
        </div>

        <div className="bg-[#14161C] border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
            <span>Sedang Restorasi Cobbler</span>
            <Wrench className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-sky-300 tabular-nums">
            {inProgressCount}
          </div>
          <div className="text-[11px] text-stone-400">Tahap pengerjaan bengkel</div>
        </div>

        <div className="bg-[#14161C] border border-white/10 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
            <span>Estimasi Omset Servis</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tabular-nums">
            Rp {totalIncome.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-stone-400">{completedCount} pesanan telah selesai/QC</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#14161C] border border-white/10 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, resi #SC-, model sepatu..."
              className="w-full bg-[#0E0F13] border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373] font-mono"
            />
          </div>

          {/* Status Filter Segmented Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none text-xs">
            <span className="text-stone-400 font-mono text-[11px] shrink-0 mr-1">Status:</span>
            {[
              { id: 'all', label: 'Semua' },
              { id: 'booking_confirmed', label: 'Baru Masuk' },
              { id: 'pickup_scheduled', label: 'Kurir Ditugaskan' },
              { id: 'arrived_atelier', label: 'Tiba Atelier' },
              { id: 'cobbler_repair', label: 'Restorasi Cobbler' },
              { id: 'qc_passed', label: 'Lolos QC' },
              { id: 'delivered', label: 'Terkirim' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  statusFilter === f.id
                    ? 'bg-[#D4A373] text-[#0E0F12] font-semibold'
                    : 'bg-white/5 text-stone-300 hover:text-white border border-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-stone-400 font-mono text-[11px]">
                <th className="py-3 px-3">Kode Resi</th>
                <th className="py-3 px-3">Pelanggan & WhatsApp</th>
                <th className="py-3 px-3">Merek Sepatu</th>
                <th className="py-3 px-3">Kerusakan & Bahan</th>
                <th className="py-3 px-3">Status Pengerjaan</th>
                <th className="py-3 px-3">Total Biaya</th>
                <th className="py-3 px-3 text-right">Tindakan Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-stone-300">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-stone-400">
                    Tidak ada pesanan pelanggan yang sesuai dengan pencarian.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                    {/* Resi Code */}
                    <td className="py-3.5 px-3 font-mono font-bold text-white">
                      #{ord.trackingCode}
                    </td>

                    {/* Customer Info & Accurate GPS Location */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-white">{ord.customerName}</div>
                      <div className="font-mono text-stone-400 text-[11px] flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-emerald-400" />
                        <span>{ord.whatsappNumber}</span>
                      </div>

                      {/* GPS Location Status Indicator */}
                      <div className="mt-1 flex items-center gap-1">
                        {ord.mapsUrl ? (
                          <a
                            href={ord.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 hover:text-emerald-200 bg-emerald-950/50 hover:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/30 transition-colors"
                            title="Buka titik GPS navigasi kurir di Google Maps"
                          >
                            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>GPS Akurat</span>
                            <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => handleRequestLocationViaWA(ord)}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 hover:text-amber-300 bg-amber-950/40 hover:bg-amber-900/50 px-2 py-0.5 rounded border border-amber-500/30 transition-colors cursor-pointer"
                            title="Minta pelanggan share location via WhatsApp"
                          >
                            <Navigation className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>Minta GPS via WA</span>
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Shoe Info */}
                    <td className="py-3.5 px-3">
                      <div className="text-stone-200 font-medium">{ord.shoeBrandModel}</div>
                      <div className="text-stone-400 text-[11px] capitalize">{ord.shoeCategory.replace('_', ' ')}</div>
                    </td>

                    {/* Damage & Materials */}
                    <td className="py-3.5 px-3 max-w-[200px]">
                      <div className="truncate text-stone-200">
                        {ord.selectedDamages.map((d) => d.title).join(', ')}
                      </div>
                      <div className="text-[11px] text-[#D4A373] truncate">
                        {ord.selectedMaterials.map((m) => m.name).join(', ')}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono capitalize ${
                        ord.currentStatus === 'qc_passed' || ord.currentStatus === 'delivered'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          : ord.currentStatus === 'cobbler_repair'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          : 'bg-white/10 text-stone-300 border border-white/10'
                      }`}>
                        {ord.currentStatus.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-3 font-mono font-bold text-[#D4A373] tabular-nums">
                      Rp {ord.totalPrice.toLocaleString('id-ID')}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                      {/* Invoice & Certificate button */}
                      <button
                        onClick={() => setSelectedOrderForInvoice(ord)}
                        title="Cetak Faktur & Sertifikat Garansi Resmi"
                        className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-[#D4A373] border border-amber-500/30 rounded-lg font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Nota & Garansi</span>
                      </button>

                      {/* WhatsApp trigger */}
                      <button
                        onClick={() => handleOpenWhatsAppModal(ord)}
                        title="Kirim Notifikasi WhatsApp Resmi"
                        className="px-2.5 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-lg font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Kirim WA</span>
                      </button>

                      {/* Detail & Quick Advance Button */}
                      <button
                        onClick={() => setSelectedOrderForDetail(ord)}
                        className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#D4A373]" />
                        <span>Kelola Tahap</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Kelola Tahap & Detail Pesanan Pelanggan */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#14161D] border border-white/10 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-6 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#D4A373] uppercase">
                  Kelola Pesanan #{selectedOrderForDetail.trackingCode}
                </div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {selectedOrderForDetail.shoeBrandModel} — {selectedOrderForDetail.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0E0F13] p-4 rounded-xl border border-white/5 font-mono">
              <div>
                <span className="text-stone-400 block">WhatsApp:</span>
                <span className="text-white font-medium">{selectedOrderForDetail.whatsappNumber}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Metode Antar Jemput:</span>
                <span className="text-white">{selectedOrderForDetail.pickupMethod} ({selectedOrderForDetail.pickupDate})</span>
              </div>
              <div>
                <span className="text-stone-400 block">Status Saat Ini:</span>
                <span className="text-emerald-400 font-bold uppercase">{selectedOrderForDetail.currentStatus.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Total Tagihan:</span>
                <span className="text-[#D4A373] font-bold">Rp {selectedOrderForDetail.totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Accurate Location & Courier Navigation Section */}
            <div className="p-4 rounded-xl bg-[#0D0F14] border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Titik Penjemputan / Pengantaran Kurir:</span>
                </div>
                {selectedOrderForDetail.mapsUrl && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/25">
                    GPS Terverifikasi
                  </span>
                )}
              </div>

              <div className="text-xs text-stone-300 font-mono space-y-1">
                <div>Alamat: <strong className="text-white">{selectedOrderForDetail.address}, {selectedOrderForDetail.city}</strong></div>
                {selectedOrderForDetail.locationPin ? (
                  <div className="text-[11px] text-stone-400">
                    Koordinat: <span className="text-emerald-300">{selectedOrderForDetail.locationPin.lat}, {selectedOrderForDetail.locationPin.lng}</span>
                    {selectedOrderForDetail.locationPin.addressDetail && ` (${selectedOrderForDetail.locationPin.addressDetail})`}
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-400">Titik koordinat satelit belum dikirim pelanggan.</div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selectedOrderForDetail.mapsUrl ? (
                  <a
                    href={selectedOrderForDetail.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Buka Rute Navigasi di Google Maps</span>
                  </a>
                ) : (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedOrderForDetail.address + ' ' + selectedOrderForDetail.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Cari Alamat di Google Maps</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleRequestLocationViaWA(selectedOrderForDetail)}
                  className="px-3.5 py-1.5 bg-[#00A884]/20 hover:bg-[#00A884]/30 text-emerald-300 border border-[#00A884]/30 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Minta Share-Location via WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Stage Transition Quick Action Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-300 uppercase block">
                Ubah / Lanjutkan Tahap Perbaikan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'pickup_scheduled', 'Kurir khusus SolCraft telah ditugaskan.')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>1. Jadwalkan Kurir Penjemput</span>
                  <ChevronRight className="w-4 h-4 text-[#D4A373]" />
                </button>

                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'arrived_atelier', 'Unit tiba dan telah diverifikasi nomor segelnya.')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>2. Tandai Tiba di Atelier Workshop</span>
                  <ChevronRight className="w-4 h-4 text-[#D4A373]" />
                </button>

                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'visual_inspection', 'Inspeksi makro selesai: abrasi sol diukur & resep lem ditentukan.')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>3. Selesaikan Inspeksi Visual Makro</span>
                  <ChevronRight className="w-4 h-4 text-[#D4A373]" />
                </button>

                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'cobbler_repair', 'Master Cobbler sedang mengerjakan proses de-gluing & re-welting.')}
                  className="p-3 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/30 text-amber-200 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>4. Mulai Restorasi Master Cobbler</span>
                  <Wrench className="w-4 h-4 text-[#D4A373]" />
                </button>

                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'qc_passed', 'Lolos uji fleksibilitas 30-titik & sertifikat garansi diterbitkan.')}
                  className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>5. Nyatakan Lolos QC & Garansi Aktif</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </button>

                <button
                  onClick={() => advanceOrderStatus(selectedOrderForDetail, 'delivered', 'Unit telah diantar dan diserahkan ke pelanggan.')}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>6. Tandai Selesai & Terkirim</span>
                  <Truck className="w-4 h-4 text-stone-300" />
                </button>
              </div>
            </div>

            {/* Direct WhatsApp and Invoice button from within detail */}
            <div className="pt-2 flex flex-wrap justify-between items-center gap-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const ord = selectedOrderForDetail;
                    setSelectedOrderForInvoice(ord);
                  }}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-[#D4A373] border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Nota & Garansi</span>
                </button>

                <button
                  onClick={() => {
                    const ord = selectedOrderForDetail;
                    setSelectedOrderForDetail(null);
                    handleOpenWhatsAppModal(ord);
                  }}
                  className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Kirim WhatsApp</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Cetak Nota Restorasi & Sertifikat Garansi Resmi */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#12141A] border border-amber-500/30 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto text-stone-200 font-sans relative">
            {/* Top Bar with Close & Print Buttons */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D4A373]">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                <span className="uppercase tracking-wider">Dokumen Resmi SolCraft Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 bg-[#D4A373] hover:bg-[#E7B788] text-[#0E0F12] rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  onClick={() => setSelectedOrderForInvoice(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Certificate Body (Printable area) */}
            <div className="space-y-6 bg-[#0B0C0F] p-6 rounded-xl border border-white/10 shadow-inner">
              {/* Header Atelier */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="text-xl font-serif font-bold text-white tracking-tight">
                    SOLCRAFT ATELIER
                  </div>
                  <div className="text-[11px] font-mono text-[#D4A373]">
                    MASTER COBBLER FOOTWEAR RECRAFTING & RESTORATION
                  </div>
                  <div className="text-[10px] text-stone-400">
                    Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan · Telp/WA: +62 812-8934-5712
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <div className="text-[10px] text-stone-400">FAKTUR RESTORASI RESMI</div>
                  <div className="text-base font-bold text-white tracking-wider">
                    #{selectedOrderForInvoice.trackingCode}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Status: {selectedOrderForInvoice.currentStatus.toUpperCase().replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Customer and Shoe Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-stone-400 uppercase">Data Pelanggan:</div>
                  <div className="font-bold text-white text-sm">{selectedOrderForInvoice.customerName}</div>
                  <div className="text-stone-300">WhatsApp: {selectedOrderForInvoice.whatsappNumber}</div>
                  <div className="text-stone-400 text-[11px] leading-relaxed">
                    Alamat: {selectedOrderForInvoice.address}, {selectedOrderForInvoice.city}
                  </div>
                  {selectedOrderForInvoice.mapsUrl && (
                    <div className="text-emerald-400 text-[10px] flex items-center gap-1 pt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>GPS Akurat Terverifikasi</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1 bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="text-[10px] text-stone-400 uppercase">Identitas Unit Sepatu:</div>
                  <div className="font-bold text-white text-sm">{selectedOrderForInvoice.shoeBrandModel}</div>
                  <div className="text-stone-300 capitalize">
                    Kategori: {selectedOrderForInvoice.shoeCategory.replace('_', ' ')}
                  </div>
                  <div className="text-stone-300">Warna: {selectedOrderForInvoice.shoeColor}</div>
                  <div className="text-stone-400 text-[11px]">
                    Tanggal Masuk: {new Date(selectedOrderForInvoice.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#D4A373] uppercase">
                  Rincian Diagnosa Kerusakan & Material yang Digunakan:
                </div>
                <div className="border border-white/10 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 text-stone-400 font-mono text-[10px]">
                      <tr>
                        <th className="py-2 px-3">Item Tindakan / Material</th>
                        <th className="py-2 px-3">Garansi</th>
                        <th className="py-2 px-3 text-right">Biaya</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-stone-300 font-mono text-[11px]">
                      {selectedOrderForInvoice.selectedDamages.map((dmg) => (
                        <tr key={dmg.id}>
                          <td className="py-2 px-3">
                            <div className="font-semibold text-white">{dmg.title}</div>
                            <div className="text-[10px] text-stone-400">{dmg.restorationTechnique}</div>
                          </td>
                          <td className="py-2 px-3 text-emerald-400">{dmg.warrantyMonths} Bulan</td>
                          <td className="py-2 px-3 text-right">
                            Rp {dmg.estimatedCost.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                      {selectedOrderForInvoice.selectedMaterials.map((mat) => (
                        <tr key={mat.id}>
                          <td className="py-2 px-3">
                            <div className="font-semibold text-[#D4A373]">{mat.name}</div>
                            <div className="text-[10px] text-stone-400">Asal: {mat.origin} ({mat.brand})</div>
                          </td>
                          <td className="py-2 px-3 text-emerald-400">{mat.warrantyPeriod}</td>
                          <td className="py-2 px-3 text-right">
                            +Rp {mat.priceAddon.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total & Warranty Terms */}
              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-[10px] text-stone-400 uppercase">Jaminan Garansi Tertulis:</div>
                  <div className="text-emerald-400 text-[11px]">
                    ✓ Garansi Sol & Rekat Lem 12–18 Bulan (Ganti Baru Tanpa Biaya)
                  </div>
                  <div className="text-stone-400 text-[10px]">
                    Uji Laboratorium SATRA TM404: 180 N/cm Heat-Cured Bond
                  </div>
                </div>

                <div className="text-left sm:text-right bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl shrink-0">
                  <div className="text-[10px] text-stone-400">TOTAL BIAYA:</div>
                  <div className="text-xl font-bold text-[#D4A373]">
                    Rp {selectedOrderForInvoice.totalPrice.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-emerald-400">Status: {selectedOrderForInvoice.paymentStatus.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  const cleanPhone = selectedOrderForInvoice.whatsappNumber.replace(/^0/, '62').replace(/\D/g, '');
                  const textPrompt = `*FAKTUR RESTORASI & SERTIFIKAT GARANSI RESMI*\nHalo Kak ${selectedOrderForInvoice.customerName},\n\nBerikut nota resmi perbaikan sepatu *${selectedOrderForInvoice.shoeBrandModel}* (Order #${selectedOrderForInvoice.trackingCode}):\n\n💰 *Total:* Rp ${selectedOrderForInvoice.totalPrice.toLocaleString('id-ID')}\n🛡️ *Garansi:* 12–18 Bulan Tertulis Resmi\n📍 *Alamat:* ${selectedOrderForInvoice.address}\n\nTerima kasih telah mempercayakan sepatu kesayangan Anda pada SolCraft Atelier! 🙏`;
                  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(textPrompt)}`, '_blank', 'noopener,noreferrer');
                }}
                className="flex-1 py-2.5 px-4 bg-[#00A884] hover:bg-[#029071] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Ringkasan Nota ke WhatsApp Pelanggan</span>
              </button>

              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                className="py-2.5 px-5 bg-white/10 hover:bg-white/20 text-stone-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Template WhatsApp Broadcast Sender */}
      {selectedOrderForWhatsApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#14161D] border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-serif font-bold text-white">
                  Kirim Notifikasi WhatsApp ke Pelanggan
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForWhatsApp(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-stone-300 space-y-1">
              <div>Penerima: <strong className="text-white">{selectedOrderForWhatsApp.customerName}</strong></div>
              <div>Nomor WhatsApp: <strong className="text-[#D4A373] font-mono">{selectedOrderForWhatsApp.whatsappNumber}</strong></div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-stone-400">Pesan WhatsApp (Bisa diedit):</label>
              <textarea
                rows={7}
                value={customWhatsAppMessage}
                onChange={(e) => setCustomWhatsAppMessage(e.target.value)}
                className="w-full bg-[#0E0F13] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedOrderForWhatsApp(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-stone-300 rounded-xl text-xs cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleSendRealWhatsApp}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Buka & Kirim di WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Tambah Pelanggan Baru Manual (Walk-in / Telepon) */}
      {isManualIntakeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#14161D] border border-white/10 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="text-xs font-mono text-[#D4A373] uppercase">Form Intake Master</div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Penerimaan Pelanggan Baru (Walk-in / WhatsApp)
                </h3>
              </div>
              <button
                onClick={() => setIsManualIntakeOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-300">Nama Pelanggan:</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-300">Nomor WhatsApp:</label>
                  <input
                    type="text"
                    required
                    value={manualWa}
                    onChange={(e) => setManualWa(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-300">Merek & Model Sepatu:</label>
                  <input
                    type="text"
                    required
                    value={manualShoe}
                    onChange={(e) => setManualShoe(e.target.value)}
                    placeholder="Contoh: Red Wing 875 / Nike Dunk Low"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-stone-300">Kategori Sepatu:</label>
                  <select
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                  >
                    <option value="leather_boots">Boots Kulit</option>
                    <option value="sneakers">Sneakers</option>
                    <option value="dress_shoes">Dress Shoes Formal</option>
                    <option value="running_performance">Running & Sport</option>
                    <option value="luxury_heels">Luxury Heels</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-300">Alamat Lengkap / Wilayah:</label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="Jl. Sudirman, Jakarta Selatan"
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                />
              </div>

              {/* Manual GPS Location Controls */}
              <div className="p-3 rounded-xl bg-[#0D0F14] border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Titik Lokasi GPS Kurir:</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDetectManualGps}
                    disabled={isManualGpsDetecting}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Locate className={`w-3 h-3 ${isManualGpsDetecting ? 'animate-spin' : ''}`} />
                    <span>{isManualGpsDetecting ? 'Mencari...' : 'Kunci GPS Sekarang'}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-stone-400 block">Latitude:</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={manualLat}
                      onChange={(e) => setManualLat(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#090A0D] border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-stone-400 block">Longitude:</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={manualLng}
                      onChange={(e) => setManualLng(parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#090A0D] border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Damage Selector */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-300">Pilih Jenis Kerusakan:</label>
                <select
                  multiple
                  value={manualDamageIds}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, (option) => option.value);
                    setManualDamageIds(options);
                  }}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#D4A373] h-24"
                >
                  {DAMAGE_CATALOG.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} (Rp {d.estimatedCost.toLocaleString('id-ID')})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-stone-400">Tekan Ctrl/Cmd untuk memilih lebih dari satu item.</span>
              </div>

              {/* Material Selector */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-300">Pilih Bahan Premium:</label>
                <select
                  multiple
                  value={manualMaterialIds}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, (option) => option.value);
                    setManualMaterialIds(options);
                  }}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#D4A373] h-20"
                >
                  {PREMIUM_MATERIALS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} (+Rp {m.priceAddon.toLocaleString('id-ID')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-300">Catatan Kondisi Unit:</label>
                <textarea
                  rows={2}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Kondisi awal sepatu saat diterima di meja workshop..."
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualIntakeOpen(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-stone-300 rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#D4A373] hover:bg-[#E7B788] text-[#0E0F12] font-semibold rounded-xl text-xs cursor-pointer shadow-lg"
                >
                  Simpan & Terbitkan Resi Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
