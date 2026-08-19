# 🐔 SwasthFarm (फार्मरक्षक)
### Smart Poultry Health, AI Disease Diagnostics & National Disease Surveillance Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![TensorFlow.js](https://img.shields.io/badge/AI-TensorFlow.js-orange.svg)](https://www.tensorflow.org/js)
[![Tailwind CSS](https://img.shields.io/badge/UI-TailwindCSS-38bdf8.svg)](https://tailwindcss.com)
[![Leaflet GIS](https://img.shields.io/badge/GIS-Leaflet-10b981.svg)](https://leafletjs.com)
[![DAHD Compliant](https://img.shields.io/badge/Standards-DAHD%20%2F%20ICAR-blue.svg)](https://dahd.nic.in)

> **SwasthFarm** is a unified, bi-directional digital agriculture and veterinary surveillance platform built for Indian poultry farmers and government animal husbandry departments. It combines on-device machine learning for disease detection with predictive microclimate outbreak modeling, digital farm bookkeeping, and national GIS outbreak surveillance.

---

## 🌟 Key Features

### 1. 🔬 AI-Powered Disease Detection (On-Device TensorFlow.js)
* **Real-time Photo Analysis**: Classify poultry droppings and clinical symptoms for major poultry diseases:
  * **Coccidiosis** (*Eimeria tenella / necatrix*)
  * **Salmonella / Pullorum Disease**
  * **Newcastle Disease / Ranikhet (ND)**
  * **Avian Influenza (H5N1)**
  * **Healthy Intestinal Sample**
* **Instant Remedy Protocols**: Actionable medication guidance, dosage recommendations (e.g. Amprolium, Toltrazuril, electrolytes), and biosecurity disinfection measures in both English and Hindi.
* **Dual Capture**: Upload photos from gallery or capture live frames using mobile/webcam.

### 2. 📊 Digital Farm Register & FCR Analytics
* **Automated FCR Engine**: Real-time Feed Conversion Ratio ($FCR = \frac{\text{Feed Intake}}{\text{Weight Gain}}$) monitoring to help farmers lower production costs.
* **Mortality Rate Tracking**: Daily mortality log with automated threshold alerts ($<2.5\%$ normal vs elevated risk).
* **Financial Ledger**: Track daily feed expenses, medication costs, and bird/egg sales revenue.
* **Export**: Instant 1-click **CSV Download** and printable **Farm Health PDF Certificate**.

### 3. ⛅ Poultry Weather & Outbreak Risk Matrix
* **Microclimate Vulnerability Engine**: Integrates live temperature, humidity, and heat index across major Indian poultry hubs (*Kanpur, Namakkal, Pune, Hyderabad, Karnal, Anand, Bareilly, Bengaluru*).
* **Predictive Outbreak Warnings**:
  * **Heat Stress Warning** ($>32^\circ\text{C}$): Fogger protocols, water electrolyte additions.
  * **Litter Moisture / Coccidia Alert** ($>65\%$ humidity): Litter raking and lime application alerts.
  * **Night Drop / CRD Risk**: Side curtain and ventilation adjustments.

### 4. 🇮🇳 Government GIS Disease Surveillance & Alert Broadcast
* **Interactive Hotspot Heatmap**: Real-time GIS map for animal husbandry officials with disease-coded risk perimeters (Red = Confirmed Outbreak, Yellow = 10km Cordon, Green = Biosecure).
* **Emergency Farmer Alert Broadcast**: Allows district veterinary officers to draft and push emergency advisory SMS / alerts directly to registered farmers in high-risk zones.
* **Official Export**: Generates standardized state and national surveillance PDF reports.

### 5. 🎓 Video Training & Official Biosecurity Certification
* **Masterclass Library**: Curated video lessons by senior veterinarians on brooding management, cold-chain vaccination, biosecurity barriers, and feed formulation.
* **Dynamic Certificate Generator**: Farmers earn an official, verifiable **SwasthFarm Biosecurity Certificate** with custom name, farm credentials, and digital seal.

### 6. 💬 "Kisan Mitra" 24/7 AI Veterinary Assistant
* **Offline Knowledge Base**: Instant answers to common poultry questions (reducing FCR, vaccination timetable, coccidiosis medication, heat stress remedies).
* **Voice & Multilingual**: Supports English and Hindi voice reading.

---

## 🚀 Quick Start & Local Setup

SwasthFarm is built as a zero-dependency, lightning-fast static web application that can run on any web server, mobile browser, or cloud host.

### 1. Clone the Repository
```bash
git clone https://github.com/Siddhartha39/SwasthFarm.git
cd SwasthFarm
```

### 2. Run Local Server
You can launch SwasthFarm instantly using Python, Node.js, or Live Server:

```bash
# Using Python 3
python3 -m http.server 8000
```
or
```bash
# Using npx serve
npx serve .
```

### 3. Open in Browser
Visit **`http://localhost:8000`** to access the landing page and portals.

---

## 🔐 Credentials & Demo Logins

| User Type | Access Route | Login Method / Credentials |
| :--- | :--- | :--- |
| **Farmer** | Landing Page / Modal | Any 10-digit Indian Mobile Number (1-click auto-verified OTP) |
| **Government Official** | `government.html` or Govt Modal | Username: `government`<br>Password: `psit` |

---

## 📂 Project Architecture

```
SwasthFarm/
├── index.html               # Modern Landing Page + Dual Auth Modals
├── dashboard.html           # Farmer Health Dashboard + TensorFlow.js Scanner
├── weather.html             # 7-Day Weather & Outbreak Risk Matrix
├── digitalrecord.html       # Poultry Farm Register, FCR Ledger & CSV Export
├── manualrisk.html          # 15-Point Biosecurity Risk Assessment & Score Gauge
├── government.html          # Government Disease GIS Surveillance & Alert System
├── videos.html              # Training Video Masterclasses & Certificate Generator
├── styles/
│   └── main.css             # Global Stylesheet, Glassmorphism, Theme & Print Rules
├── models/
│   └── poultry_disease_tfjs/# TensorFlow.js Neural Network Model & Weight Shards
└── README.md                # Project Documentation & Architecture
```

---

## 🌐 Multi-Language Support
SwasthFarm is localized for India's diverse farming communities:
* 🌐 **English**
* 🌐 **हिंदी (Hindi)**
* 🌐 **ਪੰਜਾਬੀ (Punjabi)**
* 🌐 **বাংলা (Bengali)**

---

## 🛡️ Alignment with National Initiatives
* **Digital Agriculture Mission (Govt. of India)**
* **Department of Animal Husbandry & Dairying (DAHD)**
* **ICAR - Central Avian Research Institute (CARI)**
* **One Health Livestock Epidemic Preparedness**

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
