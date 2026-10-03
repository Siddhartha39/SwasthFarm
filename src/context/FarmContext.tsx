import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Farm,
  Animal,
  HealthRecord,
  FeedRecord,
  ProductionRecord,
  VaccinationRecord,
  TreatmentRecord,
  ActivityRecord,
  AlertItem,
  WeatherData,
  BiosecurityAudit,
  HistoricalEvent
} from '@/types';
import {
  INITIAL_FARMS,
  INITIAL_ANIMALS,
  INITIAL_HEALTH_RECORDS,
  INITIAL_PRODUCTION_RECORDS,
  INITIAL_VACCINATIONS,
  INITIAL_TREATMENTS,
  INITIAL_ALERTS,
  INITIAL_WEATHER,
  INITIAL_BIOSECURITY
} from '@/data/mockInitialData';

interface FarmContextType {
  // Farms
  farms: Farm[];
  selectedFarmId: string | null;
  selectedFarm: Farm | null;
  switchFarm: (farmId: string) => void;
  addFarm: (farm: Omit<Farm, 'id' | 'totalAnimals' | 'createdDate'>) => Farm;
  
  // Animals
  animals: Animal[];
  selectedAnimalId: string | null;
  selectedAnimal: Animal | null;
  selectAnimal: (animalId: string | null) => void;
  addAnimal: (animal: Omit<Animal, 'id' | 'farmId'>) => Animal;
  updateAnimal: (id: string, updates: Partial<Animal>) => void;
  deleteAnimal: (id: string) => void;

  // Records for current farm
  healthRecords: HealthRecord[];
  feedRecords: FeedRecord[];
  productionRecords: ProductionRecord[];
  vaccinations: VaccinationRecord[];
  treatments: TreatmentRecord[];
  activityRecords: ActivityRecord[];

  // Record Logging
  addHealthRecord: (record: Omit<HealthRecord, 'id' | 'farmId' | 'date'>) => HealthRecord;
  addFeedRecord: (record: Omit<FeedRecord, 'id' | 'farmId' | 'date'>) => FeedRecord;
  addProductionRecord: (record: Omit<ProductionRecord, 'id' | 'farmId' | 'date'>) => ProductionRecord;
  addVaccination: (record: Omit<VaccinationRecord, 'id' | 'farmId'>) => VaccinationRecord;
  addTreatment: (record: Omit<TreatmentRecord, 'id' | 'farmId'>) => TreatmentRecord;

  // Animal Timeline Helper
  getAnimalTimeline: (animalId: string) => HistoricalEvent[];

  // Alerts
  alerts: AlertItem[];
  markAlertRead: (alertId: string) => void;
  dismissAlert: (alertId: string) => void;

  // Weather & Biosecurity
  weather: WeatherData;
  biosecurity: BiosecurityAudit;
  toggleBiosecurityCheck: (checkId: string) => void;

  // Active view routing
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Reset demo
  resetToDemo: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(INITIAL_FARMS[0]?.id || null);
  const [allAnimals, setAllAnimals] = useState<Animal[]>(INITIAL_ANIMALS);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const [allHealth, setAllHealth] = useState<HealthRecord[]>(INITIAL_HEALTH_RECORDS);
  const [allFeed, setAllFeed] = useState<FeedRecord[]>([]);
  const [allProduction, setAllProduction] = useState<ProductionRecord[]>(INITIAL_PRODUCTION_RECORDS);
  const [allVaccinations, setAllVaccinations] = useState<VaccinationRecord[]>(INITIAL_VACCINATIONS);
  const [allTreatments, setAllTreatments] = useState<TreatmentRecord[]>(INITIAL_TREATMENTS);
  const [allActivities, setAllActivities] = useState<ActivityRecord[]>([]);
  
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [weather] = useState<WeatherData>(INITIAL_WEATHER);
  const [biosecurity, setBiosecurity] = useState<BiosecurityAudit>(INITIAL_BIOSECURITY);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Load from local storage if available
  useEffect(() => {
    try {
      const savedFarms = localStorage.getItem('swasth_farms');
      if (savedFarms) setFarms(JSON.parse(savedFarms));

      const savedSelectedFarm = localStorage.getItem('swasth_selected_farm');
      if (savedSelectedFarm) setSelectedFarmId(savedSelectedFarm);

      const savedAnimals = localStorage.getItem('swasth_animals');
      if (savedAnimals) setAllAnimals(JSON.parse(savedAnimals));
    } catch (e) {
      console.warn("Storage sync fallback:", e);
    }
  }, []);

  // Filter items by current selected farm
  const selectedFarm = farms.find(f => f.id === selectedFarmId) || null;
  const currentFarmAnimals = allAnimals.filter(a => a.farmId === selectedFarmId);
  const selectedAnimal = currentFarmAnimals.find(a => a.id === selectedAnimalId) || null;

