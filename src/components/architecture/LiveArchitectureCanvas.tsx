import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCode2,
  HardDrive,
  Info,
  Layers,
  Layout,
  Maximize2,
  Minimize2,
  Moon,
  Play,
  RotateCcw,
  Search,
  Server,
  Share2,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  Thermometer,
  TrendingUp,
  UserCheck,
  Volume2,
  Wheat,
  Wifi,
  X,
  Zap
} from 'lucide-react';
import { ARCHITECTURE_MERMAID } from './ArchitectureModal';

export interface ArchitectureNode {
  id: string;
  nameEn: string;
  nameHi: string;
  subtitleEn: string;
  subtitleHi: string;
  badge: string;
  tier: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  w: number;
  h: number;
  responsibilities: { en: string[]; hi: string[] };
  techStack: string;
  keyFiles: string[];
  inputsOutputs: { en: string; hi: string };
  faultTolerance: { en: string; hi: string };
  category: 'edge' | 'core' | 'pipeline' | 'ai';
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  // COLUMN 1: EDGE PRESENTATION & SENSORS
  {
    id: 'user_pwa',
    nameEn: 'Field Operations PWA',
    nameHi: 'फील्ड ऑपरेशंस PWA',
    subtitleEn: 'Mobile Barn Sensor & PWA',
    subtitleHi: 'मोबाइल शेड डेटा प्रविष्टि',
    badge: 'Touch & Bluetooth PWA',
    tier: 'Edge Presentation',
    color: 'border-rose-500/80 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    glowColor: '#F43F5E',
    icon: <Smartphone className="w-5 h-5 text-rose-400" />,
    x: 40,
    y: 130,
    w: 220,
    h: 82,
    responsibilities: {
      en: [
        'Mobile Progressive Web App with zero-install touch interface for field operations',
        'Direct Bluetooth and manual logging for cow rectal temperature and milk cans',
        'Operates in remote shed environments with automated sync upon 4G/WiFi reconnection'
      ],
      hi: [
        'खेतों में बिना ऐप स्टोर डाउनलोड के चलने वाला टच इंटरफेस',
        'पशु का तापमान और दूध केन माप सीधे दर्ज करने की सुविधा',
        'कमजोर नेटवर्क या बिना इंटरनेट के भी सुचारू डेटा प्रविष्टि'
      ]
    },
    techStack: 'HTML5 PWA, Service Worker, Web Storage API, Touch Adaptors',
    keyFiles: ['src/App.tsx', 'src/components/common/Header.tsx'],
    inputsOutputs: {
      en: 'Input: Physical farmer gestures, barn temperature | Output: JSON Telemetry payload',
      hi: 'इनपुट: किसान टच प्रविष्टि, थर्मामीटर रीडिंग | आउटपुट: टेलीमेट्री JSON पेलोड'
    },
    faultTolerance: {
      en: 'Local queue prevents data loss during cellular dead-zones.',
      hi: 'लोकल कतार बिना नेटवर्क के भी डेटा नष्ट नहीं होने देती।'
    },
    category: 'edge'
  },
  {
    id: 'farmer_session',
    nameEn: 'Farmer & Vet Auth Portal',
    nameHi: 'किसान एवं पशुचिकित्सक पोर्टल',
    subtitleEn: 'Role-Based Access (Farmer/Vet)',
    subtitleHi: 'भूमिका-आधारित सुरक्षित सत्र',
    badge: 'Authenticated RBAC',
    tier: 'User Session Layer',
    color: 'border-cyan-500/80 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    glowColor: '#06B6D4',
    icon: <UserCheck className="w-5 h-5 text-cyan-400" />,
    x: 40,
    y: 330,
    w: 220,
    h: 82,
    responsibilities: {
      en: [
        'Manages user credentials, OTP sessions, and Role-Based Access Control (Farmer vs Vet)',
        'Coordinates multi-farm switching (Kanpur Dairy vs Karnal Layers)',
        'Guarantees session persistence with secure biometric/token revalidation'
      ],
      hi: [
        'उपयोगकर्ता क्रेडेंशियल, OTP सत्र और भूमिका-आधारित पहुंच (किसान बनाम डॉक्टर) का प्रबंधन',
        'मल्टी-फार्म स्विचिंग को अधिकृत करना',
        'सुरक्षित प्रमाणीकरण के साथ सत्र को सुरक्षित रखना'
      ]
    },
    techStack: 'Firebase Auth, JWT Tokens, Secure LocalStorage',
    keyFiles: ['src/context/AuthContext.tsx', 'src/components/auth/AuthModal.tsx'],
    inputsOutputs: {
      en: 'Input: Credentials / Phone OTP | Output: Bearer Token & User Profile',
      hi: 'इनपुट: पासवर्ड या फोन OTP | आउटपुट: अधिकृत सत्र एवं प्रोफाइल'
    },
    faultTolerance: {
      en: 'Silent token refresh and graceful session recovery on network blips.',
      hi: 'सत्र टूटने पर स्वतः पुनः प्रमाणीकरण।'
    },
    category: 'edge'
  },
  {
    id: 'offline_cache',
    nameEn: 'Offline Persistence Engine',
    nameHi: 'ऑफ़लाइन स्टोरेज इंजन',
    subtitleEn: 'LocalStorage Snapshot Cache',
    subtitleHi: 'स्थानीय ब्राउज़र स्नैपशॉट',
    badge: 'swasth_farm_data_v2',
    tier: 'Client-Side Persistence',
    color: 'border-amber-500/80 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    glowColor: '#F59E0B',
    icon: <HardDrive className="w-5 h-5 text-amber-400" />,
    x: 40,
    y: 530,
    w: 220,
    h: 82,
    responsibilities: {
      en: [
        'Guarantees 100% full-featured operation even if rural power/internet is disconnected',
        'Persists state under `swasth_farm_data_v2` and AI memory under `swasth_assistant_memory`',
        'Synchronous rehydration upon page reload with zero flicker'
      ],
      hi: [
        'इंटरनेट और बिजली न होने पर भी 100% कार्यक्षमता सुनिश्चित करता है',
        'फार्म डेटा `swasth_farm_data_v2` और AI मेमोरी स्थानीय रूप से सुरक्षित रखता है',
        'पेज रीफ्रेश होने पर तुरंत डेटा रीस्टोर करता है'
      ]
    },
    techStack: 'HTML5 Web Storage API, JSON serialization, try/catch shields',
    keyFiles: ['src/context/FarmContext.tsx', 'src/components/ai/AIFarmAssistant.tsx'],
    inputsOutputs: {
      en: 'Input: State modifications | Output: Synchronous local rehydration on boot',
      hi: 'इनपुट: फार्म स्टेट परिवर्तन | आउटपुट: स्थानीय डेटा स्नैपशॉट'
    },
    faultTolerance: {
      en: 'Auto-falls back to RAM memory state if browser storage quota is restricted.',
      hi: 'स्टोरेज कोटा भर जाने पर रैम memory में सुरक्षित रूप से चलता है।'
    },
    category: 'edge'
  },

