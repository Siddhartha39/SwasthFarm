import React, { useState, useEffect } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { LandingPage } from '@/components/landing/LandingPage';
import { ExecutiveDashboard } from '@/components/dashboard/ExecutiveDashboard';
import { AnimalList } from '@/components/animals/AnimalList';
import { AnimalProfile } from '@/components/animals/AnimalProfile';
import { AnalyticsView } from '@/components/analytics/AnalyticsView';
import { RiskAssessmentView } from '@/components/biosecurity/RiskAssessmentView';
import { TrainingVideosView } from '@/components/videos/TrainingVideosView';
import { AIFarmAssistant } from '@/components/ai/AIFarmAssistant';

import { AddAnimalModal } from '@/components/animals/AddAnimalModal';
import { AddFarmModal } from '@/components/farms/AddFarmModal';
import { LogHealthModal } from '@/components/animals/LogHealthModal';
import { LogFeedModal } from '@/components/animals/LogFeedModal';
import { LogProductionModal } from '@/components/animals/LogProductionModal';
import { LogVaccineModal } from '@/components/animals/LogVaccineModal';
import { AuthModal } from '@/components/auth/AuthModal';

import {
  Menu,
  RotateCcw,
  Plus,
  TrendingUp,
  Wheat,
  HeartPulse,
  Syringe,
  Download,
  Save,
  CheckCircle,
  Building2,
  UserCheck,
  Calendar,
  Layers,
  LogOut
} from 'lucide-react';

