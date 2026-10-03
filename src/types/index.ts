export type Species = 'cow' | 'buffalo' | 'goat' | 'sheep' | 'poultry' | 'pig' | 'custom';

export type HealthStatus = 'healthy' | 'attention' | 'critical' | 'monitoring';

export type ProductionType = 'milk' | 'eggs' | 'meat' | 'wool' | 'none';

export interface Farm {
  id: string;
  name: string;
  location: string;
  state?: string;
  sizeCategory?: 'Small' | 'Medium' | 'Large' | 'Commercial';
  primaryType?: 'Dairy' | 'Poultry' | 'Mixed' | 'Piggery' | 'Small Ruminant';
  totalAnimals: number;
  createdDate: string;
  notes?: string;
}

export interface Animal {
  id: string;
  farmId: string;
  tagId: string;
  name: string;
  species: Species;
  breed: string;
  gender: 'male' | 'female';
  dob: string;
  ageYears: number;
  weightKg: number;
  color?: string;
  purchaseDate?: string;
  source?: string;
  healthStatus: HealthStatus;
  photoUrl?: string;
  penLocation?: string;
  productionType: ProductionType;
  currentDailyProduction: number;
  productionUnit: string;
  dailyFeedKg: number;
  dailyWaterLiters: number;
  lastCheckupDate: string;
  currentTemperature: number;
  notes?: string;
  customFields?: Record<string, string>;
}

export interface HealthRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  date: string;
  temperature: number;
  symptoms: string[];
  activityLevel: 'normal' | 'low' | 'lethargic' | 'hyperactive';
  appetite: 'normal' | 'reduced' | 'none';
  waterIntakeLiters: number;
  generalCondition: string;
  observation: string;
  veterinaryObservation?: string;
  treatmentPrescribed?: string;
  recordedBy: string;
}

export interface FeedRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  date: string;
  feedType: string;
  quantityKg: number;
  frequency: string;
  feedCostInr?: number;
  waterConsumptionLiters: number;
  notes?: string;
}

export interface ProductionRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  species: Species;
  date: string;
  morningMilkLiters?: number;
  eveningMilkLiters?: number;
  totalMilkLiters?: number;
  eggCount?: number;
  qualityGrade?: string;
  fatPercentage?: number;
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  vaccineName: string;
  targetDisease: string;
  administeredDate?: string;
  nextDueDate: string;
  dose: string;
  status: 'completed' | 'upcoming' | 'overdue';
  veterinarian?: string;
  notes?: string;
}

export interface TreatmentRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  condition: string;
  reason: string;
  startDate: string;
  endDate?: string;
  medication: string;
  dosage: string;
  veterinarian: string;
  outcome: 'ongoing' | 'recovered' | 'referred' | 'chronic';
  notes?: string;
}

export interface ActivityRecord {
  id: string;
  farmId: string;
  animalId: string;
  animalTag: string;
  date: string;
  activityScore: number; // 0 - 100
  movementHours: number;
  restHours: number;
  feedingMinutes: number;
  waterConsumptionLiters: number;
  notes?: string;
}

export interface HistoricalEvent {
  id: string;
  date: string;
  type: 'health' | 'vaccination' | 'treatment' | 'production' | 'feed' | 'weight' | 'alert';
  title: string;
  description: string;
  severity?: 'info' | 'warning' | 'critical';
}

export interface AlertItem {
  id: string;
  farmId: string;
  animalId?: string;
  animalTag?: string;
  type: 
    | 'vaccination_due'
    | 'treatment_followup'
    | 'production_drop'
    | 'abnormal_weight'
    | 'unusual_activity'
    | 'environmental_warning'
    | 'risk_warning'
    | 'data_reminder';
  severity: 'critical' | 'warning' | 'info';
  reason: string;
  createdAt: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  humidity: number;
  windKph: number;
  rainfallMm: number;
  condition: string;
  thiIndex: number;
  stressLevel: 'normal' | 'mild' | 'moderate' | 'severe';
  forecast: {
    day: string;
    tempMax: number;
    tempMin: number;
    humidity: number;
    stress: 'normal' | 'mild' | 'moderate' | 'severe';
    condition: string;
  }[];
}

export interface BiosecurityAudit {
  id: string;
  date: string;
  score: number;
  sanitationLevel: number;
  quarantineCompliance: number;
  visitorProtocol: number;
  vehicleDisinfection: number;
  waterPurity: number;
  checklist: {
    id: string;
    question: string;
    category: string;
    completed: boolean;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'farmer' | 'farm_manager' | 'veterinarian' | 'officer';
  createdAt: string;
}
