"""
Swasth Farm - Analytics & Prediction Engine
Implements:
1. Rolling Trend Analysis & Moving Averages
2. Statistical Anomaly Detection (Z-score & IQR methods)
3. Production Forecasting (Autoregressive / Rolling Linear Regression)
4. Growth Rate Trajectory Estimation
5. Explainable Multi-Signal Health Risk Scoring
"""

import numpy as np
import pandas as pd
from typing import List, Dict, Any, Optional

def calculate_trend_summary(values: List[float], dates: Optional[List[str]] = None) -> Dict[str, Any]:
    """Calculates percentage change, current value, rolling mean, and standard deviation."""
    if not values or len(values) == 0:
        return {
            "current": 0.0,
            "mean": 0.0,
            "std": 0.0,
            "change_percent": 0.0,
            "trend": "insufficient_data"
        }
    
    arr = np.array(values, dtype=float)
    current = float(arr[-1])
    mean_val = float(np.mean(arr))
    std_val = float(np.std(arr)) if len(arr) > 1 else 0.0

    if len(arr) >= 2:
        baseline = float(np.mean(arr[:-1])) if len(arr) > 2 else float(arr[0])
        change_pct = ((current - baseline) / baseline * 100.0) if baseline > 0 else 0.0
    else:
        change_pct = 0.0

    if change_pct > 2.0:
        trend = "increasing"
    elif change_pct < -2.0:
        trend = "decreasing"
    else:
        trend = "stable"

    return {
        "current": round(current, 2),
        "mean": round(mean_val, 2),
        "std": round(std_val, 2),
        "change_percent": round(change_pct, 1),
        "trend": trend,
        "sample_size": len(arr)
    }

def detect_anomalies(data_points: List[Dict[str, Any]], value_key: str = "value", sensitivity: float = 1.5) -> List[Dict[str, Any]]:
    """
    Detects statistical anomalies using IQR (Interquartile Range) and Z-score tests.
    Returns anomalies with confidence, deviation magnitude, and direction.
    """
    if len(data_points) < 4:
        return []

    values = [float(d.get(value_key, 0.0)) for d in data_points]
    arr = np.array(values, dtype=float)

    # 1. IQR Method
    q25, q75 = np.percentile(arr, [25, 75])
    iqr = q75 - q25
    lower_bound = q25 - (sensitivity * iqr)
    upper_bound = q75 + (sensitivity * iqr)

    # 2. Z-Score Method
    mean = np.mean(arr)
    std = np.std(arr)

    anomalies = []
    for idx, (pt, val) in enumerate(zip(data_points, values)):
        z_score = abs((val - mean) / std) if std > 0 else 0.0
        is_iqr_anomaly = val < lower_bound or val > upper_bound
        is_z_anomaly = z_score >= 2.0

        if is_iqr_anomaly or is_z_anomaly:
            deviation_pct = ((val - mean) / mean * 100.0) if mean != 0 else 0.0
            direction = "drop" if val < mean else "spike"
            severity = "critical" if z_score >= 2.5 or abs(deviation_pct) >= 25 else "warning"

            anomalies.append({
                "index": idx,
                "date": pt.get("date", f"Point {idx}"),
                "value": round(val, 2),
                "expected_mean": round(float(mean), 2),
                "z_score": round(float(z_score), 2),
                "deviation_percent": round(float(deviation_pct), 1),
                "direction": direction,
                "severity": severity,
                "description": f"Unusual {direction} of {abs(round(deviation_pct, 1))}% from baseline ({round(val, 2)} vs avg {round(float(mean), 2)})"
            })

    return anomalies

def forecast_production(historical_yields: List[float], horizon_days: int = 7) -> Dict[str, Any]:
    """
    Forecasts production when sufficient historical data exists (min 5 points).
    Uses ordinary least squares linear trend projection with rolling moving average dampening.
    """
    if len(historical_yields) < 5:
        return {
            "status": "insufficient_data",
            "message": f"Need at least 5 historical data points to generate forecast. Current: {len(historical_yields)}",
            "forecast": []
        }

    y = np.array(historical_yields, dtype=float)
    x = np.arange(len(y))

    # Linear trend slope & intercept
    slope, intercept = np.polyfit(x, y, 1)
    
    # Confidence interval estimate from residuals
    residuals = y - (slope * x + intercept)
    residual_std = float(np.std(residuals))

    forecast_values = []
    for day in range(1, horizon_days + 1):
        future_x = len(y) - 1 + day
        projected = max(0.0, float(slope * future_x + intercept))
        # Weight recent mean to avoid runaway extrapolation
        damped = (projected * 0.6) + (float(np.mean(y[-5:])) * 0.4)
        
        forecast_values.append({
            "day_offset": day,
            "predicted_value": round(damped, 2),
            "lower_bound": round(max(0.0, damped - 1.96 * residual_std), 2),
            "upper_bound": round(damped + 1.96 * residual_std, 2)
        })

    return {
        "status": "success",
        "trend_direction": "upward" if slope > 0.05 else ("downward" if slope < -0.05 else "steady"),
        "historical_avg": round(float(np.mean(y)), 2),
        "forecast": forecast_values
    }

