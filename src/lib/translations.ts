export type Language = 'en' | 'hi';

export const translations = {
  en: {
    // Brand & Header
    brandName: "SwasthFarm",
    tagline: "Intelligent Multi-Animal Farm Management",
    dashboard: "Dashboard",
    animals: "Animals",
    production: "Production",
    feedAndWater: "Feed & Water",
    healthAndVitals: "Health & Vitals",
    vaccination: "Vaccinations",
    biosecurity: "Risk Assessment",
    analytics: "Analytics & ML",
    trainingVideos: "Training Videos",
    settings: "Settings",
    logout: "Logout",
    login: "Login / Sign Up",

    // Farm Management
    currentFarm: "Current Farm",
    selectFarm: "Select Farm",
    addFarm: "+ Add Farm",
    allFarms: "All Farms",
    createFarmModalTitle: "Create New Farm",
    farmName: "Farm Name",
    farmLocation: "Farm Location (City/District)",
    farmType: "Primary Farm Type",

    // Dashboard Cards
    goodMorning: "Good Morning",
    totalAnimals: "Total Animals",
    healthyNormal: "Healthy / Normal",
    needsAttention: "Needs Attention",
    dailyProduction: "Daily Production",
    dailyFeedIntake: "Daily Feed Intake",
    biosecurityScore: "Biosecurity Score",

    // Charts & Sections
    productionTrend: "Production Trend (7-Day vs 30-Day Avg)",
    healthActivityOverview: "Health & Activity Status",
    animalsRequiringAttention: "Animals Requiring Attention",
    upcomingVaccinations: "Upcoming Vaccinations & Treatments",
    recentActivity: "Recent Activity Timeline",
    viewAllAnimals: "View All Animals",

    // Animal Management
    addAnimal: "+ Add Animal",
    searchAnimals: "Search by tag, name, breed...",
    allSpecies: "All Species",
    cow: "Cow",
    buffalo: "Buffalo",
    goat: "Goat",
    sheep: "Sheep",
    poultry: "Poultry",
    pig: "Pig / Swine",
    custom: "Other / Custom",

    // Animal Profile
    animalProfile: "Animal Profile",
    overview: "Overview",
    healthRecords: "Health Records",
    feedRecords: "Feed Records",
    productionRecords: "Production Records",
    vaccinationAndTreatment: "Vaccination & Treatment",
    activityRecords: "Activity Records",
    eventTimeline: "Historical Timeline",
    logHealth: "Log Health",
    logFeed: "Log Feed/Water",
    logProduction: "Log Production",
    logVaccine: "Log Vaccine",

    // Weather & Alerts
    weatherIn: "Weather in",
    heatStressWarning: "Heat Stress Indicator",
    alertCenter: "Alerts & Notifications",
    noAlerts: "No pending alerts. All herd parameters normal.",

    // AI Assistant
    aiAssistantTitle: "Swasth Farm AI Assistant",
    aiAssistantPlaceholder: "Ask about your animals, production drop, vaccinations...",
    aiDisclaimer: "AI responses are derived directly from your live farm records.",
    
    // Empty states
    noFarmsTitle: "Welcome to Swasth Farm",
    noFarmsSubtitle: "Start your journey by creating your first farm.",
    noAnimalsTitle: "Your farm is ready!",
    noAnimalsSubtitle: "Add your first animal to begin monitoring health and production.",
  },
  hi: {
    // Brand & Header
    brandName: "स्वस्थ फार्म (SwasthFarm)",
    tagline: "स्मार्ट बहु-पशुधन फार्म प्रबंधन और एनालिटिक्स",
    dashboard: "डैशबोर्ड",
    animals: "पशुधन (Animals)",
    production: "उत्पादन (Production)",
    feedAndWater: "चारा और पानी (Feed & Water)",
    healthAndVitals: "स्वास्थ्य रिकॉर्ड (Health)",
    vaccination: "टीकाकरण (Vaccinations)",
    biosecurity: "जोखिम आकलन (Risk Assessment)",
    analytics: "एनालिटिक्स और पूर्वानुमान",
    trainingVideos: "प्रशिक्षण वीडियो",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    login: "लॉग इन / साइन अप",

    // Farm Management
    currentFarm: "वर्तमान फार्म",
    selectFarm: "फार्म चुनें",
    addFarm: "+ नया फार्म जोड़ें",
    allFarms: "सभी फार्म",
    createFarmModalTitle: "नया फार्म बनाएं",
    farmName: "फार्म का नाम",
    farmLocation: "फार्म का स्थान (शहर/जिला)",
    farmType: "फार्म का प्रकार",

    // Dashboard Cards
    goodMorning: "शुभ प्रभात",
    totalAnimals: "कुल पशु",
    healthyNormal: "स्वस्थ / सामान्य",
    needsAttention: "ध्यान देने योग्य",
    dailyProduction: "दैनिक उत्पादन",
    dailyFeedIntake: "दैनिक चारा खपत",
    biosecurityScore: "जैव-सुरक्षा स्कोर",

    // Charts & Sections
    productionTrend: "उत्पादन रुझान (7-दिन बनाम 30-दिन औसत)",
    healthActivityOverview: "स्वास्थ्य एवं गतिविधि अवलोकन",
    animalsRequiringAttention: "ध्यान देने योग्य पशु",
    upcomingVaccinations: "आगामी टीकाकरण एवं उपचार",
    recentActivity: "हाल की गतिविधि टाइमलाइन",
    viewAllAnimals: "सभी पशु देखें",

    // Animal Management
    addAnimal: "+ नया पशु जोड़ें",
    searchAnimals: "टैग, नाम या नस्ल से खोजें...",
    allSpecies: "सभी प्रजातियां",
    cow: "गाय (Cow)",
    buffalo: "भैंस (Buffalo)",
    goat: "बकरी (Goat)",
    sheep: "भेड़ (Sheep)",
    poultry: "मुर्गी पालन (Poultry)",
    pig: "सूअर पालन (Pig)",
    custom: "अन्य पशु",

    // Animal Profile
    animalProfile: "पशु प्रोफ़ाइल",
    overview: "अवलोकन",
    healthRecords: "स्वास्थ्य रिकॉर्ड",
    feedRecords: "चारा रिकॉर्ड",
    productionRecords: "उत्पादन रिकॉर्ड",
    vaccinationAndTreatment: "टीकाकरण एवं उपचार",
    activityRecords: "गतिविधि रिकॉर्ड",
    eventTimeline: "ऐतिहासिक टाइमलाइन",
    logHealth: "स्वास्थ्य दर्ज करें",
    logFeed: "चारा/पानी दर्ज करें",
    logProduction: "उत्पादन दर्ज करें",
    logVaccine: "टीका दर्ज करें",

    // Weather & Alerts
    weatherIn: "मौसम",
    heatStressWarning: "गर्मी का तनाव संकेतक (Heat Stress)",
    alertCenter: "अलर्ट और सूचनाएं",
    noAlerts: "कोई सक्रिय चेतावनी नहीं है। सभी पशु सामान्य हैं।",

    // AI Assistant
    aiAssistantTitle: "स्वस्थ फार्म एआई सहायक",
    aiAssistantPlaceholder: "अपने पशुओं, उत्पादन गिरावट या टीकों के बारे में पूछें...",
    aiDisclaimer: "एआई उत्तर सीधे आपके वास्तविक फार्म डेटा से प्राप्त किए जाते हैं।",

    // Empty states
    noFarmsTitle: "स्वस्थ फार्म में आपका स्वागत है",
    noFarmsSubtitle: "अपना पहला फार्म बनाकर शुरुआत करें।",
    noAnimalsTitle: "आपका फार्म तैयार है!",
    noAnimalsSubtitle: "स्वास्थ्य और उत्पादन निगरानी शुरू करने के लिए अपना पहला पशु जोड़ें।",
  }
};
