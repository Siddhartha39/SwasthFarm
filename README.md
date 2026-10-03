# 🛡️ SwasthFarm (स्वस्थ फार्म) 2.0
### Multi-Animal Farm Management, Biosecurity & Intelligent Statistical Analytics Platform

> **"Healthy Animals. Efficient Resources. Sustainable Livestock."**

---

## 🌟 Overview & Product Purpose

**SwasthFarm** is an advanced, production-grade livestock management and intelligent analytics web application designed for farmers, farm managers, veterinarians, and livestock officers.

The platform unifies:
- **Multi-Farm Management**: Easily create and switch between multiple farms (e.g. Dairy Cattle facilities, Poultry Layer houses, Goat/Sheep paddocks).
- **Multi-Animal Registry**: Deep lifecycle records for Cows, Buffalo, Goats, Sheep, Poultry, Swine/Pigs, and Custom Livestock.
- **Animal 360° Profile**: 8-tab comprehensive dashboard displaying physiological vitals, temperature, daily yields, feed rations, water intake, vaccines, treatments, and an interactive historical event timeline.
- **Statistical Analytics & Anomaly Detection**: Moving averages, rolling baselines, Interquartile Range (IQR), and Z-score deviation tests to detect production drops (e.g. -18.2% drop) and health risks.
- **Predictive Analytics**: 5-day predictive yield forecasting and Average Daily Gain (ADG) growth trajectories.
- **Explainable Health-Risk Scoring**: Multi-signal composite risk scoring (Core Temp, Feed variance, Yield trends, Symptoms, and Environmental THI) with veterinary clinical disclaimers.
- **Centralized Alert Center**: Notifications for upcoming vaccines, overdue treatments, heat stress, and sudden production dips.
- **AI Farm Assistant**: Conversational assistant that queries real Firestore/farm data using structured tool calling (no hallucinated statistics).
- **Bilingual Interface**: Seamless instant toggle between **English** and **हिंदी (Hindi)**.
- **Biosecurity & Risk Assessment**: 15-point biosecurity audit checklist with real-time compliance score gauge (preserved from legacy SwasthFarm).
- **Training Videos**: Farmer video masterclasses on biosecurity, heat mitigation, and herd nutrition.

---

## 🏗️ Technology Stack

### Frontend
- **React 18 + TypeScript + Vite**: Blazing fast client bundle with strict type safety.
- **Tailwind CSS**: Modern green & emerald branding (`#047857`, `#059669`, `#10b981`), glassmorphism, and responsive cards.
- **Recharts**: Interactive line, area, and bar charts for milk yields, egg counts, and moving averages.
- **Lucide React**: Clean, intuitive icon system.

### Backend & Cloud Storage
- **Firebase Authentication**: Phone OTP (with preserved test OTP `123456`), Email/Password, and Google OAuth.
- **Cloud Firestore**: Hierarchical multi-tenant database structure with strict security rules (`firestore.rules`).
- **Firebase Storage**: Secure storage for animal identification photos and farm documents.

### Analytics & Prediction Microservice
- **Python 3 + FastAPI**: High-performance REST service.
- **Pandas, NumPy, SciPy, Scikit-learn**: Rolling moving averages, IQR & Z-score anomaly detection, ordinary least squares linear regression, and damped forecasting.

---

## 📂 Firestore Data Architecture

```text
users/{userId}/
  profile
  farms/{farmId}/
    details (name, location, state, sizeCategory, primaryType, totalAnimals)
    animals/{animalId}/
      profile (tagId, name, species, breed, gender, dob, weightKg, healthStatus, photoUrl)
      healthRecords/{recordId}        (temperature, symptoms, appetite, water, observations)
      feedRecords/{recordId}          (feedType, quantityKg, waterConsumptionLiters, cost)
      productionRecords/{recordId}    (morningMilk, eveningMilk, totalMilk, eggCount, fatPct)
      vaccinations/{vaccinationId}    (vaccineName, targetDisease, nextDueDate, status)
      treatments/{treatmentId}        (condition, medication, dosage, veterinarian, outcome)
      activityRecords/{recordId}      (activityScore, movementHours, restHours)
    environment/{timestamp}          (temp, humidity, thiIndex, stressLevel)
    alerts/{alertId}                  (type, severity, reason, read, actionUrl)
    analytics/summary                 (aggregated rolling averages, anomaly flags)
    predictions/latest                (projected yields, growth trajectories)
```

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Siddhartha39/SwasthFarm.git
cd SwasthFarm

# Install frontend dependencies
npm install
```

### 2. Run the React Frontend

```bash
npm run dev
```
Navigate to **`http://localhost:3000`** in your browser.

### 3. Run the Python Analytics API (Optional / Recommended)

```bash
# In a separate terminal
uvicorn analytics_api.main:app --reload --port 8000
```
API Swagger documentation is accessible at **`http://localhost:8000/docs`**.

---

## 🧪 Demo Credentials & Test Data

The application includes high-fidelity pre-seeded data for instant evaluation:
- **Farm 1**: *Greenfield Dairy & Livestock Farm (Kanpur, UP)* — 4 animals (Cow #023, Cow #018 with -18% milk anomaly, Murrah Buffalo #001, Dairy Goat #001).
- **Farm 2**: *Sunrise Layer & Small Ruminants Farm (Karnal, Haryana)* — 3 animals (500-bird Layer Flock, Boer Meat Goat #002, Dorper Sheep #001).
- **Test Phone Login**: Enter any 10-digit Indian phone number with OTP: **`123456`**.

---

## 🛡️ License

This project is licensed under the MIT License.
