import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  Shield,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Activity,
  Thermometer,
  Droplets,
  Wheat,
  Video,
  ChevronRight,
  MapPin,
  Globe,
  LogIn,
  Play,
  HeartPulse,
  BrainCircuit,
  Award,
  Layers,
  Lock,
  Smartphone
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: () => void;
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onEnterDashboard }) => {
  const { user, isAuthenticated, loginAsDemo, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [selectedSpeciesPreview, setSelectedSpeciesPreview] = useState<'cow' | 'buffalo' | 'goat' | 'poultry' | 'pig'>('cow');

  const speciesData = {
    cow: {
      name: language === 'hi' ? 'गाय (Cow / Dairy Cattle)' : 'Cow / Dairy Cattle',
      breeds: 'Gir, Sahiwal, Red Sindhi, HF Cross, Jersey',
      emoji: '🐄',
      metric: '18.5 L / day',
      metricLabel: language === 'hi' ? 'औसत दुग्ध उत्पादन' : 'Avg Milk Yield',
      nextVaccine: 'FMD Booster (Foot & Mouth)',
      vaccineDate: 'Due in 14 days',
      thiStatus: 'THI 76 • Moderate Heat Stress',
      recommendation: language === 'hi' ? 'पंखे और फॉगर सक्रिय करें। मिनरल मिक्स 50g दें।' : 'Activate shed misting & fans. Supplement 50g magnesium/mineral buffer.',
      highlights: [
        'Daily morning & evening milk yield recording',
        'Early mastitis detection via yield-drop alerts',
        'FMD, HS/BQ, Brucellosis vaccination timetables',
        'Heat cycle (estrus) & AI breeding tracking'
      ]
    },
    buffalo: {
      name: language === 'hi' ? 'भैंस (Buffalo Dairy)' : 'Buffalo Dairy',
      breeds: 'Murrah, Nili-Ravi, Jaffarabadi, Bhadawari',
      emoji: '🐃',
      metric: '14.2 L / day (7.8% Fat)',
      metricLabel: language === 'hi' ? 'उच्च वसा दुग्ध उत्पादन' : 'High Fat Milk Yield',
      nextVaccine: 'HS (Haemorrhagic Septicaemia)',
      vaccineDate: 'Due in 21 days',
      thiStatus: 'THI 78 • Wallowing Recommended',
      recommendation: language === 'hi' ? 'दोपहर में कीचड़/पानी का स्नान कराएं। ताज़ा पानी उपलब्ध कराएं।' : 'Provide midday wallowing pond access & clean drinking water.',
      highlights: [
        'High-fat milk tracking & SNF calculation',
        'Silent heat detection & hormonal cycle tracking',
        'Wallowing pond biosecurity & water sanitation',
        'Deworming and Black Quarter (BQ) protocol'
      ]
    },
    goat: {
      name: language === 'hi' ? 'बकरी एवं भेड़ (Goat & Sheep)' : 'Goat & Sheep Herd',
      breeds: 'Beetal, Barbari, Sirohi, Jamnapari, Boer',
      emoji: '🐐',
      metric: '38.4 kg (Avg Weight)',
      metricLabel: language === 'hi' ? 'औसत शारीरिक भार' : 'Average Body Weight',
      nextVaccine: 'PPR (Peste des Petits Ruminants)',
      vaccineDate: 'Up to Date',
      thiStatus: 'THI 74 • Comfortable Zone',
      recommendation: language === 'hi' ? 'घास एवं सूखी चारा का संतुलन बनाए रखें। खुरों की जांच करें।' : 'Maintain dry grazing pastures & conduct weekly hoof rot inspection.',
      highlights: [
        'Average Daily Gain (ADG) growth forecasting',
        'PPR and Enterotoxemia immunization records',
        'Flock kidding rates & offspring genealogy',
        'Internal parasite & FAMACHA anemia scoring'
      ]
    },
    poultry: {
      name: language === 'hi' ? 'कुक्कुट पालन (Poultry / Broiler & Layer)' : 'Poultry / Broiler & Layer',
      breeds: 'Cobb 500, Ross 308, BV 300, Kadaknath',
      emoji: '🐔',
      metric: '92.4% Egg Laying Rate',
      metricLabel: language === 'hi' ? 'अंडा उत्पादन दर' : 'Flock Laying Efficiency',
      nextVaccine: 'Ranikhet / Newcastle (NDV-LaSota)',
      vaccineDate: 'Drinking Water Batch (Day 28)',
      thiStatus: 'THI 75 • Shed Airflow Optimal',
      recommendation: language === 'hi' ? 'बायोसिक्योरिटी फुटबाथ ताजा रखें। अमोनिया वेंटिलेशन जांचें।' : 'Refill biosecurity footbaths. Verify shed ammonia cross-ventilation.',
      highlights: [
        'Feed Conversion Ratio (FCR) statistical curves',
        'Flock mortality tracking & sudden spike alerts',
        'Strict biosecurity audit (footbath, bird proofing)',
        'Water chlorination and sanitation schedules'
      ]
    },
    pig: {
      name: language === 'hi' ? 'सुअर पालन (Swine / Piggery)' : 'Swine / Piggery Unit',
      breeds: 'Large White Yorkshire, Landrace, Duroc',
      emoji: '🐖',
      metric: '685 g / day ADG',
      metricLabel: language === 'hi' ? 'दैनिक भार वृद्धि (ADG)' : 'Average Daily Weight Gain',
      nextVaccine: 'Classical Swine Fever (CSF)',
      vaccineDate: 'Scheduled next month',
      thiStatus: 'THI 72 • Cool Pen Conditions',
      recommendation: language === 'hi' ? 'बाहरी वाहनों को परिसर में न आने दें। ASF प्रोटोकॉल लागू करें।' : 'Enforce zero-visitor boundary protocol for African Swine Fever.',
      highlights: [
        'African Swine Fever (ASF) strict biosecurity audits',
        'Farrowing crate sanitation & piglet survival rates',
        'Commercial growth curves & feed intake logging',
        'Mandatory visitor & vehicle disinfection log'
      ]
    }
  };

  const currentPreview = speciesData[selectedSpeciesPreview];

  const handleQuickDemo = () => {
    loginAsDemo();
    onEnterDashboard();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* 1. National Surveillance Advisory Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white py-2 px-4 text-xs font-medium shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-center md:text-left">
            <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide">
              {language === 'hi' ? 'राष्ट्रीय परामर्श' : 'National Advisory'}
            </span>
            <span className="text-emerald-100 text-xs">
              {language === 'hi'
                ? 'पशुधन रोग निगरानी: मवेशी (LSD/FMD), बकरी (PPR) एवं पोल्ट्री (रानीखेत) हेतु सतर्कता सक्रिय।'
                : 'Livestock Surveillance: Seasonal alerts active for Cattle (LSD/FMD), Sheep/Goat (PPR), and Poultry (Ranikhet).'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-emerald-200">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Kanpur, UP • Live THI 76 (Moderate)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Glass Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white text-2xl shadow-md shadow-emerald-700/20">
              🐾
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900 flex items-center space-x-1.5">
                <span>Swasth</span>
                <span className="text-emerald-600">Farm</span>
              </div>
              <p className="text-[11px] text-gray-500 font-semibold -mt-0.5">
                {language === 'hi' ? 'पशु स्वास्थ्य, डेयरी व रोग निगरानी मंच' : 'Intelligent Livestock Health & Analytics'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#species" className="hover:text-emerald-600 transition-colors">
              {language === 'hi' ? 'पशु श्रेणियां' : 'Livestock Species'}
            </a>
            <a href="#analytics" className="hover:text-emerald-600 transition-colors">
              {language === 'hi' ? 'सांख्यिकीय विश्लेषण' : 'Analytics & Trends'}
            </a>
            <a href="#biosecurity" className="hover:text-emerald-600 transition-colors">
              {language === 'hi' ? 'जैव सुरक्षा ऑडिट' : 'Biosecurity Audit'}
            </a>
            <a href="#assistant" className="hover:text-emerald-600 transition-colors">
              {language === 'hi' ? 'एआई सहायक' : 'AI Farm Assistant'}
            </a>
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="flex items-center space-x-3">
            
            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 border border-gray-200 transition-colors"
              title="Toggle English / हिंदी"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onEnterDashboard}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>{language === 'hi' ? 'डैशबोर्ड खोलें' : 'Open Dashboard'}</span>
                </button>

                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-colors"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleQuickDemo}
                  className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'डेमो फार्म देखें' : 'Explore Demo Farm'}</span>
                </button>

                <button
                  onClick={onOpenAuth}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/25 transition-all flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'hi' ? 'किसान लॉगिन' : 'Farmer Login'}</span>
                </button>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-900 to-slate-900 text-white pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {language === 'hi'
                    ? 'गाय, भैंस, बकरी, भेड़, सुअर एवं मुर्गी हेतु उन्नत पशुधन मंच'
                    : 'Intelligent Surveillance for Cattle, Buffalo, Goat, Sheep & Poultry'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {language === 'hi' ? (
                  <>
                    उन्नत पशु स्वास्थ्य एवं <br />
                    <span className="text-emerald-400">महामारी रोकथाम प्रणाली</span>
                  </>
                ) : (
                  <>
                    Smart Livestock Health & <br />
                    <span className="text-emerald-400">Outbreak Intelligence</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl font-normal leading-relaxed">
                {language === 'hi'
                  ? 'भारतीय पशुपालकों के लिए बहु-पशु फार्म प्रबंधन: दुग्ध उत्पादन, फीड-जल निगरानी, मौसम-आधारित THI हीट स्ट्रेस इंडेक्स, 5-दिवसीय पूर्वानुमान, एवं पशुचिकित्सा जैव सुरक्षा।'
                  : 'Empowering livestock farmers with multi-species herd tracking: daily milk & egg yields, feed-water intake, NRC Temperature-Humidity Index (THI), statistical anomaly detection, and 5-day predictive yield forecasting.'}
              </p>

              {/* Tagline */}
              <div className="p-3 bg-emerald-900/40 rounded-xl border border-emerald-600/30 text-emerald-200 text-xs font-semibold inline-block">
                “Healthy Animals. Efficient Resources. Sustainable Livestock.”
              </div>

              {/* Quick Species Selector Pills */}
              <div className="pt-2">
                <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-2.5">
                  {language === 'hi' ? 'लाइव प्रीव्यू हेतु पशु चुनें:' : 'Select Livestock To Preview:'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-xl mx-auto lg:mx-0">
                  {(['cow', 'buffalo', 'goat', 'poultry', 'pig'] as const).map((key) => {
                    const sp = speciesData[key];
                    const isSelected = selectedSpeciesPreview === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedSpeciesPreview(key)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center space-x-2 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/30 scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-emerald-100 border-white/20'
                        }`}
                      >
                        <span className="text-2xl">{sp.emoji}</span>
                        <div>
                          <div className="text-xs font-bold capitalize">{key}</div>
                          <div className="text-[10px] text-emerald-200 opacity-90">{key === 'cow' ? 'Dairy' : key === 'poultry' ? 'Flock' : 'Herd'}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={handleQuickDemo}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm px-8 py-3.5 rounded-xl shadow-xl shadow-emerald-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'hi' ? 'डेमो फार्म खोलें' : 'Launch Demo Farm'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-7 py-3.5 rounded-xl backdrop-blur transition flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4 text-emerald-300" />
                  <span>{language === 'hi' ? 'किसान लॉगिन' : 'Farmer Login (OTP)'}</span>
                </button>
              </div>

            </div>

            {/* Hero Right Interactive Livestock Health Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 text-slate-800 border border-slate-100 relative">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{currentPreview.emoji}</span>
                    <div>
                      <h3 className="text-base font-black text-slate-900">{currentPreview.name}</h3>
                      <p className="text-[11px] text-slate-500">{currentPreview.breeds}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    Live Telemetry
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3.5">
                  
                  {/* Weather / THI Box */}
                  <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200">
                    <div className="flex justify-between items-center text-xs font-bold text-emerald-900 mb-1">
                      <span className="flex items-center space-x-1.5">
                        <Thermometer className="w-3.5 h-3.5 text-emerald-700" />
                        <span>THI Heat Stress Index</span>
                      </span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[10px] font-bold">
                        {currentPreview.thiStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-snug">
                      {currentPreview.recommendation}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">{currentPreview.metricLabel}</span>
                      <span className="text-base sm:text-lg font-black text-slate-900">{currentPreview.metric}</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                      <span className="text-slate-500 block text-[10px] font-bold uppercase">Scheduled Vaccine</span>
                      <span className="text-xs sm:text-sm font-black text-emerald-700 truncate block">{currentPreview.nextVaccine}</span>
                      <span className="text-[10px] text-gray-500">{currentPreview.vaccineDate}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Platform Capabilities</div>
                    <div className="space-y-1.5">
                      {currentPreview.highlights.map((h, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Launch Button */}
                  <button
                    onClick={handleQuickDemo}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'hi' ? 'पूर्ण मल्टी-एनिमल डैशबोर्ड खोलें' : 'Open Full Multi-Species Dashboard'}</span>
                  </button>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Species Showcase Section */}
      <section id="species" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'सम्पूर्ण पशुधन सुरक्षा' : 'Comprehensive Livestock Coverage'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
              {language === 'hi' ? 'प्रत्येक पशु के लिए विशेष स्वास्थ्य एवं उत्पादन रिकॉर्ड' : 'Tailored Intelligence for Every Livestock Species'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'hi'
                ? 'गाय, भैंस, बकरी, भेड़ एवं मुर्गी हेतु पृथक बायोसिक्योरिटी प्रोटोकॉल, टीकाकरण कैलेंडर, एवं उत्पादन चार्ट।'
                : 'Species-specific dashboards, vaccination reminders, biosecurity checklists, and statistical analytics.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Cow */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/40 rounded-3xl border border-slate-200 transition duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">🐄</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{language === 'hi' ? 'गाय (Dairy Cattle)' : 'Cow / Dairy Cattle'}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3">Gir, Sahiwal, Crossbred HF, Jersey</p>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Daily morning & evening milk yield</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Mastitis & Somatic Cell drop alert</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>FMD & HS/BQ vaccination calendar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Dry period & gestation timeline</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleQuickDemo}
                className="w-full py-2.5 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
              >
                {language === 'hi' ? 'गाय रिकॉर्ड देखें →' : 'View Cattle Records →'}
              </button>
            </div>

            {/* Card 2: Buffalo */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/40 rounded-3xl border border-slate-200 transition duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">🐃</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{language === 'hi' ? 'भैंस (Buffalo Dairy)' : 'Buffalo Dairy'}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3">Murrah, Nili-Ravi, Jaffarabadi</p>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>High Fat (7-8%) milk bookkeeping</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Silent heat / estrus detection logs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Wallowing & heat stress control</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Haemorrhagic Septicaemia (HS) warnings</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleQuickDemo}
                className="w-full py-2.5 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
              >
                {language === 'hi' ? 'भैंस रिकॉर्ड देखें →' : 'View Buffalo Records →'}
              </button>
            </div>

            {/* Card 3: Goat & Sheep */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/40 rounded-3xl border border-slate-200 transition duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">🐐</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{language === 'hi' ? 'बकरी एवं भेड़ (Goats/Sheep)' : 'Goat & Sheep'}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3">Beetal, Barbari, Sirohi, Jamnapari</p>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Weight gain & ADG tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>PPR & Enterotoxemia schedule</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Deworming rotation protocol</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Flock health status summaries</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleQuickDemo}
                className="w-full py-2.5 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
              >
                {language === 'hi' ? 'बकरी रिकॉर्ड देखें →' : 'View Goat Records →'}
              </button>
            </div>

            {/* Card 4: Poultry */}
            <div className="p-6 bg-slate-50 hover:bg-emerald-50/40 rounded-3xl border border-slate-200 transition duration-300 hover:shadow-xl flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-4">🐔</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{language === 'hi' ? 'पोल्ट्री (Poultry)' : 'Poultry (Broiler/Layer)'}</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3">Cobb 500, BV 300, Kadaknath</p>
                <ul className="text-xs text-slate-600 space-y-2 mb-6">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Daily flock egg laying rate</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Feed Conversion Ratio (FCR)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Ranikhet / NDV vaccine calendar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Flock biosecurity compliance</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleQuickDemo}
                className="w-full py-2.5 bg-white hover:bg-emerald-600 hover:text-white border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition shadow-sm"
              >
                {language === 'hi' ? 'पोल्ट्री रिकॉर्ड देखें →' : 'View Poultry Records →'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Statistical Analytics & ML Section */}
      <section id="analytics" className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'पायथन एवं फास्टएपीआई माइक्रोसर्विस' : 'Python & FastAPI Microservice'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {language === 'hi'
                  ? 'गणितीय सटीकता के साथ विसंगति पहचान एवं 5-दिवसीय पूर्वानुमान'
                  : 'Statistical Anomaly Detection & 5-Day Yield Forecasting'}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                {language === 'hi'
                  ? 'हम काल्पनिक एआई प्रेडिक्शन नहीं करते। हमारा विश्लेषण इंजन 7-दिवसीय एवं 30-दिवसीय बेसलाइन, Z-Score और IQR टेस्ट्स के जरिए दूध में गिरावट या बीमारी का पूर्व संकेत देता है।'
                  : 'Zero hallucinated numbers. SwasthFarm executes robust statistical tests (Rolling 7d vs 30d means, Interquartile Range, and Z-Scores) coupled with damped linear regression to alert you before herd crises occur.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-800/50 border border-emerald-500/30 text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Rolling Baselines vs Real-Time Drops</h4>
                    <p className="text-xs text-slate-400">Alerts if an individual cow or flock drops &gt;1.5 IQR below its 30-day baseline.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-teal-800/50 border border-teal-500/30 text-teal-400">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Explainable Multi-Signal Risk Scorer</h4>
                    <p className="text-xs text-slate-400">Combines vitals, temperature, feed intake, and water consumption into an actionable 0-100 risk score.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-amber-800/50 border border-amber-500/30 text-amber-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">ADG Growth & Yield Projection</h4>
                    <p className="text-xs text-slate-400">FastAPI microservice fits regression curves with confidence intervals for future feed and production planning.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleQuickDemo}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  {language === 'hi' ? 'लाइव एनालिटिक्स ग्राफ देखें' : 'View Live Analytics Curves'}
                </button>
              </div>

            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-white">Cow #018 (Kamdhenu) • Production Dip Alert</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                  Z-Score: 2.18 (Warning)
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="text-emerald-400 font-bold">// FastAPI Statistical Outlier Diagnostic</div>
                  <div>30-Day Mean Yield: <span className="text-white font-bold">18.2 L</span> (σ = 1.55)</div>
                  <div>Current Recorded Yield: <span className="text-amber-400 font-bold">14.8 L (-18.2% drop)</span></div>
                  <div>Interquartile Range: <span className="text-white">Q1: 17.2L | Q3: 19.1L | IQR: 1.90</span></div>
                  <div>Current Body Temp: <span className="text-amber-300 font-bold">39.2°C (Elevated)</span></div>
                  <div>Root Cause Probability: <span className="text-teal-300 font-bold">Possible Subclinical Mastitis / Ruminal Acidosis</span></div>
                </div>

                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-600/30 text-xs text-emerald-200">
                  <strong>Recommended Action:</strong> Inspect left quarter udder, measure somatic cell count, provide oral buffer, and notify consulting veterinarian Dr. Sarah Verma.
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Biosecurity Audit Section */}
      <section id="biosecurity" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase tracking-wider">
              {language === 'hi' ? 'जैव सुरक्षा एवं रोग नियंत्रण' : 'Biosecurity & Herd Sanitation'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 mb-3">
              {language === 'hi' ? '15-सूत्रीय फार्म सुरक्षा ऑडिट एवं प्रमाणीकरण' : '15-Point Farm Biosecurity Audit & Compliance'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'hi'
                ? 'बीमारी का उपचार करने से बेहतर है कि बीमारी फार्म में प्रवेश ही न करे। नियमित ऑडिट कर अपने फार्म को गोल्ड सर्टिफाइड बनाएं।'
                : 'Prevent outbreaks before they cross the perimeter fence. Track sanitization footbaths, quarantine stalls, visitor logs, and carcass disposal.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl mb-4 font-black">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Perimeter & Visitor Quarantine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Control farm entry gates, maintain vehicle wheel-dips with potassium permanganate, and log external visitor foot traffic.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl mb-4 font-black">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Isolation & Sick Stalls</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict 14-day quarantine for newly acquired animals and separate feeding troughs for animals under veterinary antibiotic therapy.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mb-4 font-black">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Feed Silo & Water Hygiene</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular water tank chlorination, mold-free silage moisture testing, and rodent-proof feed storage to stop salmonella transmission.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. AI Farm Assistant (Kisan Mitra) Highlight */}
      <section id="assistant" className="py-16 md:py-20 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase">
                <BrainCircuit className="w-4 h-4" />
                <span>AI Farm Assistant • Kisan Mitra</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {language === 'hi'
                  ? 'अपने फार्म के डेटा से सीधे सवाल पूछें'
                  : 'Query Your Livestock Data In Natural Language'}
              </h2>
              <p className="text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                {language === 'hi'
                  ? 'हमारा एआई सहायक लाइव फार्म डेटाबेस से जुड़ा है। "किस गाय का दूध गिरा है?", "अगला टीका कब है?", या "हीट स्ट्रेस से कैसे बचाएं?" जैसे प्रश्नों का सटीक व प्रमाणित उत्तर प्राप्त करें।'
                  : 'Ask "Which animal had the largest milk drop?", "Show me upcoming vaccinations", or "What should I feed buffaloes in THI 78?". The assistant uses deterministic tool-calling with zero hallucinations.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={handleQuickDemo}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex items-center space-x-2"
              >
                <span>Try Kisan Mitra AI Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Call To Action Footer Banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'hi' ? 'आज ही अपने फार्म को स्मार्ट बनाएं' : 'Upgrade Your Livestock Management Today'}
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            {language === 'hi'
              ? 'बिना किसी पूर्व सेटअप के तुरंत डेमो फार्म का परीक्षण करें या अपने फार्म के पशुओं का पंजीकरण शुरू करें।'
              : 'Join forward-thinking dairy and livestock producers transitioning from reactive treatments to preventive herd health.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleQuickDemo}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'hi' ? 'तुरंत डेमो फार्म खोलें' : 'Open Live Demo Dashboard'}</span>
            </button>

            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 transition-all flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'किसान लॉगिन' : 'Farmer Login (Phone/Email)'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. Global Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800/80 pb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-xl">
                🐾
              </div>
              <div>
                <span className="text-lg font-black text-white">SwasthFarm</span>
                <p className="text-[11px] text-slate-500">AI-Powered Livestock Health & Statistical Analytics</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-slate-400 text-xs font-semibold">
              <a href="#species" className="hover:text-emerald-400 transition-colors">Species</a>
              <a href="#analytics" className="hover:text-emerald-400 transition-colors">Analytics</a>
              <a href="#biosecurity" className="hover:text-emerald-400 transition-colors">Biosecurity</a>
              <button onClick={handleQuickDemo} className="hover:text-emerald-400 transition-colors">Demo Farm</button>
              <button onClick={onOpenAuth} className="hover:text-emerald-400 transition-colors">Farmer Login</button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed text-center md:text-left space-y-2">
            <p>
              <strong>Important Clinical & Veterinary Disclaimer:</strong> SwasthFarm provides data-driven statistical anomaly indications and AI-assisted risk indicators based on empirical herd vitals, yield history, and microclimate telemetry. SwasthFarm does NOT provide autonomous medical diagnoses or prescription dispensing. Certified veterinary professionals remain exclusively responsible for animal diagnosis, surgical treatment, and medical therapeutics.
            </p>
            <p className="pt-2">
              © {new Date().getFullYear()} SwasthFarm Platform. All rights reserved. “Healthy Animals. Efficient Resources. Sustainable Livestock.”
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
