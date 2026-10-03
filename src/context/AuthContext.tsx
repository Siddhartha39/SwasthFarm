import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithPhone: (phone: string, otp: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateUser: (profile: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-farmer-01',
  name: 'Rajesh Sharma',
  phone: '+91 9876543210',
  email: 'rajesh.sharma@swasthfarm.in',
  role: 'farmer',
  createdAt: '2025-09-01'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('swasth_auth_user');
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(DEFAULT_USER);
        localStorage.setItem('swasth_auth_user', JSON.stringify(DEFAULT_USER));
      }
    } catch (e) {
      setUser(DEFAULT_USER);
    }
  }, []);

  const loginWithPhone = async (phone: string, otp: string): Promise<boolean> => {
    // Preserve the simplified OTP mechanism where 123456 is universally valid for tests
    if (otp === '123456' || otp.length === 6) {
      const newUser: UserProfile = {
        id: `usr-${phone.replace(/\D/g, '').slice(-10)}`,
        name: `Farmer ${phone.slice(-4)}`,
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        role: 'farmer',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      localStorage.setItem('swasth_auth_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const loginWithEmail = async (email: string, _pass: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr-${email.split('@')[0]}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: 'farmer',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('swasth_auth_user', JSON.stringify(newUser));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const newUser: UserProfile = {
      id: 'usr-google-demo',
      name: 'Dr. Sarah Verma, DVM',
      email: 'dr.sarah@swasthfarm.in',
      role: 'veterinarian',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('swasth_auth_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('swasth_auth_user');
  };

  const updateUser = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    localStorage.setItem('swasth_auth_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loginWithPhone,
      loginWithEmail,
      loginWithGoogle,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
