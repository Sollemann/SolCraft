import React, { useState } from 'react';
import { RepairOrder, OrderStatusStep } from '../types/shoe';
import {
  Send,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  Camera,
  Play,
  MapPin,
  Navigation,
} from 'lucide-react';

interface WhatsAppSimulatorProps {
  order: RepairOrder;
  onAdvanceOrderStatus?: (orderId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'atelier' | 'customer';
  timestamp: string;
  text: string;
  mediaType?: 'image' | 'video_card' | 'qc_badge' | 'location_pin';
  mediaCaption?: string;
  locationData?: {
    lat: number;
    lng: number;
    mapsUrl: string;
    address: string;
  };
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({
  order,
  onAdvanceOrderStatus,
}) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'atelier',
      timestamp: '09:20',
      text: `*SOLCRAFT ATELIER OFFICIAL*\n\nHalo Kak ${order.customerName}! ✨\n\nPesanan servis sepatu Anda telah kami terima dengan detail berikut:\n\n📋 *ID Pelacakan:* #${order.trackingCode}\n👟 *Unit:* ${order.shoeBrandModel}\n🛠️ *Penanganan:* ${order.selectedDamages.map((d) => d.title).join(', ')}\n💎 *Material Pilihan:* ${order.selectedMaterials.map((m) => m.name).join(', ')}\n\nArmada kurir khusus kami akan menjemput unit pada *${order.pickupDate}* dengan *Safety Hardbox Kedap Air*. Kami akan mengirimkan foto setiap tahapan pengerjaan ke chat ini.`,
    },
    {
      id: 'm2',
      sender: 'atelier',
      timestamp: '10:45',
      text: `📦 *UPDATE PENJEMPUTAN UNIT*\n\nSepatu Anda telah berhasil diserahkan ke Kurir SolCraft dan disegel dengan kode *Tamper-Evident Seal #SEAL-${order.trackingCode.replace('SC-', '')}*.\n\nUnit sedang dalam perjalanan aman menuju Atelier Workshop Pusat.`,
      mediaType: 'image',
      mediaCaption: 'Foto: Kotak Safety Hardbox Bersegel di Armada Penjemputan',
    },
    {
      id: 'm3',
      sender: 'atelier',
      timestamp: '13:00',
      text: `🔬 *LAPORAN DIAGNOSA MAKRO VISUAL*\n\nUnit telah tiba di meja steril Master Cobbler. Berdasarkan inspeksi mikroskopis:\n\n• Sol luar mengalami abrasi 85%\n• Struktur perekat lama telah mengkristal rapuh\n• Pori kulit upper membutuhkan nutrisi mink oil sebelum dijahit ulang\n\nPengerjaan restorasi dimulai hari ini menggunakan perekat polimer Jerman Renia Aquilim 315 dan benang Barbour Waxed Linen.`,
      mediaType: 'image',
      mediaCaption: 'Foto Makro: Inspeksi Awal Kondisi Sol & Welting Sepatu',
    },
    {
      id: 'm4',
      sender: 'atelier',
      timestamp: '16:30',
      text: `⚙️ *LOG PENGERJAAN MASTER COBBLER*\n\nProses pemotongan sol Vibram dan penjahitan Goodyear welt 2-needle hand stitch sedang berjalan dengan presisi tinggi. Suhu aktivasi lem terjaga pada 70°C untuk daya rekat maksimal bergaransi.`,
      mediaType: 'video_card',
      mediaCaption: 'Video: Cuplikan 10 Detik Penjahitan Welt Presisi oleh Master Cobbler',
    },
    {
      id: 'm5',
      sender: 'atelier',
      timestamp: 'Baru saja',
      text: `✅ *QUALITY CONTROL (QC) LOLOS 100%*\n\nRestorasi sepatu Kak ${order.customerName} telah rampung! Unit telah melalui uji fleksibilitas 30-titik dan diberi nutrisi Saphir Médaille d’Or 1925 Prancis.\n\nSertifikat Garansi Resmi Fisik telah disertakan di dalam dus.`,
      mediaType: 'qc_badge',
      mediaCaption: 'Sertifikat Kelulusan Uji Mutu & Garansi Resmi SolCraft',
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'customer',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      text: inputMessage,
    };

    setChatLog((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Automatic CS Cobbler Response simulation
    setTimeout(() => {
      const cobblerReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'atelier',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text: `Terima kasih atas pesan Anda, Kak ${order.customerName}! 🙏\n\nSepatu Anda (*${order.shoeBrandModel}*) sedang dalam penanganan Master Cobbler dengan standar garansi tertinggi. Setiap perkembangan langsung kami dokumentasikan secara transparan. Jika ada permintaan khusus tambahan, tim kami siap melayani.`,
      };
      setChatLog((prev) => [...prev, cobblerReply]);
    }, 1200);
  };

