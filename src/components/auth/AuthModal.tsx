import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Phone, Mail, Shield, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithPhone, loginWithEmail, loginWithGoogle, logout } = useAuth();

  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('123456');
  const [email, setEmail] = useState('rajesh.sharma@swasthfarm.in');
  const [password, setPassword] = useState('password123');
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginWithPhone(phoneNumber, otp);
    if (success) {
      setMsg('✅ Authenticated successfully!');
      setTimeout(() => {
        setMsg('');
        onClose();
      }, 700);
    } else {
      setMsg('❌ Invalid OTP. (Use test OTP: 123456)');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmail(email, password);
    setMsg('✅ Logged in successfully!');
    setTimeout(() => {
      setMsg('');
      onClose();
    }, 700);
  };

  const handleGoogleSubmit = async () => {
    await loginWithGoogle();
    setMsg('✅ Logged in as Dr. Sarah Verma (Veterinarian)!');
    setTimeout(() => {
      setMsg('');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100 p-6">
        
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🛡️</span>
            <h2 className="text-base font-bold text-gray-900">Swasth Farm Authentication</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Status */}
        {user ? (
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 text-xs">
            <div className="flex items-center space-x-2 text-green-800 font-bold">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Currently Logged In</span>
            </div>
            <p className="mt-1 text-gray-700"><strong>Name:</strong> {user.name}</p>
            <p className="text-gray-700"><strong>Role:</strong> {user.role.toUpperCase()}</p>
            <p className="text-gray-700"><strong>Contact:</strong> {user.phone || user.email}</p>
            
            <button
              onClick={() => {
                logout();
                setMsg('Logged out.');
                setTimeout(() => {
                  setMsg('');
                  onClose();
                }, 300);
              }}
              className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs shadow-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : null}

        {/* Tabs: Phone vs Email */}
        <div className="flex border-b border-gray-200 mt-4">
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors ${
              authMethod === 'phone' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'
            }`}
          >
            📱 Phone (OTP: 123456)
          </button>
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-colors ${
              authMethod === 'email' ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500'
            }`}
          >
            ✉️ Email / Password
          </button>
        </div>

        {authMethod === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-3 mt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (10 Digits)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-r-xl text-xs font-semibold focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Verification OTP</label>
              <input
                type="text"
                required
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono font-bold tracking-widest text-center focus:ring-2 focus:ring-green-500"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                Preserved test mode: OTP <strong>123456</strong> is pre-filled.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
            >
              Sign In with Mobile
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-3 mt-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
            >
              Sign In with Email
            </button>
          </form>
        )}

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase text-gray-400 font-bold bg-white px-2">Or</div>
        </div>

        <button
          onClick={handleGoogleSubmit}
          className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
        >
          <span>🌐 Quick Sign In as Veterinarian (Google Demo)</span>
        </button>

        {msg && <div className="mt-3 text-center text-xs font-bold text-green-700">{msg}</div>}

      </div>
    </div>
  );
};
