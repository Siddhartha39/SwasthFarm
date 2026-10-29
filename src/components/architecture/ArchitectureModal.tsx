import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  X,
  Layers,
  Network,
  Cpu,
  Database,
  Cloud,
  ShieldCheck,
  Bot,
  Activity,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Wheat,
  Thermometer,
  Zap,
  Lock,
  GitBranch,
  FileCode2
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ARCHITECTURE_MERMAID = `flowchart TD
    subgraph Client["🖥️ Presentation & Client Layer (React 18 + Vite)"]
        UI_Dash["Executive Dashboard & Charts<br/>(Recharts + KPI Cards)"]
        UI_Anim["Animal 360° Inspection<br/>(8 Specialized Sub-Tabs)"]
        UI_Logs["Daily Telemetry Loggers<br/>(Milk AM/PM, Feed kg, Temp °C)"]
        UI_AI["Kisan Mitra Floating Drawer<br/>(Bilingual Chat UI)"]
        UI_Lang["Bilingual Switcher<br/>(English ↔ हिंदी Toggle)"]
    end

    subgraph State["🧠 Client State & Resilience Engine"]
        Ctx_Farm["FarmContext<br/>(Central Store & Multi-Farm Dispatch)"]
        Ctx_Auth["AuthContext<br/>(Session & RBAC Management)"]
        Ctx_Lang["LanguageContext<br/>(Persistent Localized Strings)"]
        Cache_Local["LocalStorage Engine<br/>(Offline Snapshots: swasth_farm_data_v2)"]
    end

    subgraph Analytics["📊 Statistical & Anomaly Intelligence"]
        Engine_IQR["IQR & Z-Score Deviation Engine<br/>(Outlier Flagging e.g. -18.2% Drop)"]
        Engine_MA["Moving Average Evaluator<br/>(7-Day Moving vs 30-Day Baselines)"]
        Engine_THI["NRC THI Heat Stress Index<br/>(Temp °C + Humidity % = Thermal Stress)"]
        Engine_Bio["15-Point Biosecurity Scorer<br/>(Certification Index 0-100)"]
    end

    subgraph AI["🤖 Domain-Specific RAG Engine"]
        RAG_Retriever["Live Telemetry Ingestion<br/>(Dynamic Herd State Snapshot)"]
        RAG_Fin["Agronomic Profit Engine<br/>(Revenue - Feed Expense = Margin)"]
        RAG_NLP["Bilingual NLP & Prompt Synthesizer<br/>(English & Hindi Verified Responses)"]
    end

    subgraph CloudLayer["☁️ Cloud Services & Persistence"]
        FS_Sync["Firestore Sync Service<br/>(Bidirectional Snapshot Listeners)"]
        FS_DB[("Cloud Firestore<br/>(farms, animals, production, feed)")]
        Ext_Weather["OpenWeatherMap API<br/>(Live Ambient Weather & Forecast)"]
        Ext_Video["Farmer Training Video CDN<br/>(HLS/MP4 Video Delivery)"]
    end

    %% Primary Operational Path (Archify Core Pipeline)
    UI_Logs ==>|"1. Log Daily Vitals/Milk"| Ctx_Farm
    Ctx_Farm ==>|"2. Optimistic Snapshot"| Cache_Local
    Ctx_Farm ==>|"3. Bidirectional Cloud Sync"| FS_Sync
    FS_Sync ==>|"4. Commit Documents"| FS_DB
    Ctx_Farm ==>|"5. Feed Telemetry"| Engine_IQR
    Engine_IQR ==>|"6. Anomaly Detected (-18.2%)"| Ctx_Farm
    Ctx_Farm ==>|"7. Generate Priority Alert"| UI_Dash
    Ctx_Farm ==>|"8. Expose Live State"| RAG_Retriever
    UI_AI ==>|"9. Farmer Inquires in Hindi/EN"| RAG_NLP
    RAG_Retriever ==>|"10. Feed Truthful Context"| RAG_Fin
    RAG_Fin ==>|"11. Computed Profit & Advice"| RAG_NLP
    RAG_NLP ==>|"12. Deliver Verified Answer"| UI_AI

    %% Secondary Supporting Flows
    Ext_Weather -.->|"Real-Time Ambient"| Engine_THI
    Engine_THI -.->|"THI Warning Pill"| UI_Dash
    Ext_Video -.->|"Training Modules"| UI_Dash
    FS_DB -.->|"Live onSnapshot"| FS_Sync`;

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'diagram' | 'components' | 'primaryPath' | 'mermaid'>('diagram');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('c1');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(ARCHITECTURE_MERMAID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const components = [
    {
      id: 'c1',
      name: language === 'hi' ? '1. वेब क्लाइंट इंटरफ़ेस (React 18 + Vite)' : '1. Web Client Application (React 18 + Vite)',
      tier: 'Presentation / Client Tier',
      emoji: '🖥️',
      color: 'border-blue-500 bg-blue-50/50 text-blue-900',
      badge: 'React 18 + Vite + Tailwind CSS',
      responsibilities: [
        'Single Page Application (SPA) with instant navigation and responsive layouts (Mobile/Desktop)',
        'Renders interactive telemetry charts using Recharts (Area, Bar, Line) for 7-day vs 30-day milk yield comparisons',
        '8-tab 360° Animal Inspection View (Overview, Health, Feed, Production, Vaccines, Treatments, Analytics, Timeline)',
        'Bilingual English / Hindi runtime text replacement with zero flickering'
      ],
      techStack: 'React 18, Vite 5, Tailwind CSS, Lucide React Icons, Recharts, TypeScript',
      keyFiles: ['src/App.tsx', 'src/components/dashboard/ExecutiveDashboard.tsx', 'src/components/animals/AnimalProfile.tsx'],
      inputsOutputs: 'Input: User touch/click actions, forms | Output: Optimistic UI changes, modal dispatches',
      faultTolerance: 'Graceful empty state fallbacks, responsive viewport adaptors, network status resilience.'
    },
    {
      id: 'c2',
      name: language === 'hi' ? '2. फार्म स्टेट एवं सेशन समन्वयक' : '2. Farm State & Session Coordinator (Context API)',
      tier: 'Application State Engine',
      emoji: '🧠',
      color: 'border-emerald-500 bg-emerald-50/50 text-emerald-900',
      badge: 'FarmContext & AuthContext',
      responsibilities: [
        'Provides atomic multi-farm switching (Kanpur Dairy vs Karnal Layers) and herd telemetry aggregation',
        'Coordinates state across 6 domain entities: Farms, Animals, Production, Feed/Water, Clinical Health, and Vaccinations',
        'Maintains user authentication token, role-based authorization (Farmer, Veterinarian, Admin), and session restoration'
      ],
      techStack: 'React Context API, React Hooks (useReducer, useEffect, useMemo), TypeScript Type Invariants',
      keyFiles: ['src/context/FarmContext.tsx', 'src/context/AuthContext.tsx', 'src/context/LanguageContext.tsx'],
      inputsOutputs: 'Input: CRUD operations from UI | Output: Reactive reactive subscriptions to all child components',
      faultTolerance: 'Deep cloning prevents state mutation; fallback to default demo farm upon empty initialization.'
    },
    {
      id: 'c3',
      name: language === 'hi' ? '3. ऑफलाइन-फर्स्ट लोकल स्टोरेज कैश' : '3. Offline-First Local Storage Engine',
      tier: 'Client-Side Persistence',
      emoji: '💾',
      color: 'border-amber-500 bg-amber-50/50 text-amber-900',
      badge: 'LocalStorage Snapshot Cache',
      responsibilities: [
        'Persists entire farm database to browser localStorage under key `swasth_farm_data_v2`',
        'Guarantees 100% functionality in rural areas with zero cellular internet connectivity',
        'Stores Kisan Mitra AI assistant memory (`swasth_assistant_memory`) across page refreshes and reboots'
      ],
      techStack: 'HTML5 Web Storage API, JSON serialization, Try/Catch error shielding',
      keyFiles: ['src/context/FarmContext.tsx', 'src/components/ai/AIFarmAssistant.tsx'],
      inputsOutputs: 'Input: Farm state changes | Output: Synchronous rehydration on page reload',
      faultTolerance: 'Quotas are gracefully caught; auto-falls back to memory if localStorage is restricted.'
    },
    {
      id: 'c4',
      name: language === 'hi' ? '4. क्लाउड डेटा एवं रीयल-टाइम सिंक' : '4. Cloud Data & Real-Time Sync Service',
      tier: 'Cloud Persistence & Sync',
      emoji: '☁️',
      color: 'border-orange-500 bg-orange-50/50 text-orange-900',
      badge: 'Firebase Cloud Firestore SDK v10',
      responsibilities: [
        'Bidirectional synchronization between local client state and Google Cloud Firestore',
        'Real-time listener subscriptions via Firestore `onSnapshot` for multi-device herd telemetry',
        'Maintains collections: `farms`, `animals`, `production_records`, `feed_records`, `health_records`, `vaccinations`'
      ],
      techStack: 'Firebase 10.12.5 (firebase/app, firebase/firestore), Firestore Security Rules',
      keyFiles: ['src/services/firestoreSync.ts', 'src/lib/firebase.ts', 'firestore.rules'],
      inputsOutputs: 'Input: Local farm modifications | Output: Remote Firestore documents & real-time broadcasts',
      faultTolerance: 'Automatic retry with exponential backoff; seamless offline queueing.'
    },
    {
      id: 'c5',
      name: language === 'hi' ? '5. बहु-प्रजाति उत्पादन टेलीमेट्री' : '5. Multi-Species Production & Yield Pipeline',
      tier: 'Domain Processing Engine',
      emoji: '🥛',
      color: 'border-sky-500 bg-sky-50/50 text-sky-900',
      badge: 'Milk AM/PM & Egg Logs',
      responsibilities: [
        'Captures daily morning and evening milk yields (Liters) and egg collection counts',
        'Tracks butterfat percentage (e.g. 7.8% Murrah buffalo milk vs 4.2% Holstein Friesian cow milk) and SNF quality grade',
        'Calculates real-time herd averages and automated dairy cooperative collection valuations'
      ],
      techStack: 'TypeScript Type Discriminated Unions, Domain Arithmetic Models',
      keyFiles: ['src/types/index.ts', 'src/components/animals/LogProductionModal.tsx', 'src/App.tsx'],
      inputsOutputs: 'Input: Liters/Eggs logged by farmer | Output: Time-series production records, daily total yield',
      faultTolerance: 'Input sanitization prevents negative yield values or impossible milk quantities.'
    },
    {
      id: 'c6',
      name: language === 'hi' ? '6. पोषण, चारा एवं जल प्रबंधन इंजन' : '6. Nutrition & Feed/Water Telemetry Engine',
      tier: 'Resource Accounting',
      emoji: '🌾',
      color: 'border-yellow-500 bg-yellow-50/50 text-yellow-900',
      badge: 'Ration & Silage Optimization',
      responsibilities: [
        'Logs Dry Matter intake (kg) and Silage vs Concentrate ratio for cattle, buffaloes, goats, poultry, and pigs',
        'Monitors clean trough water consumption (Liters) to detect early dehydration and heat stress',
        'Computes dynamic daily ration costs in Indian Rupees (₹) based on prevailing agricultural fodder rates'
      ],
      techStack: 'Nutritional Ration Models, Real-Time Expense Calculators',
      keyFiles: ['src/components/animals/LogFeedModal.tsx', 'src/types/index.ts'],
      inputsOutputs: 'Input: Feed formulation & water liters | Output: Daily feed expense, herd hydration rate',
      faultTolerance: 'Zero-cost handling, auto-calculates benchmark prices if individual costs are omitted.'
    },
    {
      id: 'c7',
      name: language === 'hi' ? '7. पशु नैदानिक स्वास्थ्य एवं तापमान ट्रैकर' : '7. Clinical Vitals & Individual Health Tracker',
      tier: 'Veterinary Clinical Layer',
      emoji: '🩺',
      color: 'border-red-500 bg-red-50/50 text-red-900',
      badge: 'Core Temp °C & Symptoms',
      responsibilities: [
        'Tracks core rectal temperature (°C) against species physiological baselines (Cow: 38.0–39.2°C, Buffalo: 37.5–39.0°C)',
        'Logs qualitative clinical symptoms (fever, rumination drop, lameness, udder swelling) and attending veterinarian notes',
        'Automatically elevates animal status to `attention` when vitals breach standard thresholds'
      ],
      techStack: 'Veterinary Baseline Matrix, Auto-Alert Dispatcher',
      keyFiles: ['src/components/animals/LogHealthModal.tsx', 'src/components/animals/AnimalProfile.tsx'],
      inputsOutputs: 'Input: Body temp, appetite, symptoms | Output: Health record, alert dispatch on fever >39.5°C',
      faultTolerance: 'Validates temperature bounds (35°C–43°C) to eliminate manual entry typos.'
    },
    {
      id: 'c8',
      name: language === 'hi' ? '8. सांख्यिकीय विसंगति एवं एमएल पूर्वानुमान' : '8. Statistical Anomaly & ML Yield Forecaster',
      tier: 'Analytics & Machine Learning',
      emoji: '📈',
      color: 'border-indigo-500 bg-indigo-50/50 text-indigo-900',
      badge: 'IQR & Z-Score Deviation',
      responsibilities: [
        'Computes Interquartile Range (IQR) and Z-score deviation against 30-day moving historical baselines',
        'Detects subclinical yield drops (e.g. COW-018 drop of -18.2% vs 30d baseline) prior to visible clinical symptoms',
        'Generates 5-day regression yield forecast with confidence intervals and climate damping'
      ],
      techStack: 'Statistical Regression Models, Rolling Window Algorithms, Recharts Visualizer',
      keyFiles: ['src/components/analytics/AnalyticsView.tsx', 'analytics_api/main.py'],
      inputsOutputs: 'Input: Historical production arrays | Output: Anomaly boolean flag, predicted yield intervals',
      faultTolerance: 'Gracefully handles short timelines (<7 days) with bootstrap mean heuristics.'
    },
    {
      id: 'c9',
      name: language === 'hi' ? '9. 15-सूत्रीय जैव-सुरक्षा ऑडिट प्रोटोकॉल' : '9. 15-Point Biosecurity Risk Scorer',
      tier: 'Preventive Compliance',
      emoji: '🛡️',
      color: 'border-teal-500 bg-teal-50/50 text-teal-900',
      badge: 'Biosecurity Certification (0-100)',
      responsibilities: [
        'Interactive 15-point preventive protocol checklist covering perimeter fencing, footbaths, tire spray arches, and quarantine',
        'Computes dynamic Farm Biosecurity Certification Index (0–100) and categorizes farm risk tier (Low, Moderate, High)',
        'Maintains audit history and compliance timestamps for agricultural certifications'
      ],
      techStack: 'Government Veterinary Standard Checklists, Dynamic Score Engine',
      keyFiles: ['src/components/biosecurity/RiskAssessmentView.tsx', 'src/context/FarmContext.tsx'],
      inputsOutputs: 'Input: Protocol completion toggles | Output: Biosecurity score, risk tier banner',
      faultTolerance: 'State changes persist immediately to local storage and sync to cloud Firestore.'
    },
    {
      id: 'c10',
      name: language === 'hi' ? '10. मौसम एवं THI हीट स्ट्रेस इंटेलिजेंस' : '10. Microclimate & THI Weather Intelligence',
      tier: 'Environmental Intelligence',
      emoji: '🌤️',
      color: 'border-cyan-500 bg-cyan-50/50 text-cyan-900',
      badge: 'NRC THI Formula Engine',
      responsibilities: [
        'Retrieves live ambient temperature and relative humidity for farm district (e.g. Kanpur, Karnal, Anand)',
        'Computes National Research Council (NRC) Temperature-Humidity Index: THI = (1.8*T + 32) - ((0.55 - 0.0055*RH) * (1.8*T - 26))',
        'Triggers automated heat stress warnings (Normal <72, Mild 72-78, Moderate 79-88, Severe >88) with actionable mitigation protocols'
      ],
      techStack: 'OpenWeatherMap REST API, NRC Livestock Thermal Index Algorithms',
      keyFiles: ['src/components/common/WeatherBar.tsx', 'src/context/FarmContext.tsx'],
      inputsOutputs: 'Input: City name / Coordinates | Output: Ambient temp, humidity %, calculated THI index',
      faultTolerance: 'Mock fallback with realistic seasonal Indian climate when API keys are unconfigured.'
    },
    {
      id: 'c11',
      name: language === 'hi' ? '11. किसान मित्र एआई सहायक (डोमेन RAG इंजन)' : '11. Kisan Mitra AI Assistant (Domain-Specific RAG)',
      tier: 'AI & Knowledge Retrieval',
      emoji: '🤖',
      color: 'border-purple-500 bg-purple-50/50 text-purple-900',
      badge: 'Zero-Hallucination Farm RAG',
      responsibilities: [
        'Natural Language Processing (NLP) supporting English, Hindi (हिंदी), and Hinglish questions',
        'Domain-Specific Retrieval-Augmented Generation (RAG): Queries live herd database directly before synthesizing responses',
        'Computes exact financial answers ("In which month more profit done?", "Profit badhane ke liye kya kare?")',
        'Generates actionable 5-point agronomic recommendations (TMR balancing, bypass minerals, THI misting, FMD prophylaxis)'
      ],
      techStack: 'Domain-Specific RAG Pipeline, In-Memory Deterministic Semantic Parser, Bilingual Lexicons',
      keyFiles: ['src/components/ai/AIFarmAssistant.tsx'],
      inputsOutputs: 'Input: Natural language user question | Output: Truthful calculation with verified tool signature',
      faultTolerance: 'Zero hallucination constraint: Never invents nonexistent farm numbers; cites exact database records.'
    },
    {
      id: 'c12',
      name: language === 'hi' ? '12. फास्टएपीआई एनालिटिक्स बैकएंड (वैकल्पिक)' : '12. FastAPI Analytics Microservice',
      tier: 'Backend Compute Microservice',
      emoji: '⚡',
      color: 'border-slate-500 bg-slate-50/50 text-slate-900',
      badge: 'Python 3.11 + FastAPI',
      responsibilities: [
        'Dedicated high-throughput Python microservice located in `analytics_api/` for heavy batch telemetry processing',
        'Endpoints for `/analytics/anomaly-detection`, `/analytics/yield-forecast`, and `/analytics/thi-stress`',
        'Exposes interactive OpenAPI / Swagger documentation at `/docs`'
      ],
      techStack: 'Python 3.11, FastAPI, Uvicorn, Pydantic, NumPy, SciPy',
      keyFiles: ['analytics_api/main.py', 'analytics_api/requirements.txt'],
      inputsOutputs: 'Input: JSON array of timestamps & yields | Output: IQR anomalies, Z-scores, predictions',
      faultTolerance: 'Decoupled architecture: Frontend operates 100% autonomously in-browser even if microservice is offline.'
    }
  ];

  const primarySteps = [
    {
      step: '1',
      title: language === 'hi' ? 'दैनिक डेटा प्रविष्टि (डेटा लॉगिंग)' : 'Telemetry Ingestion',
      desc: language === 'hi' ? 'किसान सुबह और शाम का दूध, चारा (किलो) और तापमान दर्ज करता है।' : 'Farmer logs daily morning/evening milk yields, ration intake (kg), and rectal temperature.',
      component: 'Client UI -> FarmContext',
      tag: 'Presentation'
    },
    {
      step: '2',
      title: language === 'hi' ? 'ऑफ़लाइन लोकल स्नैपशॉट' : 'Optimistic Local Storage',
      desc: language === 'hi' ? 'ब्राउज़र में डेटा तुरंत सहेज लिया जाता है, बिना किसी नेटवर्क रुकावट के।' : 'Data is instantly persisted in LocalStorage (swasth_farm_data_v2) for offline-first resilience.',
      component: 'LocalStorage Engine',
      tag: 'Persistence'
    },
    {
      step: '3',
      title: language === 'hi' ? 'क्लाउड फायरस्टोर सिंक्रनाइज़ेशन' : 'Cloud Firestore Sync',
      desc: language === 'hi' ? 'इंटरनेट उपलब्ध होते ही डेटा गूगल फायरस्टोर में सुरक्षित सिंक हो जाता है।' : 'Firestore listener commits batch documents to Cloud Firestore with bidirectional sync.',
      component: 'Firebase SDK v10',
      tag: 'Cloud Sync'
    },
    {
      step: '4',
      title: language === 'hi' ? 'सांख्यिकीय विसंगति पहचान (IQR)' : 'Statistical Outlier Detection',
      desc: language === 'hi' ? 'सिस्टम 30-दिवसीय औसत से तुलना करके -18.2% गिरावट पहचानता है।' : 'IQR engine flags cows showing sudden yield drops (-18.2% drop) before visible symptoms.',
      component: 'Statistical Anomaly Engine',
      tag: 'Analytics'
    },
    {
      step: '5',
      title: language === 'hi' ? 'प्राथमिकता अलर्ट जनरेशन' : 'Priority Alert Triggered',
      desc: language === 'hi' ? 'डैशबोर्ड पर तत्काल ध्यान देने योग्य पशु का अलर्ट प्रदर्शित होता है।' : 'Elevated animal status triggers priority attention badge on Executive Dashboard.',
      component: 'Alerts Dispatcher',
      tag: 'Alerting'
    },
    {
      step: '6',
      title: language === 'hi' ? 'किसान मित्र एआई परामर्श (RAG)' : 'Kisan Mitra AI RAG Consultation',
      desc: language === 'hi' ? 'किसान हिंदी/अंग्रेजी में पूछता है; एआई वास्तविक डेटा से सही वित्तीय सलाह देता है।' : 'Farmer asks "Profit badhane ke liye kya kare?"; AI queries live records and provides verified recovery steps.',
      component: 'Kisan Mitra AI Assistant',
      tag: 'AI Intelligence'
    }
  ];

  const currentComp = components.find(c => c.id === selectedComponentId) || components[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-emerald-900 text-white p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
              <Network className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {t.architectureTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/40 text-[10px] font-bold uppercase tracking-wider">
                  Archify Spec v2.17
                </span>
              </div>
              <p className="text-xs text-purple-200/90 mt-0.5 max-w-2xl line-clamp-1 sm:line-clamp-none">
                {t.architectureSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyMermaid}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold transition-colors"
              title={t.copyMermaid}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyMermaid}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0 overflow-x-auto">
          <div className="flex items-center space-x-1.5 text-xs font-bold">
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'diagram' ? 'bg-purple-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'hi' ? '📊 विज़ुअल आर्किटेक्चर फ्लो' : '📊 Visual Architecture Topology'}
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'components' ? 'bg-purple-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'hi' ? '🗂️ 12 मुख्य घटक (कार्ड्स)' : '🗂️ 12 Core Components (Archify Cards)'}
            </button>

            <button
              onClick={() => setActiveTab('primaryPath')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'primaryPath' ? 'bg-purple-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'hi' ? '⚡ मुख्य ऑपरेशनल पाथ' : '⚡ Primary Operational Path'}
            </button>

            <button
              onClick={() => setActiveTab('mermaid')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === 'mermaid' ? 'bg-purple-700 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'hi' ? '📜 मर्मेड कोड (Mermaid)' : '📜 Mermaid Source Spec'}
            </button>
          </div>

          <a
            href="https://github.com/Siddhartha39/SwasthFarm/blob/main/ARCHITECTURE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center space-x-1 text-xs font-bold text-purple-700 hover:text-purple-900"
          >
            <span>{t.viewFullDoc}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: VISUAL TOPOLOGY */}
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              
              {/* Primary Highlights Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-gray-400 font-bold uppercase text-[10px]">Client Tier</div>
                  <div className="font-extrabold text-sm text-gray-900 mt-0.5">React 18 + Vite SPA</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">Offline-first responsive client</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-gray-400 font-bold uppercase text-[10px]">Cloud Store</div>
                  <div className="font-extrabold text-sm text-amber-700 mt-0.5">Google Cloud Firestore</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">Real-time sync listeners</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-gray-400 font-bold uppercase text-[10px]">Analytics Model</div>
                  <div className="font-extrabold text-sm text-indigo-700 mt-0.5">IQR & Z-Score Deviation</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">Early detection (-18.2% drop)</div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-gray-400 font-bold uppercase text-[10px]">AI Assistant</div>
                  <div className="font-extrabold text-sm text-emerald-700 mt-0.5">Domain-Specific RAG</div>
                  <div className="text-gray-500 text-[11px] mt-0.5">Bilingual English / हिंदी</div>
                </div>
              </div>

              {/* Multi-Tier Interactive Visual Architecture Map */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {language === 'hi' ? 'सिस्टम मल्टी-टियर आर्किटेक्चर टोपोलॉजी' : 'System Multi-Tier Architecture Topology'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Decoupled architecture following Archify design principles
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-200">
                    8-12 Core Components
                  </span>
                </div>

                {/* Layer 1: Client Application */}
                <div className="border border-blue-200 rounded-2xl p-4 bg-blue-50/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <span>🖥️</span>
                      <span>Tier 1: Client Application (SPA)</span>
                    </span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-md">
                      React 18 • Vite • Tailwind
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="font-bold text-gray-900">Executive Dashboard</div>
                      <div className="text-[11px] text-gray-500">KPIs, Alerts & Recharts</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="font-bold text-gray-900">Animal 360° Profile</div>
                      <div className="text-[11px] text-gray-500">8 Diagnostic Sub-Tabs</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="font-bold text-gray-900">Telemetry Loggers</div>
                      <div className="text-[11px] text-gray-500">Yield, Feed, Vitals, Vaccines</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm">
                      <div className="font-bold text-gray-900">Bilingual Engine</div>
                      <div className="text-[11px] text-gray-500">English ↔ हिंदी Toggle</div>
                    </div>
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex justify-center -my-2 text-purple-500 font-bold text-xs">
                  <div className="bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200 flex items-center space-x-1">
                    <span>⬇️</span>
                    <span>Optimistic Mutations & React State Ingestion</span>
                  </div>
                </div>

                {/* Layer 2: State Coordinator & Local Cache */}
                <div className="border border-emerald-200 rounded-2xl p-4 bg-emerald-50/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <span>🧠</span>
                      <span>Tier 2: State Coordinator & Offline Persistence</span>
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-md">
                      Context API • LocalStorage
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                      <div className="font-bold text-gray-900">FarmContext Coordinator</div>
                      <div className="text-[11px] text-gray-500">Atomic Multi-Farm Switcher & Aggregates</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                      <div className="font-bold text-gray-900">LocalStorage Snapshot Engine</div>
                      <div className="text-[11px] text-gray-500">Offline-first `swasth_farm_data_v2`</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-emerald-100 shadow-sm">
                      <div className="font-bold text-gray-900">Session & Auth Token Store</div>
                      <div className="text-[11px] text-gray-500">Role-based access (Farmer vs Vet)</div>
                    </div>
                  </div>
                </div>

                {/* Split Connectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Column: Analytics & AI */}
                  <div className="border border-purple-200 rounded-2xl p-4 bg-purple-50/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center space-x-1">
                        <span>🤖</span>
                        <span>Analytics & Kisan Mitra AI RAG</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-sm">
                        <div className="font-bold text-purple-950">Statistical Anomaly Engine</div>
                        <div className="text-[11px] text-gray-500">IQR & Z-score deviation against 30-day baseline</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-sm">
                        <div className="font-bold text-purple-950">Domain RAG Telemetry Ingestion</div>
                        <div className="text-[11px] text-gray-500">Live farm records retrieval with zero hallucination</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-purple-100 shadow-sm">
                        <div className="font-bold text-purple-950">Agronomic Profit Optimizer</div>
                        <div className="text-[11px] text-gray-500">5-point plan: TMR, bypass minerals, THI misting</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Cloud Services & Microservices */}
                  <div className="border border-orange-200 rounded-2xl p-4 bg-orange-50/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-900 uppercase tracking-wider flex items-center space-x-1">
                        <span>☁️</span>
                        <span>Cloud & External Services</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-orange-100 shadow-sm">
                        <div className="font-bold text-orange-950">Google Cloud Firestore</div>
                        <div className="text-[11px] text-gray-500">Bidirectional onSnapshot listener collections</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-orange-100 shadow-sm">
                        <div className="font-bold text-orange-950">OpenWeatherMap & THI Engine</div>
                        <div className="text-[11px] text-gray-500">NRC formula index for heat stress alerts</div>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-orange-100 shadow-sm">
                        <div className="font-bold text-orange-950">FastAPI Analytics Microservice</div>
                        <div className="text-[11px] text-gray-500">Optional Python batch telemetry processing</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: ARCHIFY 12 COMPONENT CARDS */}
          {activeTab === 'components' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Selector List */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'घटक चुनें (12 कोर मॉड्यूल्स):' : 'Select Component (12 Core Modules):'}
                </div>
                <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                  {components.map(c => {
                    const isSelected = selectedComponentId === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedComponentId(c.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-purple-700 text-white border-purple-800 shadow-md font-bold'
                            : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 truncate">
                          <span className="text-base">{c.emoji}</span>
                          <span className="truncate">{c.name}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Detail Card for Selected Component */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
                <div className="border-b pb-4 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl p-2 rounded-2xl bg-gray-50 border border-gray-100">{currentComp.emoji}</span>
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900">{currentComp.name}</h3>
                      <p className="text-xs text-purple-700 font-semibold">{currentComp.tier}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    {currentComp.badge}
                  </span>
                </div>

                {/* Key Responsibilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                    Key Architectural Responsibilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {currentComp.responsibilities.map((r, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack & Key Files */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Underlying Tech Stack</div>
                    <div className="font-semibold text-gray-900 mt-0.5">{currentComp.techStack}</div>
                  </div>

                  <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Key Code References</div>
                    <div className="font-mono text-[11px] text-purple-900 mt-0.5">
                      {currentComp.keyFiles.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Input / Output & Fault Tolerance */}
                <div className="space-y-2 text-xs pt-1">
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-blue-950">
                    <strong>Interfaces (In / Out):</strong> {currentComp.inputsOutputs}
                  </div>
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-emerald-950">
                    <strong>Resilience & Fault Tolerance:</strong> {currentComp.faultTolerance}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: PRIMARY OPERATIONAL PATH */}
          {activeTab === 'primaryPath' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  {language === 'hi' ? 'प्राथमिक ऑपरेशनल पाथ (एंड-टू-एंड फ्लो)' : 'Primary Operational Request Path (End-to-End Pipeline)'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Archify specification requirement: Single primary operational path demonstrating telemetry entry to anomaly mitigation.
                </p>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-200">
                {primarySteps.map((step) => (
                  <div key={step.step} className="relative flex items-start space-x-4">
                    <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-extrabold text-xs flex items-center justify-center -ml-6 border-2 border-white shadow-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="bg-gray-50 hover:bg-purple-50/40 p-4 rounded-2xl border border-gray-200 flex-1 transition-colors">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{step.title}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {step.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{step.desc}</p>
                      <div className="mt-2 text-[11px] font-mono text-purple-900 font-semibold">
                        Component: {step.component}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MERMAID SPECIFICATION */}
          {activeTab === 'mermaid' && (
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    {language === 'hi' ? 'मर्मेड आर्किटेक्चर स्रोत कोड' : 'Mermaid System Architecture Definition'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Standard GitHub-flavored Mermaid code for documentation and repository diagrams
                  </p>
                </div>
                <button
                  onClick={handleCopyMermaid}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copied : t.copyMermaid}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto leading-relaxed max-h-[55vh]">
                {ARCHITECTURE_MERMAID}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between flex-shrink-0 text-xs">
          <div className="flex items-center space-x-2 text-gray-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>SwasthFarm 2.0 • Government & Veterinary Biosecurity Compliant</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-colors"
          >
            {language === 'hi' ? 'बंद करें' : 'Close Explorer'}
          </button>
        </div>

      </div>
    </div>
  );
};