  const handleShareLocationViaWA = () => {
    const lat = order.locationPin?.lat || -6.230489;
    const lng = order.locationPin?.lng || 106.812304;
    const mapsLink = order.mapsUrl || `https://maps.google.com/?q=${lat},${lng}`;
    const address = order.address || 'Jl. Senopati, Kebayoran Baru, Jakarta Selatan';

    const locationMsg: ChatMessage = {
      id: `loc-${Date.now()}`,
      sender: 'customer',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      text: `📍 *SHARE LOCATION: TITIK GPS PENJEMPUTAN*\nBerikut titik koordinat lokasi akurat saya untuk penjemputan unit #${order.trackingCode}:\n\n🔗 ${mapsLink}`,
      mediaType: 'location_pin',
      locationData: {
        lat,
        lng,
        mapsUrl: mapsLink,
        address,
      },
    };

    setChatLog((prev) => [...prev, locationMsg]);

    setTimeout(() => {
      const cobblerReply: ChatMessage = {
        id: `reply-loc-${Date.now()}`,
        sender: 'atelier',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text: `✅ *TITIK LOKASI DITERIMA DI SISTEM WEB ADMIN*\n\nTerima kasih Kak ${order.customerName}! Titik koordinat GPS Google Maps (${lat}, ${lng}) telah tersimpan dan terverifikasi di Dashboard Web Admin kami.\n\nArmada kurir SolCraft akan menavigasi langsung ke titik pin tersebut agar penjemputan/pengantaran 100% akurat tanpa tersasar.`,
      };
      setChatLog((prev) => [...prev, cobblerReply]);
    }, 1000);
  };

