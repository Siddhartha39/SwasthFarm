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
  INITIAL_FEED_RECORDS,
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
  editFarm: (farmId: string, updates: Partial<Farm>) => void;
  deleteFarm: (farmId: string) => void;
  
  // Animals
  animals: Animal[];
  allAnimals: Animal[];
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
  addHealthRecord: (record: Omit<HealthRecord, 'id' | 'farmId' | 'date'> & { date?: string }) => HealthRecord;
  addFeedRecord: (record: Omit<FeedRecord, 'id' | 'farmId' | 'date'> & { date?: string }) => FeedRecord;
  addProductionRecord: (record: Omit<ProductionRecord, 'id' | 'farmId' | 'date'> & { date?: string }) => ProductionRecord;
  addVaccination: (record: Omit<VaccinationRecord, 'id' | 'farmId'>) => VaccinationRecord;
  addTreatment: (record: Omit<TreatmentRecord, 'id' | 'farmId'>) => TreatmentRecord;
  markVaccineAdministered: (vaccineId: string, administeredDate?: string) => void;

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
  
  // Utilities
  exportFarmData: () => void;
  resetToDemo: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const [farms, setFarms] = useState<Farm[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_farms');
      return saved ? JSON.parse(saved) : INITIAL_FARMS;
    } catch {
      return INITIAL_FARMS;
    }
  });

  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('swasth_selected_farm');
      return saved || INITIAL_FARMS[0]?.id || null;
    } catch {
      return INITIAL_FARMS[0]?.id || null;
    }
  });

  const [allAnimals, setAllAnimals] = useState<Animal[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_animals');
      return saved ? JSON.parse(saved) : INITIAL_ANIMALS;
    } catch {
      return INITIAL_ANIMALS;
    }
  });

  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);

  const [allHealth, setAllHealth] = useState<HealthRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_health_records');
      return saved ? JSON.parse(saved) : INITIAL_HEALTH_RECORDS;
    } catch {
      return INITIAL_HEALTH_RECORDS;
    }
  });

  const [allFeed, setAllFeed] = useState<FeedRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_feed_records');
      return saved ? JSON.parse(saved) : INITIAL_FEED_RECORDS;
    } catch {
      return INITIAL_FEED_RECORDS;
    }
  });

  const [allProduction, setAllProduction] = useState<ProductionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_production_records');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTION_RECORDS;
    } catch {
      return INITIAL_PRODUCTION_RECORDS;
    }
  });

  const [allVaccinations, setAllVaccinations] = useState<VaccinationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_vaccinations');
      return saved ? JSON.parse(saved) : INITIAL_VACCINATIONS;
    } catch {
      return INITIAL_VACCINATIONS;
    }
  });

  const [allTreatments, setAllTreatments] = useState<TreatmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_treatments');
      return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
    } catch {
      return INITIAL_TREATMENTS;
    }
  });

  const [allActivities, setAllActivities] = useState<ActivityRecord[]>([]);

  const [alerts, setAlerts] = useState<AlertItem[]>(() => {
    try {
      const saved = localStorage.getItem('swasth_alerts');
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [weather] = useState<WeatherData>(INITIAL_WEATHER);

  const [biosecurity, setBiosecurity] = useState<BiosecurityAudit>(() => {
    try {
      const saved = localStorage.getItem('swasth_biosecurity');
      return saved ? JSON.parse(saved) : INITIAL_BIOSECURITY;
    } catch {
      return INITIAL_BIOSECURITY;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Persistence helpers
  const saveFarms = (data: Farm[]) => {
    setFarms(data);
    localStorage.setItem('swasth_farms', JSON.stringify(data));
  };

  const saveAnimals = (data: Animal[]) => {
    setAllAnimals(data);
    localStorage.setItem('swasth_animals', JSON.stringify(data));
  };

  const saveHealth = (data: HealthRecord[]) => {
    setAllHealth(data);
    localStorage.setItem('swasth_health_records', JSON.stringify(data));
  };

  const saveFeed = (data: FeedRecord[]) => {
    setAllFeed(data);
    localStorage.setItem('swasth_feed_records', JSON.stringify(data));
  };

  const saveProduction = (data: ProductionRecord[]) => {
    setAllProduction(data);
    localStorage.setItem('swasth_production_records', JSON.stringify(data));
  };

  const saveVaccinations = (data: VaccinationRecord[]) => {
    setAllVaccinations(data);
    localStorage.setItem('swasth_vaccinations', JSON.stringify(data));
  };

  const saveTreatments = (data: TreatmentRecord[]) => {
    setAllTreatments(data);
    localStorage.setItem('swasth_treatments', JSON.stringify(data));
  };

  const saveAlerts = (data: AlertItem[]) => {
    setAlerts(data);
    localStorage.setItem('swasth_alerts', JSON.stringify(data));
  };

  const saveBiosecurity = (data: BiosecurityAudit) => {
    setBiosecurity(data);
    localStorage.setItem('swasth_biosecurity', JSON.stringify(data));
  };

  // Filter items by currently selected farm
  const effectiveFarmId = selectedFarmId || farms[0]?.id || null;
  const selectedFarm = farms.find(f => f.id === effectiveFarmId) || farms[0] || null;
  const currentFarmAnimals = allAnimals.filter(a => a.farmId === effectiveFarmId);
  const selectedAnimal = currentFarmAnimals.find(a => a.id === selectedAnimalId) || null;

  const currentFarmHealth = allHealth.filter(h => h.farmId === effectiveFarmId);
  const currentFarmFeed = allFeed.filter(f => f.farmId === effectiveFarmId);
  const currentFarmProduction = allProduction.filter(p => p.farmId === effectiveFarmId);
  const currentFarmVaccines = allVaccinations.filter(v => v.farmId === effectiveFarmId);
  const currentFarmTreatments = allTreatments.filter(t => t.farmId === effectiveFarmId);
  const currentFarmActivities = allActivities.filter(ac => ac.farmId === effectiveFarmId);
  const currentFarmAlerts = alerts.filter(al => al.farmId === effectiveFarmId);

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
    saveFarms(updated);
    setSelectedFarmId(newFarm.id);
    setSelectedAnimalId(null);
    localStorage.setItem('swasth_selected_farm', newFarm.id);
    return newFarm;
  };

  const editFarm = (farmId: string, updates: Partial<Farm>) => {
    const updated = farms.map(f => f.id === farmId ? { ...f, ...updates } : f);
    saveFarms(updated);
  };

  const deleteFarm = (farmId: string) => {
    if (farms.length <= 1) {
      alert("At least one farm must be retained.");
      return;
    }
    const updatedFarms = farms.filter(f => f.id !== farmId);
    saveFarms(updatedFarms);
    const updatedAnimals = allAnimals.filter(a => a.farmId !== farmId);
    saveAnimals(updatedAnimals);
    if (selectedFarmId === farmId) {
      const nextFarmId = updatedFarms[0]?.id || null;
      setSelectedFarmId(nextFarmId);
      if (nextFarmId) localStorage.setItem('swasth_selected_farm', nextFarmId);
    }
  };

  const selectAnimal = (animalId: string | null) => {
    setSelectedAnimalId(animalId);
  };

  const addAnimal = (data: Omit<Animal, 'id' | 'farmId'>): Animal => {
    if (!effectiveFarmId) throw new Error("Please select or create a farm first.");
    const newAnimal: Animal = {
      ...data,
      id: `anim-${Date.now()}`,
      farmId: effectiveFarmId,
    };
    const updated = [newAnimal, ...allAnimals];
    saveAnimals(updated);
    
    // Automatically increment farm count
    const updatedFarms = farms.map(f => f.id === effectiveFarmId ? { ...f, totalAnimals: f.totalAnimals + 1 } : f);
    saveFarms(updatedFarms);

    // If yield is logged, add initial production record
    if (newAnimal.currentDailyProduction > 0) {
      const today = new Date().toISOString().split('T')[0];
      const initialProd: ProductionRecord = {
        id: `prod-init-${Date.now()}`,
        farmId: effectiveFarmId,
        animalId: newAnimal.id,
        animalTag: newAnimal.tagId,
        species: newAnimal.species,
        date: today,
        morningMilkLiters: newAnimal.productionType === 'milk' ? +(newAnimal.currentDailyProduction * 0.52).toFixed(1) : undefined,
        eveningMilkLiters: newAnimal.productionType === 'milk' ? +(newAnimal.currentDailyProduction * 0.48).toFixed(1) : undefined,
        totalMilkLiters: newAnimal.productionType === 'milk' ? newAnimal.currentDailyProduction : undefined,
        eggCount: newAnimal.productionType === 'eggs' ? Math.round(newAnimal.currentDailyProduction) : undefined,
        qualityGrade: 'Grade A',
        fatPercentage: newAnimal.species === 'buffalo' ? 7.6 : 4.2
      };
      saveProduction([initialProd, ...allProduction]);
    }

    // Add initial feed record
    if (newAnimal.dailyFeedKg > 0) {
      const today = new Date().toISOString().split('T')[0];
      const initialFeed: FeedRecord = {
        id: `feed-init-${Date.now()}`,
        farmId: effectiveFarmId,
        animalId: newAnimal.id,
        animalTag: newAnimal.tagId,
        date: today,
        feedType: 'Balanced Ration & Silage',
        quantityKg: newAnimal.dailyFeedKg,
        frequency: 'Twice Daily',
        waterConsumptionLiters: newAnimal.dailyWaterLiters,
        feedCostInr: Math.round(newAnimal.dailyFeedKg * 9),
        notes: 'Standard starter ration logged on registration.'
      };
      saveFeed([initialFeed, ...allFeed]);
    }

    return newAnimal;
  };

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    const updated = allAnimals.map(a => a.id === id ? { ...a, ...updates } : a);
    saveAnimals(updated);
  };

  const deleteAnimal = (id: string) => {
    const updated = allAnimals.filter(a => a.id !== id);
    saveAnimals(updated);
    if (selectedAnimalId === id) setSelectedAnimalId(null);
    const updatedFarms = farms.map(f => f.id === effectiveFarmId ? { ...f, totalAnimals: Math.max(0, f.totalAnimals - 1) } : f);
    saveFarms(updatedFarms);
  };

  const addHealthRecord = (record: Omit<HealthRecord, 'id' | 'farmId' | 'date'> & { date?: string }): HealthRecord => {
    const recordDate = record.date || new Date().toISOString().split('T')[0];
    const newRec: HealthRecord = {
      ...record,
      id: `hr-${Date.now()}`,
      farmId: effectiveFarmId || 'default',
      date: recordDate
    };
    const updated = [newRec, ...allHealth];
    saveHealth(updated);

    // Update animal's current temperature and checkup date
    updateAnimal(record.animalId, {
      currentTemperature: record.temperature,
      lastCheckupDate: recordDate,
      healthStatus: record.temperature > 39.3 ? 'attention' : 'healthy'
    });

    // If high fever, generate an alert
    if (record.temperature > 39.4) {
      const newAlert: AlertItem = {
        id: `alt-fever-${Date.now()}`,
        farmId: effectiveFarmId || 'default',
        animalId: record.animalId,
        animalTag: record.animalTag,
        type: 'risk_warning',
        severity: 'critical',
        reason: `Elevated body temperature detected (${record.temperature}°C) for ${record.animalTag}. Veterinary check recommended.`,
        createdAt: new Date().toISOString(),
        read: false,
        actionLabel: 'View Animal'
      };
      saveAlerts([newAlert, ...alerts]);
    }

    return newRec;
  };

  const addFeedRecord = (record: Omit<FeedRecord, 'id' | 'farmId' | 'date'> & { date?: string }): FeedRecord => {
    const recordDate = record.date || new Date().toISOString().split('T')[0];
    const newRec: FeedRecord = {
      ...record,
      id: `feed-${Date.now()}`,
      farmId: effectiveFarmId || 'default',
      date: recordDate
    };
    const updated = [newRec, ...allFeed];
    saveFeed(updated);
    updateAnimal(record.animalId, {
      dailyFeedKg: record.quantityKg,
      dailyWaterLiters: record.waterConsumptionLiters
    });
    return newRec;
  };

  const addProductionRecord = (record: Omit<ProductionRecord, 'id' | 'farmId' | 'date'> & { date?: string }): ProductionRecord => {
    const recordDate = record.date || new Date().toISOString().split('T')[0];
    const newRec: ProductionRecord = {
      ...record,
      id: `prod-${Date.now()}`,
      farmId: effectiveFarmId || 'default',
      date: recordDate
    };
    const updated = [newRec, ...allProduction];
    saveProduction(updated);
    
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
      farmId: effectiveFarmId || 'default'
    };
    const updated = [newRec, ...allVaccinations];
    saveVaccinations(updated);
    return newRec;
  };

  const markVaccineAdministered = (vaccineId: string, administeredDate?: string) => {
    const date = administeredDate || new Date().toISOString().split('T')[0];
    const updated = allVaccinations.map(v => {
      if (v.id === vaccineId) {
        return {
          ...v,
          status: 'completed' as const,
          administeredDate: date
        };
      }
      return v;
    });
    saveVaccinations(updated);
  };

  const addTreatment = (record: Omit<TreatmentRecord, 'id' | 'farmId'>): TreatmentRecord => {
    const newRec: TreatmentRecord = {
      ...record,
      id: `tr-${Date.now()}`,
      farmId: effectiveFarmId || 'default'
    };
    const updated = [newRec, ...allTreatments];
    saveTreatments(updated);
    return newRec;
  };

  const getAnimalTimeline = (animalId: string): HistoricalEvent[] => {
    const events: HistoricalEvent[] = [];
    
    const anim = allAnimals.find(a => a.id === animalId);
    if (anim) {
      events.push({
        id: `ev-birth-${anim.id}`,
        date: anim.dob,
        type: 'alert',
        title: `Born / Registered (${anim.species.toUpperCase()})`,
        description: `Breed: ${anim.breed}, Color: ${anim.color || 'Standard'}, Acquisition Source: ${anim.source || 'Herd'}`,
        severity: 'info'
      });
    }

    allProduction.filter(p => p.animalId === animalId).forEach(p => {
      events.push({
        id: `ev-${p.id}`,
        date: p.date,
        type: 'production',
        title: `Production: ${p.totalMilkLiters ? `${p.totalMilkLiters} L Milk` : `${p.eggCount} Eggs`}`,
        description: `Quality: ${p.qualityGrade || 'Grade A'} ${p.fatPercentage ? `(Fat: ${p.fatPercentage}%)` : ''}`,
        severity: 'info'
      });
    });

    allHealth.filter(h => h.animalId === animalId).forEach(h => {
      const isFever = h.temperature > 39.2;
      events.push({
        id: `ev-${h.id}`,
        date: h.date,
        type: 'health',
        title: `Clinical Check: ${h.temperature}°C`,
        description: h.symptoms.length > 0 ? `Symptoms: ${h.symptoms.join(', ')}` : h.observation,
        severity: isFever ? 'warning' : 'info'
      });
    });

    allVaccinations.filter(v => v.animalId === animalId).forEach(v => {
      events.push({
        id: `ev-${v.id}`,
        date: v.administeredDate || v.nextDueDate,
        type: 'vaccination',
        title: `Vaccine: ${v.vaccineName}`,
        description: `Status: ${v.status.toUpperCase()}, Dose: ${v.dose} (${v.targetDisease})`,
        severity: v.status === 'overdue' ? 'critical' : 'info'
      });
    });

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
    const updated = alerts.map(a => a.id === alertId ? { ...a, read: true } : a);
    saveAlerts(updated);
  };

  const dismissAlert = (alertId: string) => {
    const updated = alerts.filter(a => a.id !== alertId);
    saveAlerts(updated);
  };

  const toggleBiosecurityCheck = (checkId: string) => {
    const updatedList = biosecurity.checklist.map(item => item.id === checkId ? { ...item, completed: !item.completed } : item);
    const completedCount = updatedList.filter(c => c.completed).length;
    const score = Math.round((completedCount / updatedList.length) * 100);
    const updated: BiosecurityAudit = {
      ...biosecurity,
      checklist: updatedList,
      score,
      date: new Date().toISOString().split('T')[0]
    };
    saveBiosecurity(updated);
  };

  const exportFarmData = () => {
    const exportPayload = {
      exportDate: new Date().toISOString(),
      farms,
      animals: allAnimals,
      healthRecords: allHealth,
      feedRecords: allFeed,
      productionRecords: allProduction,
      vaccinations: allVaccinations,
      treatments: allTreatments,
      biosecurity
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `swasthfarm-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const resetToDemo = () => {
    saveFarms(INITIAL_FARMS);
    setSelectedFarmId(INITIAL_FARMS[0]?.id || null);
    saveAnimals(INITIAL_ANIMALS);
    saveHealth(INITIAL_HEALTH_RECORDS);
    saveFeed(INITIAL_FEED_RECORDS);
    saveProduction(INITIAL_PRODUCTION_RECORDS);
    saveVaccinations(INITIAL_VACCINATIONS);
    saveTreatments(INITIAL_TREATMENTS);
    saveAlerts(INITIAL_ALERTS);
    saveBiosecurity(INITIAL_BIOSECURITY);
    localStorage.removeItem('swasth_farms');
    localStorage.removeItem('swasth_animals');
    localStorage.removeItem('swasth_selected_farm');
    localStorage.removeItem('swasth_health_records');
    localStorage.removeItem('swasth_feed_records');
    localStorage.removeItem('swasth_production_records');
    localStorage.removeItem('swasth_vaccinations');
    localStorage.removeItem('swasth_treatments');
    localStorage.removeItem('swasth_alerts');
    localStorage.removeItem('swasth_biosecurity');
  };

  return (
    <FarmContext.Provider value={{
      farms,
      selectedFarmId: effectiveFarmId,
      selectedFarm,
      switchFarm,
      addFarm,
      editFarm,
      deleteFarm,
      animals: currentFarmAnimals,
      allAnimals,
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
      markVaccineAdministered,
      getAnimalTimeline,
      alerts: currentFarmAlerts,
      markAlertRead,
      dismissAlert,
      weather,
      biosecurity,
      toggleBiosecurityCheck,
      activeTab,
      setActiveTab,
      exportFarmData,
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
