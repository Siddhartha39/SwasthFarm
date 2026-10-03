import { Farm, Animal, HealthRecord, FeedRecord, ProductionRecord, VaccinationRecord, TreatmentRecord, ActivityRecord, AlertItem, WeatherData, BiosecurityAudit } from '@/types';

export const INITIAL_FARMS: Farm[] = [
  {
    id: 'farm-kanpur-01',
    name: 'Greenfield Dairy & Livestock Farm',
    location: 'Kanpur, Uttar Pradesh',
    state: 'Uttar Pradesh',
    sizeCategory: 'Medium',
    primaryType: 'Dairy',
    totalAnimals: 4,
    createdDate: '2025-09-01',
    notes: 'Primary dairy herd with Holstein and Jersey cattle, Murrah buffalo, and dairy goats.'
  },
  {
    id: 'farm-karnal-02',
    name: 'Sunrise Layer & Small Ruminants Farm',
    location: 'Karnal, Haryana',
    state: 'Haryana',
    sizeCategory: 'Commercial',
    primaryType: 'Mixed',
    totalAnimals: 3,
    createdDate: '2025-10-15',
    notes: 'Layer poultry flock and Boer meat goats with semi-automated watering.'
  }
];

export const INITIAL_ANIMALS: Animal[] = [
  // Farm 1 Animals (Kanpur)
  {
    id: 'cow-023',
    farmId: 'farm-kanpur-01',
    tagId: 'COW-023',
    name: 'Gauri',
    species: 'cow',
    breed: 'Holstein Friesian',
    gender: 'female',
    dob: '2022-04-12',
    ageYears: 4,
    weightKg: 425,
    color: 'Black & White',
    purchaseDate: '2023-01-10',
    source: 'National Dairy Research Herd',
    healthStatus: 'healthy',
    photoUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Barn A - Stall 04',
    productionType: 'milk',
    currentDailyProduction: 18.4,
    productionUnit: 'L/day',
    dailyFeedKg: 22.0,
    dailyWaterLiters: 65.0,
    lastCheckupDate: '2026-09-28',
    currentTemperature: 38.6,
    notes: 'Consistently high butterfat yield (4.2%). Bright and alert.'
  },
  {
    id: 'cow-018',
    farmId: 'farm-kanpur-01',
    tagId: 'COW-018',
    name: 'Kamdhenu',
    species: 'cow',
    breed: 'Jersey',
    gender: 'female',
    dob: '2023-02-18',
    ageYears: 3,
    weightKg: 385,
    color: 'Fawn Tan',
    purchaseDate: '2023-08-20',
    source: 'Regional Breeders Co-op',
    healthStatus: 'attention',
    photoUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Barn A - Stall 08',
    productionType: 'milk',
    currentDailyProduction: 14.8,
    productionUnit: 'L/day',
    dailyFeedKg: 17.5,
    dailyWaterLiters: 54.0,
    lastCheckupDate: '2026-10-01',
    currentTemperature: 39.2,
    notes: 'Mild appetite reduction. Milk yield dropped 18% compared to 30-day baseline.'
  },
  {
    id: 'buf-001',
    farmId: 'farm-kanpur-01',
    tagId: 'BUF-001',
    name: 'Sultana',
    species: 'buffalo',
    breed: 'Murrah Buffalo',
    gender: 'female',
    dob: '2021-08-10',
    ageYears: 5,
    weightKg: 545,
    color: 'Jet Black',
    purchaseDate: '2022-11-15',
    source: 'Rohtak Livestock Fair',
    healthStatus: 'healthy',
    photoUrl: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Barn B - Pen 02',
    productionType: 'milk',
    currentDailyProduction: 12.2,
    productionUnit: 'L/day',
    dailyFeedKg: 26.0,
    dailyWaterLiters: 78.0,
    lastCheckupDate: '2026-09-25',
    currentTemperature: 38.3,
    notes: 'Premium SNF and fat percentage (7.4%).'
  },
  {
    id: 'goat-001',
    farmId: 'farm-kanpur-01',
    tagId: 'GOAT-001',
    name: 'Champa',
    species: 'goat',
    breed: 'Beetal Dairy Goat',
    gender: 'female',
    dob: '2024-03-01',
    ageYears: 2,
    weightKg: 46,
    color: 'Spotted Brown',
    purchaseDate: '2024-09-12',
    source: 'Punjab Goat Farm',
    healthStatus: 'healthy',
    photoUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Small Ruminant Shed 1',
    productionType: 'milk',
    currentDailyProduction: 3.2,
    productionUnit: 'L/day',
    dailyFeedKg: 3.0,
    dailyWaterLiters: 6.5,
    lastCheckupDate: '2026-09-20',
    currentTemperature: 38.8,
    notes: 'Active browsing behavior and steady milk yield.'
  },

  // Farm 2 Animals (Karnal)
  {
    id: 'poultry-b1',
    farmId: 'farm-karnal-02',
    tagId: 'FLOCK-L01',
    name: 'Layer Flock Batch 01 (500 Birds)',
    species: 'poultry',
    breed: 'Lohmann Brown Layers',
    gender: 'female',
    dob: '2026-01-10',
    ageYears: 0.7,
    weightKg: 1.85,
    color: 'Red Brown',
    purchaseDate: '2026-01-10',
    source: 'Hatcheries Direct',
    healthStatus: 'healthy',
    photoUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Coop House 1',
    productionType: 'eggs',
    currentDailyProduction: 462,
    productionUnit: 'eggs/day',
    dailyFeedKg: 58.0,
    dailyWaterLiters: 110.0,
    lastCheckupDate: '2026-09-29',
    currentTemperature: 41.3,
    notes: '92.4% laying rate. Shell quality excellent.'
  },
  {
    id: 'goat-002',
    farmId: 'farm-karnal-02',
    tagId: 'GOAT-002',
    name: 'Sheru',
    species: 'goat',
    breed: 'Boer Meat Goat',
    gender: 'male',
    dob: '2025-02-15',
    ageYears: 1.5,
    weightKg: 49,
    color: 'White body with red head',
    purchaseDate: '2025-06-10',
    source: 'Rajasthan Livestock Traders',
    healthStatus: 'attention',
    photoUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Pen 2B Isolation',
    productionType: 'meat',
    currentDailyProduction: 0.14,
    productionUnit: 'kg/day ADG',
    dailyFeedKg: 2.1,
    dailyWaterLiters: 4.8,
    lastCheckupDate: '2026-10-02',
    currentTemperature: 39.7,
    notes: 'Occasional dry cough and slight nasal discharge. Isolated in transition pen.'
  },
  {
    id: 'sheep-001',
    farmId: 'farm-karnal-02',
    tagId: 'SHEEP-001',
    name: 'Badal',
    species: 'sheep',
    breed: 'Dorper',
    gender: 'female',
    dob: '2024-05-10',
    ageYears: 2,
    weightKg: 64,
    color: 'White with black head',
    purchaseDate: '2024-11-01',
    source: 'Haryana Sheep Farm',
    healthStatus: 'healthy',
    photoUrl: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=800&q=80',
    penLocation: 'Pasture Area C',
    productionType: 'meat',
    currentDailyProduction: 0.18,
    productionUnit: 'kg/day ADG',
    dailyFeedKg: 2.8,
    dailyWaterLiters: 5.2,
    lastCheckupDate: '2026-09-22',
    currentTemperature: 39.0,
    notes: 'Healthy body condition score (3.5/5).'
  }
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'hr-1',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    date: '2026-10-01',
    temperature: 39.2,
    symptoms: ['Mild Lethargy', 'Decreased appetite', 'Reduced rumination'],
    activityLevel: 'low',
    appetite: 'reduced',
    waterIntakeLiters: 54.0,
    generalCondition: 'Sluggish during morning feeding',
    observation: 'Rumen contractions 2 per 2 minutes. Milk output dropped to 14.8 L.',
    veterinaryObservation: 'Dr. R. Verma advised electrolyte support and fresh green fodder. Scheduled follow-up check.',
    recordedBy: 'Rajesh Sharma (Owner)'
  },
  {
    id: 'hr-2',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-023',
    animalTag: 'COW-023',
    date: '2026-09-28',
    temperature: 38.6,
    symptoms: [],
    activityLevel: 'normal',
    appetite: 'normal',
    waterIntakeLiters: 65.0,
    generalCondition: 'Vibrant, bright eyes, clean muzzle',
    observation: 'Routine monthly checkup. Excellent physiological signs.',
    recordedBy: 'Rajesh Sharma (Owner)'
  },
  {
    id: 'hr-3',
    farmId: 'farm-karnal-02',
    animalId: 'goat-002',
    animalTag: 'GOAT-002',
    date: '2026-10-02',
    temperature: 39.7,
    symptoms: ['Dry coughing', 'Mild nasal discharge'],
    activityLevel: 'lethargic',
    appetite: 'reduced',
    waterIntakeLiters: 4.8,
    generalCondition: 'Isolated in transition pen',
    observation: 'Respiratory auscultation requested. Dust-free bedding supplied.',
    recordedBy: 'Amit Singh (Manager)'
  }
];

