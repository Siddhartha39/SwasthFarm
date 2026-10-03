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

import { Menu, RotateCcw, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const {
    activeTab,
    selectedAnimal,
    selectAnimal,
    resetToDemo,
    selectedFarm,
    animals,
    productionRecords,
    vaccinations
  } = useFarm();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const [viewMode, setViewMode] = useState<'dashboard' | 'landing'>(isAuthenticated ? 'dashboard' : 'landing');

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        onOpenAddFarm={() => setAddFarmModalOpen(true)}
        onGoToFrontPage={() => setViewMode('landing')}
      />

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex-1 flex flex-col">
        
        {/* Top Header */}
        <Header
          onOpenAddFarm={() => setAddFarmModalOpen(true)}
          onOpenAuth={() => setAuthModalOpen(true)}
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
          
          {/* Active Tab Router */}
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              onOpenAddAnimal={() => setAddAnimalModalOpen(true)}
              onOpenAddFarm={() => setAddFarmModalOpen(true)}
            />
          )}

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

          {activeTab === 'production' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.production} Records</h1>
                <p className="text-xs text-gray-500 mt-0.5">Comprehensive daily milking and egg yield tracking</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Animal / Flock</th>
                      <th className="py-2.5">Species</th>
                      <th className="py-2.5">Morning Milk</th>
                      <th className="py-2.5">Evening Milk</th>
                      <th className="py-2.5">Total Daily Yield</th>
                      <th className="py-2.5">Quality / Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {productionRecords.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 font-semibold text-gray-900">{p.date}</td>
                        <td className="py-3 font-bold text-green-800">{p.animalTag}</td>
                        <td className="py-3 uppercase text-gray-500">{p.species}</td>
                        <td className="py-3 text-gray-700">{p.morningMilkLiters ? `${p.morningMilkLiters} L` : '-'}</td>
                        <td className="py-3 text-gray-700">{p.eveningMilkLiters ? `${p.eveningMilkLiters} L` : '-'}</td>
                        <td className="py-3 font-extrabold text-gray-900">{p.totalMilkLiters ? `${p.totalMilkLiters} L` : `${p.eggCount} Eggs`}</td>
                        <td className="py-3 text-gray-500">{p.qualityGrade || 'Standard'} {p.notes || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'feed' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.feedAndWater}</h1>
                <p className="text-xs text-gray-500 mt-0.5">Nutritional rations, silage usage, and trough hydration logs</p>
              </div>
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
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200"
                    >
                      Update Feed
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.healthAndVitals}</h1>
                <p className="text-xs text-gray-500 mt-0.5">Empirical vitals logs, temperatures, and veterinary clinical observations</p>
              </div>
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
                      className="px-3 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 text-xs font-bold border border-green-200"
                    >
                      Log Vitals
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vaccination' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.vaccination} & Preventative Protocols</h1>
                <p className="text-xs text-gray-500 mt-0.5">Herd immunization schedule, batch records, and due date alerts</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                <div className="divide-y divide-gray-100">
                  {vaccinations.map(v => (
                    <div key={v.id} className="py-3.5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-gray-900">{v.vaccineName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Target Animal: <span className="font-bold text-gray-700">{v.animalTag}</span> • Disease: {v.targetDisease} • Dose: {v.dose}
                        </div>
                        {v.notes && <p className="text-[11px] text-gray-400 mt-1">{v.notes}</p>}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        v.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        v.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {v.status === 'completed' ? `Given on ${v.administeredDate}` : `Due on ${v.nextDueDate}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'biosecurity' && <RiskAssessmentView />}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'videos' && <TrainingVideosView />}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6 max-w-2xl">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{t.settings}</h1>
                <p className="text-xs text-gray-500 mt-0.5">Platform configuration, units, and demo data management</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-2">
                <h3 className="font-bold text-gray-800">Current Farm Details</h3>
                <p className="text-gray-600"><strong>Name:</strong> {selectedFarm?.name}</p>
                <p className="text-gray-600"><strong>Location:</strong> {selectedFarm?.location}</p>
                <p className="text-gray-600"><strong>Type:</strong> {selectedFarm?.primaryType}</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-2">Demo Data Reset</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Reset the multi-farm demo database back to default factory settings (Kanpur dairy herd & Karnal poultry enterprise).
                </p>
                <button
                  onClick={() => {
                    resetToDemo();
                    alert('Demo data has been reset to defaults.');
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-600" />
                  <span>Reset Demo Data</span>
                </button>
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
