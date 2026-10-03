import React from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  PawPrint,
  TrendingUp,
  Wheat,
  Stethoscope,
  Syringe,
  ShieldCheck,
  BrainCircuit,
  Video,
  Settings,
  LogOut,
  Building2,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  onOpenAddFarm: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onGoToFrontPage?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpenMobile, onCloseMobile, onGoToFrontPage }) => {
  const { activeTab, setActiveTab, selectedFarm, animals, alerts } = useFarm();
  const { t } = useLanguage();
  const { logout } = useAuth();

  const attentionAnimalsCount = animals.filter(a => a.healthStatus === 'attention').length;
  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'animals', label: t.animals, icon: PawPrint, badge: attentionAnimalsCount > 0 ? attentionAnimalsCount : undefined, badgeColor: 'bg-amber-500' },
    { id: 'production', label: t.production, icon: TrendingUp },
    { id: 'feed', label: t.feedAndWater, icon: Wheat },
    { id: 'health', label: t.healthAndVitals, icon: Stethoscope },
    { id: 'vaccination', label: t.vaccination, icon: Syringe },
    { id: 'biosecurity', label: t.biosecurity, icon: ShieldCheck },
    { id: 'analytics', label: t.analytics, icon: BrainCircuit },
    { id: 'videos', label: t.trainingVideos, icon: Video },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-green-900 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-green-800/80">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🛡️</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                Swasth<span className="text-emerald-400">Farm</span>
              </h1>
              <p className="text-[11px] text-green-300 font-medium">Intelligent Livestock & Analytics</p>
            </div>
          </div>

          {/* Active Farm Card */}
          {selectedFarm && (
            <div className="mt-4 p-2.5 bg-green-800/60 rounded-xl border border-green-700/60 flex items-center space-x-2.5">
              <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-white truncate">{selectedFarm.name}</div>
                <div className="text-[10px] text-green-300 truncate">{selectedFarm.location}</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md font-semibold'
                    : 'text-green-100 hover:bg-green-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.badgeColor || 'bg-emerald-500'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer / Front Page & Logout */}
        <div className="p-4 border-t border-green-800/80 space-y-1">
          {onGoToFrontPage && (
            <button
              onClick={onGoToFrontPage}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 hover:bg-green-800/80 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visit Front Page</span>
            </button>
          )}
          <button
            onClick={() => {
              logout();
              if (onGoToFrontPage) {
                onGoToFrontPage();
              }
            }}
            className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm font-semibold text-green-300 hover:bg-red-900/60 hover:text-red-200 transition-colors"
          >
            <LogOut className="w-4 h-4 text-green-400" />
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