  // COLUMN 2: CLIENT APPLICATION & STATE COORDINATOR
  {
    id: 'web_ui',
    nameEn: 'Web Management Console',
    nameHi: 'वेब प्रबंधन कंसोल (डैशबोर्ड)',
    subtitleEn: 'React 18 + Vite Executive View',
    subtitleHi: 'कार्यकारी डैशबोर्ड एवं 360° प्रोफाइल',
    badge: 'React 18 + FarmContext',
    tier: 'Executive Presentation',
    color: 'border-cyan-400/90 text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.45)]',
    glowColor: '#00F0FF',
    icon: <Layout className="w-5 h-5 text-cyan-300" />,
    x: 295,
    y: 330,
    w: 225,
    h: 84,
    responsibilities: {
      en: [
        'Renders executive KPIs, Recharts telemetry curves, and 360° animal health cards',
        '8-tab inspection deck: Overview, Vitals, Feed, Milk Yield, Vaccines, Treatments',
        'Bilingual English / Hindi runtime text replacement with zero lag'
      ],
      hi: [
        'कार्यकारी KPI, रीचार्ट्स उत्पादन वक्र और 360° पशु स्वास्थ्य कार्ड प्रस्तुत करता है',
        '8-टैब निरीक्षण: अवलोकन, वाइटल्स, चारा, दूध उत्पादन, टीके, उपचार',
        'अंग्रेजी एवं हिंदी के बीच बिना रीलोड के त्वरित भाषा परिवर्तन'
      ]
    },
    techStack: 'React 18, Vite 5, Tailwind CSS, Recharts, Lucide Icons',
    keyFiles: ['src/components/dashboard/ExecutiveDashboard.tsx', 'src/components/animals/AnimalProfile.tsx'],
    inputsOutputs: {
      en: 'Input: User clicks, forms, modals | Output: Reactive UI state & optimistic renders',
      hi: 'इनपुट: यूजर क्लिक, फॉर्म, मोडल | आउटपुट: गतिशील UI और ग्राफिकल चार्ट्स'
    },
    faultTolerance: {
      en: 'Graceful fallback states with empty placeholders and responsive breakpoints.',
      hi: 'खाली डेटा होने पर भी सहज लेआउट और एरर फ्री डिस्प्ले।'
    },
    category: 'edge'
  },

  // MIDDLE CONTAINER: SWASTHFARM CLOUD & ANALYTICS CORE
  {
    id: 'firestore_sync',
    nameEn: 'Firestore Sync Service',
    nameHi: 'क्लाउड फायरस्टोर सिंक सेवा',
    subtitleEn: 'Bidirectional onSnapshot SDK',
    subtitleHi: 'रीयल-टाइम दोतरफा सिंक',
    badge: 'Firebase SDK v10 (TLS)',
    tier: 'Cloud Persistence Core',
    color: 'border-sky-500/80 text-sky-300 shadow-[0_0_20px_rgba(2,132,199,0.3)]',
    glowColor: '#0284C7',
    icon: <Cloud className="w-5 h-5 text-sky-400" />,
    x: 575,
    y: 130,
    w: 195,
    h: 82,
    responsibilities: {
      en: [
        'Real-time multi-device synchronization via Firestore websocket listeners',
        'Syncs `farms`, `animals`, `production_records`, `feed_records`, `health_records`',
        'Atomic batch writes to prevent partial ledger corruption'
      ],
      hi: [
        'फायरस्टोर वेबसोकेट श्रोताओं के माध्यम से रीयल-टाइम मल्टी-डिवाइस सिंक्रनाइज़ेशन',
        '`farms`, `animals`, `production_records`, `health_records` का सुरक्षित प्रबंधन',
        'आंशिक डेटा त्रुटियों को रोकने के लिए एटॉमिक बैच राइट्स'
      ]
    },
    techStack: 'Firebase 10.12.5 (firebase/firestore), Google Cloud Security Rules',
    keyFiles: ['src/services/firestoreSync.ts', 'src/lib/firebase.ts', 'firestore.rules'],
    inputsOutputs: {
      en: 'Input: Local farm state | Output: Remote Firestore documents & real-time broadcasts',
      hi: 'इनपुट: स्थानीय बदलाव | आउटपुट: क्लाउड में दस्तावेज़ और रीयल-टाइम अपडेट'
    },
    faultTolerance: {
      en: 'Automatic retry with exponential backoff on intermittent network disconnects.',
      hi: 'नेटवर्क टूटने पर स्वतः पुनः प्रयास और कतार प्रबंधन।'
    },
    category: 'core'
  },
  {
    id: 'fastapi_gateway',
    nameEn: 'FastAPI Analytics Gateway',
    nameHi: 'फास्टएपीआई एनालिटिक्स गेटवे',
    subtitleEn: 'REST API & Batch Worker',
    subtitleHi: 'पायथन 3.11 माइक्रो-सर्विस',
    badge: 'Python 3.11 + FastAPI',
    tier: 'Compute & Dispatch Core',
    color: 'border-emerald-500/90 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.4)]',
    glowColor: '#10B981',
    icon: <Code2 className="w-5 h-5 text-emerald-400" />,
    x: 575,
    y: 330,
    w: 195,
    h: 84,
    responsibilities: {
      en: [
        'High-throughput Python microservice for processing multi-herd batch records',
        'Endpoints: POST /telemetry, POST /predict/yield, GET /analytics/anomalies',
        'Integrates NumPy, SciPy, and Pandas for statistical rolling baselines'
      ],
      hi: [
        'बड़े स्तर पर मवेशी डेटा को तेजी से प्रोसेस करने वाली पायथन माइक्रो-सर्विस',
        'एंडपॉइंट्स: POST /telemetry, POST /predict/yield, GET /analytics/anomalies',
        'सांख्यिकीय विश्लेषण के लिए NumPy, SciPy और Pandas का उपयोग'
      ]
    },
    techStack: 'FastAPI, Uvicorn, Python 3.11, Pydantic v2, Pandas, NumPy',
    keyFiles: ['analytics_api/main.py', 'analytics_api/requirements.txt'],
    inputsOutputs: {
      en: 'Input: JSON telemetry packets | Output: Computed Z-scores, predictions & logs',
      hi: 'इनपुट: टेलीमेट्री पैकेट्स | आउटपुट: विश्लेषित Z-स्कोर एवं पूर्वानुमान'
    },
    faultTolerance: {
      en: 'Asynchronous event loop with Pydantic validation boundaries.',
      hi: 'अवैध डेटा आने पर 422 अनप्रोसेसेबल एरर के साथ सुरक्षित हैंडलिंग।'
    },
    category: 'core'
  },
  {
    id: 'herd_db',
    nameEn: 'Cloud Firestore Database',
    nameHi: 'क्लाउड फायरस्टोर डेटाबेस',
    subtitleEn: 'Herd & Production Ledger',
    subtitleHi: 'पशुधन उत्पादन एवं स्वास्थ्य लेजर',
    badge: 'Firestore Collections',
    tier: 'Cloud Persistence Store',
    color: 'border-indigo-500/80 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]',
    glowColor: '#6366F1',
    icon: <Database className="w-5 h-5 text-indigo-400" />,
    x: 575,
    y: 530,
    w: 195,
    h: 82,
    responsibilities: {
      en: [
        'Cloud Firestore collections: `farms`, `animals`, `production`, `feed_logs`, `health`',
        'Enforces multi-tenant segregation by farm ID (Kanpur Dairy vs Karnal Layers)',
        'Maintains immutable clinical history and cooperative dairy milk receipts'
      ],
      hi: [
        'क्लाउड डेटाबेस संग्रह: फार्म, पशु, उत्पादन रिकॉर्ड, चारा लॉग, उपचार',
        'फार्म आईडी के आधार पर अलग-अलग डेटा अलगाव',
        'ऐतिहासिक उत्पादन और सहकारी डेयरी रसीदों का सुरक्षित रिकॉर्ड'
      ]
    },
    techStack: 'Google Cloud Firestore, NoSQL Document Collections, Security Rules',
    keyFiles: ['src/services/firestoreSync.ts', 'src/types/index.ts', 'firestore.rules'],
    inputsOutputs: {
      en: 'Input: Firestore document mutations | Output: Real-time snapshot updates',
      hi: 'इनपुट: डेटाबेस दस्तावेज अपडेट | आउटपुट: रीयल-टाइम स्नैपशॉट'
    },
    faultTolerance: {
      en: 'Google Cloud multi-region automatic replication with offline caching.',
      hi: 'गूगल क्लाउड मल्टी-रीजन बैकअप और स्वतः डेटा सुरक्षा।'
    },
    category: 'core'
  },