export const INITIAL_FEED_RECORDS: FeedRecord[] = [
  {
    id: 'feed-1',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-023',
    animalTag: 'COW-023',
    date: '2026-10-01',
    feedType: 'Silage (Maize) + Dairy Balanced Concentrate (20% CP)',
    quantityKg: 22.0,
    frequency: 'Twice daily (06:00 & 16:30)',
    waterConsumptionLiters: 65.0,
    feedCostInr: 210,
    notes: 'Ate full ration voraciously. Clean trough.'
  },
  {
    id: 'feed-2',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    date: '2026-10-01',
    feedType: 'Green Lucerne + Dry Straw + Buffer Probiotic Paste',
    quantityKg: 17.5,
    frequency: 'Split 3x daily feeding',
    waterConsumptionLiters: 54.0,
    feedCostInr: 185,
    notes: 'Appetite reduced by ~20%. Left residual straw. Buffer administered.'
  },
  {
    id: 'feed-3',
    farmId: 'farm-kanpur-01',
    animalId: 'buf-001',
    animalTag: 'BUF-001',
    date: '2026-10-01',
    feedType: 'Green Barseem + Cotton Seed Cake + Mineral Mix (50g)',
    quantityKg: 26.0,
    frequency: 'Twice daily',
    waterConsumptionLiters: 78.0,
    feedCostInr: 245,
    notes: 'Good appetite. Mineral supplement accepted in concentrate.'
  },
  {
    id: 'feed-4',
    farmId: 'farm-kanpur-01',
    animalId: 'goat-001',
    animalTag: 'GOAT-001',
    date: '2026-10-01',
    feedType: 'Tree loppings (Subabul) + Crushed Gram/Maize',
    quantityKg: 3.2,
    frequency: 'Morning & evening stall browse',
    waterConsumptionLiters: 6.5,
    feedCostInr: 45,
    notes: 'Active grazing behavior. Clean water intake.'
  }
];

