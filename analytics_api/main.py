"""
Swasth Farm - Python Analytics & ML Microservice
FastAPI Application serving statistical analytics, anomaly detection, forecasting, and risk calculation.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from analytics_engine import (
    calculate_trend_summary,
    detect_anomalies,
    forecast_production,
    predict_growth,
    compute_explainable_health_risk
)

app = FastAPI(
    title="Swasth Farm Analytics & Prediction API",
    version="2.0.0",
    description="Statistical analytics, moving averages, IQR/Z-score anomaly detection, and explainable health-risk engine."
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrendRequest(BaseModel):
    values: List[float]
    dates: Optional[List[str]] = None

class AnomalyRequest(BaseModel):
    data_points: List[Dict[str, Any]]
    value_key: str = "value"
    sensitivity: float = 1.5

class ProductionForecastRequest(BaseModel):
    historical_yields: List[float]
    horizon_days: int = 7

class GrowthPredictionRequest(BaseModel):
    historical_weights: List[Dict[str, Any]]
    target_days: int = 30

class HealthRiskRequest(BaseModel):
    temperature: float
    species: str = "cow"
    symptoms_count: int = 0
    feed_change_pct: float = 0.0
    production_change_pct: float = 0.0
    water_change_pct: float = 0.0
    thi_stress_level: str = "normal"

@app.get("/")
def root():
    return {
        "service": "Swasth Farm Analytics & Prediction API",
        "status": "operational",
        "version": "2.0.0"
    }

@app.post("/api/analytics/trends")
def api_trends(req: TrendRequest):
    return calculate_trend_summary(req.values, req.dates)

@app.post("/api/analytics/anomalies")
def api_anomalies(req: AnomalyRequest):
    return detect_anomalies(req.data_points, req.value_key, req.sensitivity)

@app.post("/api/analytics/predictions/production")
def api_forecast_production(req: ProductionForecastRequest):
    return forecast_production(req.historical_yields, req.horizon_days)

@app.post("/api/analytics/predictions/growth")
def api_predict_growth(req: GrowthPredictionRequest):
    return predict_growth(req.historical_weights, req.target_days)

@app.post("/api/analytics/risk-score")
def api_health_risk(req: HealthRiskRequest):
    return compute_explainable_health_risk(
        temperature=req.temperature,
        species=req.species,
        symptoms_count=req.symptoms_count,
        feed_change_pct=req.feed_change_pct,
        production_change_pct=req.production_change_pct,
        water_change_pct=req.water_change_pct,
        thi_stress_level=req.thi_stress_level
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