  // SUB-CONTAINER INSIDE CORE: HERD HEALTH & TELEMETRY PIPELINE
  {
    id: 'iqr_engine',
    nameEn: 'IQR Anomaly Engine',
    nameHi: 'IQR सांख्यिकीय विसंगति इंजन',
    subtitleEn: '30-Day Baseline Outlier (-18.2%)',
    subtitleHi: 'असामान्य दूध गिरावट पहचान',
    badge: 'IQR & Z-Score Tests',
    tier: 'Statistical Intelligence',
    color: 'border-purple-500/90 text-purple-300 shadow-[0_0_22px_rgba(168,85,247,0.4)]',
    glowColor: '#A855F7',
    icon: <Activity className="w-5 h-5 text-purple-400" />,
    x: 805,
    y: 130,
    w: 165,
    h: 80,
    responsibilities: {
      en: [
        'Calculates 30-day rolling mean, IQR, and standard deviation for individual milk yields',
        'Flags subclinical yield anomalies (e.g. COW-018 drop of -18.2% vs baseline)',
        'Filters noise using weather-adjusted baselines before dispatching alerts'
      ],
      hi: [
        'दूध उत्पादन के लिए 30-दिवसीय औसत, IQR और मानक विचलन की गणना',
        'सब-क्लिनिकल गिरावट की समय रहते पहचान (जैसे -18.2% असामान्य गिरावट)',
        'मौसम के प्रभाव को ध्यान में रखकर सटीक अलर्ट जारी करना'
      ]
    },
    techStack: 'IQR Outlier Detection, Rolling Moving Averages, Z-Score Matrix',
    keyFiles: ['src/components/analytics/AnalyticsView.tsx', 'analytics_api/main.py'],
    inputsOutputs: {
      en: 'Input: 30-day time series arrays | Output: Anomaly boolean, deviation sigma, delta %',
      hi: 'इनपुट: 30 दिन का उत्पादन डेटा | आउटपुट: विसंगति फ्लैग, गिरावट प्रतिशत'
    },
    faultTolerance: {
      en: 'Bootstrap fallback when animal history has fewer than 7 days of records.',
      hi: '7 दिन से कम रिकॉर्ड होने पर बूटस्ट्रैप औसत पद्धति का उपयोग।'
    },
    category: 'pipeline'
  },
  {
    id: 'clinical_tracker',
    nameEn: 'Clinical Vitals Tracker',
    nameHi: 'नैदानिक तापमान एवं लक्षण',
    subtitleEn: 'Core Rectal Temp °C & Vitals',
    subtitleHi: 'शारीरिक तापमान एवं लक्षण',
    badge: 'Core Temp °C Signs',
    tier: 'Veterinary Telemetry',
    color: 'border-rose-500/80 text-rose-300 shadow-[0_0_20px_rgba(225,29,72,0.35)]',
    glowColor: '#E11D48',
    icon: <Thermometer className="w-5 h-5 text-rose-400" />,
    x: 805,
    y: 260,
    w: 165,
    h: 74,
    responsibilities: {
      en: [
        'Monitors core rectal temperature (°C) against species physiological thresholds',
        'Logs qualitative clinical signs: rumination rate, nasal discharge, udder heat, mastitis',
        'Auto-elevates animal status to "Attention" when temperature breaches 39.5°C'
      ],
      hi: [
        'प्रजाति के मानक स्तर के अनुसार मलाशय के तापमान (°C) की निगरानी',
        'लक्षण रिकॉर्डिंग: जुगाली दर, नाक से स्राव, थन की सूजन, मैस्टाइटिस',
        'तापमान 39.5°C से अधिक होने पर तत्काल "अटेंशन" फ्लैग लगाना'
      ]
    },
    techStack: 'Physiological Baseline Engine, Temperature Bound Sanitizer',
    keyFiles: ['src/components/animals/LogHealthModal.tsx', 'src/types/index.ts'],
    inputsOutputs: {
      en: 'Input: Degrees °C, symptom flags | Output: Health record, urgent clinical alert',
      hi: 'इनपुट: तापमान °C, लक्षण | आउटपुट: स्वास्थ्य रिकॉर्ड, अलर्ट'
    },
    faultTolerance: {
      en: 'Input bounds clamp (35.0°C - 43.0°C) to prevent catastrophic typist outliers.',
      hi: 'टाइपिंग गलती रोकने के लिए तापमान सीमा 35.0°C से 43.0°C तक सीमित।'
    },
    category: 'pipeline'
  },
  {
    id: 'thi_weather',
    nameEn: 'THI Heat Stress Engine',
    nameHi: 'THI हीट स्ट्रेस इंडेक्स',
    subtitleEn: 'Ambient Temp + RH (NRC)',
    subtitleHi: 'तापमान व आर्द्रता इंडेक्स',
    badge: 'NRC Formula (0-100)',
    tier: 'Environmental Intelligence',
    color: 'border-teal-500/80 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.35)]',
    glowColor: '#14B8A6',
    icon: <Sun className="w-5 h-5 text-teal-400" />,
    x: 805,
    y: 390,
    w: 165,
    h: 74,
    responsibilities: {
      en: [
        'Pulls ambient temperature and relative humidity for farm geo-coordinates',
        'Calculates NRC THI: THI = (1.8*T + 32) - ((0.55 - 0.0055*RH) * (1.8*T - 26))',
        'Categorizes thermal stress: Normal (<72), Mild (72-78), Moderate (79-88), Severe (>88)'
      ],
      hi: [
        'फार्म के क्षेत्र के अनुसार वास्तविक तापमान एवं सापेक्ष आर्द्रता प्राप्त करना',
        'NRC THI सूत्र द्वारा हीट स्ट्रेस इंडेक्स की सटीक गणना',
        'तनाव वर्गीकरण: सामान्य (<72), हल्का (72-78), मध्यम (79-88), गंभीर (>88)'
      ]
    },
    techStack: 'OpenWeatherMap API, NRC Environmental Biometrics',
    keyFiles: ['src/components/common/WeatherBar.tsx', 'src/context/FarmContext.tsx'],
    inputsOutputs: {
      en: 'Input: Lat/Lon, Weather API | Output: THI score, Heat stress warning level',
      hi: 'इनपुट: शहर का मौसम डेटा | आउटपुट: THI स्कोर एवं हीट स्ट्रेस चेतावनी'
    },
    faultTolerance: {
      en: 'Realistic regional fallback when weather API keys or network are unavailable.',
      hi: 'API अनुपलब्ध होने पर क्षेत्र के मौसमी औसत से अनुमान लगाना।'
    },
    category: 'pipeline'
  },
  {
    id: 'biosecurity_scorer',
    nameEn: '15-Pt Biosecurity Audit',
    nameHi: '15-सूत्रीय जैव-सुरक्षा ऑडिट',
    subtitleEn: 'WHO/FAO Farm Risk Protocol',
    subtitleHi: 'मानक फार्म सुरक्षा ऑडिट',
    badge: 'Score: 0-100 Index',
    tier: 'Preventive Compliance',
    color: 'border-emerald-500/80 text-emerald-300 shadow-[0_0_20px_rgba(5,150,105,0.3)]',
    glowColor: '#059669',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    x: 805,
    y: 520,
    w: 165,
    h: 74,
    responsibilities: {
      en: [
        'Evaluates 15 critical infection-control checkpoints: tire dip, footbaths, quarantine, fencing',
        'Computes dynamic Farm Biosecurity Index (0-100) and risk tier (Low, Moderate, Critical)',
        'Generates audit compliance reports for veterinary inspectors'
      ],
      hi: [
        '15 महत्वपूर्ण संक्रमण नियंत्रण बिंदुओं की जांच: टायर डिप, फुटबाथ, क्वारंटाइन, बाड़',
        'डायनामिक फार्म बायोसिक्योरिटी इंडेक्स (0-100) और रिस्क टियर की गणना',
        'पशु चिकित्सा निरीक्षकों के लिए ऑडिट रिपोर्ट तैयार करना'
      ]
    },
    techStack: 'Veterinary Biosecurity Matrix, Dynamic Weighting Engine',
    keyFiles: ['src/components/biosecurity/RiskAssessmentView.tsx'],
    inputsOutputs: {
      en: 'Input: Checkpoint toggles | Output: Biosecurity score, Risk Tier, Certificate badge',
      hi: 'इनपुट: चेकपॉइंट टॉगल | आउटपुट: बायोसिक्योरिटी स्कोर और प्रमाणीकरण'
    },
    faultTolerance: {
      en: 'Persisted immediately to local cache with transactional rollback on save error.',
      hi: 'लोकल कैश में तुरंत सुरक्षित और क्लाउड में स्वतः बैकअप।'
    },
    category: 'pipeline'
  },