def predict_growth(historical_weights: List[Dict[str, Any]], target_days: int = 30) -> Dict[str, Any]:
    """
    Estimates animal growth trajectory and Average Daily Gain (ADG).
    """
    if len(historical_weights) < 3:
        return {
            "status": "insufficient_data",
            "message": "Need at least 3 weight checkups over time to predict growth trajectory.",
            "adg_kg_per_day": 0.0,
            "projected_weight": 0.0
        }

    weights = [float(w.get("weightKg", w.get("value", 0.0))) for w in historical_weights]
    y = np.array(weights, dtype=float)
    x = np.arange(len(y))

    slope, intercept = np.polyfit(x, y, 1)
    current_weight = float(y[-1])
    
    # Average daily gain estimate
    adg = max(0.0, float(slope))
    projected = round(current_weight + (adg * (target_days / 10.0)), 2)

    return {
        "status": "success",
        "current_weight": current_weight,
        "adg_kg_estimate": round(adg, 3),
        "target_days": target_days,
        "projected_weight": projected,
        "growth_phase": "rapid" if adg > 0.8 else ("steady" if adg > 0.2 else "plateau")
    }

def compute_explainable_health_risk(
    temperature: float,
    species: str,
    symptoms_count: int,
    feed_change_pct: float,
    production_change_pct: float,
    water_change_pct: float,
    thi_stress_level: str
) -> Dict[str, Any]:
    """
    Computes an explainable composite risk indicator without medical claims.
    Outputs weighted contributing signals and risk category.
    """
    # Species normal body temp baseline
    normal_temp_ranges = {
        "cow": (38.0, 39.2),
        "cattle": (38.0, 39.2),
        "buffalo": (37.8, 39.0),
        "goat": (38.5, 39.7),
        "sheep": (38.5, 39.8),
        "poultry": (40.5, 42.0),
        "pig": (38.5, 39.5)
    }

    t_min, t_max = normal_temp_ranges.get(species.lower(), (38.0, 39.3))

    # 1. Temperature Signal (Weight: 30%)
    temp_score = 0.0
    if temperature > t_max:
        temp_delta = temperature - t_max
        temp_score = min(30.0, (temp_delta / 1.5) * 30.0)
    elif temperature < t_min:
        temp_score = min(20.0, ((t_min - temperature) / 1.0) * 20.0)

    # 2. Symptoms Signal (Weight: 25%)
    symptom_score = min(25.0, symptoms_count * 8.0)

    # 3. Feed Reduction Signal (Weight: 20%)
    feed_score = 0.0
    if feed_change_pct < -5.0:
        feed_score = min(20.0, (abs(feed_change_pct) / 25.0) * 20.0)

    # 4. Production Drop Signal (Weight: 15%)
    prod_score = 0.0
    if production_change_pct < -5.0:
        prod_score = min(15.0, (abs(production_change_pct) / 25.0) * 15.0)

    # 5. Environmental THI Stress Signal (Weight: 10%)
    thi_weights = {"normal": 0.0, "mild": 3.0, "moderate": 6.5, "severe": 10.0}
    env_score = thi_weights.get(thi_stress_level.lower(), 2.0)

    total_risk_score = round(temp_score + symptom_score + feed_score + prod_score + env_score, 1)
    
    if total_risk_score >= 65.0:
        risk_level = "high"
        status_indication = "Requires Immediate Monitoring / Veterinary Review"
    elif total_risk_score >= 35.0:
        risk_level = "moderate"
        status_indication = "Active Monitoring Advised"
    else:
        risk_level = "low"
        status_indication = "Normal Physiological Baseline"

    contributing_factors = [
        {"factor": "Body Temperature Vitals", "score": round(temp_score, 1), "max": 30, "observation": f"{temperature}°C (Normal: {t_min}-{t_max}°C)"},
        {"factor": "Reported Clinical Symptoms", "score": round(symptom_score, 1), "max": 25, "observation": f"{symptoms_count} active symptom(s) logged"},
        {"factor": "Feed Consumption Variance", "score": round(feed_score, 1), "max": 20, "observation": f"{feed_change_pct}% intake change"},
        {"factor": "Production Yield Variance", "score": round(prod_score, 1), "max": 15, "observation": f"{production_change_pct}% yield deviation"},
        {"factor": "Environmental THI Stress", "score": round(env_score, 1), "max": 10, "observation": f"{thi_stress_level.capitalize()} ambient stress index"}
    ]

    return {
        "overall_risk_score": total_risk_score,
        "risk_level": risk_level,
        "status_indication": status_indication,
        "contributing_factors": contributing_factors,
        "disclaimer": "AI-Assisted Risk Indication - Not a confirmed veterinary diagnosis. Professional veterinary review recommended for health concerns."
    }
