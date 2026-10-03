import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Building2, Plus, Bell, Globe, ChevronDown, Check, AlertTriangle, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenAddFarm: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddFarm, onOpenAuth }) => {
  const { farms, selectedFarm, switchFarm, alerts, weather, markAlertRead } = useFarm();
  const { language, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();

  const [farmDropdownOpen, setFarmDropdownOpen] = useState(false);
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);

  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
        
        {/* Left: Farm Selector */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setFarmDropdownOpen(!farmDropdownOpen)}
              className="flex items-center space-x-2 bg-green-50 hover:bg-green-100/80 text-green-900 border border-green-200 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <Building2 className="w-4 h-4 text-green-700" />
              <span className="max-w-[140px] sm:max-w-[220px] truncate">
                {selectedFarm ? selectedFarm.name : t.selectFarm}
              </span>
              <ChevronDown className="w-4 h-4 text-green-700" />
            </button>

            {/* Farm Selector Dropdown */}
            {farmDropdownOpen && (
              <div 
                className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setFarmDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {t.allFarms} ({farms.length})
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  {farms.map(f => (
                    <button
                      key={f.id}
                      onClick={() => {
                        switchFarm(f.id);
                        setFarmDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-sm hover:bg-green-50 transition-colors ${
                        f.id === selectedFarm?.id ? 'bg-green-50/80 font-bold text-green-800' : 'text-gray-700'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-medium truncate">{f.name}</div>
                        <div className="text-xs text-gray-500">{f.location} • {f.totalAnimals} Animals</div>
                      </div>
                      {f.id === selectedFarm?.id && <Check className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                  <button
                    onClick={() => {
                      setFarmDropdownOpen(false);
                      onOpenAddFarm();
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addFarm}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Farm Location Pill */}
          {selectedFarm && (
            <span className="hidden md:inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
              📍 {selectedFarm.location}
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Weather preview chip */}
          <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700">
            <span>🌤️ {weather.city}:</span>
            <span className="font-bold text-gray-900">{weather.temp}°C</span>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              weather.stressLevel === 'normal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              THI {weather.thiIndex}
            </span>
          </div>

          {/* Language Toggle (English | हिंदी) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-gray-600" />
            <span>{language === 'en' ? '🌐 हिंदी' : '🌐 English'}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setAlertsDropdownOpen(!alertsDropdownOpen)}
              className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Alerts Dropdown */}
            {alertsDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setAlertsDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-4 h-4 text-green-700" />
                    <span className="font-bold text-gray-800 text-sm">{t.alertCenter}</span>
                  </div>
                  <span className="text-xs bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full">
                    {unreadAlerts.length} Unread
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                  {alerts.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-500">
                      {t.noAlerts}
                    </div>
                  ) : (
                    alerts.slice(0, 5).map(alert => (
                      <div 
                        key={alert.id}
                        className={`p-3.5 hover:bg-gray-50 transition-colors ${!alert.read ? 'bg-amber-50/40' : ''}`}
                        onClick={() => markAlertRead(alert.id)}
                      >
                        <div className="flex items-start justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.type.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            {new Date(alert.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-800 mt-1 font-medium">{alert.reason}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button 
            onClick={onOpenAuth}
            className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-600 to-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'SF'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-gray-700 max-w-[100px] truncate">
              {user?.name || 'Farmer'}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};