  // COLUMN 4: AI INTELLIGENCE & AGRONOMIC DECISION CORE
  {
    id: 'kisan_copilot',
    nameEn: 'Kisan Mitra AI Copilot',
    nameHi: 'किसान मित्र एआई कोपायलट',
    subtitleEn: 'Domain-Specific Farm RAG',
    subtitleHi: 'सत्यापित फार्म RAG एवं कृषि सहायक',
    badge: 'Zero-Hallucination AI',
    tier: 'AI Intelligence Core',
    color: 'border-amber-400/90 text-amber-200 shadow-[0_0_24px_rgba(234,179,8,0.45)]',
    glowColor: '#EAB308',
    icon: <Bot className="w-5 h-5 text-amber-300" />,
    x: 1040,
    y: 130,
    w: 225,
    h: 84,
    responsibilities: {
      en: [
        'Queries live herd telemetry directly before generating any advice (Zero Hallucination)',
        'Answers profit & margin questions: "In which month more profit done?", "Profit badhane ke liye kya kare?"',
        'Provides bilingual agronomic protocols in pure Hindi, English, and Hinglish'
      ],
      hi: [
        'बिना किसी झूठे डेटा के लाइव फार्म रिकॉर्ड्स से सत्यापित उत्तर (Zero Hallucination)',
        'लाभ संबंधी प्रश्नों का सटीक उत्तर: "किस महीने में अधिक लाभ हुआ?", "प्रॉफिट बढ़ाने के लिए क्या करें?"',
        'विशुद्ध हिंदी और अंग्रेजी दोनों में कृषि एवं पशुधन सलाह'
      ]
    },
    techStack: 'Domain RAG, Natural Language Processing, Deterministic Grounding Synthesizer',
    keyFiles: ['src/components/ai/AIFarmAssistant.tsx'],
    inputsOutputs: {
      en: 'Input: Natural language user question | Output: Computed financial & agronomic recovery plan',
      hi: 'इनपुट: किसान का प्रश्न | आउटपुट: वास्तविक डेटा पर आधारित सटीक समाधान'
    },
    faultTolerance: {
      en: 'Strict refusal boundary for ungrounded queries; never prescribes Schedule-H pharmaceuticals.',
      hi: 'अनुमानित दवाओं से बचाव; केवल प्राथमिक पशुधन प्रबंधन एवं पोषण सलाह।'
    },
    category: 'ai'
  },
  {
    id: 'diagnostic_evaluator',
    nameEn: 'Herd Diagnostic Evaluator',
    nameHi: 'पशुधन नैदानिक समन्वयक',
    subtitleEn: 'Multi-Signal Causal Tree',
    subtitleHi: 'तापमान + दूध + हीट स्ट्रेस समन्वय',
    badge: 'Multi-Signal Evaluator',
    tier: 'Decision Synthesis Core',
    color: 'border-cyan-400/90 text-cyan-200 shadow-[0_0_24px_rgba(6,182,212,0.45)]',
    glowColor: '#00F0FF',
    icon: <Cpu className="w-5 h-5 text-cyan-300" />,
    x: 1040,
    y: 330,
    w: 225,
    h: 84,
    responsibilities: {
      en: [
        'Fuses 4 disparate signal streams: Yield Drops (-18.2%) + Rectal Temp + Feed Cost + THI Stress',
        'Generates explainable causal diagnoses: "Subclinical Mastitis + Heat Stress exacerbation"',
        'Feeds synthesized context summaries directly into Kisan Mitra'
      ],
      hi: [
        '4 विभिन्न संकेतों का एकीकरण: दूध गिरावट + शरीर का तापमान + चारा खर्च + THI हीट स्ट्रेस',
        'कारण-सहित व्याख्या प्रस्तुत करना: "सब-क्लिनिकल मैस्टाइटिस + गर्मी का तनाव"',
        'किसान मित्र AI को सटीक संक्षेप विवरण प्रदान करना'
      ]
    },
    techStack: 'Multi-Signal Decision Trees, Causal Health Graph Evaluation',
    keyFiles: ['src/components/analytics/AnalyticsView.tsx', 'src/components/ai/AIFarmAssistant.tsx'],
    inputsOutputs: {
      en: 'Input: Anomalies, THI, Vitals | Output: Fused Health Status & Causal Assessment',
      hi: 'इनपुट: विसंगतियां, मौसम, लक्षण | आउटपुट: एकीकृत स्वास्थ्य स्थिति'
    },
    faultTolerance: {
      en: 'Degrades smoothly if weather or sensor signals are missing.',
      hi: 'किसी एक सिग्नल के न होने पर शेष संकेतों से विश्लेषण जारी रखना।'
    },
    category: 'ai'
  },
  {
    id: 'action_engine',
    nameEn: 'Agronomic Profit & Nutrition',
    nameHi: 'कृषि पोषण एवं लाभ संवर्धक',
    subtitleEn: 'TMR Ration & Feed ROI Plan',
    subtitleHi: 'संतुलित आहार एवं वित्तीय लाभ योजना',
    badge: 'TMR & ROI Optimizer',
    tier: 'Intervention Execution',
    color: 'border-rose-500/80 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]',
    glowColor: '#F43F5E',
    icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
    x: 1040,
    y: 530,
    w: 225,
    h: 82,
    responsibilities: {
      en: [
        'Formulates 5-step concrete recovery actions: TMR mineral ration, water misting, mastitis isolation',
        'Projects financial returns on intervention: e.g. +14.5% yield recovery = +₹3,200/cow/month',
        'Logs verified interventions into the Herd Database for compliance'
      ],
      hi: [
        '5-चरणीय ठोस कार्ययोजना: TMR संतुलित आहार, मिस्टिंग पंखे, मैस्टाइटिस अलग करना',
        'वित्तीय लाभ का आकलन: +14.5% दूध सुधार = +₹3,200/गाय/माह अतिरिक्त आय',
        'प्रबंधन रिकॉर्ड्स को फार्म लेजर में सहेजना'
      ]
    },
    techStack: 'Feed Optimization Algorithms, Farm Financial Yield Calculators',
    keyFiles: ['src/components/ai/AIFarmAssistant.tsx', 'src/context/FarmContext.tsx'],
    inputsOutputs: {
      en: 'Input: Fused risk tree | Output: 5-step recovery roadmap with ROI estimates',
      hi: 'इनपुट: जोखिम विवरण | आउटपुट: 5-चरणीय सुधार रोडमैप और लाभ गणना'
    },
    faultTolerance: {
      en: 'Conservative financial modeling prevents over-optimistic profit promises.',
      hi: 'सटीक और व्यावहारिक गणना ताकि किसान को भ्रामक उम्मीद न हो।'
    },
    category: 'ai'
  }
];

export interface ArchitectureEdge {
  id: string;
  sourceId: string;
  targetId: string;
  labelEn: string;
  labelHi: string;
  color: string;
  pulseColor: string;
  pulseDuration: string;
  d: string;
  labelX: number;
  labelY: number;
  isPrimaryPath?: boolean;
}

