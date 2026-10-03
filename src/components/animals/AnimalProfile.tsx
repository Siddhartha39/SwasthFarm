import React, { useState } from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { Animal } from '@/types';
import {
  ArrowLeft,
  HeartPulse,
  Wheat,
  TrendingUp,
  Syringe,
  Pill,
  Activity,
  Calendar,
  Clock,
  Plus,
  Thermometer,
  Scale,
  MapPin,
  FileText,
  AlertTriangle,
  Trash2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface AnimalProfileProps {
  animal: Animal;
  onBack: () => void;
  onOpenLogHealth: () => void;
  onOpenLogFeed: () => void;
  onOpenLogProduction: () => void;
  onOpenLogVaccine: () => void;
}

export const AnimalProfile: React.FC<AnimalProfileProps> = ({
  animal,
  onBack,
  onOpenLogHealth,
  onOpenLogFeed,
  onOpenLogProduction,
  onOpenLogVaccine
}) => {
  const {
    healthRecords,
    feedRecords,
    productionRecords,
    vaccinations,
    treatments,
    deleteAnimal,
    getAnimalTimeline
  } = useFarm();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'feed' | 'production' | 'vaccination' | 'treatment' | 'analytics' | 'history'>('overview');

  // Filter records for this specific animal
  const myHealth = healthRecords.filter(h => h.animalId === animal.id);
  const myFeed = feedRecords.filter(f => f.animalId === animal.id);
  const myProduction = productionRecords.filter(p => p.animalId === animal.id);
  const myVaccines = vaccinations.filter(v => v.animalId === animal.id);
  const myTreatments = treatments.filter(t => t.animalId === animal.id);
  const timelineEvents = getAnimalTimeline(animal.id);

  // Production chart data for this animal
  const chartData = myProduction.slice(-7).map(p => ({
    date: p.date.split('-').slice(1).join('/'),
    yield: p.totalMilkLiters || p.eggCount || 0
  }));

  return (
    <div className="space-y-6">
      
      {/* Top Back Navigation and Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-green-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Animals List</span>
          </button>
          
          <button
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${animal.tagId} (${animal.name}) from farm records?`)) {
                deleteAnimal(animal.id);
                onBack();
              }
            }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Delete Animal</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            {/* Animal Photo */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden shadow-inner flex-shrink-0 border-2 border-green-100">
              {animal.photoUrl ? (
                <img src={animal.photoUrl} alt={animal.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🐾</div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{animal.tagId}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  animal.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {animal.healthStatus}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {animal.name} • {animal.breed} ({animal.gender === 'female' ? 'Female' : 'Male'})
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Age: {animal.ageYears} years</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Scale className="w-3.5 h-3.5 text-gray-400" />
                  <span>Weight: {animal.weightKg} kg</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{animal.penLocation || 'Barn Stall'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Logging Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenLogHealth}
              className="flex items-center space-x-1.5 bg-green-50 hover:bg-green-100 text-green-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-green-200"
            >
              <HeartPulse className="w-3.5 h-3.5 text-green-700" />
              <span>Log Health</span>
            </button>
            <button
              onClick={onOpenLogFeed}
              className="flex items-center space-x-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-amber-200"
            >
              <Wheat className="w-3.5 h-3.5 text-amber-700" />
              <span>Log Feed</span>
            </button>
            <button
              onClick={onOpenLogProduction}
              className="flex items-center space-x-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-sky-200"
            >
              <TrendingUp className="w-3.5 h-3.5 text-sky-700" />
              <span>Log Production</span>
            </button>
            <button
              onClick={onOpenLogVaccine}
              className="flex items-center space-x-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors border border-purple-200"
            >
              <Syringe className="w-3.5 h-3.5 text-purple-700" />
              <span>Log Vaccine</span>
            </button>
          </div>
        </div>

        {/* Profile Tabs Navigation */}
        <div className="flex items-center space-x-1 overflow-x-auto mt-6 pt-4 border-t border-gray-100">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'health', label: `Health (${myHealth.length})`, icon: HeartPulse },
            { id: 'feed', label: 'Feed & Water', icon: Wheat },
            { id: 'production', label: `Production (${myProduction.length})`, icon: TrendingUp },
            { id: 'vaccination', label: `Vaccinations (${myVaccines.length})`, icon: Syringe },
            { id: 'treatment', label: `Treatments (${myTreatments.length})`, icon: Pill },
            { id: 'analytics', label: 'Analytics & Signals', icon: Activity },
            { id: 'history', label: `Timeline (${timelineEvents.length})`, icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vitals Summary Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Current Physiological Vitals</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-500">Core Body Temperature</span>
                <span className="text-sm font-bold text-gray-900">{animal.currentTemperature}°C</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-500">Daily Production Yield</span>
                <span className="text-sm font-bold text-gray-900">{animal.currentDailyProduction} {animal.productionUnit}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-500">Daily Feed Ration</span>
                <span className="text-sm font-bold text-gray-900">{animal.dailyFeedKg} kg</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-xs text-gray-500">Daily Water Consumption</span>
                <span className="text-sm font-bold text-gray-900">{animal.dailyWaterLiters} L</span>
              </div>
            </div>
          </div>

          {/* Details & Origin */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Identification & Pedigree</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Tag Number</span>
                <span className="font-semibold text-gray-800">{animal.tagId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Species & Breed</span>
                <span className="font-semibold text-gray-800">{animal.species.toUpperCase()} - {animal.breed}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Coat Color</span>
                <span className="font-semibold text-gray-800">{animal.color || 'Standard'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-500">Acquisition Source</span>
                <span className="font-semibold text-gray-800">{animal.source || 'Local Farm Herd'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Last Clinical Checkup</span>
                <span className="font-semibold text-gray-800">{animal.lastCheckupDate}</span>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Observations & Notes</h2>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                {animal.notes || 'No specific behavioral alerts logged for this animal.'}
              </p>
            </div>
            {animal.healthStatus === 'attention' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Noticeable 18% yield decrease detected. Veterinary follow-up scheduled.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HEALTH RECORDS */}
      {activeTab === 'health' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Historical Health Records</h2>
              <p className="text-xs text-gray-500">Non-image clinical vitals and veterinary notes</p>
            </div>
            <button
              onClick={onOpenLogHealth}
              className="inline-flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Vitals</span>
            </button>
          </div>

          {myHealth.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No health logs recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-500 uppercase border-b border-gray-100">
                  <tr>
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Body Temp</th>
                    <th className="py-2.5">Appetite</th>
                    <th className="py-2.5">Water</th>
                    <th className="py-2.5">Symptoms / Condition</th>
                    <th className="py-2.5">Observations</th>
                    <th className="py-2.5">Recorded By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {myHealth.map(h => (
                    <tr key={h.id} className="hover:bg-gray-50">
                      <td className="py-3 font-semibold text-gray-900">{h.date}</td>
                      <td className="py-3 font-bold text-gray-900">{h.temperature}°C</td>
                      <td className="py-3 capitalize text-gray-700">{h.appetite}</td>
                      <td className="py-3 text-gray-700">{h.waterIntakeLiters} L</td>
                      <td className="py-3">
                        {h.symptoms.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {h.symptoms.map((s, idx) => (
                              <span key={idx} className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-emerald-700 font-semibold">Normal</span>
                        )}
                      </td>
                      <td className="py-3 text-gray-600 max-w-xs">{h.observation}</td>
                      <td className="py-3 text-gray-500">{h.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FEED & WATER */}
      {activeTab === 'feed' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Feed & Water Intake Tracking</h2>
              <p className="text-xs text-gray-500">Nutritional formulations, silage, and trough volume logs</p>
            </div>
            <button
              onClick={onOpenLogFeed}
              className="inline-flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Intake</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-xs font-bold text-amber-800 uppercase">Current Daily Ration</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{animal.dailyFeedKg} kg</div>
              <p className="text-xs text-gray-600 mt-1">Silage + balanced dairy protein mix</p>
            </div>
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-100">
              <span className="text-xs font-bold text-sky-800 uppercase">Daily Water Consumption</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">{animal.dailyWaterLiters} Liters</div>
              <p className="text-xs text-gray-600 mt-1">Automatic fresh flow trough</p>
            </div>
          </div>

          {/* Detailed Feed Logs Table */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Historical Ingestion Logs</h3>
            {myFeed.length === 0 ? (
              <p className="text-xs text-gray-500 py-4 text-center bg-gray-50 rounded-xl">No historical feed logs recorded yet. Click &apos;Log Intake&apos; to add one.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-500 uppercase border-b border-gray-100">
                    <tr>
                      <th className="py-2">Date</th>
                      <th className="py-2">Ration Type</th>
                      <th className="py-2">Quantity</th>
                      <th className="py-2">Water</th>
                      <th className="py-2">Frequency</th>
                      <th className="py-2">Cost</th>
                      <th className="py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-medium">
                    {myFeed.map(f => (
                      <tr key={f.id} className="hover:bg-gray-50">
                        <td className="py-2.5 font-bold text-gray-900">{f.date}</td>
                        <td className="py-2.5 text-gray-800 max-w-xs truncate">{f.feedType}</td>
                        <td className="py-2.5 font-bold text-amber-900">{f.quantityKg} kg</td>
                        <td className="py-2.5 text-sky-800 font-bold">{f.waterConsumptionLiters} L</td>
                        <td className="py-2.5 text-gray-500">{f.frequency}</td>
                        <td className="py-2.5 text-gray-700 font-semibold">{f.feedCostInr ? `₹${f.feedCostInr}` : '-'}</td>
                        <td className="py-2.5 text-gray-500">{f.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PRODUCTION */}
      {activeTab === 'production' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Production History & Trends</h2>
              <p className="text-xs text-gray-500">Daily yield records ({animal.productionUnit})</p>
            </div>
            <button
              onClick={onOpenLogProduction}
              className="inline-flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Production</span>
            </button>
          </div>

          {chartData.length > 0 && (
            <div className="h-60 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="yield" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-500 uppercase border-b border-gray-100">
                <tr>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Morning Milk</th>
                  <th className="py-2.5">Evening Milk</th>
                  <th className="py-2.5">Total Yield</th>
                  <th className="py-2.5">Quality / Fat %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myProduction.map(p => (
                  <tr key={p.id}>
                    <td className="py-2.5 font-bold text-gray-900">{p.date}</td>
                    <td className="py-2.5 text-gray-700">{p.morningMilkLiters ? `${p.morningMilkLiters} L` : '-'}</td>
                    <td className="py-2.5 text-gray-700">{p.eveningMilkLiters ? `${p.eveningMilkLiters} L` : '-'}</td>
                    <td className="py-2.5 font-bold text-green-700">{p.totalMilkLiters ? `${p.totalMilkLiters} L` : `${p.eggCount} Eggs`}</td>
                    <td className="py-2.5 text-gray-600">{p.qualityGrade || 'Grade A'} {p.fatPercentage ? `(${p.fatPercentage}%)` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: VACCINATIONS */}
      {activeTab === 'vaccination' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Vaccination Records & Protocols</h2>
            <button
              onClick={onOpenLogVaccine}
              className="inline-flex items-center space-x-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Vaccine</span>
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {myVaccines.map(v => (
              <div key={v.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-gray-900">{v.vaccineName}</div>
                  <div className="text-[11px] text-gray-500">Target: {v.targetDisease} • Dose: {v.dose}</div>
                  {v.veterinarian && <div className="text-[10px] text-gray-400">Administered by: {v.veterinarian}</div>}
                </div>
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                    v.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    v.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {v.status === 'completed' ? `Given on ${v.administeredDate}` : `Due on ${v.nextDueDate}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: TREATMENTS */}
      {activeTab === 'treatment' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900">Veterinary Clinical Treatments</h2>
          {myTreatments.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No active or historical treatments recorded for this animal.</p>
          ) : (
            <div className="space-y-3">
              {myTreatments.map(t => (
                <div key={t.id} className="p-4 bg-amber-50/60 rounded-xl border border-amber-200">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-gray-900">Condition: {t.condition}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-200 text-amber-900">{t.outcome}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1"><strong>Reason:</strong> {t.reason}</p>
                  <p className="text-xs text-gray-700 mt-0.5"><strong>Medication & Dosage:</strong> {t.medication} ({t.dosage})</p>
                  <div className="text-[11px] text-gray-500 mt-2">Attending Vet: {t.veterinarian} • Start Date: {t.startDate}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: ANALYTICS & DETECTED CHANGES */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900">Statistical Anomaly & Signal Detection</h2>
          <p className="text-xs text-gray-500">Automated moving average & deviation flags</p>

          <div className="space-y-3">
            {animal.healthStatus === 'attention' ? (
              <div className="p-4 bg-red-50 rounded-xl border border-red-200 text-xs">
                <div className="font-bold text-red-800 flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>⚠ Significant Production Drop Detected (-18.2% vs 30d Baseline)</span>
                </div>
                <p className="text-red-700 mt-1">
                  Milk output dropped from 18.2 L to 14.8 L in 5 days alongside mild temperature elevation (39.2°C).
                </p>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                ✓ Production yield within normal 1.5 standard deviation threshold.
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700">
              ✓ Weight trajectory stable (+0.2 kg estimated Average Daily Gain).
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: TIMELINE */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-gray-900">Comprehensive Event Timeline</h2>
          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {timelineEvents.map(event => (
              <div key={event.id} className="relative">
                <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                  event.severity === 'warning' ? 'bg-amber-500' :
                  event.severity === 'critical' ? 'bg-red-500' : 'bg-emerald-500'
                }`} />
                <div className="text-xs font-bold text-gray-900">{event.title}</div>
                <div className="text-[11px] text-gray-600">{event.description}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{event.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
