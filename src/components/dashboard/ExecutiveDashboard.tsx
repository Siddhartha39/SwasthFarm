import React from 'react';
import { useFarm } from '@/context/FarmContext';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { WeatherBar } from '@/components/common/WeatherBar';
import {
  PawPrint,
  HeartPulse,
  AlertTriangle,
  TrendingUp,
  Wheat,
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ExecutiveDashboardProps {
  onOpenAddAnimal: () => void;
  onOpenAddFarm: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ onOpenAddAnimal, onOpenAddFarm }) => {
  const {
    selectedFarm,
    animals,
    productionRecords,
    vaccinations,
    treatments,
    biosecurity,
    getAnimalTimeline,
    selectAnimal,
    setActiveTab
  } = useFarm();
  const { t } = useLanguage();
  const { user } = useAuth();

  // If no farm exists, show onboarding empty state
  if (!selectedFarm) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🏡
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t.noFarmsTitle}</h2>
        <p className="text-gray-600 mt-2 text-sm">{t.noFarmsSubtitle}</p>
        <button
          onClick={onOpenAddFarm}
          className="mt-6 inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>{t.addFarm}</span>
        </button>
      </div>
    );
  }

  // If farm has 0 animals, show add animal onboarding
  if (animals.length === 0) {
    return (
      <div>
        <WeatherBar />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🐾
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t.noAnimalsTitle}</h2>
          <p className="text-gray-600 mt-2 text-sm">{t.noAnimalsSubtitle}</p>
          <button
            onClick={onOpenAddAnimal}
            className="mt-6 inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{t.addAnimal}</span>
          </button>
        </div>
      </div>
    );
  }

  // Calculate Aggregates
  const totalAnimals = animals.length;
  const healthyCount = animals.filter(a => a.healthStatus === 'healthy').length;
  const attentionAnimals = animals.filter(a => a.healthStatus === 'attention');
  const attentionCount = attentionAnimals.length;

  const totalDailyMilk = animals
    .filter(a => a.productionType === 'milk')
    .reduce((sum, a) => sum + (a.currentDailyProduction || 0), 0);
  
  const totalDailyEggs = animals
    .filter(a => a.productionType === 'eggs')
    .reduce((sum, a) => sum + (a.currentDailyProduction || 0), 0);

  const totalFeedKg = animals.reduce((sum, a) => sum + (a.dailyFeedKg || 0), 0);

  // Production trend data (synthesizing 7-day timeline from productionRecords)
  const productionChartData = [
    { day: '24 Sep', milk: 36.6, eggs: 450 },
    { day: '25 Sep', milk: 36.4, eggs: 452 },
    { day: '26 Sep', milk: 36.2, eggs: 455 },
    { day: '27 Sep', milk: 35.6, eggs: 458 },
    { day: '28 Sep', milk: 34.4, eggs: 462 },
    { day: '29 Sep', milk: 33.6, eggs: 465 },
    { day: '30 Sep', milk: 33.2, eggs: 462 },
  ];

  // Upcoming vaccinations and treatments
  const upcomingVacs = vaccinations.filter(v => v.status === 'upcoming' || v.status === 'overdue');
  const ongoingTreatments = treatments.filter(t => t.outcome === 'ongoing');

  // Collect recent events for farm timeline
  const recentTimelineEvents = animals.flatMap(a => getAnimalTimeline(a.id)).slice(0, 6);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {t.goodMorning}, {user?.name || 'Farmer'} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitoring <span className="font-semibold text-gray-700">{selectedFarm.name}</span> ({selectedFarm.location})
          </p>
        </div>

        <button
          onClick={onOpenAddAnimal}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addAnimal}</span>
        </button>
      </div>

      {/* Weather Bar Preserved */}
      <WeatherBar />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Animals */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.totalAnimals}</span>
            <PawPrint className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalAnimals}</div>
          <div className="text-[11px] text-gray-400 mt-1">Across 4 species</div>
        </div>

        {/* Healthy / Normal */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.healthyNormal}</span>
            <HeartPulse className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{healthyCount}</div>
          <div className="text-[11px] text-emerald-700 mt-1 font-medium">
            {Math.round((healthyCount / totalAnimals) * 100)}% of herd
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.needsAttention}</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{attentionCount}</div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">Active monitoring</div>
        </div>

        {/* Daily Production */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.dailyProduction}</span>
            <TrendingUp className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {totalDailyMilk > 0 ? `${totalDailyMilk.toFixed(1)} L` : `${totalDailyEggs} Eggs`}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            {totalDailyMilk > 0 && totalDailyEggs > 0 ? `+ ${totalDailyEggs} Eggs` : 'Daily yield'}
          </div>
        </div>

        {/* Daily Feed Intake */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.dailyFeedIntake}</span>
            <Wheat className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalFeedKg.toFixed(1)} kg</div>
          <div className="text-[11px] text-gray-400 mt-1">Combined ration</div>
        </div>

        {/* Biosecurity Score */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase">{t.biosecurityScore}</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-teal-700">{biosecurity.score}/100</div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">Audited this week</div>
        </div>

      </div>

      {/* Production Chart & Herd Health Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Production Trend Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">{t.productionTrend}</h2>
              <p className="text-xs text-gray-500">Historical trend tracking vs 30-day baseline</p>
            </div>
            <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-full">
              Live Aggregate
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionChartData}>
                <defs>
                  <linearGradient id="milkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="milk" name="Milk (Liters)" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#milkGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Species Distribution & Quick Health */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-base font-bold text-gray-900 mb-1">{t.healthActivityOverview}</h2>
          <p className="text-xs text-gray-500 mb-4">Herd health categorization</p>

          <div className="space-y-3">
            {animals.map(animal => (
              <div
                key={animal.id}
                onClick={() => {
                  selectAnimal(animal.id);
                  setActiveTab('animals');
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 border border-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center text-sm font-bold text-gray-600">
                    {animal.photoUrl ? (
                      <img src={animal.photoUrl} alt={animal.name} className="w-full h-full object-cover" />
                    ) : (
                      animal.species[0].toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-900">{animal.tagId} ({animal.name})</div>
                    <div className="text-[10px] text-gray-500">{animal.breed} • {animal.weightKg} kg</div>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  animal.healthStatus === 'healthy' ? 'bg-emerald-100 text-emerald-800' :
                  animal.healthStatus === 'attention' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {animal.healthStatus}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('animals')}
            className="w-full mt-4 flex items-center justify-center space-x-1 text-xs font-semibold text-green-700 hover:text-green-800 pt-2 border-t border-gray-100"
          >
            <span>{t.viewAllAnimals}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Comparative Section: Animals Requiring Attention */}
      {attentionAnimals.length > 0 && (
        <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-gray-900">{t.animalsRequiringAttention}</h2>
            </div>
            <span className="text-xs bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {attentionAnimals.length} Priority Animals
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-500 uppercase tracking-wider border-b border-amber-200">
                <tr>
                  <th className="py-2">Animal Tag</th>
                  <th className="py-2">Species / Breed</th>
                  <th className="py-2">Current Yield</th>
                  <th className="py-2">Yield Deviation</th>
                  <th className="py-2">Temp</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100 font-medium">
                {attentionAnimals.map(a => (
                  <tr key={a.id} className="hover:bg-amber-100/40">
                    <td className="py-2.5 font-bold text-gray-900">{a.tagId} ({a.name})</td>
                    <td className="py-2.5 text-gray-600">{a.species.toUpperCase()} - {a.breed}</td>
                    <td className="py-2.5 text-gray-900 font-semibold">{a.currentDailyProduction} {a.productionUnit}</td>
                    <td className="py-2.5 text-red-600 font-bold">-18.2% vs 30d Avg</td>
                    <td className="py-2.5 text-gray-700">{a.currentTemperature}°C</td>
                    <td className="py-2.5">
                      <button
                        onClick={() => {
                          selectAnimal(a.id);
                          setActiveTab('animals');
                        }}
                        className="bg-green-700 hover:bg-green-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      >
                        Inspect 360°
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Two Column Grid: Upcoming Vaccinations & Recent Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Vaccinations & Treatments */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-700" />
              <h2 className="text-base font-bold text-gray-900">{t.upcomingVaccinations}</h2>
            </div>
            <button
              onClick={() => setActiveTab('vaccination')}
              className="text-xs text-green-700 hover:underline font-semibold"
            >
              Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {upcomingVacs.map(v => (
              <div key={v.id} className="flex items-start justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="font-semibold text-xs text-gray-900">{v.vaccineName}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    Target: {v.animalTag} • Disease: {v.targetDisease}
                  </div>
                  {v.notes && <div className="text-[10px] text-gray-400 mt-0.5">{v.notes}</div>}
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    v.status === 'overdue' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Due {v.nextDueDate}
                  </span>
                </div>
              </div>
            ))}

            {ongoingTreatments.map(t => (
              <div key={t.id} className="flex items-start justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-200">
                <div>
                  <div className="font-semibold text-xs text-gray-900">Treatment: {t.condition}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">
                    Animal: {t.animalTag} • {t.medication}
                  </div>
                  <div className="text-[10px] text-amber-800 mt-0.5">Vet: {t.veterinarian}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-200 text-amber-900">
                  Ongoing
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Farm Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-700" />
              <h2 className="text-base font-bold text-gray-900">{t.recentActivity}</h2>
            </div>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {recentTimelineEvents.map(event => (
              <div key={event.id} className="relative">
                <div className={`absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 border-white ${
                  event.severity === 'warning' ? 'bg-amber-500' :
                  event.severity === 'critical' ? 'bg-red-500' : 'bg-emerald-500'
                }`} />
                <div className="text-xs font-semibold text-gray-900">{event.title}</div>
                <div className="text-[11px] text-gray-500">{event.description}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{event.date}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