export const ARCHITECTURE_EDGES: ArchitectureEdge[] = [
  // 1. Farmer Session -> Web UI (HTTPS Session)
  {
    id: 'e_session_ui',
    sourceId: 'farmer_session',
    targetId: 'web_ui',
    labelEn: 'HTTPS Session',
    labelHi: 'HTTPS सत्र',
    color: '#06B6D4',
    pulseColor: '#00F0FF',
    pulseDuration: '1.8s',
    d: 'M 260 372 L 295 372',
    labelX: 277,
    labelY: 372,
    isPrimaryPath: true
  },
  // 2. Field PWA -> Web UI (Mobile Field Entry)
  {
    id: 'e_pwa_ui',
    sourceId: 'user_pwa',
    targetId: 'web_ui',
    labelEn: 'Field Telemetry',
    labelHi: 'फील्ड टेलीमेट्री',
    color: '#F43F5E',
    pulseColor: '#10B981',
    pulseDuration: '2.4s',
    d: 'M 260 171 C 320 171, 320 330, 320 330',
    labelX: 305,
    labelY: 235,
    isPrimaryPath: true
  },
  // 3. Web UI -> Offline Cache (Local Snapshot)
  {
    id: 'e_ui_cache',
    sourceId: 'web_ui',
    targetId: 'offline_cache',
    labelEn: 'Local Snapshot',
    labelHi: 'स्थानीय स्नैपशॉट',
    color: '#F59E0B',
    pulseColor: '#F59E0B',
    pulseDuration: '2.2s',
    d: 'M 350 414 C 350 490, 260 550, 260 550',
    labelX: 320,
    labelY: 480,
    isPrimaryPath: true
  },
  // 4. Web UI -> FastAPI Gateway (POST /telemetry)
  {
    id: 'e_ui_gateway',
    sourceId: 'web_ui',
    targetId: 'fastapi_gateway',
    labelEn: 'POST /telemetry',
    labelHi: 'POST /telemetry',
    color: '#06B6D4',
    pulseColor: '#00F0FF',
    pulseDuration: '1.9s',
    d: 'M 520 372 L 575 372',
    labelX: 547,
    labelY: 372,
    isPrimaryPath: true
  },
  // 5. FastAPI Gateway -> Firestore Sync (Cloud Sync TLS)
  {
    id: 'e_gateway_sync',
    sourceId: 'fastapi_gateway',
    targetId: 'firestore_sync',
    labelEn: 'Cloud Sync (TLS)',
    labelHi: 'क्लाउड सिंक (TLS)',
    color: '#0284C7',
    pulseColor: '#38BDF8',
    pulseDuration: '2.1s',
    d: 'M 672 330 L 672 212',
    labelX: 672,
    labelY: 270,
    isPrimaryPath: true
  },
  // 6. Herd Database -> Firestore Sync (Bidirectional Sync)
  {
    id: 'e_db_sync',
    sourceId: 'herd_db',
    targetId: 'firestore_sync',
    labelEn: 'onSnapshot Sync',
    labelHi: 'रीयल-टाइम सिंक',
    color: '#6366F1',
    pulseColor: '#818CF8',
    pulseDuration: '2.8s',
    d: 'M 620 530 L 620 212',
    labelX: 620,
    labelY: 450
  },
  // 7. FastAPI Gateway -> Pipeline Dispatch
  {
    id: 'e_gateway_diag',
    sourceId: 'fastapi_gateway',
    targetId: 'diagnostic_evaluator',
    labelEn: 'Compute Batch',
    labelHi: 'बैच विश्लेषण',
    color: '#10B981',
    pulseColor: '#34D399',
    pulseDuration: '2.2s',
    d: 'M 770 372 L 805 372',
    labelX: 787,
    labelY: 372,
    isPrimaryPath: true
  },
  // 8. IQR Engine -> Kisan Mitra Copilot (Outlier Alert -18.2%)
  {
    id: 'e_iqr_copilot',
    sourceId: 'iqr_engine',
    targetId: 'kisan_copilot',
    labelEn: 'Outlier Flag (-18.2%)',
    labelHi: 'उत्पादन गिरावट (-18.2%)',
    color: '#A855F7',
    pulseColor: '#F43F5E',
    pulseDuration: '2.0s',
    d: 'M 970 170 L 1040 170',
    labelX: 1005,
    labelY: 170,
    isPrimaryPath: true
  },
  // 9. Clinical Tracker -> Diagnostic Evaluator (Fever & Mastitis Signs)
  {
    id: 'e_clinical_diag',
    sourceId: 'clinical_tracker',
    targetId: 'diagnostic_evaluator',
    labelEn: 'Core Temp °C',
    labelHi: 'शारीरिक तापमान °C',
    color: '#E11D48',
    pulseColor: '#FB7185',
    pulseDuration: '2.1s',
    d: 'M 970 297 C 1005 297, 1005 350, 1040 350',
    labelX: 1005,
    labelY: 310,
    isPrimaryPath: true
  },
  // 10. THI Weather -> Diagnostic Evaluator (Heat Stress Level)
  {
    id: 'e_thi_diag',
    sourceId: 'thi_weather',
    targetId: 'diagnostic_evaluator',
    labelEn: 'THI Heat Index',
    labelHi: 'THI हीट स्ट्रेस',
    color: '#14B8A6',
    pulseColor: '#2DD4BF',
    pulseDuration: '2.3s',
    d: 'M 970 427 C 1005 427, 1005 372, 1040 372',
    labelX: 1005,
    labelY: 410,
    isPrimaryPath: true
  },
  // 11. Diagnostic Evaluator -> Kisan Mitra Copilot (Clinical Grounding Summary)
  {
    id: 'e_diag_copilot',
    sourceId: 'diagnostic_evaluator',
    targetId: 'kisan_copilot',
    labelEn: 'Health Grounding',
    labelHi: 'स्वास्थ्य सारांश',
    color: '#EAB308',
    pulseColor: '#FDE047',
    pulseDuration: '2.0s',
    d: 'M 1152 330 L 1152 214',
    labelX: 1152,
    labelY: 270,
    isPrimaryPath: true
  },
  // 12. Diagnostic Evaluator -> Action Engine (Formulate Recovery Plan)
  {
    id: 'e_diag_action',
    sourceId: 'diagnostic_evaluator',
    targetId: 'action_engine',
    labelEn: 'Recovery Matrix',
    labelHi: 'सुधार कार्ययोजना',
    color: '#06B6D4',
    pulseColor: '#22D3EE',
    pulseDuration: '2.2s',
    d: 'M 1152 414 L 1152 530',
    labelX: 1152,
    labelY: 470,
    isPrimaryPath: true
  },
  // 13. Biosecurity Scorer -> Action Engine (Biosecurity Certification)
  {
    id: 'e_bio_action',
    sourceId: 'biosecurity_scorer',
    targetId: 'action_engine',
    labelEn: 'Bio-Audit Score',
    labelHi: 'ऑडिट स्कोर 0-100',
    color: '#059669',
    pulseColor: '#34D399',
    pulseDuration: '2.4s',
    d: 'M 970 557 L 1040 557',
    labelX: 1005,
    labelY: 557
  },
  // 14. Action Engine -> Herd Database (Preserve Audit Records)
  {
    id: 'e_action_db',
    sourceId: 'action_engine',
    targetId: 'herd_db',
    labelEn: 'Commit Records',
    labelHi: 'रिकॉर्ड संरक्षण',
    color: '#F43F5E',
    pulseColor: '#FB7185',
    pulseDuration: '2.5s',
    d: 'M 1040 585 L 770 585',
    labelX: 905,
    labelY: 585
  },
  // 15. Kisan Mitra Copilot -> Web UI Console (Verified Bilingual Advice Feed)
  {
    id: 'e_copilot_ui',
    sourceId: 'kisan_copilot',
    targetId: 'web_ui',
    labelEn: 'Verified RAG Advice',
    labelHi: 'सत्यापित RAG परामर्श',
    color: '#EAB308',
    pulseColor: '#FDE047',
    pulseDuration: '3.2s',
    d: 'M 1040 150 C 750 20, 410 20, 410 330',
    labelX: 680,
    labelY: 24,
    isPrimaryPath: true
  }
];

interface LiveArchitectureCanvasProps {
  onOpenDoc?: () => void;
  isStandalone?: boolean;
}