  const openRealWhatsApp = () => {
    const lat = order.locationPin?.lat || -6.230489;
    const lng = order.locationPin?.lng || 106.812304;
    const mapsLink = order.mapsUrl || `https://maps.google.com/?q=${lat},${lng}`;
    const textPrompt = encodeURIComponent(
      `Halo SolCraft Atelier, berikut titik lokasi GPS akurat penjemputan perbaikan #${order.trackingCode} untuk sepatu ${order.shoeBrandModel}:\n\n📍 Link Google Maps: ${mapsLink}\n🏠 Alamat: ${order.address}\n👤 Nama: ${order.customerName}`
    );
    window.open(`https://wa.me/6281289345712?text=${textPrompt}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#0B141A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[650px] max-h-[85vh]">
      {/* WhatsApp Header */}
      <div className="bg-[#202C33] px-4 py-3 flex items-center justify-between border-b border-[#2A3942] text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#1A382B] border border-emerald-500/30 flex items-center justify-center font-serif font-bold text-[#D4A373]">
              SC
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#202C33]"></span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-medium text-sm">
              <span>SolCraft Atelier</span>
              {/* Verified Badge */}
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-[#0B141A] flex items-center justify-center text-[9px] font-bold">
                ✓
              </span>
            </div>
            <div className="text-[11px] text-stone-300">
              Akun Resmi Terverifikasi · Respon Cepat (&lt; 2 menit)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-stone-300">
          <button
            onClick={openRealWhatsApp}
            title="Buka Chat WhatsApp Asli"
            className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-xs font-mono text-emerald-400 flex items-center gap-1"
          >
            <span>Buka di WA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Message Chat Feed (WhatsApp wallpaper texture background) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[radial-gradient(#1A242B_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Security Encryption Notice */}
        <div className="text-center my-2">
          <span className="bg-[#182229] text-[#8696A0] text-[10px] px-3 py-1 rounded-lg inline-block border border-white/5 font-mono">
            🔒 Pesan terenkripsi aman. Notifikasi pengerjaan resmi nomor order #{order.trackingCode}.
          </span>
        </div>

        {chatLog.map((msg) => {
          const isAtelier = msg.sender === 'atelier';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAtelier ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 py-2.5 text-xs shadow-md ${
                  isAtelier
                    ? 'bg-[#202C33] text-[#E9EDEF] rounded-tl-none border border-[#2A3942]'
                    : 'bg-[#005C4B] text-[#E9EDEF] rounded-tr-none'
                }`}
              >
                {/* Media attachments */}
                {msg.mediaType === 'image' && (
                  <div className="mb-2 rounded-xl bg-[#111B21] border border-white/10 p-2 text-center overflow-hidden">
                    <div className="aspect-[16/9] bg-gradient-to-tr from-[#161D22] to-[#253238] rounded-lg flex flex-col items-center justify-center p-3 text-stone-300">
                      <Camera className="w-6 h-6 text-[#D4A373] mb-1" />
                      <span className="text-[11px] font-mono font-medium text-stone-200">
                        {msg.mediaCaption}
                      </span>
                      <span className="text-[9px] text-stone-400 mt-0.5">
                        Resolusi Makro HD 4K · Diunggah oleh Master Cobbler
                      </span>
                    </div>
                  </div>
                )}

                {msg.mediaType === 'video_card' && (
                  <div className="mb-2 rounded-xl bg-[#111B21] border border-white/10 p-2 text-center">
                    <div className="aspect-[16/9] bg-gradient-to-tr from-[#161D22] to-[#222E35] rounded-lg flex flex-col items-center justify-center p-3 text-stone-300 relative group cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-[#D4A373] text-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Play className="w-5 h-5 ml-0.5" />
                      </div>
                      <span className="text-[11px] font-mono text-stone-200 mt-2">
                        {msg.mediaCaption}
                      </span>
                    </div>
                  </div>
                )}

                {msg.mediaType === 'qc_badge' && (
                  <div className="mb-2 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-emerald-300 font-mono">
                        HASIL UJI FLEKSIBILITAS: LOLOS
                      </div>
                      <div className="text-[10px] text-stone-300">
                        Daya rekat tarik &gt; 180 N/cm · Garansi Resmi 12 Bulan Aktif
                      </div>
                    </div>
                  </div>
                )}

                {msg.mediaType === 'location_pin' && msg.locationData && (
                  <div className="mb-2 p-3 rounded-xl bg-[#111B21] border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300">
                      <div className="flex items-center gap-1.5 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Titik Pin GPS Terverifikasi</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Akurat</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono">
                      <div className="text-stone-300 flex justify-between">
                        <span>Koordinat:</span>
                        <strong className="text-white">{msg.locationData.lat}, {msg.locationData.lng}</strong>
                      </div>
                      <div className="text-stone-400 text-[10px] truncate">
                        {msg.locationData.address}
                      </div>
                    </div>

                    <a
                      href={msg.locationData.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Buka di Google Maps Navigasi</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {/* Formatted Text Message */}
                <div className="whitespace-pre-line leading-relaxed text-[12px]">
                  {msg.text}
                </div>

                {/* Timestamp & Read ticks */}
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696A0]">
                  <span>{msg.timestamp}</span>
                  {isAtelier && <CheckCheck className="w-3.5 h-3.5 text-sky-400" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Quick Prompts for Customer */}
      <div className="px-3 py-2 bg-[#182229] border-t border-[#222E35] flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
        {/* Prominent Share Location Trigger */}
        <button
          onClick={handleShareLocationViaWA}
          className="px-3 py-1 bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-500/40 rounded-lg whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1 font-semibold shrink-0"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>📍 Kirim Titik Lokasi GPS ke Admin</span>
        </button>

        <span className="text-stone-400 shrink-0 text-[10px]">Tanya CS:</span>
        <button
          onClick={() => {
            setInputMessage('Kapan estimasi sepatu saya selesai di-QC?');
          }}
          className="px-2.5 py-1 bg-[#202C33] hover:bg-[#2A3942] text-stone-300 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
        >
          Estimasi selesai kapan?
        </button>
        <button
          onClick={() => {
            setInputMessage('Bisa minta foto close up bagian sol Vibramnya min?');
          }}
          className="px-2.5 py-1 bg-[#202C33] hover:bg-[#2A3942] text-stone-300 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
        >
          Minta foto detail sol
        </button>
        <button
          onClick={() => {
            setInputMessage('Alamat pengiriman balik ingin saya ubah, bisa min?');
          }}
          className="px-2.5 py-1 bg-[#202C33] hover:bg-[#2A3942] text-stone-300 rounded-lg whitespace-nowrap cursor-pointer transition-colors"
        >
          Ubah alamat pengiriman balik
        </button>
      </div>

      {/* WhatsApp Input Bar */}
      <div className="bg-[#202C33] p-3 flex items-center gap-2 border-t border-[#2A3942]">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Ketik pesan atau pertanyaan untuk Master Cobbler..."
          className="flex-1 bg-[#2A3942] text-[#E9EDEF] rounded-xl px-4 py-2.5 text-xs focus:outline-none placeholder:text-[#8696A0]"
        />

        <button
          onClick={handleSendMessage}
          className="w-10 h-10 rounded-xl bg-[#00A884] hover:bg-[#029071] text-white flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
