import React, { useState } from 'react';
import { DAMAGE_CATALOG, SHOE_PARTS } from '../data/shoeDamageCatalog';
import { PREMIUM_MATERIALS } from '../data/premiumMaterials';
import {
  ShoeCategory,
  DamageItem,
  PremiumMaterial,
  PickupMethod,
  PaymentMethod,
  RepairOrder,
} from '../types/shoe';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  MessageCircle,
  CreditCard,
  QrCode,
  Sparkles,
  AlertCircle,
  X,
  Copy,
  MapPin,
  Navigation,
  Locate,
  ExternalLink,
} from 'lucide-react';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (newOrder: RepairOrder) => void;
  preselectedDamages?: DamageItem[];
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  isOpen,
  onClose,
  onOrderCreated,
  preselectedDamages = [],
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states
  const [shoeBrandModel, setShoeBrandModel] = useState<string>('Red Wing Iron Ranger 8111');
  const [shoeCategory, setShoeCategory] = useState<ShoeCategory>('leather_boots');
  const [shoeColor, setShoeColor] = useState<string>('Brown Leather');
  const [notes, setNotes] = useState<string>('');

  const [selectedDamages, setSelectedDamages] = useState<DamageItem[]>(
    preselectedDamages.length > 0
      ? preselectedDamages
      : [DAMAGE_CATALOG.find((d) => d.id === 'dmg-out-1')!]
  );

  const [selectedMaterials, setSelectedMaterials] = useState<PremiumMaterial[]>([
    PREMIUM_MATERIALS.find((m) => m.id === 'mat-vibram-morflex')!,
    PREMIUM_MATERIALS.find((m) => m.id === 'mat-renia-aquilim')!,
  ]);

  const [pickupMethod, setPickupMethod] = useState<PickupMethod>('solcraft_courier');
  const [pickupDate, setPickupDate] = useState<string>('2026-10-08');
  const [pickupTimeSlot, setPickupTimeSlot] = useState<string>('10:00 - 12:00 WIB');
  const [address, setAddress] = useState<string>('Jl. Senopati No. 45, Kebayoran Baru');
  const [city, setCity] = useState<string>('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState<string>('12190');

  // GPS Location Pin States
  const [gpsPin, setGpsPin] = useState<{ lat: number; lng: number; addressDetail?: string } | null>({
    lat: -6.230489,
    lng: 106.812304,
    addressDetail: 'Titik jemput Senopati, Kebayoran Baru',
  });
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string>('Titik GPS terverifikasi (Jakarta Selatan)');

  const [customerName, setCustomerName] = useState<string>('Andra Pratama');
  const [phoneNumber, setPhoneNumber] = useState<string>('081298765432');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('081298765432');
  const [email, setEmail] = useState<string>('andra.pratama@gmail.com');
  const [waNotificationsEnabled, setWaNotificationsEnabled] = useState<boolean>(true);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<RepairOrder | null>(null);

  const handleDetectCurrentGps = () => {
    setIsDetectingGps(true);
    setGpsStatusMessage('Mencari sinyal satelit GPS perangkat Anda...');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(6));
          const lng = parseFloat(pos.coords.longitude.toFixed(6));
          const accuracy = Math.round(pos.coords.accuracy || 10);
          setGpsPin({
            lat,
            lng,
            addressDetail: `Akurasi satelit ±${accuracy} meter`,
          });
          setIsDetectingGps(false);
          setGpsStatusMessage(`Titik koordinat berhasil dikunci: ${lat}, ${lng} (Akurasi ±${accuracy}m)`);
        },
        () => {
          setIsDetectingGps(false);
          const defaultLat = -6.230489;
          const defaultLng = 106.812304;
          setGpsPin({
            lat: defaultLat,
            lng: defaultLng,
            addressDetail: 'Titik jemput terkonfirmasi: Senopati, Kebayoran Baru',
          });
          setGpsStatusMessage('Titik koordinat GPS Senopati Jakarta Selatan terpasang.');
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setIsDetectingGps(false);
      setGpsStatusMessage('Peramban tidak mendukung GPS. Menggunakan patokan alamat teks.');
    }
  };

  const handleSendLocationToWhatsApp = (trackingCodeToUse?: string) => {
    const code = trackingCodeToUse || (orderSubmitted ? orderSubmitted.trackingCode : 'PENDING-BOOKING');
    const lat = gpsPin?.lat || -6.230489;
    const lng = gpsPin?.lng || 106.812304;
    const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
    const textPrompt = `*TITIK LOKASI PENJEMPUTAN SEPATU*\nHalo Admin & Kurir SolCraft Atelier,\n\nBerikut titik koordinat GPS akurat penjemputan untuk order #${code}:\n\n👤 *Nama Pelanggan:* ${customerName}\n👟 *Sepatu:* ${shoeBrandModel}\n📍 *Titik Google Maps:* ${mapsLink}\n🏠 *Alamat:* ${address}, ${city} (${postalCode})\n📝 *Catatan Kurir:* ${notes || 'Siap dijemput sesuai jadwal'}\n\nMohon kurir menggunakan titik navigasi Google Maps ini agar penjemputan 100% akurat. Terima kasih! 🙏`;
    window.open(`https://wa.me/6281289345712?text=${encodeURIComponent(textPrompt)}`, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  // Price calculations
  const damageCostTotal = selectedDamages.reduce((sum, d) => sum + d.estimatedCost, 0);
  const materialCostTotal = selectedMaterials.reduce((sum, m) => sum + m.priceAddon, 0);
  const pickupFee =
    pickupMethod === 'atelier_dropoff'
      ? 0
      : damageCostTotal + materialCostTotal > 500000
      ? 0 // Free pickup promo above Rp 500.000
      : 35000;

  const grandTotal = damageCostTotal + materialCostTotal + pickupFee;

  const handleToggleDamage = (item: DamageItem) => {
    if (selectedDamages.some((d) => d.id === item.id)) {
      setSelectedDamages(selectedDamages.filter((d) => d.id !== item.id));
    } else {
      setSelectedDamages([...selectedDamages, item]);
    }
  };

  const handleToggleMaterial = (mat: PremiumMaterial) => {
    if (selectedMaterials.some((m) => m.id === mat.id)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m.id !== mat.id));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleSubmitOrder = () => {
    const randomCode = `SC-${Math.floor(10000 + Math.random() * 90000)}`;
    const lat = gpsPin?.lat || -6.230489;
    const lng = gpsPin?.lng || 106.812304;
    const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

    const newOrder: RepairOrder = {
      id: `ord-${Date.now()}`,
      trackingCode: randomCode,
      customerName,
      phoneNumber,
      whatsappNumber,
      email,
      address,
      city,
      postalCode,
      notes,
      shoeBrandModel,
      shoeCategory,
      shoeColor,
      selectedDamages,
      selectedMaterials,
      pickupMethod,
      pickupDate,
      pickupTimeSlot,
      paymentMethod,
      paymentStatus: paymentMethod === 'split_qc' ? 'dp_paid' : 'paid',
      totalPrice: grandTotal,
      createdAt: new Date().toISOString(),
      currentStatus: 'booking_confirmed',
      whatsappNotificationsEnabled: waNotificationsEnabled,
      mapsUrl,
      locationPin: gpsPin || {
        lat,
        lng,
        addressDetail: `${address}, ${city}`,
      },
      timeline: [
        {
          step: 'booking_confirmed',
          title: 'Pesanan Berhasil Dikonfirmasi',
          description: `Pesanan #${randomCode} terdaftar untuk ${shoeBrandModel}. Safety box siap diberangkatkan.`,
          timestamp: 'Baru saja',
          completed: true,
        },
        {
          step: 'pickup_scheduled',
          title: 'Penjemputan Dijadwalkan',
          description: `Armada kurir dijadwalkan menjemput pada ${pickupDate} (${pickupTimeSlot}).`,
          timestamp: 'Menunggu jadwal',
          completed: false,
        },
        {
          step: 'courier_picked_up',
          title: 'Sepatu Diserahkan & Disegel',
          description: 'Penyegelan tamper-evident seal anti-air di hadapan pelanggan.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'arrived_atelier',
          title: 'Tiba di Atelier Workshop',
          description: 'Pemeriksaan kebersihan dan penimbangan awal unit.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'visual_inspection',
          title: 'Inspeksi Visual Makro & Laporan WA',
          description: 'Master Cobbler mengirim foto HD kerusakan dan rencana kerja via WhatsApp.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'cobbler_repair',
          title: 'Restorasi Master Cobbler',
          description: 'Pengerjaan sesuai material premium yang dipilih.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'qc_passed',
          title: 'Uji Fleksibilitas & Lolos QC',
          description: 'Pengujian kekuatan rekat tarik dan verifikasi sertifikat garansi.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'secure_packaging',
          title: 'Pengemasan Premium Dustbag',
          description: 'Pengemasan rapi anti-debu dengan shoe tree pelindung.',
          timestamp: 'Berikutnya',
          completed: false,
        },
        {
          step: 'delivered',
          title: 'Pengiriman Kembali ke Pelanggan',
          description: 'Sepatu diantar kembali ke alamat Anda dalam kondisi prima.',
          timestamp: 'Berikutnya',
          completed: false,
        },
      ],
    };

    setOrderSubmitted(newOrder);
    onOrderCreated(newOrder);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#14161C] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#101115]">
          <div>
            <div className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
              SolCraft Booking Portal
            </div>
            <h2 className="text-xl font-serif font-bold text-white">
              {orderSubmitted ? 'Pemesanan Berhasil Terkonfirmasi' : 'Form Pemesanan Servis Online'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Stepper Progress (Only if not yet submitted) */}
        {!orderSubmitted && (
          <div className="px-6 py-3 bg-[#0D0E12] border-b border-white/5 flex items-center justify-between overflow-x-auto scrollbar-none text-xs font-mono">
            {[
              { step: 1, label: '1. Detail & Kerusakan' },
              { step: 2, label: '2. Bahan Premium' },
              { step: 3, label: '3. Antar-Jemput' },
              { step: 4, label: '4. WhatsApp & Kontak' },
              { step: 5, label: '5. Pembayaran' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`flex items-center gap-1.5 py-1 px-2.5 rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                  currentStep === s.step
                    ? 'text-[#D4A373] bg-[#D4A373]/10 font-semibold'
                    : currentStep > s.step
                    ? 'text-emerald-400'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Wizard Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {orderSubmitted ? (
            /* Order Submitted Success View */
            <div className="py-6 space-y-6 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Pesanan Servis Telah Diterima!
                </h3>
                <p className="text-xs text-stone-300 mt-2">
                  Notifikasi resmi telah disiapkan untuk dikirim ke nomor WhatsApp Anda:{' '}
                  <span className="font-mono text-[#D4A373]">{orderSubmitted.whatsappNumber}</span>
                </p>
              </div>

              {/* Order ID Box */}
              <div className="bg-[#0E0F12] p-4 rounded-xl border border-white/10 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-stone-400">Kode Tracking Resmi:</span>
                  <button
                    onClick={() => copyToClipboard(orderSubmitted.trackingCode)}
                    className="text-xs font-mono text-[#D4A373] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isCopied ? 'Tersalin!' : 'Salin Kode'}</span>
                  </button>
                </div>
                <div className="text-2xl font-mono font-bold text-white tracking-widest text-center py-1">
                  {orderSubmitted.trackingCode}
                </div>
                <div className="text-xs text-stone-400 pt-2 border-t border-white/5 space-y-1">
                  <div className="flex justify-between">
                    <span>Sepatu:</span>
                    <span className="text-stone-200 font-medium">{orderSubmitted.shoeBrandModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penjemputan:</span>
                    <span className="text-stone-200">{orderSubmitted.pickupDate} ({orderSubmitted.pickupTimeSlot})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Biaya:</span>
                    <span className="text-[#D4A373] font-bold font-mono">
                      Rp {orderSubmitted.totalPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleSendLocationToWhatsApp(orderSubmitted.trackingCode)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#00A884] hover:bg-[#029071] text-white font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Titik Lokasi ke WA Admin</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#D4A373] hover:bg-[#E7B788] text-[#0E0F12] font-semibold text-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Lihat Pelacakan & Status</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Informasi Sepatu & Diagnosa Kerusakan */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      1. Identitas Sepatu & Pilihan Kerusakan
                    </h3>
                    <p className="text-xs text-stone-300">
                      Beri tahu kami jenis sepatu dan centang bagian yang mengalami kerusakan.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono text-stone-300">Merek & Model Sepatu:</label>
                      <input
                        type="text"
                        value={shoeBrandModel}
                        onChange={(e) => setShoeBrandModel(e.target.value)}
                        placeholder="Contoh: Red Wing 8111 / Nike Air Jordan 1 / Dr. Martens"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Warna / Varian:</label>
                      <input
                        type="text"
                        value={shoeColor}
                        onChange={(e) => setShoeColor(e.target.value)}
                        placeholder="Contoh: Amber Brown / Triple White"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Shoe Category Radio Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Kategori Sepatu:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'sneakers', label: 'Sneakers' },
                        { id: 'leather_boots', label: 'Boots Kulit' },
                        { id: 'dress_shoes', label: 'Dress Formal' },
                        { id: 'running_performance', label: 'Running / Olahraga' },
                        { id: 'luxury_heels', label: 'Designer Heels' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setShoeCategory(cat.id as ShoeCategory)}
                          className={`p-2 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                            shoeCategory === cat.id
                              ? 'bg-[#D4A373] text-[#0E0F12] border-[#D4A373] font-semibold'
                              : 'bg-[#0D0E12] text-stone-300 border-white/5 hover:border-white/15'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checklist of Damage items */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-stone-300">
                        Pilih Kerusakan yang Ingin Diperbaiki ({selectedDamages.length} Dipilih):
                      </label>
                      <span className="text-xs font-mono text-[#D4A373]">
                        Subtotal Kerusakan: Rp {damageCostTotal.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                      {DAMAGE_CATALOG.map((dmg) => {
                        const isChecked = selectedDamages.some((d) => d.id === dmg.id);
                        return (
                          <div
                            key={dmg.id}
                            onClick={() => handleToggleDamage(dmg)}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-[#1C1F28] border-[#D4A373]'
                                : 'bg-[#0E0F13] border-white/5 hover:border-white/10'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-1 accent-[#D4A373] rounded"
                            />
                            <div className="flex-1 text-xs">
                              <div className="font-semibold text-white">{dmg.title}</div>
                              <div className="text-stone-400 text-[11px] mt-0.5">{dmg.subtitle}</div>
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 font-mono text-[11px]">
                                <span className="text-stone-400">{dmg.estimatedDuration}</span>
                                <span className="text-[#D4A373] font-bold">
                                  Rp {dmg.estimatedCost.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-stone-300">Catatan Khusus Penanganan:</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Contoh: Tolong pertahankan warna patina alami kulitnya, jangan digelapkan. Sepatu warisan keluarga."
                      rows={2}
                      className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Pemilihan Bahan Premium */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      2. Upgrade Bahan Premium & Garansi Keawetan
                    </h3>
                    <p className="text-xs text-stone-300">
                      Pilih bahan berkualitas internasional untuk memastikan sepatu awet hingga bertahun-tahun.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PREMIUM_MATERIALS.map((mat) => {
                      const isChecked = selectedMaterials.some((m) => m.id === mat.id);
                      return (
                        <div
                          key={mat.id}
                          onClick={() => handleToggleMaterial(mat)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                            isChecked
                              ? 'bg-[#1C1F28] border-[#D4A373]'
                              : 'bg-[#0E0F13] border-white/5 hover:border-white/15'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-1">
                              <span className="text-[#D4A373]">{mat.brand}</span>
                              <span>{mat.origin}</span>
                            </div>
                            <div className="text-sm font-semibold text-white">{mat.name}</div>
                            <p className="text-xs text-stone-300 mt-1 line-clamp-2">{mat.description}</p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                            <span className="text-emerald-400 text-[11px]">{mat.warrantyPeriod}</span>
                            <span className="text-[#D4A373] font-bold">
                              +Rp {mat.priceAddon.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                    <span>
                      Setiap upgrade material dijamin 100% orisinil bersertifikat dengan jaminan garansi rekat dan ketahanan hingga 12–18 bulan.
                    </span>
                  </div>
                </div>
              )}

              {/* Step 3: Antar-Jemput (Pickup & Delivery) Aman */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      3. Layanan Antar-Jemput yang Aman & Higienis
                    </h3>
                    <p className="text-xs text-stone-300">
                      Sepatu Anda dijemput menggunakan kotak pelindung safety hardbox kedap air dan segel barcode resmi.
                    </p>
                  </div>

                  {/* Pickup Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'solcraft_courier',
                        title: 'Kurir Khusus SolCraft Atelier',
                        desc: 'Armada kami menjemput dengan Safety Hardbox & Segel Anti-Air.',
                        fee: pickupFee === 0 ? 'GRATIS (Promo)' : 'Rp 35.000',
                      },
                      {
                        id: 'instant_courier',
                        title: 'Instant Courier (GoSend / Grab)',
                        desc: 'Penjemputan prioritas dalam 2 jam setelah konfirmasi.',
                        fee: pickupFee === 0 ? 'GRATIS (Promo)' : 'Rp 35.000',
                      },
                      {
                        id: 'national_expedition',
                        title: 'Ekspedisi Nasional (JNE / SiCepat)',
                        desc: 'Untuk luar Jabodetabek, asuransi penuh perlindungan barang.',
                        fee: 'Rp 45.000',
                      },
                      {
                        id: 'atelier_dropoff',
                        title: 'Drop-off Mandiri di Workshop',
                        desc: 'Serahkan langsung di SolCraft Atelier Senopati, Jakarta Selatan.',
                        fee: 'GRATIS',
                      },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setPickupMethod(opt.id as PickupMethod)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          pickupMethod === opt.id
                            ? 'bg-[#1C1F28] border-[#D4A373]'
                            : 'bg-[#0E0F13] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-white">
                          <span>{opt.title}</span>
                          <span className="font-mono text-[#D4A373]">{opt.fee}</span>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">{opt.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Tanggal Penjemputan:</label>
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Slot Waktu Jemput:</label>
                      <select
                        value={pickupTimeSlot}
                        onChange={(e) => setPickupTimeSlot(e.target.value)}
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      >
                        <option value="10:00 - 12:00 WIB">Pagi (10:00 - 12:00 WIB)</option>
                        <option value="13:00 - 15:00 WIB">Siang (13:00 - 15:00 WIB)</option>
                        <option value="16:00 - 18:00 WIB">Sore (16:00 - 18:00 WIB)</option>
                        <option value="19:00 - 21:00 WIB">Malam (19:00 - 21:00 WIB)</option>
                      </select>
                    </div>
                  </div>

                  {/* Address Inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Alamat Lengkap Penjemputan:</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nama Jalan, Nomor Rumah, RT/RW, Patokan"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-300">Kota / Wilayah:</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Jakarta Selatan"
                          className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-stone-300">Kode Pos:</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="12190"
                          className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                        />
                      </div>
                    </div>

                    {/* Accurate GPS Location Pin & WhatsApp Share Box */}
                    <div className="mt-2 p-4 rounded-xl bg-[#101217] border border-emerald-500/25 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold text-white">
                            Titik Lokasi GPS Akurat untuk Kurir & Web Admin
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          Presisi Tinggi
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-300 leading-relaxed">
                        Kunci koordinat GPS perangkat Anda agar armada penjemput langsung menavigasi ke titik gerbang/rumah Anda tanpa tersasar.
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={handleDetectCurrentGps}
                          disabled={isDetectingGps}
                          className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Locate className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                          <span>{isDetectingGps ? 'Mendeteksi Satelit...' : 'Kunci Titik GPS Saya Sekarang'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendLocationToWhatsApp()}
                          className="px-3.5 py-2 bg-[#00A884]/20 hover:bg-[#00A884]/30 text-emerald-300 border border-[#00A884]/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Kirim Titik Lokasi ke WA Admin</span>
                        </button>
                      </div>

                      {/* GPS Status feedback badge */}
                      {gpsPin && (
                        <div className="p-2.5 rounded-lg bg-[#0A0B0E] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                          <div className="text-stone-300 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span>Koordinat: <strong className="text-white">{gpsPin.lat}, {gpsPin.lng}</strong></span>
                            <span className="text-stone-400 text-[10px]">({gpsPin.addressDetail})</span>
                          </div>

                          <a
                            href={`https://maps.google.com/?q=${gpsPin.lat},${gpsPin.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#D4A373] hover:underline flex items-center gap-1 shrink-0"
                          >
                            <span>Lihat Pin Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Kontak Pelanggan & WhatsApp Integration */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      4. Kontak Pelanggan & Notifikasi Real-Time WhatsApp
                    </h3>
                    <p className="text-xs text-stone-300">
                      Seluruh pembaruan status pengerjaan, foto diagnosa awal, dan sertifikat QC akan dikirimkan langsung ke nomor WhatsApp Anda.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Nama Lengkap:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Contoh: Andra Pratama"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Nomor WhatsApp Aktif:</label>
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="0812xxxxxxxx"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Email (Untuk Faktur Resmi):</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="andra.pratama@gmail.com"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-stone-300">Nomor Telepon Cadangan:</label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0812xxxxxxxx"
                        className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4A373]"
                      />
                    </div>
                  </div>

                  {/* Toggle Live WhatsApp Updates */}
                  <div
                    onClick={() => setWaNotificationsEnabled(!waNotificationsEnabled)}
                    className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={waNotificationsEnabled}
                      onChange={() => {}}
                      className="mt-1 accent-emerald-500"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Kirim Notifikasi Real-Time Berkala ke WhatsApp Saya</span>
                      </div>
                      <p className="text-stone-300 text-[11px] mt-1 leading-relaxed">
                        Anda akan menerima foto kondisi saat sepatu tiba di atelier, video rekaman penjahitan master cobbler, laporan QC sebelum dikirim, dan live link resi pelacakan kurir.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Pilihan Pembayaran Digital Aman */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">
                      5. Pilihan Pembayaran Digital yang Aman & Mudah
                    </h3>
                    <p className="text-xs text-stone-300">
                      Gunakan QRIS instan, Virtual Account bank utama, Kartu Kredit, atau opsi DP 50% pelunasan setelah lolos uji QC foto.
                    </p>
                  </div>

                  {/* Payment method cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: 'qris',
                        title: 'QRIS (Semua E-Wallet & Bank)',
                        desc: 'BCA, GoPay, OVO, Dana, ShopeePay, LinkAja',
                        icon: <QrCode className="w-4 h-4 text-[#D4A373]" />,
                      },
                      {
                        id: 'va_bca',
                        title: 'BCA Virtual Account',
                        desc: 'Verifikasi instan otomatis 24 jam',
                        icon: <CreditCard className="w-4 h-4 text-[#D4A373]" />,
                      },
                      {
                        id: 'va_mandiri',
                        title: 'Mandiri / BRI / BNI Virtual Account',
                        desc: 'Transfer via Livin / BRImo / BNI Mobile',
                        icon: <CreditCard className="w-4 h-4 text-[#D4A373]" />,
                      },
                      {
                        id: 'split_qc',
                        title: 'DP 50% & Pelunasan Pasca QC Foto',
                        desc: 'Bayar 50% sekarang, sisa 50% setelah puas melihat foto hasil di WA',
                        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
                      },
                    ].map((pm) => (
                      <div
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id as PaymentMethod)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          paymentMethod === pm.id
                            ? 'bg-[#1C1F28] border-[#D4A373]'
                            : 'bg-[#0E0F13] border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="mt-0.5">{pm.icon}</div>
                        <div className="text-xs">
                          <div className="font-semibold text-white">{pm.title}</div>
                          <div className="text-stone-400 text-[11px] mt-0.5">{pm.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Details Preview based on selected method */}
                  <div className="bg-[#0D0E12] p-4 rounded-xl border border-white/5 space-y-3">
                    {paymentMethod === 'qris' && (
                      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                          {/* Stylized QRIS SVG */}
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <rect width="100" height="100" fill="#FFF" />
                            <rect x="10" y="10" width="30" height="30" fill="#000" />
                            <rect x="15" y="15" width="20" height="20" fill="#FFF" />
                            <rect x="20" y="20" width="10" height="10" fill="#000" />
                            <rect x="60" y="10" width="30" height="30" fill="#000" />
                            <rect x="65" y="15" width="20" height="20" fill="#FFF" />
                            <rect x="70" y="20" width="10" height="10" fill="#000" />
                            <rect x="10" y="60" width="30" height="30" fill="#000" />
                            <rect x="15" y="65" width="20" height="20" fill="#FFF" />
                            <rect x="20" y="70" width="10" height="10" fill="#000" />
                            <rect x="50" y="50" width="15" height="15" fill="#000" />
                            <rect x="70" y="60" width="20" height="10" fill="#000" />
                            <rect x="60" y="80" width="30" height="10" fill="#000" />
                          </svg>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="font-semibold text-white">QRIS Dinamis SolCraft Atelier</div>
                          <p className="text-stone-400 text-[11px]">
                            Scan menggunakan aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau dompet digital (GoPay, OVO, Dana). Kode QR berlaku 15 menit.
                          </p>
                          <div className="text-[#D4A373] font-mono font-bold text-sm">
                            Nominal: Rp {grandTotal.toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'va_bca' && (
                      <div className="space-y-2 text-xs">
                        <div className="text-stone-400">Nomor BCA Virtual Account:</div>
                        <div className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-sm">
                          <span className="text-[#D4A373] font-bold">88029 081298765432</span>
                          <button
                            onClick={() => copyToClipboard('88029081298765432')}
                            className="text-xs text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-400">Nama Rekening: SOLCRAFT ATELIER OFFICIAL</div>
                      </div>
                    )}

                    {paymentMethod === 'split_qc' && (
                      <div className="space-y-2 text-xs">
                        <div className="text-emerald-400 font-semibold">Skema Transparansi Kepuasan Pelanggan:</div>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          Anda cukup membayar DP 50% sebesar <strong className="text-white font-mono">Rp {(grandTotal / 2).toLocaleString('id-ID')}</strong> hari ini. Sisa pembayaran 50% baru dilunasi setelah tim kami mengirimkan foto makro sepatu yang telah selesai dan dinyatakan lolos uji QC fleksibilitas melalui WhatsApp Anda.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Summary of Price Order */}
                  <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/5 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-stone-400">
                      <span>Subtotal Servis Kerusakan ({selectedDamages.length} Bagian):</span>
                      <span>Rp {damageCostTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Upgrade Material Premium ({selectedMaterials.length} Item):</span>
                      <span>Rp {materialCostTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Ongkos Antar-Jemput ({pickupMethod}):</span>
                      <span className={pickupFee === 0 ? 'text-emerald-400' : 'text-stone-300'}>
                        {pickupFee === 0 ? 'GRATIS' : `Rp ${pickupFee.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                      <span>Total Biaya Keseluruhan:</span>
                      <span className="text-[#D4A373]">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Wizard Footer Controls */}
        {!orderSubmitted && (
          <div className="p-5 border-t border-white/10 bg-[#101115] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-mono text-stone-400">Total Estimasi:</div>
                <div className="text-sm font-mono font-bold text-[#D4A373]">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </div>
              </div>

              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="px-5 py-2.5 text-xs font-semibold text-[#0E0F12] bg-[#D4A373] hover:bg-[#E7B788] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Lanjut Langkah Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  className="px-6 py-2.5 text-xs font-bold text-[#0E0F12] bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Konfirmasi & Dapatkan Kode Tracking</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