export const LiveArchitectureCanvas: React.FC<LiveArchitectureCanvasProps> = ({
  onOpenDoc,
  isStandalone = false
}) => {
  const { language } = useLanguage();
  const [isLive, setIsLive] = useState<boolean>(true);
  const [viewPreset, setViewPreset] = useState<'classic' | 'primaryPath' | 'clinical' | 'rag'>('classic');
  const [routeActive, setRouteActive] = useState<boolean>(false);
  const [lensCategory, setLensCategory] = useState<'all' | 'edge' | 'core' | 'pipeline' | 'ai'>('all');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('kisan_copilot');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);
  const [copiedMermaid, setCopiedMermaid] = useState<boolean>(false);

  // Pan and Zoom: Centered and fitted
  const [zoom, setZoom] = useState<number>(0.92);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 15 });
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedNode = ARCHITECTURE_NODES.find(n => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];
  const focusedNode = ARCHITECTURE_NODES.find(n => n.id === focusedNodeId) || null;

  const handleNodeClick = (node: ArchitectureNode, e: React.MouseEvent) => {
    e.stopPropagation();

    if (focusedNodeId === node.id) {
      // Toggle off / return to global overview
      handleResetZoom();
      return;
    }

    setFocusedNodeId(node.id);
    setSelectedNodeId(node.id);

    const nodeCenterX = node.x + node.w / 2;
    const nodeCenterY = node.y + node.h / 2;
    const cw = containerRef.current?.clientWidth || 1200;
    const ch = containerRef.current?.clientHeight || 700;

    // Smoothly zoom in to spotlight this component and its immediate data streams
    const targetZoom = 1.35;
    const targetPanX = cw / 2 - nodeCenterX * targetZoom;
    const targetPanY = ch / 2 - nodeCenterY * targetZoom;

    setZoom(targetZoom);
    setPan({ x: targetPanX, y: targetPanY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.interactive-node') || (e.target as HTMLElement).closest('.interactive-control')) {
      return;
    }
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(0.4, prev + delta), 1.6));
  };

  const handleResetZoom = () => {
    setFocusedNodeId(null);
    setZoom(0.92);
    setPan({ x: 20, y: 15 });
    setRouteActive(false);
    setLensCategory('all');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(ARCHITECTURE_MERMAID);
    setCopiedMermaid(true);
    setTimeout(() => setCopiedMermaid(false), 2000);
    setIsExportMenuOpen(false);
  };

  const handleDownloadSVG = () => {
    const svgEl = document.getElementById('live-arch-svg');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `swasthfarm-architecture-live-${new Date().toISOString().slice(0, 10)}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsExportMenuOpen(false);
  };

  const filteredNodes = ARCHITECTURE_NODES.filter(node => {
    const q = searchQuery.toLowerCase();
    return (
      node.nameEn.toLowerCase().includes(q) ||
      node.nameHi.toLowerCase().includes(q) ||
      node.badge.toLowerCase().includes(q) ||
      node.techStack.toLowerCase().includes(q)
    );
  });

  const isEdgeConnectedToFocus = (edge: ArchitectureEdge) => {
    if (!focusedNodeId) return false;
    return edge.sourceId === focusedNodeId || edge.targetId === focusedNodeId;
  };

  const isNodeDimmed = (node: ArchitectureNode) => {
    if (focusedNodeId) {
      if (node.id === focusedNodeId) return false;
      // Keep direct neighbor nodes illuminated so the flow can be seen traveling between them
      const isNeighbor = ARCHITECTURE_EDGES.some(
        e =>
          (e.sourceId === focusedNodeId && e.targetId === node.id) ||
          (e.targetId === focusedNodeId && e.sourceId === node.id)
      );
      return !isNeighbor;
    }
    if (routeActive && !node.category) return true;
    if (lensCategory !== 'all' && node.category !== lensCategory) return true;
    if (viewPreset === 'clinical' && !['clinical_tracker', 'iqr_engine', 'thi_weather', 'fastapi_gateway'].includes(node.id)) {
      return true;
    }
    if (viewPreset === 'rag' && !['kisan_copilot', 'diagnostic_evaluator', 'action_engine', 'herd_db', 'web_ui'].includes(node.id)) {
      return true;
    }
    return false;
  };

  const isEdgeHighlighted = (edge: ArchitectureEdge) => {
    if (focusedNodeId) {
      return isEdgeConnectedToFocus(edge);
    }
    if (routeActive && edge.isPrimaryPath) return true;
    if (hoveredNodeId && (edge.sourceId === hoveredNodeId || edge.targetId === hoveredNodeId)) return true;
    if (selectedNodeId && (edge.sourceId === selectedNodeId || edge.targetId === selectedNodeId)) return true;
    return false;
  };

  // Connected counts for focused node
  const focusedIncomingEdges = focusedNodeId ? ARCHITECTURE_EDGES.filter(e => e.targetId === focusedNodeId) : [];
  const focusedOutgoingEdges = focusedNodeId ? ARCHITECTURE_EDGES.filter(e => e.sourceId === focusedNodeId) : [];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col bg-[#070B13] text-slate-100 font-sans select-none overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'rounded-2xl'
      }`}
    >
      {/* TOP HEADER CONTROLS */}
      <div className="flex-shrink-0 z-30 px-5 py-3 bg-[#0B101D]/90 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        {/* Left Title & Status Indicator */}
        <div className="flex items-center space-x-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_12px_#06B6D4]"></span>
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center space-x-2">
                <span>{language === 'hi' ? 'स्वस्थफार्म AI सिस्टम आर्किटेक्चर' : 'SwasthFarm AI System Architecture'}</span>
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Archify v2.17
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              {language === 'hi'
                ? 'पशुधन टेलीमेट्री, सांख्यिकीय विसंगति पहचान और डोमेन RAG लाइव आर्किटेक्चर'
                : 'End-to-End Livestock Telemetry, Statistical Anomaly Intelligence & Kisan Mitra RAG Pipeline'}
            </p>
          </div>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 interactive-control">
          {/* Preset Selector */}
          <div className="relative">
            <select
              value={viewPreset}
              onChange={e => {
                const val = e.target.value as any;
                setViewPreset(val);
                if (val === 'primaryPath') setRouteActive(true);
                else setRouteActive(false);
              }}
              className="bg-slate-900/90 text-slate-200 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="classic">⚡ {language === 'hi' ? 'क्लासिक (संपूर्ण 12 घटक)' : 'Classic (All Components)'}</option>
              <option value="primaryPath">🎯 {language === 'hi' ? 'मुख्य ऑपरेशनल पाथ' : 'Primary Operational Path'}</option>
              <option value="clinical">🩺 {language === 'hi' ? 'नैदानिक एवं विसंगति प्रवाह' : 'Clinical & Anomaly Flow'}</option>
              <option value="rag">🤖 {language === 'hi' ? 'किसान मित्र RAG परामर्श' : 'Kisan Mitra RAG Consultation'}</option>
            </select>
          </div>

          {/* Live Pulse Toggle Button */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isLive
                ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Live Telemetry & Event Simulation"
          >
            <span className={`inline-block w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            <span>{language === 'hi' ? 'लाइव' : 'Live'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Canvas'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'hi' ? 'निर्यात' : 'Export'}</span>
              <span className="text-[10px]">▾</span>
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0D1322] border border-slate-700 shadow-2xl p-1.5 z-50 text-xs space-y-1">
                <button
                  onClick={handleDownloadSVG}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-left text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>{language === 'hi' ? 'SVG डायग्राम डाउनलोड करें' : 'Download Vector SVG'}</span>
                </button>

                <button
                  onClick={handleCopyMermaid}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-left text-slate-200 hover:bg-slate-800/80 transition-colors"
                >
                  {copiedMermaid ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
                  <span>{copiedMermaid ? 'Copied to Clipboard!' : (language === 'hi' ? 'मर्मेड कोड कॉपी करें' : 'Copy Mermaid Source')}</span>
                </button>

                {onOpenDoc && (
                  <button
                    onClick={() => {
                      onOpenDoc();
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-left text-slate-200 hover:bg-slate-800/80 transition-colors"
                  >
                    <FileCode2 className="w-4 h-4 text-amber-400" />
                    <span>{language === 'hi' ? 'ARCHITECTURE.md देखें' : 'View ARCHITECTURE.md'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CANVAS CONTAINER */}
      <div
        className="relative flex-1 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={e => {
          e.preventDefault();
          handleZoom(e.deltaY < 0 ? 0.05 : -0.05);
        }}
        style={{
          backgroundColor: '#070B13',
          backgroundImage:
            'radial-gradient(circle, rgba(56, 189, 248, 0.12) 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* Floating Canvas Top Right: "Notes & Index" Button */}
        <div className="absolute top-4 right-4 z-20 interactive-control">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-slate-200 shadow-xl backdrop-blur-md transition-all hover:border-cyan-500/60"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{language === 'hi' ? '🗂 नोट्स एवं इंडेक्स' : '🗂 Notes & index'}</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
          </button>
        </div>

        {/* Floating Center Focus & Live Flow Banner */}
        {focusedNode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3 px-4 py-2 rounded-2xl bg-[#080D1A]/95 border border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.55)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 interactive-control">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_10px_#00F0FF]"></span>
            </span>
            <div className="text-xs">
              <span className="text-slate-400 text-[11px] font-mono">{language === 'hi' ? 'प्रवाह फोकस:' : 'Live Flow Focus:'} </span>
              <span className="font-extrabold text-white text-xs">{language === 'hi' ? focusedNode.nameHi : focusedNode.nameEn}</span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[9.5px] border border-cyan-500/40">
                {focusedIncomingEdges.length} {language === 'hi' ? 'आवक' : 'IN'} • {focusedOutgoingEdges.length} {language === 'hi' ? 'जावक' : 'OUT'}
              </span>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10.5px] font-bold border border-slate-700 transition-colors"
              title="Inspect card details"
            >
              {language === 'hi' ? 'विवरण' : 'Card'} ℹ
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2.5 py-1 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/60 text-rose-200 text-[10.5px] font-bold transition-colors"
              title="Zoom out / Reset flow"
            >
              {language === 'hi' ? 'ज़ूम आउट' : 'Zoom Out'} ✕
            </button>
          </div>
        )}

        {/* Floating Canvas Bottom Right Controls: ROUTE, LENS, Zoom */}
        <div className="absolute bottom-5 right-5 z-20 flex items-center space-x-2 interactive-control">
          <button
            onClick={() => setRouteActive(!routeActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider transition-all border ${
              routeActive
                ? 'bg-purple-900/80 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="Highlight Primary Operational Trace"
          >
            ⚲ ROUTE
          </button>

          <button
            onClick={() => {
              const categories: ('all' | 'edge' | 'core' | 'pipeline' | 'ai')[] = ['all', 'edge', 'core', 'pipeline', 'ai'];
              const nextIndex = (categories.indexOf(lensCategory) + 1) % categories.length;
              setLensCategory(categories[nextIndex]);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider transition-all border ${
              lensCategory !== 'all'
                ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="Focus Lens Cluster"
          >
            ◉ LENS {lensCategory !== 'all' ? `(${lensCategory.toUpperCase()})` : ''}
          </button>

          <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden shadow-xl text-xs font-semibold">
            <button
              onClick={() => handleZoom(-0.1)}
              className="px-2.5 py-1.5 hover:bg-slate-800 text-slate-300"
              title="Zoom Out"
            >
              -
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1.5 hover:bg-slate-800 text-slate-300 text-[11px] font-mono border-x border-slate-700/80"
              title="Reset Zoom & Pan"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={() => handleZoom(0.1)}
              className="px-2.5 py-1.5 hover:bg-slate-800 text-slate-300"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1.5 hover:bg-slate-800 text-slate-300"
              title="Reset View"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* MAIN SCALED CANVAS */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            width: '1340px',
            height: '730px'
          }}
        >
          {/* SVG LAYER */}
          <svg
            id="live-arch-svg"
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1340 730"
          >
            <defs>
              {/* Glow Filters */}
              <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-rose" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Arrow Markers */}
              <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#06B6D4" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10B981" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#A855F7" />
              </marker>
              <marker id="arrow-rose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#F43F5E" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#EAB308" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* SUBGRAPH 1: SwasthFarm Cloud & Analytics Core (Yellow Border) */}
            <rect
              x="550"
              y="55"
              width="440"
              height="600"
              rx="24"
              fill="rgba(234, 179, 8, 0.015)"
              stroke="#EAB308"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="transition-all"
            />
            {/* Subgraph Badge */}
            <g transform="translate(570, 43)">
              <rect x="0" y="0" width="240" height="24" rx="6" fill="#181509" stroke="#EAB308" strokeWidth="1" />
              <text x="12" y="16" fill="#FDE047" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {language === 'hi' ? '⚡ स्वस्थफार्म क्लाउड एवं एनालिटिक्स कोर' : '⚡ SwasthFarm Cloud Core'}
              </text>
            </g>

            {/* SUBGRAPH 2: Herd Telemetry & Diagnostic Pipeline (Pink dashed container) */}
            <rect
              x="785"
              y="90"
              width="195"
              height="535"
              rx="18"
              fill="rgba(244, 63, 94, 0.02)"
              stroke="#F43F5E"
              strokeWidth="1.2"
              strokeDasharray="5 5"
              className="transition-all"
            />
            <g transform="translate(795, 78)">
              <rect x="0" y="0" width="185" height="22" rx="5" fill="#1C0E14" stroke="#F43F5E" strokeWidth="1" />
              <text x="8" y="15" fill="#FDA4AF" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {language === 'hi' ? '🩺 पशुधन टेलीमेट्री पाइपलाइन' : '🩺 Herd Health Pipeline'}
              </text>
            </g>

            {/* CONNECTING EDGES */}
            {ARCHITECTURE_EDGES.map(edge => {
              const highlighted = isEdgeHighlighted(edge);
              const isFocusEdge = isEdgeConnectedToFocus(edge);
              const dimmed = (focusedNodeId && !isFocusEdge) || (routeActive && !edge.isPrimaryPath);

              return (
                <g key={edge.id} className="transition-opacity duration-300" opacity={dimmed ? 0.08 : highlighted ? 1 : 0.65}>
                  {/* Glowing Outline under path when highlighted or focused */}
                  {highlighted && (
                    <path
                      d={edge.d}
                      fill="none"
                      stroke={edge.pulseColor}
                      strokeWidth={isFocusEdge ? '7' : '5'}
                      opacity={isFocusEdge ? 0.7 : 0.4}
                      filter="url(#glow-cyan)"
                    />
                  )}

                  {/* Main Line */}
                  <path
                    id={`path-${edge.id}`}
                    d={edge.d}
                    fill="none"
                    stroke={edge.color}
                    strokeWidth={isFocusEdge ? '3.2' : highlighted ? '2.5' : '1.8'}
                    strokeDasharray={edge.id === 'e_pwa_ui' || edge.id === 'e_copilot_ui' ? '4 4' : 'none'}
                    markerEnd={`url(#arrow-${
                      edge.color === '#10B981' || edge.color === '#059669'
                        ? 'green'
                        : edge.color === '#06B6D4'
                        ? 'cyan'
                        : edge.color === '#0284C7'
                        ? 'blue'
                        : edge.color === '#A855F7' || edge.color === '#6366F1'
                        ? 'purple'
                        : edge.color === '#EAB308'
                        ? 'amber'
                        : 'rose'
                    })`}
                  />

                  {/* LIVE ANIMATED FLOW PACKET */}
                  {isLive && (
                    <g>
                      {/* Primary Leading Flow Particle */}
                      <circle r={isFocusEdge ? '5' : '4'} fill={edge.pulseColor} filter="url(#glow-green)">
                        <animateMotion
                          dur={isFocusEdge ? '1.4s' : edge.pulseDuration}
                          repeatCount="indefinite"
                          path={edge.d}
                        />
                      </circle>
                      {/* Primary Elongated Glowing Capsule */}
                      <rect
                        x={isFocusEdge ? '-18' : '-14'}
                        y={isFocusEdge ? '-5.5' : '-4.5'}
                        width={isFocusEdge ? '36' : '28'}
                        height={isFocusEdge ? '11' : '9'}
                        rx={isFocusEdge ? '5.5' : '4.5'}
                        fill={edge.pulseColor}
                        opacity={isFocusEdge ? 1 : 0.9}
                        filter="url(#glow-cyan)"
                      >
                        <animateMotion
                          dur={isFocusEdge ? '1.4s' : edge.pulseDuration}
                          repeatCount="indefinite"
                          path={edge.d}
                          rotate="auto"
                        />
                      </rect>

                      {/* Staggered Secondary Flow Capsule for Focused Box */}
                      {isFocusEdge && (
                        <g>
                          <circle r="4" fill={edge.pulseColor} filter="url(#glow-cyan)">
                            <animateMotion
                              dur="1.4s"
                              repeatCount="indefinite"
                              path={edge.d}
                              begin="0.7s"
                            />
                          </circle>
                          <rect
                            x="-14"
                            y="-4.5"
                            width="28"
                            height="9"
                            rx="4.5"
                            fill={edge.pulseColor}
                            opacity="0.85"
                            filter="url(#glow-green)"
                          >
                            <animateMotion
                              dur="1.4s"
                              repeatCount="indefinite"
                              path={edge.d}
                              rotate="auto"
                              begin="0.7s"
                            />
                          </rect>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              );
            })}

            {/* EDGE PILL LABELS */}
            {ARCHITECTURE_EDGES.map(edge => {
              const label = language === 'hi' ? edge.labelHi : edge.labelEn;
              const highlighted = isEdgeHighlighted(edge);
              const isFocusEdge = isEdgeConnectedToFocus(edge);
              const dimmed = (focusedNodeId && !isFocusEdge) || (routeActive && !edge.isPrimaryPath);

              return (
                <g
                  key={`label-${edge.id}`}
                  transform={`translate(${edge.labelX}, ${edge.labelY})`}
                  opacity={dimmed ? 0.1 : 1}
                  className="transition-opacity duration-300"
                >
                  <rect
                    x={-(label.length * 3.5 + 8)}
                    y="-10"
                    width={label.length * 7 + 16}
                    height="20"
                    rx="10"
                    fill="#080D18"
                    stroke={isFocusEdge ? '#00F0FF' : highlighted ? edge.pulseColor : 'rgba(100, 116, 139, 0.45)'}
                    strokeWidth={isFocusEdge ? '1.5' : '1'}
                    filter={isFocusEdge ? 'drop-shadow(0 0 8px rgba(0,240,255,0.7))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))'}
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    fill={isFocusEdge ? '#00F0FF' : highlighted ? '#FFFFFF' : '#94A3B8'}
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* HTML CARDS */}
          {ARCHITECTURE_NODES.map(node => {
            const isFocused = focusedNodeId === node.id;
            const isSelected = selectedNodeId === node.id || isFocused;
            const isHovered = hoveredNodeId === node.id;
            const dimmed = isNodeDimmed(node);

            return (
              <div
                key={node.id}
                onClick={(e) => handleNodeClick(node, e)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.w}px`,
                  height: `${node.h}px`,
                  zIndex: isFocused ? 40 : isSelected ? 25 : isHovered ? 20 : 10
                }}
                className={`interactive-node cursor-pointer rounded-2xl p-2.5 transition-all duration-300 border bg-[#0D1322]/95 backdrop-blur-md flex flex-col justify-between ${
                  node.color
                } ${
                  isFocused
                    ? 'ring-4 ring-cyan-400 scale-[1.08] shadow-[0_0_45px_rgba(6,182,212,0.9)] z-40'
                    : isSelected
                    ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-[0_0_28px_rgba(6,182,212,0.6)]'
                    : isHovered
                    ? 'scale-[1.02] shadow-[0_0_22px_rgba(255,255,255,0.2)]'
                    : 'hover:scale-[1.01]'
                } ${dimmed ? 'opacity-20 grayscale-[75%]' : 'opacity-100'}`}
              >
                {/* Node Header: Icon + Title */}
                <div className="flex items-start justify-between space-x-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="p-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex-shrink-0">
                      {node.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[11.5px] font-extrabold text-white truncate tracking-tight">
                        {language === 'hi' ? node.nameHi : node.nameEn}
                      </h4>
                      <p className="text-[9.5px] text-slate-400 truncate font-mono mt-0.5">
                        {language === 'hi' ? node.subtitleHi : node.subtitleEn}
                      </p>
                    </div>
                  </div>
                  {isFocused ? (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-cyan-400 text-slate-950 uppercase tracking-wider animate-pulse flex-shrink-0 shadow-[0_0_10px_#00F0FF]">
                      FLOWING
                    </span>
                  ) : isSelected ? (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
                  ) : null}
                </div>

                {/* Node Footer: Tech Badge / Pill */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className="text-[8.5px] font-mono uppercase tracking-wider text-slate-400 truncate max-w-[150px]">
                    {node.badge}
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SLIDING SIDE DRAWER ("Notes & Index" / Archify Inspector) */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[460px] bg-[#0A0F1D]/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-40 transition-transform duration-300 flex flex-col ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                {language === 'hi' ? 'सिस्टम घटक इंडेक्स (Archify)' : 'Component Index & Archify Cards'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'hi' ? 'विस्तृत तकनीकी आर्किटेक्चर विनिर्देश' : 'Detailed system architecture specifications'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-slate-800/70 bg-slate-900/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'घटक खोजें (React, Firestore, IQR)...' : 'Filter components (React, Firestore, IQR)...'}
              className="w-full bg-slate-900 text-slate-200 text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Drawer Body: Component Details or List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Active Inspected Component Card */}
          <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/90 to-[#0A1224] p-4 shadow-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                {selectedNode.icon}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">
                  {selectedNode.tier}
                </span>
                <h4 className="font-extrabold text-base text-white">
                  {language === 'hi' ? selectedNode.nameHi : selectedNode.nameEn}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedNode.badge}
                </p>
              </div>
            </div>

            {/* Technical Details inside card */}
            <div className="space-y-3 text-xs">
              <div>
                <h5 className="font-bold text-slate-300 mb-1 flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'hi' ? 'मुख्य जिम्मेदारियां:' : 'Core Responsibilities:'}</span>
                </h5>
                <ul className="space-y-1.5 pl-5 list-disc text-slate-400 text-[11px]">
                  {(language === 'hi' ? selectedNode.responsibilities.hi : selectedNode.responsibilities.en).map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  {language === 'hi' ? 'तकनीकी स्टैक (Tech Stack):' : 'Tech Stack:'}
                </div>
                <div className="text-slate-300 font-mono text-[11px] mt-0.5">
                  {selectedNode.techStack}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  {language === 'hi' ? 'मुख्य फ़ाइलें (Key Files):' : 'Key Files:'}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedNode.keyFiles.map((file, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono text-purple-300"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  {language === 'hi' ? 'इनपुट एवं आउटपुट (I/O Contract):' : 'Inputs & Outputs:'}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  {language === 'hi' ? selectedNode.inputsOutputs.hi : selectedNode.inputsOutputs.en}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  {language === 'hi' ? 'त्रुटि सहनशीलता एवं फॉलबैक:' : 'Fault Tolerance & Fallback:'}
                </div>
                <div className="text-emerald-400/90 text-[11px] mt-0.5">
                  {language === 'hi' ? selectedNode.faultTolerance.hi : selectedNode.faultTolerance.en}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Component Picker List */}
          <div className="space-y-2">
            <h5 className="text-[11px] uppercase font-bold tracking-wider text-slate-400 px-1">
              {language === 'hi' ? 'सभी घटक (घटक बदलने के लिए क्लिक करें)' : 'All Components (Click to Inspect)'}
            </h5>
            <div className="space-y-1.5">
              {filteredNodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    selectedNodeId === node.id
                      ? 'bg-slate-800 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="p-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex-shrink-0">
                      {node.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold truncate">{language === 'hi' ? node.nameHi : node.nameEn}</div>
                      <div className="text-[10px] text-slate-500 truncate font-mono">{node.badge}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