export const INITIAL_PRODUCTION_RECORDS: ProductionRecord[] = [
  // COW-018 daily history (demonstrating the 18% drop for anomaly detection)
  { id: 'pr-1', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-24', morningMilkLiters: 9.2, eveningMilkLiters: 9.0, totalMilkLiters: 18.2, qualityGrade: 'Grade A', fatPercentage: 4.2 },
  { id: 'pr-2', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-25', morningMilkLiters: 9.1, eveningMilkLiters: 8.9, totalMilkLiters: 18.0, qualityGrade: 'Grade A', fatPercentage: 4.1 },
  { id: 'pr-3', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-26', morningMilkLiters: 9.0, eveningMilkLiters: 8.8, totalMilkLiters: 17.8, qualityGrade: 'Grade A', fatPercentage: 4.2 },
  { id: 'pr-4', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-27', morningMilkLiters: 8.8, eveningMilkLiters: 8.4, totalMilkLiters: 17.2, qualityGrade: 'Grade A', fatPercentage: 4.0 },
  { id: 'pr-5', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-28', morningMilkLiters: 8.2, eveningMilkLiters: 7.8, totalMilkLiters: 16.0, qualityGrade: 'Grade A', fatPercentage: 3.9 },
  { id: 'pr-6', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-29', morningMilkLiters: 7.8, eveningMilkLiters: 7.4, totalMilkLiters: 15.2, qualityGrade: 'Grade A', fatPercentage: 3.8 },
  { id: 'pr-7', farmId: 'farm-kanpur-01', animalId: 'cow-018', animalTag: 'COW-018', species: 'cow', date: '2026-09-30', morningMilkLiters: 7.5, eveningMilkLiters: 7.3, totalMilkLiters: 14.8, qualityGrade: 'Grade A', fatPercentage: 3.8 },

  // COW-023 daily history (steady high production)
  { id: 'pr-8', farmId: 'farm-kanpur-01', animalId: 'cow-023', animalTag: 'COW-023', species: 'cow', date: '2026-09-24', morningMilkLiters: 9.4, eveningMilkLiters: 9.0, totalMilkLiters: 18.4, qualityGrade: 'Grade A', fatPercentage: 4.3 },
  { id: 'pr-9', farmId: 'farm-kanpur-01', animalId: 'cow-023', animalTag: 'COW-023', species: 'cow', date: '2026-09-26', morningMilkLiters: 9.3, eveningMilkLiters: 9.1, totalMilkLiters: 18.4, qualityGrade: 'Grade A', fatPercentage: 4.4 },
  { id: 'pr-10', farmId: 'farm-kanpur-01', animalId: 'cow-023', animalTag: 'COW-023', species: 'cow', date: '2026-09-28', morningMilkLiters: 9.5, eveningMilkLiters: 8.9, totalMilkLiters: 18.4, qualityGrade: 'Grade A', fatPercentage: 4.2 },
  { id: 'pr-11', farmId: 'farm-kanpur-01', animalId: 'cow-023', animalTag: 'COW-023', species: 'cow', date: '2026-09-30', morningMilkLiters: 9.4, eveningMilkLiters: 9.0, totalMilkLiters: 18.4, qualityGrade: 'Grade A', fatPercentage: 4.3 },

  // Poultry Flock B1 (Layer eggs)
  { id: 'pr-12', farmId: 'farm-karnal-02', animalId: 'poultry-b1', animalTag: 'FLOCK-L01', species: 'poultry', date: '2026-09-28', eggCount: 458, qualityGrade: 'Grade A' },
  { id: 'pr-13', farmId: 'farm-karnal-02', animalId: 'poultry-b1', animalTag: 'FLOCK-L01', species: 'poultry', date: '2026-09-29', eggCount: 465, qualityGrade: 'Grade A' },
  { id: 'pr-14', farmId: 'farm-karnal-02', animalId: 'poultry-b1', animalTag: 'FLOCK-L01', species: 'poultry', date: '2026-09-30', eggCount: 462, qualityGrade: 'Grade A' }
];

export const INITIAL_VACCINATIONS: VaccinationRecord[] = [
  {
    id: 'vac-1',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    vaccineName: 'Foot and Mouth Disease (FMD) Booster',
    targetDisease: 'FMD Virus',
    nextDueDate: '2026-10-12',
    dose: '2 ml Subcutaneous',
    status: 'upcoming',
    veterinarian: 'Dr. R. Verma',
    notes: 'Due in 9 days. Vaccine batch FMD-B2026-09 confirmed in stock.'
  },
  {
    id: 'vac-2',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-023',
    animalTag: 'COW-023',
    vaccineName: 'Hemorrhagic Septicemia (HS)',
    targetDisease: 'Pasteurella multocida',
    administeredDate: '2026-06-15',
    nextDueDate: '2027-06-15',
    dose: '3 ml Intramuscular',
    status: 'completed',
    veterinarian: 'Dr. R. Verma'
  },
  {
    id: 'vac-3',
    farmId: 'farm-karnal-02',
    animalId: 'goat-002',
    animalTag: 'GOAT-002',
    vaccineName: 'PPR (Peste des Petits Ruminants)',
    targetDisease: 'PPR Morbillivirus',
    nextDueDate: '2026-09-20',
    dose: '1 ml Subcutaneous',
    status: 'overdue',
    veterinarian: 'Dr. S. K. Gupta',
    notes: 'Overdue by 13 days! Health clearance needed before administration.'
  }
];

export const INITIAL_TREATMENTS: TreatmentRecord[] = [
  {
    id: 'tr-1',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    condition: 'Mild Rumen Indigestion & Heat Stress',
    reason: 'Reduced appetite and 18% milk drop under high ambient humidity',
    startDate: '2026-10-01',
    medication: 'Rumen buffer probiotics, Oral electrolytes & vitamin B-complex',
    dosage: 'Twice daily oral paste for 3 days',
    veterinarian: 'Dr. R. Verma',
    outcome: 'ongoing',
    notes: 'Monitoring temperature and rumination sound.'
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    type: 'production_drop',
    severity: 'warning',
    reason: 'Milk yield decreased by 18.2% over 5 days (from 18.2L to 14.8L).',
    createdAt: '2026-10-01T08:30:00Z',
    read: false,
    actionLabel: 'View Cow #018',
    actionUrl: 'cow-018'
  },
  {
    id: 'alt-2',
    farmId: 'farm-kanpur-01',
    animalId: 'cow-018',
    animalTag: 'COW-018',
    type: 'vaccination_due',
    severity: 'info',
    reason: 'FMD Booster due in 9 days (12 Oct 2026).',
    createdAt: '2026-10-02T06:00:00Z',
    read: false,
    actionLabel: 'View Schedule'
  },
  {
    id: 'alt-3',
    farmId: 'farm-karnal-02',
    animalId: 'goat-002',
    animalTag: 'GOAT-002',
    type: 'vaccination_due',
    severity: 'critical',
    reason: 'PPR vaccination is overdue by 13 days. Quarantine review required.',
    createdAt: '2026-09-25T07:15:00Z',
    read: false,
    actionLabel: 'Check Goat #002',
    actionUrl: 'goat-002'
  },
  {
    id: 'alt-4',
    farmId: 'farm-kanpur-01',
    type: 'environmental_warning',
    severity: 'warning',
    reason: 'Afternoon THI Heat Stress: Temp 33°C, 75% humidity (THI 83 - Moderate Stress). Turn on barn fans.',
    createdAt: '2026-10-03T11:00:00Z',
    read: false,
    actionLabel: 'View Weather'
  }
];

export const INITIAL_WEATHER: WeatherData = {
  city: 'Kanpur',
  temp: 29.5,
  humidity: 73,
  windKph: 14,
  rainfallMm: 0.0,
  condition: 'Partly Cloudy',
  thiIndex: 78.4,
  stressLevel: 'mild',
  forecast: [
    { day: 'Today', tempMax: 33, tempMin: 24, humidity: 75, stress: 'moderate', condition: 'Sunny & Humid' },
    { day: 'Tomorrow', tempMax: 34, tempMin: 25, humidity: 76, stress: 'moderate', condition: 'Heatwave Alert' },
    { day: 'Sunday', tempMax: 30, tempMin: 23, humidity: 69, stress: 'mild', condition: 'Scattered Clouds' },
    { day: 'Monday', tempMax: 28, tempMin: 22, humidity: 65, stress: 'normal', condition: 'Clear Breezy' },
    { day: 'Tuesday', tempMax: 29, tempMin: 22, humidity: 67, stress: 'mild', condition: 'Sunny' },
  ]
};

export const INITIAL_BIOSECURITY: BiosecurityAudit = {
  id: 'bio-kanpur-2026-10',
  date: '2026-10-01',
  score: 84, // 84/100
  sanitationLevel: 88,
  quarantineCompliance: 80,
  visitorProtocol: 82,
  vehicleDisinfection: 85,
  waterPurity: 86,
  checklist: [
    { id: 'b1', question: 'Vehicle spray tire bath active at farm entry gate', category: 'Biosecurity Gate', completed: true },
    { id: 'b2', question: 'Foot disinfectant bath with fresh solution (200 ppm) placed outside all sheds', category: 'Sanitation', completed: true },
    { id: 'b3', question: 'External visitors registered and provided bio-protective boot covers', category: 'Visitors', completed: true },
    { id: 'b4', question: 'Quarantine enclosure maintained separate (>20m) from main herd', category: 'Quarantine', completed: true },
    { id: 'b5', question: 'Clean drinking water tested for bacterial count in past 30 days', category: 'Water Safety', completed: true },
    { id: 'b6', question: 'Carcass and manure storage situated downwind and fenced from wildlife', category: 'Waste Management', completed: false }
  ]
};