  const currentFarmHealth = allHealth.filter(h => h.farmId === selectedFarmId);
  const currentFarmFeed = allFeed.filter(f => f.farmId === selectedFarmId);
  const currentFarmProduction = allProduction.filter(p => p.farmId === selectedFarmId);
  const currentFarmVaccines = allVaccinations.filter(v => v.farmId === selectedFarmId);
  const currentFarmTreatments = allTreatments.filter(t => t.farmId === selectedFarmId);
  const currentFarmActivities = allActivities.filter(ac => ac.farmId === selectedFarmId);
  const currentFarmAlerts = alerts.filter(al => al.farmId === selectedFarmId);

  const switchFarm = (farmId: string) => {
    setSelectedFarmId(farmId);
    setSelectedAnimalId(null);
    localStorage.setItem('swasth_selected_farm', farmId);
  };

  const addFarm = (data: Omit<Farm, 'id' | 'totalAnimals' | 'createdDate'>): Farm => {
    const newFarm: Farm = {
      ...data,
      id: `farm-${Date.now()}`,
      totalAnimals: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    const updated = [...farms, newFarm];
    setFarms(updated);
    setSelectedFarmId(newFarm.id);
    setSelectedAnimalId(null);
    localStorage.setItem('swasth_farms', JSON.stringify(updated));
    localStorage.setItem('swasth_selected_farm', newFarm.id);
    return newFarm;
  };

  const selectAnimal = (animalId: string | null) => {
    setSelectedAnimalId(animalId);
  };

  const addAnimal = (data: Omit<Animal, 'id' | 'farmId'>): Animal => {
    if (!selectedFarmId) throw new Error("Please select or create a farm first.");
    const newAnimal: Animal = {
      ...data,
      id: `anim-${Date.now()}`,
      farmId: selectedFarmId,
    };
    const updated = [newAnimal, ...allAnimals];
    setAllAnimals(updated);
    
    // Update farm count
    setFarms(prev => prev.map(f => f.id === selectedFarmId ? { ...f, totalAnimals: f.totalAnimals + 1 } : f));
    localStorage.setItem('swasth_animals', JSON.stringify(updated));
    return newAnimal;
  };

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    const updated = allAnimals.map(a => a.id === id ? { ...a, ...updates } : a);
    setAllAnimals(updated);
    localStorage.setItem('swasth_animals', JSON.stringify(updated));
  };

  const deleteAnimal = (id: string) => {
    const updated = allAnimals.filter(a => a.id !== id);
    setAllAnimals(updated);
    if (selectedAnimalId === id) setSelectedAnimalId(null);
    setFarms(prev => prev.map(f => f.id === selectedFarmId ? { ...f, totalAnimals: Math.max(0, f.totalAnimals - 1) } : f));
    localStorage.setItem('swasth_animals', JSON.stringify(updated));
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id' | 'farmId' | 'date'>): HealthRecord => {
    const today = new Date().toISOString().split('T')[0];
    const newRec: HealthRecord = {
      ...record,
      id: `hr-${Date.now()}`,
      farmId: selectedFarmId || 'default',
      date: today
    };
    setAllHealth(prev => [newRec, ...prev]);

    // Update animal's current temperature and checkup date
    updateAnimal(record.animalId, {
      currentTemperature: record.temperature,
      lastCheckupDate: today,
      healthStatus: record.temperature > 39.3 ? 'attention' : 'healthy'
    });

    return newRec;
  };

  const addFeedRecord = (record: Omit<FeedRecord, 'id' | 'farmId' | 'date'>): FeedRecord => {
    const today = new Date().toISOString().split('T')[0];
    const newRec: FeedRecord = {
      ...record,
      id: `feed-${Date.now()}`,
      farmId: selectedFarmId || 'default',
      date: today
    };
    setAllFeed(prev => [newRec, ...prev]);
    updateAnimal(record.animalId, {
      dailyFeedKg: record.quantityKg,
      dailyWaterLiters: record.waterConsumptionLiters
    });
    return newRec;
  };

  const addProductionRecord = (record: Omit<ProductionRecord, 'id' | 'farmId' | 'date'>): ProductionRecord => {
    const today = new Date().toISOString().split('T')[0];
    const newRec: ProductionRecord = {
      ...record,
      id: `prod-${Date.now()}`,
      farmId: selectedFarmId || 'default',
      date: today
    };
    setAllProduction(prev => [newRec, ...prev]);
    
    const yieldAmount = record.totalMilkLiters || record.eggCount || 0;
    updateAnimal(record.animalId, {
      currentDailyProduction: yieldAmount
    });
    return newRec;
  };

