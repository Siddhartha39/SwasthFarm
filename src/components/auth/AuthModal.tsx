import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFarm } from '@/context/FarmContext';
import {
  X,
  Phone,
  Mail,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  Building2,
  Lock,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, loginWithPhone, loginWithEmail, registerUser, loginWithGoogle, loginAsDemo, logout } = useAuth();
  const { switchFarm, farms } = useFarm();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Sign In state
  const [email, setEmail] = useState('rajesh.sharma@swasthfarm.in');
  const [password, setPassword] = useState('password123');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otp, setOtp] = useState('123456');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState<'farmer' | 'farm_manager' | 'veterinarian'>('farmer');
  const [regFarmName, setRegFarmName] = useState('');
  const [regLocation, setRegLocation] = useState('Kanpur, Uttar Pradesh');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSignInEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await loginWithEmail(email, password);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('✅ Signed in successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.error || 'Login failed. Please check your credentials.');
    }
  };

  const handleSignInPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await loginWithPhone(phoneNumber, otp);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('✅ Verified phone & signed in!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.error || 'Verification failed.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    const res = await registerUser({
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: regRole,
      farmName: regFarmName,
      location: regLocation,
      password: regPassword
    });
    setLoading(false);

    if (res.success) {
      setSuccessMsg('🎉 Account & farm created successfully!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.error || 'Could not complete registration.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success) {
      setSuccessMsg('✅ Connected with Google!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 500);
    }
  };

  const handleSelectDemo = (role: 'farmer' | 'veterinarian') => {
    loginAsDemo(role);
    setSuccessMsg(`✅ Authenticated as ${role === 'veterinarian' ? 'Dr. Sarah Verma (Vet)' : 'Rajesh Sharma (Farmer)'}`);
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-7 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white text-lg shadow-sm">
              🐾
            </div>
            <div>
              <h2 className="text-base font-black text-gray-900">
                {mode === 'signin' ? 'Sign In to SwasthFarm' : 'Create Farm Account'}
              </h2>
              <p className="text-[11px] text-gray-500">
                {mode === 'signin' ? 'Access your livestock records & farm analytics' : 'Start managing your multi-animal herd'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Card if Logged In */}
        {user && (
          <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Active Session: {user.name}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 text-[10px] font-extrabold uppercase">
                {user.role}
              </span>
            </div>
            <p className="text-gray-600 mt-1 text-[11px]">{user.email || user.phone}</p>
            
            <button
              onClick={() => {
                logout();
                setSuccessMsg('Logged out successfully.');
                setTimeout(() => {
                  setSuccessMsg('');
                  onClose();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 200);
              }}
              className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
            >
              Sign Out & Return to Front Page
            </button>
          </div>
        )}

        {/* Notification Banners */}
        {errorMsg && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Mode Switcher: Sign In vs Create Account */}
        <div className="flex bg-gray-100 p-1 rounded-2xl mt-4">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Existing Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* 1. SIGN IN MODE */}
        {mode === 'signin' && (
          <div className="mt-4 space-y-4">
            
            {/* Method Toggle: Email vs Phone */}
            <div className="flex border-b border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
                  authMethod === 'email'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email & Password</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
                  authMethod === 'phone'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Mobile OTP</span>
              </button>
            </div>

            {/* Email Form */}
            {authMethod === 'email' && (
              <form onSubmit={handleSignInEmail} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="farmer@swasthfarm.in"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In with Password'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Phone Form */}
            {authMethod === 'phone' && (
              <form onSubmit={handleSignInPhone} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">10-Digit Mobile Number</label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-r-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">6-Digit Verification Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-mono font-bold tracking-widest text-center focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Universal test verification code: <strong>123456</strong></p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>{loading ? 'Verifying OTP...' : 'Verify & Enter Farm'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Quick Demo Credentials */}
            <div className="pt-3 border-t border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">
                Quick Evaluator Access (1-Click)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelectDemo('farmer')}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-900 text-left transition-colors"
                >
                  <div className="font-bold text-[11px] flex items-center space-x-1">
                    <span>👨‍🌾</span>
                    <span>Farmer Rajesh</span>
                  </div>
                  <div className="text-[10px] text-emerald-700">Kanpur Dairy Herd</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectDemo('veterinarian')}
                  className="p-2.5 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100 text-teal-900 text-left transition-colors"
                >
                  <div className="font-bold text-[11px] flex items-center space-x-1">
                    <span>🩺</span>
                    <span>Dr. Sarah, DVM</span>
                  </div>
                  <div className="text-[10px] text-teal-700">Veterinary Access</div>
                </button>
              </div>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>🌐</span>
              <span>Continue with Google Account</span>
            </button>

          </div>
        )}

        {/* 2. REGISTER / CREATE ACCOUNT MODE */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@farm.in"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile (+91) *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="9876543210"
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Role / Account Type</label>
                <select
                  value={regRole}
                  onChange={e => setRegRole(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="farmer">Farmer / Dairy Owner</option>
                  <option value="farm_manager">Farm Manager</option>
                  <option value="veterinarian">Veterinarian / DVM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Farm Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patel Dairy Farm"
                  value={regFarmName}
                  onChange={e => setRegFarmName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Farm Location (City, State)</label>
              <input
                type="text"
                placeholder="e.g. Anand, Gujarat"
                value={regLocation}
                onChange={e => setRegLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Password (6+ chars) *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={regConfirmPassword}
                  onChange={e => setRegConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>{loading ? 'Creating Your Farm...' : 'Register & Enter Dashboard'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
