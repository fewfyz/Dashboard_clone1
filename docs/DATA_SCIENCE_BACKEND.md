# 🧠 Data Science Backend Architecture

## Dam Dashboard - Intelligent Analytics System

A comprehensive guide for building a Python-powered Data Science Backend to enhance the Dam Dashboard with predictive analytics, anomaly detection, and real-time insights.

![Python](https://img.shields.io/badge/Python-3.11+-3776ab?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-009688?style=flat-square&logo=fastapi)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.3+-f7931e?style=flat-square&logo=scikit-learn)
![PyTorch](https://img.shields.io/badge/PyTorch-2.1+-ee4c2c?style=flat-square&logo=pytorch)

---

## 📋 Table of Contents

1. [System Architecture](#-section-1-system-architecture)
2. [Python Implementation](#-section-2-python-implementation)
3. [API Endpoint Structure](#-section-3-api-endpoint-structure)
4. [Frontend Integration](#-section-4-frontend-integration)
5. [Deployment Guide](#-section-5-deployment-guide)

---

## 🏗️ Section 1: System Architecture

### 1.1 Architecture Overview (ภาพรวมสถาปัตยกรรมระบบ)

ระบบ Data Science Backend ถูกออกแบบตามหลัก **Microservices Architecture** โดยแยกการประมวลผลข้อมูลออกจาก Frontend เพื่อความยืดหยุ่นและ Scalability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DAM DASHBOARD ECOSYSTEM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐         ┌──────────────────────────────────────┐  │
│  │   NEXT.JS FRONTEND   │         │      PYTHON DATA SCIENCE BACKEND     │  │
│  │   (Port 3000)        │  HTTP   │           (Port 8000)                │  │
│  │                      │ ◄─────► │                                      │  │
│  │  ┌────────────────┐  │  REST   │  ┌──────────────────────────────┐   │  │
│  │  │ MonitorPage    │  │   API   │  │     FastAPI Application      │   │  │
│  │  │ AnalysisPage   │  │         │  │                              │   │  │
│  │  │ TimeSeriesChart│  │         │  │  ┌────────┐ ┌────────────┐  │   │  │
│  │  └────────────────┘  │         │  │  │ Router │ │ Middleware │  │   │  │
│  │                      │         │  │  └────────┘ └────────────┘  │   │  │
│  │  ┌────────────────┐  │         │  │                              │   │  │
│  │  │  SWR/React     │  │         │  │  ┌──────────────────────┐   │   │  │
│  │  │  Query Cache   │  │         │  │  │   Service Layer      │   │   │  │
│  │  └────────────────┘  │         │  │  │  ┌────────────────┐  │   │   │  │
│  └──────────────────────┘         │  │  │  │ Data Generator │  │   │   │  │
│                                   │  │  │  │ Anomaly Detect │  │   │   │  │
│                                   │  │  │  │ Forecasting    │  │   │   │  │
│                                   │  │  │  └────────────────┘  │   │   │  │
│                                   │  │  └──────────────────────┘   │   │  │
│                                   │  └──────────────────────────────┘   │  │
│                                   │                                      │  │
│                                   │  ┌──────────────────────────────┐   │  │
│                                   │  │      ML Models Layer         │   │  │
│                                   │  │                              │   │  │
│                                   │  │  ┌──────────┐ ┌──────────┐  │   │  │
│                                   │  │  │ Isolation│ │  LSTM    │  │   │  │
│                                   │  │  │ Forest   │ │ Autoenc. │  │   │  │
│                                   │  │  └──────────┘ └──────────┘  │   │  │
│                                   │  │                              │   │  │
│                                   │  │  ┌──────────┐ ┌──────────┐  │   │  │
│                                   │  │  │ Prophet  │ │  XGBoost │  │   │  │
│                                   │  │  │ Forecast │ │ Classifier│  │   │  │
│                                   │  │  └──────────┘ └──────────┘  │   │  │
│                                   │  └──────────────────────────────┘   │  │
│                                   └──────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         DATA LAYER                                    │  │
│  │                                                                        │  │
│  │   ┌────────────┐   ┌────────────┐   ┌────────────┐   ┌────────────┐  │  │
│  │   │ PostgreSQL │   │  InfluxDB  │   │   Redis    │   │    S3      │  │  │
│  │   │ (Metadata) │   │ (TimeSeries│   │  (Cache)   │   │  (Models)  │  │  │
│  │   └────────────┘   └────────────┘   └────────────┘   └────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow (การไหลของข้อมูล)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   IoT       │     │   Ingestion │     │   Process   │     │   Serve     │
│   Sensors   │────►│   Service   │────►│   Pipeline  │────►│   API       │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                           │                   │                   │
                           ▼                   ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                    │  Raw Data   │     │  Processed  │     │  Frontend   │
                    │  Storage    │     │  + Insights │     │  Dashboard  │
                    └─────────────┘     └─────────────┘     └─────────────┘
```

### 1.3 หลักการออกแบบ (Design Principles)

| หลักการ | คำอธิบาย | การนำไปใช้ |
|---------|----------|------------|
| **Separation of Concerns** | แยกส่วน Business Logic ออกจาก Presentation | FastAPI สำหรับ Logic, Next.js สำหรับ UI |
| **Stateless API** | ไม่เก็บ State ใน Server | ใช้ JWT Token และ Redis Cache |
| **Event-Driven** | ตอบสนองต่อเหตุการณ์แบบ Real-time | WebSocket สำหรับ Live Updates |
| **Fault Tolerance** | ทนต่อความผิดพลาดได้ | Circuit Breaker Pattern, Retry Logic |

---

## 🐍 Section 2: Python Implementation

### 2.1 Project Structure (โครงสร้างโปรเจกต์)

```
dam-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI entry point
│   ├── config.py                  # Configuration settings
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── sensors.py         # Sensor data endpoints
│   │   │   ├── analytics.py       # Analytics endpoints
│   │   │   ├── predictions.py     # ML prediction endpoints
│   │   │   └── health.py          # Health check endpoints
│   │   └── dependencies.py        # Shared dependencies
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py            # Authentication
│   │   └── middleware.py          # Custom middleware
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── schemas.py             # Pydantic models
│   │   └── database.py            # Database models
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_generator.py      # Synthetic data generation
│   │   ├── anomaly_detector.py    # Anomaly detection service
│   │   ├── forecaster.py          # Time series forecasting
│   │   └── analytics_service.py   # Analytics computations
│   │
│   └── ml/
│       ├── __init__.py
│       ├── isolation_forest.py    # Isolation Forest model
│       ├── lstm_autoencoder.py    # LSTM Autoencoder model
│       └── model_registry.py      # Model management
│
├── tests/
│   ├── __init__.py
│   ├── test_api.py
│   └── test_models.py
│
├── scripts/
│   ├── generate_data.py           # Data generation script
│   └── train_models.py            # Model training script
│
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### 2.2 Core Configuration (การตั้งค่าหลัก)

```python
# app/config.py
"""
Configuration settings for Dam Dashboard Backend.
Follows 12-factor app methodology for environment-based configuration.
"""

from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # Application
    APP_NAME: str = "Dam Dashboard API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # CORS - Allow Next.js frontend
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "https://dam-dashboard.vercel.app"
    ]
    
    # Database
    DATABASE_URL: str = "postgresql://user:pass@localhost:5432/dam_db"
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # ML Models
    MODEL_PATH: str = "./models"
    ANOMALY_THRESHOLD: float = 0.05
    
    # Apple HIG Color Palette (for data visualization)
    COLOR_PRIMARY: str = "#00b4b4"      # Teal - Normal state
    COLOR_SECONDARY: str = "#007aff"    # Blue - Info/Links
    COLOR_DANGER: str = "#ff3b30"       # Red - Anomalies
    COLOR_WARNING: str = "#ff9500"      # Orange - Warnings
    COLOR_SUCCESS: str = "#34c759"      # Green - Success
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()
```

### 2.3 Pydantic Schemas (โมเดลข้อมูล)

```python
# app/models/schemas.py
"""
Pydantic schemas for request/response validation.
Designed to match frontend TypeScript interfaces.
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
from enum import Enum


# ============================================================================
# Enums
# ============================================================================

class SensorStatus(str, Enum):
    """Sensor operational status."""
    NORMAL = "normal"
    WARNING = "warning"
    DANGER = "danger"
    OFFLINE = "offline"


class AnomalyType(str, Enum):
    """Types of detected anomalies."""
    TEMPERATURE_SPIKE = "temperature_spike"
    HUMIDITY_ABNORMAL = "humidity_abnormal"
    PATTERN_DEVIATION = "pattern_deviation"
    SENSOR_MALFUNCTION = "sensor_malfunction"


# ============================================================================
# Base Schemas
# ============================================================================

class TimestampMixin(BaseModel):
    """Mixin for timestamp fields."""
    timestamp: datetime = Field(..., description="ISO 8601 timestamp")


class SensorReading(TimestampMixin):
    """Single sensor reading data point."""
    temperature: float = Field(..., ge=-50, le=100, description="Temperature in Celsius")
    humidity: float = Field(..., ge=0, le=100, description="Relative humidity percentage")
    
    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "2026-01-31T10:30:00Z",
                "temperature": 26.5,
                "humidity": 63.2
            }
        }


# ============================================================================
# Request Schemas
# ============================================================================

class TimeSeriesRequest(BaseModel):
    """Request for time series data."""
    storage_box_id: int = Field(..., ge=1, le=6, description="Storage box number (1-6)")
    start_date: datetime = Field(..., description="Start of time range")
    end_date: datetime = Field(..., description="End of time range")
    interval: Literal["1m", "5m", "15m", "1h", "1d"] = Field(
        default="1h",
        description="Data aggregation interval"
    )
    include_predictions: bool = Field(
        default=False,
        description="Include ML predictions in response"
    )


class AnomalyDetectionRequest(BaseModel):
    """Request for anomaly detection analysis."""
    storage_box_id: int = Field(..., ge=1, le=6)
    lookback_hours: int = Field(default=24, ge=1, le=168)
    sensitivity: float = Field(default=0.95, ge=0.5, le=0.99)


# ============================================================================
# Response Schemas
# ============================================================================

class ChartDataPoint(BaseModel):
    """
    Single data point for Recharts/Chart.js visualization.
    Matches frontend TimeSeriesChart component expectations.
    """
    time: str = Field(..., description="Formatted time label (e.g., 'Jan', '10:30')")
    timestamp: datetime = Field(..., description="Full ISO timestamp")
    temperature: float = Field(..., description="Temperature value")
    humidity: float = Field(..., description="Humidity value")
    temp_predicted: Optional[float] = Field(None, description="Predicted temperature")
    humidity_predicted: Optional[float] = Field(None, description="Predicted humidity")
    is_anomaly: bool = Field(default=False, description="Whether this point is anomalous")
    anomaly_score: Optional[float] = Field(None, ge=0, le=1, description="Anomaly confidence")
    
    class Config:
        json_schema_extra = {
            "example": {
                "time": "10:30",
                "timestamp": "2026-01-31T10:30:00Z",
                "temperature": 26.5,
                "humidity": 63.2,
                "temp_predicted": 26.8,
                "humidity_predicted": 62.5,
                "is_anomaly": False,
                "anomaly_score": 0.12
            }
        }


class TimeSeriesResponse(BaseModel):
    """
    Complete time series response for frontend charts.
    Designed for direct consumption by Recharts LineChart.
    """
    storage_box_id: int
    data: List[ChartDataPoint]
    metadata: "TimeSeriesMetadata"
    
    # Color scheme matching Apple HIG
    colors: "ChartColors"


class TimeSeriesMetadata(BaseModel):
    """Metadata for time series response."""
    total_points: int
    time_range: str
    aggregation_interval: str
    anomaly_count: int
    avg_temperature: float
    avg_humidity: float
    max_temperature: float
    min_temperature: float


class ChartColors(BaseModel):
    """
    Color configuration for frontend charts.
    Matches Apple HIG palette defined in globals.css.
    """
    temperature: str = "#ff3b30"    # Apple Red
    humidity: str = "#00b4b4"       # Teal Primary
    predicted: str = "#007aff"      # Apple Blue
    anomaly: str = "#ff9500"        # Apple Orange
    grid: str = "#e5e7eb"           # Gray 200
    background: str = "#ffffff"


class AnomalyResponse(BaseModel):
    """Response containing detected anomalies."""
    storage_box_id: int
    anomalies: List["AnomalyDetail"]
    summary: "AnomalySummary"
    recommendations: List[str]


class AnomalyDetail(BaseModel):
    """Detailed information about a single anomaly."""
    id: str
    timestamp: datetime
    type: AnomalyType
    severity: Literal["low", "medium", "high", "critical"]
    confidence: float = Field(..., ge=0, le=1)
    affected_metric: str
    actual_value: float
    expected_range: tuple[float, float]
    description: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "anom_20260131_001",
                "timestamp": "2026-01-31T14:30:00Z",
                "type": "temperature_spike",
                "severity": "high",
                "confidence": 0.94,
                "affected_metric": "temperature",
                "actual_value": 45.2,
                "expected_range": [20, 35],
                "description": "Temperature exceeded normal operating range by 29%"
            }
        }


class AnomalySummary(BaseModel):
    """Summary statistics for anomaly detection."""
    total_anomalies: int
    critical_count: int
    high_count: int
    medium_count: int
    low_count: int
    most_affected_sensor: str
    detection_accuracy: float


class StorageBoxStatus(BaseModel):
    """Current status of a storage box."""
    box_id: int
    status: SensorStatus
    total_items: int
    delay_count: int
    detection_count: int
    scrap_count: int
    current_temperature: float
    current_humidity: float
    door_status: Literal["on", "off"]
    light_status: Literal["on", "off"]
    last_updated: datetime
    health_score: float = Field(..., ge=0, le=100)


class DashboardOverview(BaseModel):
    """Complete dashboard overview response."""
    storage_boxes: List[StorageBoxStatus]
    system_health: float
    active_alerts: int
    total_anomalies_24h: int
    prediction_accuracy: float


# Rebuild models to resolve forward references
TimeSeriesResponse.model_rebuild()
AnomalyResponse.model_rebuild()
```

### 2.4 Synthetic Data Generator (ตัวสร้างข้อมูลจำลอง)

```python
# app/services/data_generator.py
"""
Synthetic Data Generator for Dam Sensor Data.

Generates realistic sensor data with:
- Seasonal patterns (daily/weekly cycles)
- Random noise
- Intentional anomalies for testing
- Correlations between temperature and humidity

การสร้างข้อมูลจำลองที่สมจริงสำหรับทดสอบระบบ Dashboard
รวมถึงการใส่ Anomaly เพื่อทดสอบระบบตรวจจับความผิดปกติ
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import random
import json


class AnomalyProfile(Enum):
    """Pre-defined anomaly injection profiles."""
    NONE = "none"
    LOW = "low"          # ~2% anomaly rate
    MEDIUM = "medium"    # ~5% anomaly rate
    HIGH = "high"        # ~10% anomaly rate
    STRESS_TEST = "stress_test"  # ~20% anomaly rate


@dataclass
class SensorConfig:
    """Configuration for a single sensor's data generation."""
    base_temperature: float = 25.0
    temp_daily_amplitude: float = 5.0      # Daily temperature swing
    temp_noise_std: float = 1.0            # Random noise level
    
    base_humidity: float = 60.0
    humidity_daily_amplitude: float = 10.0
    humidity_noise_std: float = 2.0
    
    # Correlation: humidity tends to decrease when temp increases
    temp_humidity_correlation: float = -0.6


class DamSensorDataGenerator:
    """
    Generator for realistic dam sensor data.
    
    Features:
    - Circadian rhythm simulation (day/night patterns)
    - Seasonal variations
    - Realistic noise patterns
    - Configurable anomaly injection
    - Multi-sensor correlation
    """
    
    def __init__(
        self,
        num_storage_boxes: int = 6,
        seed: Optional[int] = None
    ):
        """
        Initialize the data generator.
        
        Args:
            num_storage_boxes: Number of storage boxes (1-6 in our dashboard)
            seed: Random seed for reproducibility
        """
        self.num_boxes = num_storage_boxes
        self.rng = np.random.default_rng(seed)
        
        # Initialize sensor configs with slight variations per box
        self.sensor_configs = self._create_sensor_configs()
        
    def _create_sensor_configs(self) -> Dict[int, SensorConfig]:
        """Create slightly different configs for each storage box."""
        configs = {}
        for box_id in range(1, self.num_boxes + 1):
            # Add some variation between boxes
            configs[box_id] = SensorConfig(
                base_temperature=25.0 + self.rng.uniform(-2, 2),
                temp_daily_amplitude=5.0 + self.rng.uniform(-1, 1),
                temp_noise_std=1.0 + self.rng.uniform(-0.2, 0.2),
                base_humidity=60.0 + self.rng.uniform(-5, 5),
                humidity_daily_amplitude=10.0 + self.rng.uniform(-2, 2),
                humidity_noise_std=2.0 + self.rng.uniform(-0.5, 0.5),
            )
        return configs
    
    def generate_time_series(
        self,
        storage_box_id: int,
        start_time: datetime,
        end_time: datetime,
        interval_minutes: int = 60,
        anomaly_profile: AnomalyProfile = AnomalyProfile.MEDIUM
    ) -> pd.DataFrame:
        """
        Generate time series data for a storage box.
        
        Args:
            storage_box_id: ID of the storage box (1-6)
            start_time: Start of the time range
            end_time: End of the time range
            interval_minutes: Sampling interval in minutes
            anomaly_profile: Anomaly injection profile
            
        Returns:
            DataFrame with columns: timestamp, temperature, humidity, is_anomaly
        """
        config = self.sensor_configs.get(storage_box_id, SensorConfig())
        
        # Generate timestamps
        timestamps = pd.date_range(
            start=start_time,
            end=end_time,
            freq=f"{interval_minutes}min"
        )
        
        n_points = len(timestamps)
        
        # Generate base patterns
        temperature = self._generate_temperature_series(
            timestamps, config, n_points
        )
        humidity = self._generate_humidity_series(
            timestamps, config, n_points, temperature
        )
        
        # Inject anomalies
        is_anomaly = np.zeros(n_points, dtype=bool)
        anomaly_scores = np.zeros(n_points)
        
        if anomaly_profile != AnomalyProfile.NONE:
            temperature, humidity, is_anomaly, anomaly_scores = \
                self._inject_anomalies(
                    temperature, humidity, anomaly_profile
                )
        
        # Create DataFrame
        df = pd.DataFrame({
            'timestamp': timestamps,
            'temperature': np.round(temperature, 2),
            'humidity': np.round(humidity, 2),
            'is_anomaly': is_anomaly,
            'anomaly_score': np.round(anomaly_scores, 3)
        })
        
        return df
    
    def _generate_temperature_series(
        self,
        timestamps: pd.DatetimeIndex,
        config: SensorConfig,
        n_points: int
    ) -> np.ndarray:
        """Generate temperature time series with daily patterns."""
        # Convert timestamps to hours for daily cycle
        hours = np.array([t.hour + t.minute / 60 for t in timestamps])
        
        # Daily cycle: peak at 14:00, trough at 04:00
        daily_cycle = config.temp_daily_amplitude * np.sin(
            2 * np.pi * (hours - 8) / 24
        )
        
        # Weekly trend (slight variation)
        days = np.array([t.dayofweek for t in timestamps])
        weekly_effect = 0.5 * np.sin(2 * np.pi * days / 7)
        
        # Random noise
        noise = self.rng.normal(0, config.temp_noise_std, n_points)
        
        # Combine components
        temperature = config.base_temperature + daily_cycle + weekly_effect + noise
        
        return temperature
    
    def _generate_humidity_series(
        self,
        timestamps: pd.DatetimeIndex,
        config: SensorConfig,
        n_points: int,
        temperature: np.ndarray
    ) -> np.ndarray:
        """Generate humidity time series correlated with temperature."""
        hours = np.array([t.hour + t.minute / 60 for t in timestamps])
        
        # Inverse daily cycle to temperature (higher humidity at night)
        daily_cycle = config.humidity_daily_amplitude * np.sin(
            2 * np.pi * (hours - 8) / 24 + np.pi  # Phase shifted
        )
        
        # Correlation with temperature
        temp_deviation = temperature - config.base_temperature
        correlation_effect = config.temp_humidity_correlation * temp_deviation * 2
        
        # Random noise
        noise = self.rng.normal(0, config.humidity_noise_std, n_points)
        
        # Combine and clip to valid range
        humidity = config.base_humidity + daily_cycle + correlation_effect + noise
        humidity = np.clip(humidity, 0, 100)
        
        return humidity
    
    def _inject_anomalies(
        self,
        temperature: np.ndarray,
        humidity: np.ndarray,
        profile: AnomalyProfile
    ) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        """
        Inject realistic anomalies into the data.
        
        Anomaly types:
        1. Point anomalies (sudden spikes)
        2. Contextual anomalies (unusual for time of day)
        3. Collective anomalies (sustained unusual patterns)
        """
        n_points = len(temperature)
        is_anomaly = np.zeros(n_points, dtype=bool)
        anomaly_scores = np.zeros(n_points)
        
        # Determine anomaly rate based on profile
        anomaly_rates = {
            AnomalyProfile.LOW: 0.02,
            AnomalyProfile.MEDIUM: 0.05,
            AnomalyProfile.HIGH: 0.10,
            AnomalyProfile.STRESS_TEST: 0.20
        }
        rate = anomaly_rates.get(profile, 0.05)
        
        # Number of anomalies to inject
        n_anomalies = max(1, int(n_points * rate))
        
        # Select random points for anomalies
        anomaly_indices = self.rng.choice(
            n_points, size=n_anomalies, replace=False
        )
        
        for idx in anomaly_indices:
            anomaly_type = self.rng.choice([
                'temp_spike', 'temp_drop', 'humidity_spike', 
                'humidity_drop', 'both_spike', 'sensor_noise'
            ])
            
            if anomaly_type == 'temp_spike':
                temperature[idx] += self.rng.uniform(10, 25)
                anomaly_scores[idx] = self.rng.uniform(0.7, 0.95)
                
            elif anomaly_type == 'temp_drop':
                temperature[idx] -= self.rng.uniform(10, 20)
                anomaly_scores[idx] = self.rng.uniform(0.6, 0.85)
                
            elif anomaly_type == 'humidity_spike':
                humidity[idx] = min(100, humidity[idx] + self.rng.uniform(20, 40))
                anomaly_scores[idx] = self.rng.uniform(0.65, 0.9)
                
            elif anomaly_type == 'humidity_drop':
                humidity[idx] = max(0, humidity[idx] - self.rng.uniform(25, 45))
                anomaly_scores[idx] = self.rng.uniform(0.7, 0.92)
                
            elif anomaly_type == 'both_spike':
                temperature[idx] += self.rng.uniform(8, 15)
                humidity[idx] = min(100, humidity[idx] + self.rng.uniform(15, 30))
                anomaly_scores[idx] = self.rng.uniform(0.85, 0.98)
                
            elif anomaly_type == 'sensor_noise':
                # Simulate sensor malfunction with erratic readings
                temperature[idx] = self.rng.uniform(-10, 60)
                humidity[idx] = self.rng.uniform(0, 100)
                anomaly_scores[idx] = self.rng.uniform(0.9, 0.99)
            
            is_anomaly[idx] = True
        
        return temperature, humidity, is_anomaly, anomaly_scores
    
    def to_chart_format(
        self,
        df: pd.DataFrame,
        time_format: str = "%H:%M"
    ) -> List[Dict]:
        """
        Convert DataFrame to frontend chart-compatible format.
        
        Matches the ChartDataPoint schema expected by TimeSeriesChart.tsx
        
        Args:
            df: DataFrame from generate_time_series()
            time_format: strftime format for time labels
            
        Returns:
            List of dictionaries ready for JSON serialization
        """
        chart_data = []
        
        for _, row in df.iterrows():
            point = {
                "time": row['timestamp'].strftime(time_format),
                "timestamp": row['timestamp'].isoformat(),
                "temperature": float(row['temperature']),
                "humidity": float(row['humidity']),
                "is_anomaly": bool(row['is_anomaly']),
                "anomaly_score": float(row['anomaly_score']) if row['is_anomaly'] else None
            }
            chart_data.append(point)
        
        return chart_data
    
    def generate_dashboard_data(
        self,
        current_time: Optional[datetime] = None
    ) -> Dict:
        """
        Generate complete dashboard data for all storage boxes.
        
        Returns data matching the DashboardOverview schema.
        """
        if current_time is None:
            current_time = datetime.now()
        
        storage_boxes = []
        
        for box_id in range(1, self.num_boxes + 1):
            config = self.sensor_configs[box_id]
            
            # Generate current readings
            current_temp = config.base_temperature + self.rng.normal(0, 2)
            current_humidity = config.base_humidity + self.rng.normal(0, 3)
            
            box_status = {
                "box_id": box_id,
                "status": self.rng.choice(
                    ["normal", "normal", "normal", "warning", "danger"],
                    p=[0.7, 0.1, 0.1, 0.07, 0.03]
                ),
                "total_items": int(self.rng.integers(15, 25)),
                "delay_count": int(self.rng.integers(0, 6)),
                "detection_count": int(self.rng.integers(0, 4)),
                "scrap_count": int(self.rng.integers(0, 3)),
                "current_temperature": round(current_temp, 1),
                "current_humidity": round(current_humidity, 1),
                "door_status": self.rng.choice(["on", "off"]),
                "light_status": self.rng.choice(["on", "off"]),
                "last_updated": current_time.isoformat(),
                "health_score": round(self.rng.uniform(75, 100), 1)
            }
            
            storage_boxes.append(box_status)
        
        return {
            "storage_boxes": storage_boxes,
            "system_health": round(self.rng.uniform(85, 99), 1),
            "active_alerts": int(self.rng.integers(0, 5)),
            "total_anomalies_24h": int(self.rng.integers(0, 15)),
            "prediction_accuracy": round(self.rng.uniform(92, 98), 1)
        }


# ============================================================================
# Convenience functions
# ============================================================================

def generate_sample_data(
    days: int = 7,
    storage_box_id: int = 1,
    interval_minutes: int = 60,
    anomaly_profile: str = "medium",
    seed: Optional[int] = 42
) -> str:
    """
    Generate sample sensor data and return as JSON.
    
    Convenience function for quick data generation.
    
    Args:
        days: Number of days of data to generate
        storage_box_id: Storage box ID (1-6)
        interval_minutes: Sampling interval
        anomaly_profile: One of 'none', 'low', 'medium', 'high', 'stress_test'
        seed: Random seed for reproducibility
        
    Returns:
        JSON string of chart-compatible data
    """
    generator = DamSensorDataGenerator(seed=seed)
    
    end_time = datetime.now()
    start_time = end_time - timedelta(days=days)
    
    profile = AnomalyProfile(anomaly_profile)
    
    df = generator.generate_time_series(
        storage_box_id=storage_box_id,
        start_time=start_time,
        end_time=end_time,
        interval_minutes=interval_minutes,
        anomaly_profile=profile
    )
    
    chart_data = generator.to_chart_format(df)
    
    return json.dumps(chart_data, indent=2, default=str)


if __name__ == "__main__":
    # Example usage
    print("Generating sample dam sensor data...")
    data = generate_sample_data(days=7, anomaly_profile="medium")
    print(data[:2000])  # Print first 2000 chars
    print(f"\n... (truncated, total length: {len(data)} chars)")
```

### 2.5 Anomaly Detection Models (โมเดลตรวจจับความผิดปกติ)

#### 2.5.1 Isolation Forest (Scikit-learn)

```python
# app/ml/isolation_forest.py
"""
Isolation Forest Anomaly Detection Model.

Isolation Forest is an unsupervised learning algorithm that isolates anomalies
instead of profiling normal data points. It works by randomly selecting a feature
and then randomly selecting a split value between the max and min values.

หลักการ: Anomaly (จุดผิดปกติ) จะถูกแยกออกได้เร็วกว่าจุดปกติ
เนื่องจากมีค่าที่แตกต่างจากข้อมูลส่วนใหญ่อย่างมาก

Use case: เหมาะสำหรับการตรวจจับความผิดปกติแบบ Real-time
เนื่องจากมี Inference time ต่ำมาก
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from typing import List, Dict, Tuple, Optional
import joblib
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


class DamAnomalyDetector:
    """
    Anomaly detection for dam sensor data using Isolation Forest.
    
    This model is designed to detect:
    - Temperature anomalies
    - Humidity anomalies
    - Combined multi-variate anomalies
    - Temporal pattern anomalies (if time features are included)
    """
    
    def __init__(
        self,
        contamination: float = 0.05,
        n_estimators: int = 100,
        max_samples: str = "auto",
        random_state: int = 42
    ):
        """
        Initialize the anomaly detector.
        
        Args:
            contamination: Expected proportion of outliers (0.0 to 0.5)
                          ค่านี้ควรตั้งตามสัดส่วน anomaly ที่คาดว่าจะมีในข้อมูลจริง
            n_estimators: Number of isolation trees
            max_samples: Number of samples to draw for each tree
            random_state: Random seed for reproducibility
        """
        self.contamination = contamination
        self.n_estimators = n_estimators
        self.max_samples = max_samples
        self.random_state = random_state
        
        self.model = IsolationForest(
            contamination=contamination,
            n_estimators=n_estimators,
            max_samples=max_samples,
            random_state=random_state,
            n_jobs=-1  # Use all CPU cores
        )
        
        self.scaler = StandardScaler()
        self.is_fitted = False
        self.feature_names: List[str] = []
        
    def prepare_features(
        self,
        df: pd.DataFrame,
        include_time_features: bool = True
    ) -> np.ndarray:
        """
        Prepare features for model input.
        
        Creates engineered features from raw sensor data:
        - Raw values: temperature, humidity
        - Rolling statistics: mean, std over windows
        - Rate of change: derivatives
        - Time features: hour, day of week (cyclic encoding)
        
        Args:
            df: DataFrame with 'timestamp', 'temperature', 'humidity' columns
            include_time_features: Whether to add temporal features
            
        Returns:
            Feature matrix as numpy array
        """
        features = pd.DataFrame()
        
        # Raw features
        features['temperature'] = df['temperature']
        features['humidity'] = df['humidity']
        
        # Rolling statistics (detect sustained anomalies)
        for window in [3, 6, 12]:
            features[f'temp_rolling_mean_{window}'] = \
                df['temperature'].rolling(window=window, min_periods=1).mean()
            features[f'temp_rolling_std_{window}'] = \
                df['temperature'].rolling(window=window, min_periods=1).std().fillna(0)
            features[f'humidity_rolling_mean_{window}'] = \
                df['humidity'].rolling(window=window, min_periods=1).mean()
            features[f'humidity_rolling_std_{window}'] = \
                df['humidity'].rolling(window=window, min_periods=1).std().fillna(0)
        
        # Rate of change (detect sudden spikes)
        features['temp_diff'] = df['temperature'].diff().fillna(0)
        features['humidity_diff'] = df['humidity'].diff().fillna(0)
        features['temp_diff_abs'] = features['temp_diff'].abs()
        features['humidity_diff_abs'] = features['humidity_diff'].abs()
        
        # Temperature-humidity relationship
        features['temp_humidity_ratio'] = df['temperature'] / (df['humidity'] + 1)
        
        # Time features with cyclic encoding
        if include_time_features and 'timestamp' in df.columns:
            timestamps = pd.to_datetime(df['timestamp'])
            
            # Hour of day (cyclic)
            hour = timestamps.dt.hour
            features['hour_sin'] = np.sin(2 * np.pi * hour / 24)
            features['hour_cos'] = np.cos(2 * np.pi * hour / 24)
            
            # Day of week (cyclic)
            dow = timestamps.dt.dayofweek
            features['dow_sin'] = np.sin(2 * np.pi * dow / 7)
            features['dow_cos'] = np.cos(2 * np.pi * dow / 7)
        
        self.feature_names = features.columns.tolist()
        
        return features.values
    
    def fit(
        self,
        df: pd.DataFrame,
        include_time_features: bool = True
    ) -> "DamAnomalyDetector":
        """
        Fit the model on training data.
        
        Args:
            df: Training DataFrame (should be mostly normal data)
            include_time_features: Whether to include temporal features
            
        Returns:
            self for method chaining
        """
        logger.info(f"Training Isolation Forest with {len(df)} samples")
        
        X = self.prepare_features(df, include_time_features)
        X_scaled = self.scaler.fit_transform(X)
        
        self.model.fit(X_scaled)
        self.is_fitted = True
        
        logger.info("Model training completed")
        return self
    
    def predict(
        self,
        df: pd.DataFrame,
        include_time_features: bool = True
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        Predict anomalies in new data.
        
        Args:
            df: DataFrame with sensor readings
            include_time_features: Whether to include temporal features
            
        Returns:
            Tuple of:
                - is_anomaly: Boolean array (True = anomaly)
                - anomaly_scores: Float array (higher = more anomalous)
        """
        if not self.is_fitted:
            raise RuntimeError("Model must be fitted before prediction")
        
        X = self.prepare_features(df, include_time_features)
        X_scaled = self.scaler.transform(X)
        
        # Predict: -1 for anomaly, 1 for normal
        predictions = self.model.predict(X_scaled)
        is_anomaly = predictions == -1
        
        # Get anomaly scores (higher = more anomalous)
        # score_samples returns negative values, more negative = more anomalous
        raw_scores = self.model.score_samples(X_scaled)
        
        # Normalize to [0, 1] range where 1 = most anomalous
        anomaly_scores = self._normalize_scores(raw_scores)
        
        return is_anomaly, anomaly_scores
    
    def _normalize_scores(self, raw_scores: np.ndarray) -> np.ndarray:
        """Normalize anomaly scores to [0, 1] range."""
        # Raw scores are negative, more negative = more anomalous
        # Convert to positive and normalize
        min_score = raw_scores.min()
        max_score = raw_scores.max()
        
        if max_score == min_score:
            return np.zeros_like(raw_scores)
        
        # Invert so higher = more anomalous
        normalized = (max_score - raw_scores) / (max_score - min_score)
        return normalized
    
    def detect_with_details(
        self,
        df: pd.DataFrame
    ) -> List[Dict]:
        """
        Detect anomalies and return detailed information.
        
        Returns:
            List of anomaly details matching AnomalyDetail schema
        """
        is_anomaly, scores = self.predict(df)
        
        anomalies = []
        anomaly_indices = np.where(is_anomaly)[0]
        
        for idx in anomaly_indices:
            row = df.iloc[idx]
            
            # Determine anomaly type based on which feature is most abnormal
            temp = row['temperature']
            humidity = row['humidity']
            
            # Simple heuristics for anomaly classification
            if temp > 40 or temp < 10:
                anomaly_type = "temperature_spike" if temp > 40 else "temperature_drop"
                affected = "temperature"
                expected = (15, 35)
            elif humidity > 85 or humidity < 25:
                anomaly_type = "humidity_abnormal"
                affected = "humidity"
                expected = (30, 80)
            else:
                anomaly_type = "pattern_deviation"
                affected = "combined"
                expected = (20, 30)  # Temperature expected range
            
            # Determine severity based on score
            score = scores[idx]
            if score > 0.9:
                severity = "critical"
            elif score > 0.75:
                severity = "high"
            elif score > 0.5:
                severity = "medium"
            else:
                severity = "low"
            
            anomaly_detail = {
                "id": f"anom_{row['timestamp'].strftime('%Y%m%d%H%M')}_{idx}",
                "timestamp": row['timestamp'].isoformat(),
                "type": anomaly_type,
                "severity": severity,
                "confidence": float(score),
                "affected_metric": affected,
                "actual_value": float(temp if affected == "temperature" else humidity),
                "expected_range": expected,
                "description": self._generate_description(
                    anomaly_type, severity, temp, humidity
                )
            }
            
            anomalies.append(anomaly_detail)
        
        return anomalies
    
    def _generate_description(
        self,
        anomaly_type: str,
        severity: str,
        temp: float,
        humidity: float
    ) -> str:
        """Generate human-readable anomaly description."""
        descriptions = {
            "temperature_spike": f"Temperature reached {temp:.1f}°C, significantly above normal operating range",
            "temperature_drop": f"Temperature dropped to {temp:.1f}°C, below safe threshold",
            "humidity_abnormal": f"Humidity at {humidity:.1f}%, outside acceptable range",
            "pattern_deviation": f"Unusual pattern detected: Temp={temp:.1f}°C, Humidity={humidity:.1f}%"
        }
        
        base = descriptions.get(anomaly_type, "Anomaly detected")
        return f"[{severity.upper()}] {base}"
    
    def save_model(self, path: str) -> None:
        """Save model and scaler to disk."""
        model_path = Path(path)
        model_path.mkdir(parents=True, exist_ok=True)
        
        joblib.dump(self.model, model_path / "isolation_forest.joblib")
        joblib.dump(self.scaler, model_path / "scaler.joblib")
        joblib.dump(self.feature_names, model_path / "feature_names.joblib")
        
        logger.info(f"Model saved to {path}")
    
    def load_model(self, path: str) -> "DamAnomalyDetector":
        """Load model and scaler from disk."""
        model_path = Path(path)
        
        self.model = joblib.load(model_path / "isolation_forest.joblib")
        self.scaler = joblib.load(model_path / "scaler.joblib")
        self.feature_names = joblib.load(model_path / "feature_names.joblib")
        self.is_fitted = True
        
        logger.info(f"Model loaded from {path}")
        return self


# ============================================================================
# Usage Example
# ============================================================================

def example_usage():
    """Demonstrate model usage."""
    from app.services.data_generator import DamSensorDataGenerator, AnomalyProfile
    from datetime import datetime, timedelta
    
    # Generate training data (mostly normal)
    generator = DamSensorDataGenerator(seed=42)
    end_time = datetime.now()
    start_time = end_time - timedelta(days=30)
    
    train_df = generator.generate_time_series(
        storage_box_id=1,
        start_time=start_time,
        end_time=end_time,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.LOW  # Mostly normal for training
    )
    
    # Initialize and train model
    detector = DamAnomalyDetector(contamination=0.05)
    detector.fit(train_df)
    
    # Generate test data with anomalies
    test_start = end_time
    test_end = test_start + timedelta(days=7)
    
    test_df = generator.generate_time_series(
        storage_box_id=1,
        start_time=test_start,
        end_time=test_end,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.MEDIUM
    )
    
    # Detect anomalies
    anomalies = detector.detect_with_details(test_df)
    
    print(f"Detected {len(anomalies)} anomalies:")
    for a in anomalies[:5]:  # Print first 5
        print(f"  - {a['severity']}: {a['description']}")
    
    return detector, anomalies


if __name__ == "__main__":
    example_usage()
```

#### 2.5.2 LSTM Autoencoder (PyTorch)

```python
# app/ml/lstm_autoencoder.py
"""
LSTM Autoencoder for Time Series Anomaly Detection.

Autoencoder learns to reconstruct normal patterns.
High reconstruction error indicates anomaly.

หลักการ: 
- Encoder บีบอัดข้อมูลเป็น Latent representation
- Decoder พยายามสร้างข้อมูลกลับคืน
- หาก Reconstruction Error สูง แสดงว่าเป็น Anomaly
  เพราะโมเดลไม่เคยเห็น Pattern นี้มาก่อน

Use case: เหมาะสำหรับตรวจจับ Anomaly ที่เกิดจาก Pattern ที่ซับซ้อน
และมีลักษณะเป็น Temporal sequence
"""

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
import pandas as pd
from typing import List, Tuple, Optional, Dict
from sklearn.preprocessing import StandardScaler
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


class LSTMEncoder(nn.Module):
    """LSTM Encoder that compresses sequence to latent space."""
    
    def __init__(
        self,
        input_dim: int,
        hidden_dim: int,
        latent_dim: int,
        num_layers: int = 2,
        dropout: float = 0.2
    ):
        super().__init__()
        
        self.lstm = nn.LSTM(
            input_size=input_dim,
            hidden_size=hidden_dim,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0
        )
        
        self.fc_latent = nn.Linear(hidden_dim, latent_dim)
        
    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Forward pass through encoder.
        
        Args:
            x: Input tensor of shape (batch, seq_len, input_dim)
            
        Returns:
            latent: Latent representation (batch, latent_dim)
            hidden: LSTM hidden state for decoder initialization
        """
        # LSTM encoding
        lstm_out, (hidden, cell) = self.lstm(x)
        
        # Use last hidden state for latent representation
        latent = self.fc_latent(hidden[-1])
        
        return latent, (hidden, cell)


class LSTMDecoder(nn.Module):
    """LSTM Decoder that reconstructs sequence from latent space."""
    
    def __init__(
        self,
        latent_dim: int,
        hidden_dim: int,
        output_dim: int,
        seq_len: int,
        num_layers: int = 2,
        dropout: float = 0.2
    ):
        super().__init__()
        
        self.seq_len = seq_len
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        self.fc_hidden = nn.Linear(latent_dim, hidden_dim * num_layers)
        
        self.lstm = nn.LSTM(
            input_size=output_dim,
            hidden_size=hidden_dim,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0
        )
        
        self.fc_output = nn.Linear(hidden_dim, output_dim)
        
    def forward(
        self,
        latent: torch.Tensor,
        target_len: int
    ) -> torch.Tensor:
        """
        Forward pass through decoder.
        
        Args:
            latent: Latent representation (batch, latent_dim)
            target_len: Length of sequence to generate
            
        Returns:
            Reconstructed sequence (batch, target_len, output_dim)
        """
        batch_size = latent.size(0)
        
        # Initialize hidden state from latent
        hidden = self.fc_hidden(latent)
        hidden = hidden.view(self.num_layers, batch_size, self.hidden_dim)
        cell = torch.zeros_like(hidden)
        
        # Initialize decoder input
        decoder_input = torch.zeros(batch_size, 1, self.fc_output.out_features).to(latent.device)
        
        outputs = []
        
        for _ in range(target_len):
            lstm_out, (hidden, cell) = self.lstm(decoder_input, (hidden, cell))
            output = self.fc_output(lstm_out)
            outputs.append(output)
            decoder_input = output
        
        return torch.cat(outputs, dim=1)


class LSTMAutoencoder(nn.Module):
    """Complete LSTM Autoencoder for anomaly detection."""
    
    def __init__(
        self,
        input_dim: int = 2,      # temperature, humidity
        hidden_dim: int = 64,
        latent_dim: int = 16,
        seq_len: int = 24,       # 24 hours of hourly data
        num_layers: int = 2,
        dropout: float = 0.2
    ):
        super().__init__()
        
        self.seq_len = seq_len
        self.input_dim = input_dim
        
        self.encoder = LSTMEncoder(
            input_dim=input_dim,
            hidden_dim=hidden_dim,
            latent_dim=latent_dim,
            num_layers=num_layers,
            dropout=dropout
        )
        
        self.decoder = LSTMDecoder(
            latent_dim=latent_dim,
            hidden_dim=hidden_dim,
            output_dim=input_dim,
            seq_len=seq_len,
            num_layers=num_layers,
            dropout=dropout
        )
        
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Forward pass: encode then decode.
        
        Args:
            x: Input sequence (batch, seq_len, input_dim)
            
        Returns:
            Reconstructed sequence (batch, seq_len, input_dim)
        """
        latent, _ = self.encoder(x)
        reconstructed = self.decoder(latent, x.size(1))
        return reconstructed
    
    def get_reconstruction_error(self, x: torch.Tensor) -> torch.Tensor:
        """Calculate reconstruction error for each sample."""
        with torch.no_grad():
            reconstructed = self.forward(x)
            # MSE per sample
            error = torch.mean((x - reconstructed) ** 2, dim=(1, 2))
        return error


class DamLSTMAnomalyDetector:
    """
    LSTM Autoencoder-based anomaly detector for dam sensor data.
    
    Detects anomalies by measuring reconstruction error:
    - Train on normal data to learn typical patterns
    - High reconstruction error on new data indicates anomaly
    """
    
    def __init__(
        self,
        seq_len: int = 24,
        hidden_dim: int = 64,
        latent_dim: int = 16,
        threshold_percentile: float = 95,
        learning_rate: float = 0.001,
        num_epochs: int = 100,
        batch_size: int = 32
    ):
        """
        Initialize the LSTM anomaly detector.
        
        Args:
            seq_len: Sequence length for LSTM input (e.g., 24 for 24 hours)
            hidden_dim: LSTM hidden dimension
            latent_dim: Latent space dimension
            threshold_percentile: Percentile for anomaly threshold
            learning_rate: Learning rate for training
            num_epochs: Number of training epochs
            batch_size: Training batch size
        """
        self.seq_len = seq_len
        self.hidden_dim = hidden_dim
        self.latent_dim = latent_dim
        self.threshold_percentile = threshold_percentile
        self.learning_rate = learning_rate
        self.num_epochs = num_epochs
        self.batch_size = batch_size
        
        self.model: Optional[LSTMAutoencoder] = None
        self.scaler = StandardScaler()
        self.threshold: float = 0.0
        self.is_fitted = False
        
    def _create_sequences(
        self,
        data: np.ndarray
    ) -> np.ndarray:
        """Create overlapping sequences from time series data."""
        sequences = []
        for i in range(len(data) - self.seq_len + 1):
            sequences.append(data[i:i + self.seq_len])
        return np.array(sequences)
    
    def _prepare_data(
        self,
        df: pd.DataFrame
    ) -> torch.Tensor:
        """Prepare DataFrame for model input."""
        # Extract features
        features = df[['temperature', 'humidity']].values
        
        # Scale features
        if not self.is_fitted:
            scaled = self.scaler.fit_transform(features)
        else:
            scaled = self.scaler.transform(features)
        
        # Create sequences
        sequences = self._create_sequences(scaled)
        
        return torch.FloatTensor(sequences).to(device)
    
    def fit(
        self,
        df: pd.DataFrame,
        validation_split: float = 0.2,
        verbose: bool = True
    ) -> "DamLSTMAnomalyDetector":
        """
        Train the LSTM autoencoder on normal data.
        
        Args:
            df: DataFrame with 'temperature' and 'humidity' columns
            validation_split: Fraction of data for validation
            verbose: Whether to print training progress
            
        Returns:
            self for method chaining
        """
        logger.info(f"Training LSTM Autoencoder with {len(df)} samples")
        
        # Prepare data
        X = self._prepare_data(df)
        
        # Split into train/val
        n_val = int(len(X) * validation_split)
        X_train = X[:-n_val] if n_val > 0 else X
        X_val = X[-n_val:] if n_val > 0 else X[:self.batch_size]
        
        # Create data loaders
        train_dataset = TensorDataset(X_train, X_train)
        train_loader = DataLoader(
            train_dataset,
            batch_size=self.batch_size,
            shuffle=True
        )
        
        # Initialize model
        self.model = LSTMAutoencoder(
            input_dim=2,
            hidden_dim=self.hidden_dim,
            latent_dim=self.latent_dim,
            seq_len=self.seq_len
        ).to(device)
        
        # Training setup
        criterion = nn.MSELoss()
        optimizer = optim.Adam(self.model.parameters(), lr=self.learning_rate)
        scheduler = optim.lr_scheduler.ReduceLROnPlateau(
            optimizer, mode='min', factor=0.5, patience=5
        )
        
        # Training loop
        best_val_loss = float('inf')
        
        for epoch in range(self.num_epochs):
            self.model.train()
            train_loss = 0.0
            
            for batch_x, _ in train_loader:
                optimizer.zero_grad()
                reconstructed = self.model(batch_x)
                loss = criterion(reconstructed, batch_x)
                loss.backward()
                optimizer.step()
                train_loss += loss.item()
            
            train_loss /= len(train_loader)
            
            # Validation
            self.model.eval()
            with torch.no_grad():
                val_reconstructed = self.model(X_val)
                val_loss = criterion(val_reconstructed, X_val).item()
            
            scheduler.step(val_loss)
            
            if val_loss < best_val_loss:
                best_val_loss = val_loss
            
            if verbose and (epoch + 1) % 10 == 0:
                logger.info(
                    f"Epoch {epoch + 1}/{self.num_epochs} - "
                    f"Train Loss: {train_loss:.6f}, Val Loss: {val_loss:.6f}"
                )
        
        # Calculate threshold from training data
        self.model.eval()
        with torch.no_grad():
            train_errors = self.model.get_reconstruction_error(X_train)
            self.threshold = np.percentile(
                train_errors.cpu().numpy(),
                self.threshold_percentile
            )
        
        self.is_fitted = True
        logger.info(f"Training complete. Anomaly threshold: {self.threshold:.6f}")
        
        return self
    
    def predict(
        self,
        df: pd.DataFrame
    ) -> Tuple[np.ndarray, np.ndarray]:
        """
        Predict anomalies in new data.
        
        Args:
            df: DataFrame with sensor readings
            
        Returns:
            Tuple of:
                - is_anomaly: Boolean array
                - anomaly_scores: Normalized reconstruction errors
        """
        if not self.is_fitted or self.model is None:
            raise RuntimeError("Model must be fitted before prediction")
        
        X = self._prepare_data(df)
        
        self.model.eval()
        with torch.no_grad():
            reconstruction_errors = self.model.get_reconstruction_error(X)
            errors = reconstruction_errors.cpu().numpy()
        
        # Pad to match original length
        # (sequences are shorter than original due to windowing)
        padded_errors = np.zeros(len(df))
        padded_errors[self.seq_len - 1:] = errors
        
        # Determine anomalies
        is_anomaly = padded_errors > self.threshold
        
        # Normalize scores
        max_error = max(errors.max(), self.threshold * 2)
        anomaly_scores = np.clip(padded_errors / max_error, 0, 1)
        
        return is_anomaly, anomaly_scores
    
    def save_model(self, path: str) -> None:
        """Save model to disk."""
        model_path = Path(path)
        model_path.mkdir(parents=True, exist_ok=True)
        
        if self.model is not None:
            torch.save(self.model.state_dict(), model_path / "lstm_autoencoder.pt")
        
        import joblib
        joblib.dump(self.scaler, model_path / "scaler.joblib")
        joblib.dump({
            'threshold': self.threshold,
            'seq_len': self.seq_len,
            'hidden_dim': self.hidden_dim,
            'latent_dim': self.latent_dim
        }, model_path / "config.joblib")
        
        logger.info(f"Model saved to {path}")
    
    def load_model(self, path: str) -> "DamLSTMAnomalyDetector":
        """Load model from disk."""
        model_path = Path(path)
        
        import joblib
        config = joblib.load(model_path / "config.joblib")
        self.threshold = config['threshold']
        self.seq_len = config['seq_len']
        self.hidden_dim = config['hidden_dim']
        self.latent_dim = config['latent_dim']
        
        self.scaler = joblib.load(model_path / "scaler.joblib")
        
        self.model = LSTMAutoencoder(
            input_dim=2,
            hidden_dim=self.hidden_dim,
            latent_dim=self.latent_dim,
            seq_len=self.seq_len
        ).to(device)
        self.model.load_state_dict(torch.load(model_path / "lstm_autoencoder.pt"))
        
        self.is_fitted = True
        logger.info(f"Model loaded from {path}")
        
        return self


if __name__ == "__main__":
    # Quick test
    from app.services.data_generator import DamSensorDataGenerator, AnomalyProfile
    from datetime import datetime, timedelta
    
    generator = DamSensorDataGenerator(seed=42)
    end_time = datetime.now()
    start_time = end_time - timedelta(days=60)
    
    train_df = generator.generate_time_series(
        storage_box_id=1,
        start_time=start_time,
        end_time=end_time,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.LOW
    )
    
    detector = DamLSTMAnomalyDetector(
        seq_len=24,
        num_epochs=50,
        verbose=True
    )
    detector.fit(train_df)
    
    # Test
    test_df = generator.generate_time_series(
        storage_box_id=1,
        start_time=end_time,
        end_time=end_time + timedelta(days=7),
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.HIGH
    )
    
    is_anomaly, scores = detector.predict(test_df)
    print(f"Detected {is_anomaly.sum()} anomalies out of {len(test_df)} points")
```

---

## 🌐 Section 3: API Endpoint Structure

### 3.1 FastAPI Main Application

```python
# app/main.py
"""
Dam Dashboard API - FastAPI Application Entry Point

This is the main entry point for the Dam Dashboard backend API.
It initializes the FastAPI application with all routes, middleware,
and configuration necessary for serving the Next.js frontend.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import logging
import time

from app.config import get_settings
from app.api.routes import sensors, analytics, predictions, health

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan manager.
    Handles startup and shutdown events.
    """
    # Startup
    logger.info("🚀 Starting Dam Dashboard API...")
    logger.info(f"📊 Debug mode: {settings.DEBUG}")
    
    # Load ML models here
    # from app.ml.model_registry import ModelRegistry
    # app.state.model_registry = ModelRegistry()
    # await app.state.model_registry.load_all_models()
    
    yield
    
    # Shutdown
    logger.info("👋 Shutting down Dam Dashboard API...")


# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    ## Dam Dashboard Backend API
    
    Provides data and analytics endpoints for the Dam Storage Monitoring Dashboard.
    
    ### Features:
    - 📊 **Sensor Data**: Real-time and historical sensor readings
    - 🔍 **Analytics**: Aggregated statistics and trends
    - 🤖 **Predictions**: ML-powered anomaly detection and forecasting
    - 🏥 **Health**: System health monitoring
    
    ### Authentication:
    Currently using API key authentication for simplicity.
    
    ### Rate Limiting:
    - 100 requests per minute for standard endpoints
    - 10 requests per minute for ML prediction endpoints
    """,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)


# ============================================================================
# Middleware
# ============================================================================

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    """Add processing time to response headers."""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests."""
    logger.info(f"📥 {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"📤 {request.method} {request.url.path} - {response.status_code}")
    return response


# ============================================================================
# Exception Handlers
# ============================================================================

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unhandled errors."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "detail": str(exc) if settings.DEBUG else "An unexpected error occurred"
        }
    )


# ============================================================================
# Include Routers
# ============================================================================

app.include_router(
    health.router,
    prefix="/api/v1/health",
    tags=["Health"]
)

app.include_router(
    sensors.router,
    prefix="/api/v1/sensors",
    tags=["Sensors"]
)

app.include_router(
    analytics.router,
    prefix="/api/v1/analytics",
    tags=["Analytics"]
)

app.include_router(
    predictions.router,
    prefix="/api/v1/predictions",
    tags=["Predictions"]
)


# ============================================================================
# Root Endpoint
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "docs": "/docs",
        "health": "/api/v1/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )
```

### 3.2 Sensor Data Endpoints

```python
# app/api/routes/sensors.py
"""
Sensor Data API Routes

Endpoints for retrieving sensor data from storage boxes.
These endpoints power the Monitor and Analysis pages.
"""

from fastapi import APIRouter, Query, HTTPException, Depends
from typing import Optional, List
from datetime import datetime, timedelta
from enum import Enum

from app.models.schemas import (
    TimeSeriesRequest,
    TimeSeriesResponse,
    TimeSeriesMetadata,
    ChartColors,
    ChartDataPoint,
    StorageBoxStatus,
    DashboardOverview
)
from app.services.data_generator import DamSensorDataGenerator, AnomalyProfile
from app.config import get_settings

router = APIRouter()
settings = get_settings()

# Initialize data generator (replace with real data source in production)
generator = DamSensorDataGenerator(seed=42)


class TimeInterval(str, Enum):
    """Supported time intervals."""
    ONE_MINUTE = "1m"
    FIVE_MINUTES = "5m"
    FIFTEEN_MINUTES = "15m"
    ONE_HOUR = "1h"
    ONE_DAY = "1d"


class TimeRange(str, Enum):
    """Pre-defined time ranges."""
    LAST_HOUR = "1h"
    LAST_6_HOURS = "6h"
    LAST_24_HOURS = "24h"
    LAST_7_DAYS = "7d"
    LAST_30_DAYS = "30d"


def get_interval_minutes(interval: TimeInterval) -> int:
    """Convert interval enum to minutes."""
    mapping = {
        TimeInterval.ONE_MINUTE: 1,
        TimeInterval.FIVE_MINUTES: 5,
        TimeInterval.FIFTEEN_MINUTES: 15,
        TimeInterval.ONE_HOUR: 60,
        TimeInterval.ONE_DAY: 1440
    }
    return mapping.get(interval, 60)


def get_range_delta(time_range: TimeRange) -> timedelta:
    """Convert time range enum to timedelta."""
    mapping = {
        TimeRange.LAST_HOUR: timedelta(hours=1),
        TimeRange.LAST_6_HOURS: timedelta(hours=6),
        TimeRange.LAST_24_HOURS: timedelta(hours=24),
        TimeRange.LAST_7_DAYS: timedelta(days=7),
        TimeRange.LAST_30_DAYS: timedelta(days=30)
    }
    return mapping.get(time_range, timedelta(hours=24))


# ============================================================================
# Endpoints
# ============================================================================

@router.get(
    "/timeseries/{storage_box_id}",
    response_model=TimeSeriesResponse,
    summary="Get time series data for a storage box",
    description="""
    Retrieve time series sensor data for a specific storage box.
    
    This endpoint powers the TimeSeriesChart component on the Analysis page.
    Returns data in a format compatible with Recharts/Chart.js.
    
    **Features:**
    - Configurable time range and interval
    - Optional anomaly detection results
    - Metadata with statistics
    - Apple HIG color palette
    """
)
async def get_timeseries(
    storage_box_id: int,
    time_range: TimeRange = Query(
        default=TimeRange.LAST_24_HOURS,
        description="Pre-defined time range"
    ),
    interval: TimeInterval = Query(
        default=TimeInterval.ONE_HOUR,
        description="Data aggregation interval"
    ),
    include_predictions: bool = Query(
        default=False,
        description="Include ML predictions"
    ),
    include_anomalies: bool = Query(
        default=True,
        description="Include anomaly detection results"
    )
):
    """Get time series data for charts."""
    
    if storage_box_id < 1 or storage_box_id > 6:
        raise HTTPException(
            status_code=400,
            detail="storage_box_id must be between 1 and 6"
        )
    
    # Calculate time range
    end_time = datetime.now()
    start_time = end_time - get_range_delta(time_range)
    interval_minutes = get_interval_minutes(interval)
    
    # Generate data (replace with database query in production)
    anomaly_profile = AnomalyProfile.MEDIUM if include_anomalies else AnomalyProfile.NONE
    
    df = generator.generate_time_series(
        storage_box_id=storage_box_id,
        start_time=start_time,
        end_time=end_time,
        interval_minutes=interval_minutes,
        anomaly_profile=anomaly_profile
    )
    
    # Convert to chart format
    chart_data = []
    
    # Choose time format based on range
    if time_range in [TimeRange.LAST_HOUR, TimeRange.LAST_6_HOURS]:
        time_format = "%H:%M"
    elif time_range == TimeRange.LAST_24_HOURS:
        time_format = "%H:%M"
    else:
        time_format = "%b %d"
    
    for _, row in df.iterrows():
        point = ChartDataPoint(
            time=row['timestamp'].strftime(time_format),
            timestamp=row['timestamp'],
            temperature=round(row['temperature'], 1),
            humidity=round(row['humidity'], 1),
            is_anomaly=bool(row['is_anomaly']),
            anomaly_score=float(row['anomaly_score']) if row['is_anomaly'] else None,
            temp_predicted=None,  # Add predictions if requested
            humidity_predicted=None
        )
        chart_data.append(point)
    
    # Calculate metadata
    metadata = TimeSeriesMetadata(
        total_points=len(chart_data),
        time_range=time_range.value,
        aggregation_interval=interval.value,
        anomaly_count=int(df['is_anomaly'].sum()),
        avg_temperature=round(df['temperature'].mean(), 1),
        avg_humidity=round(df['humidity'].mean(), 1),
        max_temperature=round(df['temperature'].max(), 1),
        min_temperature=round(df['temperature'].min(), 1)
    )
    
    # Color scheme matching Apple HIG
    colors = ChartColors(
        temperature=settings.COLOR_DANGER,
        humidity=settings.COLOR_PRIMARY,
        predicted=settings.COLOR_SECONDARY,
        anomaly=settings.COLOR_WARNING,
        grid="#e5e7eb",
        background="#ffffff"
    )
    
    return TimeSeriesResponse(
        storage_box_id=storage_box_id,
        data=chart_data,
        metadata=metadata,
        colors=colors
    )


@router.get(
    "/current/{storage_box_id}",
    response_model=StorageBoxStatus,
    summary="Get current status of a storage box",
    description="Returns the current real-time status of a storage box."
)
async def get_current_status(storage_box_id: int):
    """Get current status for a single storage box."""
    
    if storage_box_id < 1 or storage_box_id > 6:
        raise HTTPException(
            status_code=400,
            detail="storage_box_id must be between 1 and 6"
        )
    
    dashboard_data = generator.generate_dashboard_data()
    
    for box in dashboard_data['storage_boxes']:
        if box['box_id'] == storage_box_id:
            return StorageBoxStatus(**box)
    
    raise HTTPException(status_code=404, detail="Storage box not found")


@router.get(
    "/dashboard/overview",
    response_model=DashboardOverview,
    summary="Get dashboard overview",
    description="Returns aggregated overview for all storage boxes."
)
async def get_dashboard_overview():
    """Get complete dashboard overview."""
    return DashboardOverview(**generator.generate_dashboard_data())


@router.get(
    "/realtime/{storage_box_id}",
    summary="Get real-time sensor reading",
    description="Returns the most recent sensor reading. For WebSocket, see /ws/sensors."
)
async def get_realtime_reading(storage_box_id: int):
    """Get latest reading for a storage box."""
    
    if storage_box_id < 1 or storage_box_id > 6:
        raise HTTPException(
            status_code=400,
            detail="storage_box_id must be between 1 and 6"
        )
    
    # Generate single current reading
    config = generator.sensor_configs.get(storage_box_id)
    if not config:
        raise HTTPException(status_code=404, detail="Storage box not found")
    
    import numpy as np
    rng = np.random.default_rng()
    
    return {
        "storage_box_id": storage_box_id,
        "timestamp": datetime.now().isoformat(),
        "temperature": round(config.base_temperature + rng.normal(0, 2), 1),
        "humidity": round(config.base_humidity + rng.normal(0, 3), 1),
        "status": "normal"
    }
```

### 3.3 Predictions Endpoints

```python
# app/api/routes/predictions.py
"""
ML Predictions API Routes

Endpoints for machine learning predictions including:
- Anomaly detection
- Forecasting
- Pattern analysis
"""

from fastapi import APIRouter, Query, HTTPException, BackgroundTasks
from typing import Optional, List
from datetime import datetime, timedelta

from app.models.schemas import (
    AnomalyDetectionRequest,
    AnomalyResponse,
    AnomalyDetail,
    AnomalySummary
)
from app.services.data_generator import DamSensorDataGenerator, AnomalyProfile
from app.ml.isolation_forest import DamAnomalyDetector
from app.config import get_settings

router = APIRouter()
settings = get_settings()

# Initialize components
generator = DamSensorDataGenerator(seed=42)
anomaly_detector = DamAnomalyDetector(contamination=0.05)


# ============================================================================
# Model Training Status
# ============================================================================

model_status = {
    "isolation_forest": {"trained": False, "last_trained": None},
    "lstm_autoencoder": {"trained": False, "last_trained": None}
}


# ============================================================================
# Endpoints
# ============================================================================

@router.get(
    "/anomalies/{storage_box_id}",
    response_model=AnomalyResponse,
    summary="Detect anomalies in sensor data",
    description="""
    Run anomaly detection on recent sensor data for a storage box.
    
    Uses Isolation Forest algorithm to identify:
    - Temperature spikes/drops
    - Humidity abnormalities
    - Pattern deviations
    - Sensor malfunctions
    
    **Note:** First call may be slower due to model training.
    """
)
async def detect_anomalies(
    storage_box_id: int,
    lookback_hours: int = Query(
        default=24,
        ge=1,
        le=168,
        description="Hours of historical data to analyze"
    ),
    sensitivity: float = Query(
        default=0.95,
        ge=0.5,
        le=0.99,
        description="Detection sensitivity (higher = more sensitive)"
    )
):
    """Detect anomalies in sensor data."""
    
    if storage_box_id < 1 or storage_box_id > 6:
        raise HTTPException(
            status_code=400,
            detail="storage_box_id must be between 1 and 6"
        )
    
    # Generate historical data for analysis
    end_time = datetime.now()
    start_time = end_time - timedelta(hours=lookback_hours)
    
    # For training, use 7 days of mostly normal data
    train_start = start_time - timedelta(days=7)
    
    # Generate training data
    train_df = generator.generate_time_series(
        storage_box_id=storage_box_id,
        start_time=train_start,
        end_time=start_time,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.LOW
    )
    
    # Generate analysis data with potential anomalies
    analysis_df = generator.generate_time_series(
        storage_box_id=storage_box_id,
        start_time=start_time,
        end_time=end_time,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.MEDIUM
    )
    
    # Train detector if not already trained
    detector = DamAnomalyDetector(contamination=1 - sensitivity)
    detector.fit(train_df)
    
    # Detect anomalies
    anomalies = detector.detect_with_details(analysis_df)
    
    # Create summary
    severity_counts = {"critical": 0, "high": 0, "medium": 0, "low": 0}
    for a in anomalies:
        severity_counts[a["severity"]] += 1
    
    summary = AnomalySummary(
        total_anomalies=len(anomalies),
        critical_count=severity_counts["critical"],
        high_count=severity_counts["high"],
        medium_count=severity_counts["medium"],
        low_count=severity_counts["low"],
        most_affected_sensor="temperature" if any(
            "temp" in a.get("type", "") for a in anomalies
        ) else "humidity",
        detection_accuracy=0.94  # Placeholder
    )
    
    # Generate recommendations
    recommendations = generate_recommendations(anomalies, summary)
    
    return AnomalyResponse(
        storage_box_id=storage_box_id,
        anomalies=[AnomalyDetail(**a) for a in anomalies],
        summary=summary,
        recommendations=recommendations
    )


@router.get(
    "/forecast/{storage_box_id}",
    summary="Get sensor value forecasts",
    description="Predict future temperature and humidity values."
)
async def get_forecast(
    storage_box_id: int,
    hours_ahead: int = Query(
        default=24,
        ge=1,
        le=168,
        description="Hours to forecast"
    )
):
    """Get forecasted sensor values."""
    
    if storage_box_id < 1 or storage_box_id > 6:
        raise HTTPException(
            status_code=400,
            detail="storage_box_id must be between 1 and 6"
        )
    
    # Generate forecast data
    # In production, this would use a trained forecasting model
    end_time = datetime.now()
    forecast_end = end_time + timedelta(hours=hours_ahead)
    
    df = generator.generate_time_series(
        storage_box_id=storage_box_id,
        start_time=end_time,
        end_time=forecast_end,
        interval_minutes=60,
        anomaly_profile=AnomalyProfile.NONE
    )
    
    # Format as forecast
    forecasts = []
    for _, row in df.iterrows():
        forecasts.append({
            "timestamp": row['timestamp'].isoformat(),
            "temperature": {
                "predicted": round(row['temperature'], 1),
                "lower_bound": round(row['temperature'] - 2, 1),
                "upper_bound": round(row['temperature'] + 2, 1)
            },
            "humidity": {
                "predicted": round(row['humidity'], 1),
                "lower_bound": round(max(0, row['humidity'] - 5), 1),
                "upper_bound": round(min(100, row['humidity'] + 5), 1)
            }
        })
    
    return {
        "storage_box_id": storage_box_id,
        "forecast_hours": hours_ahead,
        "generated_at": datetime.now().isoformat(),
        "forecasts": forecasts,
        "model_info": {
            "name": "ARIMA + Seasonal Decomposition",
            "accuracy_mae": 1.5,
            "last_trained": "2026-01-30T00:00:00Z"
        }
    }


@router.post(
    "/train",
    summary="Trigger model retraining",
    description="Start background retraining of ML models."
)
async def trigger_training(
    background_tasks: BackgroundTasks,
    model_type: str = Query(
        default="all",
        description="Model to retrain: 'isolation_forest', 'lstm', or 'all'"
    )
):
    """Trigger model retraining in background."""
    
    async def train_models():
        """Background training task."""
        # In production, this would train on real data
        model_status["isolation_forest"]["trained"] = True
        model_status["isolation_forest"]["last_trained"] = datetime.now().isoformat()
    
    background_tasks.add_task(train_models)
    
    return {
        "status": "training_started",
        "model_type": model_type,
        "message": "Model training started in background"
    }


@router.get(
    "/model-status",
    summary="Get ML model status",
    description="Check the status of trained ML models."
)
async def get_model_status():
    """Get status of all ML models."""
    return {
        "models": model_status,
        "available_models": ["isolation_forest", "lstm_autoencoder"],
        "default_model": "isolation_forest"
    }


# ============================================================================
# Helper Functions
# ============================================================================

def generate_recommendations(
    anomalies: List[dict],
    summary: AnomalySummary
) -> List[str]:
    """Generate actionable recommendations based on detected anomalies."""
    
    recommendations = []
    
    if summary.critical_count > 0:
        recommendations.append(
            "🚨 CRITICAL: Immediate inspection required for storage box"
        )
    
    if summary.high_count > 2:
        recommendations.append(
            "⚠️ Multiple high-severity anomalies detected. Check sensor calibration."
        )
    
    temp_anomalies = sum(1 for a in anomalies if "temp" in a.get("type", ""))
    if temp_anomalies > 3:
        recommendations.append(
            "🌡️ Frequent temperature anomalies. Verify HVAC system operation."
        )
    
    humidity_anomalies = sum(1 for a in anomalies if "humidity" in a.get("type", ""))
    if humidity_anomalies > 3:
        recommendations.append(
            "💧 Humidity irregularities detected. Check dehumidifier settings."
        )
    
    if summary.total_anomalies == 0:
        recommendations.append(
            "✅ All systems operating within normal parameters."
        )
    
    return recommendations
```

### 3.4 API Endpoint Summary Table

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/v1/health` | Health check | `{ status: "healthy" }` |
| `GET` | `/api/v1/sensors/timeseries/{id}` | Time series data | `TimeSeriesResponse` |
| `GET` | `/api/v1/sensors/current/{id}` | Current status | `StorageBoxStatus` |
| `GET` | `/api/v1/sensors/dashboard/overview` | Dashboard data | `DashboardOverview` |
| `GET` | `/api/v1/sensors/realtime/{id}` | Real-time reading | Single reading |
| `GET` | `/api/v1/predictions/anomalies/{id}` | Anomaly detection | `AnomalyResponse` |
| `GET` | `/api/v1/predictions/forecast/{id}` | Forecasting | Forecast data |
| `POST` | `/api/v1/predictions/train` | Trigger training | Training status |
| `GET` | `/api/v1/predictions/model-status` | Model status | Model info |

---

## 🔗 Section 4: Frontend Integration

### 4.1 API Client for Next.js

```typescript
// src/lib/api-client.ts
/**
 * API Client for Dam Dashboard Backend
 * 
 * Provides typed methods for interacting with the Python backend.
 * Uses SWR for caching and revalidation.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types matching Python schemas
export interface ChartDataPoint {
  time: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  temp_predicted?: number;
  humidity_predicted?: number;
  is_anomaly: boolean;
  anomaly_score?: number;
}

export interface TimeSeriesResponse {
  storage_box_id: number;
  data: ChartDataPoint[];
  metadata: {
    total_points: number;
    time_range: string;
    aggregation_interval: string;
    anomaly_count: number;
    avg_temperature: number;
    avg_humidity: number;
    max_temperature: number;
    min_temperature: number;
  };
  colors: {
    temperature: string;
    humidity: string;
    predicted: string;
    anomaly: string;
    grid: string;
    background: string;
  };
}

export interface AnomalyDetail {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  affected_metric: string;
  actual_value: number;
  expected_range: [number, number];
  description: string;
}

export interface AnomalyResponse {
  storage_box_id: number;
  anomalies: AnomalyDetail[];
  summary: {
    total_anomalies: number;
    critical_count: number;
    high_count: number;
    medium_count: number;
    low_count: number;
    most_affected_sensor: string;
    detection_accuracy: number;
  };
  recommendations: string[];
}

// API Functions
export async function fetchTimeSeries(
  storageBoxId: number,
  timeRange: string = '24h',
  interval: string = '1h'
): Promise<TimeSeriesResponse> {
  const params = new URLSearchParams({
    time_range: timeRange,
    interval: interval,
    include_anomalies: 'true'
  });
  
  const response = await fetch(
    `${API_BASE_URL}/api/v1/sensors/timeseries/${storageBoxId}?${params}`
  );
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchAnomalies(
  storageBoxId: number,
  lookbackHours: number = 24
): Promise<AnomalyResponse> {
  const params = new URLSearchParams({
    lookback_hours: lookbackHours.toString(),
    sensitivity: '0.95'
  });
  
  const response = await fetch(
    `${API_BASE_URL}/api/v1/predictions/anomalies/${storageBoxId}?${params}`
  );
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchDashboardOverview() {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/sensors/dashboard/overview`
  );
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}
```

### 4.2 Updated TimeSeriesChart Component

```tsx
// src/components/TimeSeriesChart.tsx (Updated with API integration)
'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { fetchTimeSeries, TimeSeriesResponse, ChartDataPoint } from '@/lib/api-client';

interface TimeSeriesChartProps {
  storageBoxId?: number;
  timeRange?: string;
}

export default function TimeSeriesChart({ 
  storageBoxId = 2,
  timeRange = '24h' 
}: TimeSeriesChartProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  
  // Fetch data from API
  const { data, error, isLoading } = useSWR<TimeSeriesResponse>(
    [`/api/timeseries`, storageBoxId, timeRange],
    () => fetchTimeSeries(storageBoxId, timeRange),
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: false
    }
  );

  // Fallback to static data if API unavailable
  const chartData = data?.data || staticMonthlyData;
  const colors = data?.colors || defaultColors;
  
  // ... rest of the component remains the same
  // Use colors.temperature, colors.humidity from API response
  
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-teal-600 tracking-tight">
          Time Series Chart
        </h2>
        
        {/* Anomaly indicator */}
        {data?.metadata && data.metadata.anomaly_count > 0 && (
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
            {data.metadata.anomaly_count} anomalies detected
          </span>
        )}
      </div>
      
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" />
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center py-8">
          Failed to load data. Using offline mode.
        </div>
      )}
      
      {/* Chart SVG - Use chartData and highlight anomalies */}
      <div className="overflow-x-auto -mx-2 px-2">
        <svg width={700} height={280} className="min-w-[600px]">
          {/* ... existing SVG code ... */}
          
          {/* Highlight anomaly points */}
          {chartData.map((point, i) => (
            point.is_anomaly && (
              <circle
                key={`anomaly-${i}`}
                cx={getX(i)}
                cy={getY(point.temperature)}
                r={8}
                fill="none"
                stroke={colors.anomaly}
                strokeWidth={2}
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            )
          ))}
        </svg>
      </div>
      
      {/* Statistics from API */}
      {data?.metadata && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
          <div className="text-center">
            <div className="text-gray-500">Avg Temp</div>
            <div className="font-bold text-gray-800">{data.metadata.avg_temperature}°C</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Avg Humidity</div>
            <div className="font-bold text-gray-800">{data.metadata.avg_humidity}%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Max Temp</div>
            <div className="font-bold text-red-500">{data.metadata.max_temperature}°C</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500">Min Temp</div>
            <div className="font-bold text-blue-500">{data.metadata.min_temperature}°C</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Static fallback data
const staticMonthlyData = [
  { time: 'Jan', temperature: 25, humidity: 60, is_anomaly: false },
  // ... more static data
];

const defaultColors = {
  temperature: '#ff3b30',
  humidity: '#00b4b4',
  predicted: '#007aff',
  anomaly: '#ff9500',
  grid: '#e5e7eb',
  background: '#ffffff'
};
```

---

## 🚀 Section 5: Deployment Guide

### 5.1 Requirements

```txt
# requirements.txt
# Core Framework
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.2
pydantic-settings==2.1.0

# Data Processing
pandas==2.1.3
numpy==1.26.2

# Machine Learning
scikit-learn==1.3.2
torch==2.1.1
joblib==1.3.2

# Database (optional)
sqlalchemy==2.0.23
asyncpg==0.29.0
redis==5.0.1

# Development
python-dotenv==1.0.0
httpx==0.25.2

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
```

### 5.2 Docker Configuration

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/

# Environment variables
ENV PYTHONPATH=/app
ENV HOST=0.0.0.0
ENV PORT=8000

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEBUG=false
      - DATABASE_URL=postgresql://user:pass@db:5432/dam_db
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
    volumes:
      - ./models:/app/models

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: dam_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 5.3 Running Locally

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# API will be available at http://localhost:8000
# Docs at http://localhost:8000/docs
```

---

## 📚 References

1. **Isolation Forest**: Liu, F.T., Ting, K.M. and Zhou, Z.H., 2008. Isolation forest.
2. **LSTM Autoencoders**: Malhotra, P. et al., 2016. LSTM-based Encoder-Decoder for Multi-sensor Anomaly Detection.
3. **FastAPI Documentation**: https://fastapi.tiangolo.com/
4. **Apple Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/

---

<p align="center">
  <strong>Dam Dashboard - Intelligent Analytics Backend</strong><br>
  Built with ❤️ using Python, FastAPI, and Machine Learning
</p>
