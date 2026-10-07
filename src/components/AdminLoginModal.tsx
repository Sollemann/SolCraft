import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, X, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Validate credentials requested by the user:
      // Email: 50zarwtn50@gmail.com
      // Password: Hafidahcantik87
      if (
        email.trim().toLowerCase() === '50zarwtn50@gmail.com' &&
        password === 'Hafidahcantik87'
      ) {
        setIsLoading(false);
        onLoginSuccess(email);
        onClose();
      } else {
        setIsLoading(false);
        setErrorMsg('Email atau kata sandi tidak valid. Akses ditolak.');
      }
    }, 400);
  };

  const handleQuickFill = () => {
    setEmail('50zarwtn50@gmail.com');
    setPassword('Hafidahcantik87');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#14161D] border border-white/10 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4A373] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="text-xs font-mono text-[#D4A373] uppercase tracking-wider">
            Portal Khusus Pengelola
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Masuk ke Dashboard Admin
          </h3>
          <p className="text-xs text-stone-300">
            Akses khusus untuk menerima dan memproses pesanan perbaikan pelanggan SolCraft Atelier.
          </p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Email Pengelola:</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email pengelola..."
              required
              className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#D4A373] font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-stone-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Kata Sandi:</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                required
                className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#D4A373] font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#D4A373] hover:bg-[#E7B788] active:scale-[0.98] text-[#0E0F12] font-semibold text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span>Memverifikasi Akses...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