export const App: React.FC = () => {
  const {
    activeTab,
    selectedAnimal,
    selectAnimal,
    resetToDemo,
    selectedFarm,
    animals,
    productionRecords,
    feedRecords,
    healthRecords,
    vaccinations,
    markVaccineAdministered,
    editFarm,
    exportFarmData
  } = useFarm();
  const { t } = useLanguage();
  const { user, isAuthenticated, updateUser, logout } = useAuth();

  const [viewMode, setViewMode] = useState<'dashboard' | 'landing'>(isAuthenticated ? 'dashboard' : 'landing');

  const handleLogout = () => {
    logout();
    setViewMode('landing');
    setMobileMenuOpen(false);
    setAuthModalOpen(false);
    selectAnimal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAuthenticated) {
      setViewMode('dashboard');
    } else {
      setViewMode('landing');
    }
  }, [isAuthenticated]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addAnimalModalOpen, setAddAnimalModalOpen] = useState(false);
  const [addFarmModalOpen, setAddFarmModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Quick logging modals
  const [logHealthModalOpen, setLogHealthModalOpen] = useState(false);
  const [logFeedModalOpen, setLogFeedModalOpen] = useState(false);
  const [logProductionModalOpen, setLogProductionModalOpen] = useState(false);
  const [logVaccineModalOpen, setLogVaccineModalOpen] = useState(false);

  // Vaccination filter
  const [vaccineFilter, setVaccineFilter] = useState<'all' | 'upcoming' | 'overdue' | 'completed'>('all');

  // Settings State
  const [farmNameEdit, setFarmNameEdit] = useState(selectedFarm?.name || '');
  const [farmLocationEdit, setFarmLocationEdit] = useState(selectedFarm?.location || '');
  const [farmTypeEdit, setFarmTypeEdit] = useState(selectedFarm?.primaryType || 'Dairy');
  const [userNameEdit, setUserNameEdit] = useState(user?.name || '');
  const [userPhoneEdit, setUserPhoneEdit] = useState(user?.phone || '');
  const [userRoleEdit, setUserRoleEdit] = useState(user?.role || 'farmer');
  const [settingsStatus, setSettingsStatus] = useState('');

  useEffect(() => {
    if (selectedFarm) {
      setFarmNameEdit(selectedFarm.name);
      setFarmLocationEdit(selectedFarm.location);
      setFarmTypeEdit(selectedFarm.primaryType || 'Dairy');
    }
  }, [selectedFarm]);

  useEffect(() => {
    if (user) {
      setUserNameEdit(user.name);
      setUserPhoneEdit(user.phone || '');
      setUserRoleEdit(user.role);
    }
  }, [user]);

  // Target animal for logging modal
  const targetAnimal = selectedAnimal || animals[0];

  // If user is not authenticated or explicitly navigated to landing page, show Front/Landing Page
  if (!isAuthenticated || viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onOpenAuth={() => setAuthModalOpen(true)}
          onEnterDashboard={() => setViewMode('dashboard')}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </>
    );
  }

  // Filtered vaccinations
  const filteredVaccinations = vaccinations.filter(v => {
    if (vaccineFilter === 'all') return true;
    return v.status === vaccineFilter;
  });

  // Calculate totals for production
  const totalDailyMilk = productionRecords
    .filter(p => p.date === new Date().toISOString().split('T')[0] || p.date === productionRecords[0]?.date)
    .reduce((sum, p) => sum + (p.totalMilkLiters || 0), 0);

  // Calculate totals for feed
  const totalDailyFeedKg = animals.reduce((sum, a) => sum + a.dailyFeedKg, 0);
  const totalDailyWaterL = animals.reduce((sum, a) => sum + a.dailyWaterLiters, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenAddFarm={() => setAddFarmModalOpen(true)}
        onGoToFrontPage={() => {
          setViewMode('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLogout={handleLogout}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        
        {/* Top Header */}
        <Header
          onOpenAddFarm={() => setAddFarmModalOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
          onGoToFrontPage={() => {
            setViewMode('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
        />

        {/* Mobile Menu Bar */}
        <div className="lg:hidden bg-green-800 text-white px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 rounded-lg hover:bg-green-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-1.5 font-bold text-sm">
            <span>🛡️</span>
            <span>SwasthFarm</span>
          </div>
          <div className="w-5" />
        </div>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          
          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              onOpenAddAnimal={() => setAddAnimalModalOpen(true)}
              onOpenAddFarm={() => setAddFarmModalOpen(true)}
            />
          )}

          {/* 2. ANIMALS */}
          {activeTab === 'animals' && (
            selectedAnimal ? (
              <AnimalProfile
                animal={selectedAnimal}
                onBack={() => selectAnimal(null)}
                onOpenLogHealth={() => setLogHealthModalOpen(true)}
                onOpenLogFeed={() => setLogFeedModalOpen(true)}
                onOpenLogProduction={() => setLogProductionModalOpen(true)}
                onOpenLogVaccine={() => setLogVaccineModalOpen(true)}
              />
            ) : (
              <AnimalList onOpenAddAnimal={() => setAddAnimalModalOpen(true)} />
            )
          )}

          {/* 3. PRODUCTION RECORDS */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.production} Records</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Comprehensive daily milking and egg yield tracking</p>
                </div>
                {targetAnimal && (
                  <button
                    onClick={() => setLogProductionModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Log Daily Yield</span>
                  </button>
                )}
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase">Recent Total Daily Milk</span>
                  <div className="text-2xl font-extrabold text-emerald-800 mt-1">{totalDailyMilk.toFixed(1)} L</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Morning & evening combined output</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase">Milking Livestock</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">
                    {animals.filter(a => a.productionType === 'milk').length} Head
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Dairy cattle & Murrah buffaloes</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-gray-500 uppercase">Total Logged Entries</span>
                  <div className="text-2xl font-extrabold text-sky-800 mt-1">{productionRecords.length} Records</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Stored in local database</p>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Animal / Tag</th>
                      <th className="py-2.5">Species</th>
                      <th className="py-2.5">Morning Milk</th>
                      <th className="py-2.5">Evening Milk</th>
                      <th className="py-2.5">Total Yield</th>
                      <th className="py-2.5">Fat % / Quality</th>
                      <th className="py-2.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {productionRecords.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold text-gray-900">{p.date}</td>
                        <td className="py-3 font-bold text-emerald-800">{p.animalTag}</td>
                        <td className="py-3 uppercase text-gray-500">{p.species}</td>
                        <td className="py-3 text-gray-700">{p.morningMilkLiters ? `${p.morningMilkLiters} L` : '-'}</td>
                        <td className="py-3 text-gray-700">{p.eveningMilkLiters ? `${p.eveningMilkLiters} L` : '-'}</td>
                        <td className="py-3 font-extrabold text-gray-900">{p.totalMilkLiters ? `${p.totalMilkLiters} L` : `${p.eggCount} Eggs`}</td>
                        <td className="py-3 text-gray-600">{p.fatPercentage ? `${p.fatPercentage}%` : p.qualityGrade || 'Grade A'}</td>
                        <td className="py-3 text-gray-400">{p.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. FEED & WATER */}
          {activeTab === 'feed' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.feedAndWater}</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Nutritional rations, silage usage, and trough hydration logs</p>
                </div>
                {targetAnimal && (
                  <button
                    onClick={() => setLogFeedModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Log Feed & Water</span>
                  </button>
                )}
              </div>

              {/* Feed Totals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-amber-800 uppercase">Herd Daily Dry Matter / Ration</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">{totalDailyFeedKg.toFixed(1)} kg</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Silage + dairy protein concentrate</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-sky-800 uppercase">Herd Daily Water Intake</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">{totalDailyWaterL.toFixed(1)} Liters</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Fresh automatic trough flow</p>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <span className="text-xs font-bold text-emerald-800 uppercase">Est. Daily Ration Cost</span>
                  <div className="text-2xl font-extrabold text-gray-900 mt-1">₹{Math.round(totalDailyFeedKg * 9.5)}</div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Calculated at current fodder rates</p>
                </div>
              </div>

              {/* Animal Feed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {animals.map(a => (
                  <div key={a.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-gray-900">{a.tagId} ({a.name})</div>
                      <div className="text-xs text-gray-500">{a.breed} • {a.species.toUpperCase()}</div>
                      <div className="mt-2 text-xs text-gray-700">
                        <strong>Daily Ration:</strong> {a.dailyFeedKg} kg | <strong>Water:</strong> {a.dailyWaterLiters} L
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        selectAnimal(a.id);
                        setLogFeedModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200"
                    >
                      Update Feed
                    </button>
                  </div>
                ))}
              </div>

              {/* Detailed Feed Logs Table */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Ingestion & Water Logs</h3>
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Animal</th>
                      <th className="py-2.5">Ration Formulation</th>
                      <th className="py-2.5">Feed (kg)</th>
                      <th className="py-2.5">Water (L)</th>
                      <th className="py-2.5">Frequency</th>
                      <th className="py-2.5">Cost</th>
                      <th className="py-2.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {feedRecords.map(f => (
                      <tr key={f.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold text-gray-900">{f.date}</td>
                        <td className="py-3 font-bold text-amber-900">{f.animalTag}</td>
                        <td className="py-3 text-gray-800 max-w-xs">{f.feedType}</td>
                        <td className="py-3 font-bold text-gray-900">{f.quantityKg} kg</td>
                        <td className="py-3 font-bold text-sky-800">{f.waterConsumptionLiters} L</td>
                        <td className="py-3 text-gray-500">{f.frequency}</td>
                        <td className="py-3 font-semibold text-gray-700">{f.feedCostInr ? `₹${f.feedCostInr}` : '-'}</td>
                        <td className="py-3 text-gray-400">{f.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. HEALTH & VITALS */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.healthAndVitals}</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Empirical vitals logs, temperatures, and veterinary clinical observations</p>
                </div>
                {targetAnimal && (
                  <button
                    onClick={() => setLogHealthModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Log Clinical Vitals</span>
                  </button>
                )}
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {animals.map(a => (
                  <div key={a.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-gray-900">{a.tagId} ({a.name})</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          a.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {a.healthStatus}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{a.species.toUpperCase()} • Last Temp: {a.currentTemperature}°C</div>
                    </div>
                    <button
                      onClick={() => {
                        selectAnimal(a.id);
                        setLogHealthModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200"
                    >
                      Log Vitals
                    </button>
                  </div>
                ))}
              </div>

              {/* Clinical Records Table */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Historical Clinical Checkups</h3>
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Animal</th>
                      <th className="py-2.5">Temp (°C)</th>
                      <th className="py-2.5">Symptoms</th>
                      <th className="py-2.5">Appetite</th>
                      <th className="py-2.5">Observations</th>
                      <th className="py-2.5">Recorded By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {healthRecords.map(h => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold text-gray-900">{h.date}</td>
                        <td className="py-3 font-bold text-emerald-900">{h.animalTag}</td>
                        <td className="py-3 font-bold text-gray-800">
                          <span className={h.temperature > 39.2 ? 'text-amber-700 font-extrabold' : ''}>
                            {h.temperature}°C
                          </span>
                        </td>
                        <td className="py-3 text-gray-600">
                          {h.symptoms.length > 0 ? h.symptoms.join(', ') : 'Normal'}
                        </td>
                        <td className="py-3 capitalize text-gray-700">{h.appetite}</td>
                        <td className="py-3 text-gray-600 max-w-xs">{h.observation}</td>
                        <td className="py-3 text-gray-400">{h.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. VACCINATIONS */}
          {activeTab === 'vaccination' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.vaccination} & Protocols</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Herd immunization schedule, batch records, and due date alerts</p>
                </div>
                {targetAnimal && (
                  <button
                    onClick={() => setLogVaccineModalOpen(true)}
                    className="inline-flex items-center space-x-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Schedule / Record Vaccine</span>
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="flex gap-2 border-b border-gray-200 pb-3 text-xs">
                {(['all', 'upcoming', 'overdue', 'completed'] as const).map(tabKey => (
                  <button
                    key={tabKey}
                    onClick={() => setVaccineFilter(tabKey)}
                    className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-colors ${
                      vaccineFilter === tabKey
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {tabKey} ({tabKey === 'all' ? vaccinations.length : vaccinations.filter(v => v.status === tabKey).length})
                  </button>
                ))}
              </div>

              {/* Vaccine List */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="divide-y divide-gray-100">
                  {filteredVaccinations.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-500">
                      No vaccination records matching the selected filter.
                    </div>
                  ) : (
                    filteredVaccinations.map(v => (
                      <div key={v.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-sm text-gray-900">{v.vaccineName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Target Animal: <span className="font-bold text-gray-800">{v.animalTag}</span> • Disease: {v.targetDisease} • Dose: {v.dose}
                          </div>
                          {v.notes && <p className="text-[11px] text-gray-400 mt-1">{v.notes}</p>}
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            v.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            v.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {v.status === 'completed' ? `Given on ${v.administeredDate}` : `Due on ${v.nextDueDate}`}
                          </span>

                          {v.status !== 'completed' && (
                            <button
                              onClick={() => markVaccineAdministered(v.id)}
                              className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors"
                            >
                              ✓ Mark as Given
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 7. BIOSECURITY */}
          {activeTab === 'biosecurity' && <RiskAssessmentView />}

          {/* 8. ANALYTICS */}
          {activeTab === 'analytics' && <AnalyticsView />}

          {/* 9. VIDEOS */}
          {activeTab === 'videos' && <TrainingVideosView />}

          {/* 10. SETTINGS & PROFILE */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.settings} & Enterprise Controls</h1>
                <p className="text-xs text-gray-500 mt-0.5">Farm details, farmer profile, data export, and database tools</p>
              </div>

              {settingsStatus && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{settingsStatus}</span>
                </div>
              )}

              {/* Farm Details Form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>Active Farm Information</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Farm Name</label>
                    <input
                      type="text"
                      value={farmNameEdit}
                      onChange={e => setFarmNameEdit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Location / District</label>
                    <input
                      type="text"
                      value={farmLocationEdit}
                      onChange={e => setFarmLocationEdit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Primary Enterprise Focus</label>
                  <select
                    value={farmTypeEdit}
                    onChange={e => setFarmTypeEdit(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Dairy">Dairy (Cattle & Buffalo)</option>
                    <option value="Poultry">Poultry (Broiler / Layer)</option>
                    <option value="Mixed">Mixed Livestock Herd</option>
                    <option value="Piggery">Piggery / Swine Unit</option>
                    <option value="Small Ruminant">Goat & Sheep Unit</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (selectedFarm) {
                        editFarm(selectedFarm.id, {
                          name: farmNameEdit,
                          location: farmLocationEdit,
                          primaryType: farmTypeEdit
                        });
                        setSettingsStatus('✅ Farm information updated successfully!');
                        setTimeout(() => setSettingsStatus(''), 2500);
                      }
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Farm Changes</span>
                  </button>
                </div>
              </div>

              {/* User Profile Form */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-gray-900 font-bold text-sm">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Farmer / User Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={userNameEdit}
                      onChange={e => setUserNameEdit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={userPhoneEdit}
                      onChange={e => setUserPhoneEdit(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      updateUser({
                        name: userNameEdit,
                        phone: userPhoneEdit,
                        role: userRoleEdit as any
                      });
                      setSettingsStatus('✅ User profile updated successfully!');
                      setTimeout(() => setSettingsStatus(''), 2500);
                    }}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </div>

              {/* Data Backup & Export */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-gray-800">Export & Backup Farm Records</h3>
                <p className="text-xs text-gray-500">
                  Export all herd telemetry, milk production history, feed logs, and vaccination charts into a standard JSON backup file.
                </p>
                <button
                  onClick={exportFarmData}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4 text-sky-600" />
                  <span>Download Complete Farm Data (.JSON)</span>
                </button>
              </div>

              {/* Reset Database */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-gray-800">Demo Database Factory Reset</h3>
                <p className="text-xs text-gray-500">
                  Restore all records back to the original Kanpur dairy herd and Karnal poultry farm benchmarks.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Reset all farm data back to defaults? Custom entries will be erased.")) {
                      resetToDemo();
                      alert('Demo data restored to defaults.');
                    }
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>

              {/* Active Session & Logout */}
              <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Current Login Session</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Logged in as <span className="font-semibold text-gray-800">{user?.name}</span> ({user?.role}) • {user?.email || user?.phone}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 uppercase">
                    Active
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out & Return to Front Page</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Floating AI Farm Assistant */}
      <AIFarmAssistant />

      {/* Modals */}
      <AddAnimalModal
        isOpen={addAnimalModalOpen}
        onClose={() => setAddAnimalModalOpen(false)}
      />

      <AddFarmModal
        isOpen={addFarmModalOpen}
        onClose={() => setAddFarmModalOpen(false)}
      />

      {targetAnimal && (
        <>
          <LogHealthModal
            isOpen={logHealthModalOpen}
            onClose={() => setLogHealthModalOpen(false)}
            animal={targetAnimal}
          />
          <LogFeedModal
            isOpen={logFeedModalOpen}
            onClose={() => setLogFeedModalOpen(false)}
            animal={targetAnimal}
          />
          <LogProductionModal
            isOpen={logProductionModalOpen}
            onClose={() => setLogProductionModalOpen(false)}
            animal={targetAnimal}
          />
          <LogVaccineModal
            isOpen={logVaccineModalOpen}
            onClose={() => setLogVaccineModalOpen(false)}
            animal={targetAnimal}
          />
        </>
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

    </div>
  );
};