  const addVaccination = (record: Omit<VaccinationRecord, 'id' | 'farmId'>): VaccinationRecord => {
    const newRec: VaccinationRecord = {
      ...record,
      id: `vac-${Date.now()}`,
      farmId: selectedFarmId || 'default'
    };
    setAllVaccinations(prev => [newRec, ...prev]);
    return newRec;
  };

  const addTreatment = (record: Omit<TreatmentRecord, 'id' | 'farmId'>): TreatmentRecord => {
    const newRec: TreatmentRecord = {
      ...record,
      id: `tr-${Date.now()}`,
      farmId: selectedFarmId || 'default'
    };
    setAllTreatments(prev => [newRec, ...prev]);
    return newRec;
  };

  const getAnimalTimeline = (animalId: string): HistoricalEvent[] => {
    const events: HistoricalEvent[] = [];

    // Health
    allHealth.filter(h => h.animalId === animalId).forEach(h => {
      events.push({
        id: `ev-${h.id}`,
        date: h.date,
        type: 'health',
        title: `Health Checkup: ${h.temperature}°C`,
        description: `${h.observation} (Condition: ${h.generalCondition})`,
        severity: h.temperature > 39.3 ? 'warning' : 'info'
      });
    });

    // Production
    allProduction.filter(p => p.animalId === animalId).forEach(p => {
      events.push({
        id: `ev-${p.id}`,
        date: p.date,
        type: 'production',
        title: `Yield Recorded: ${p.totalMilkLiters ? `${p.totalMilkLiters} L Milk` : `${p.eggCount} Eggs`}`,
        description: `Quality: ${p.qualityGrade || 'Standard'}${p.fatPercentage ? `, Fat: ${p.fatPercentage}%` : ''}`,
        severity: 'info'
      });
    });

    // Vaccinations
    allVaccinations.filter(v => v.animalId === animalId).forEach(v => {
      events.push({
        id: `ev-${v.id}`,
        date: v.administeredDate || v.nextDueDate,
        type: 'vaccination',
        title: `Vaccine: ${v.vaccineName}`,
        description: `Status: ${v.status.toUpperCase()} (Dose: ${v.dose})`,
        severity: v.status === 'overdue' ? 'critical' : 'info'
      });
    });

    // Treatments
    allTreatments.filter(t => t.animalId === animalId).forEach(t => {
      events.push({
        id: `ev-${t.id}`,
        date: t.startDate,
        type: 'treatment',
        title: `Treatment: ${t.condition}`,
        description: `Med: ${t.medication}, Outcome: ${t.outcome}`,
        severity: 'warning'
      });
    });

    // Sort descending by date
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const markAlertRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, read: true } : a));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const toggleBiosecurityCheck = (checkId: string) => {
    setBiosecurity(prev => {
      const updated = prev.checklist.map(item => item.id === checkId ? { ...item, completed: !item.completed } : item);
      const completedCount = updated.filter(c => c.completed).length;
      const score = Math.round((completedCount / updated.length) * 100);
      return {
        ...prev,
        checklist: updated,
        score
      };
    });
  };

  const resetToDemo = () => {
    setFarms(INITIAL_FARMS);
    setSelectedFarmId(INITIAL_FARMS[0]?.id || null);
    setAllAnimals(INITIAL_ANIMALS);
    setAllHealth(INITIAL_HEALTH_RECORDS);
    setAllProduction(INITIAL_PRODUCTION_RECORDS);
    setAllVaccinations(INITIAL_VACCINATIONS);
    setAllTreatments(INITIAL_TREATMENTS);
    setAlerts(INITIAL_ALERTS);
    setBiosecurity(INITIAL_BIOSECURITY);
    localStorage.removeItem('swasth_farms');
    localStorage.removeItem('swasth_animals');
    localStorage.removeItem('swasth_selected_farm');
  };

  return (
    <FarmContext.Provider value={{
      farms,
      selectedFarmId,
      selectedFarm,
      switchFarm,
      addFarm,
      animals: currentFarmAnimals,
      selectedAnimalId,
      selectedAnimal,
      selectAnimal,
      addAnimal,
      updateAnimal,
      deleteAnimal,
      healthRecords: currentFarmHealth,
      feedRecords: currentFarmFeed,
      productionRecords: currentFarmProduction,
      vaccinations: currentFarmVaccines,
      treatments: currentFarmTreatments,
      activityRecords: currentFarmActivities,
      addHealthRecord,
      addFeedRecord,
      addProductionRecord,
      addVaccination,
      addTreatment,
      getAnimalTimeline,
      alerts: currentFarmAlerts,
      markAlertRead,
      dismissAlert,
      weather,
      biosecurity,
      toggleBiosecurityCheck,
      activeTab,
      setActiveTab,
      resetToDemo
    }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
}
