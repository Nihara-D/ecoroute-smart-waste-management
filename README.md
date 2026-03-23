# EcoRoute - Smart Waste Management System
## IT4020 - Modern Topics in IT | SLIIT | 2026

A microservices-based smart waste management system built with Node.js, Express, and Swagger.

---

## 🏗️ Architecture Overview

```
                        ┌─────────────────────┐
                        │     API Gateway      │
                        │   (Port: 3000)       │
                        └─────────┬───────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
     ┌────────▼───────┐  ┌────────▼───────┐  ┌───────▼────────┐  ┌────────────────┐
     │  Bin Service   │  │Dispatch Service│  │Citizen Service │  │ E-Waste Service│
     │  (Port: 3001)  │  │  (Port: 3002)  │  │  (Port: 3003)  │  │  (Port: 3004)  │
     └────────────────┘  └────────────────┘  └────────────────┘  └────────────────┘
```

## 📦 Microservices

| Service | Port | Member | Responsibility |
|---------|------|--------|----------------|
| Smart Bin Management | 3001 | Member 1 | Bin registration, real-time fill-level tracking |
| Logistics & Dispatch | 3002 | Member 2 | Fleet management & route optimization |
| Citizen Engagement & Rewards | 3003 | Member 3 | Citizen profiles & Eco-Points system |
| E-Waste Tracker | 3004 | Member 4 | Hazardous/electronic waste lifecycle tracking |
| API Gateway | 3000 | All Members | Unified entry point, routing |

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Running the Services

Start each service in a separate terminal:

```bash
# Terminal 1 - Bin Service
npm run dev:bin

# Terminal 2 - Dispatch Service
npm run dev:dispatch

# Terminal 3 - Citizen Service
npm run dev:citizen

# Terminal 4 - E-Waste Service
npm run dev:ewaste

# Terminal 5 - API Gateway
npm run dev:gateway
```

## 📖 Swagger Documentation

| Service | Native Swagger URL | Via Gateway |
|---------|-------------------|-------------|
| Bin Service | http://localhost:3001/api-docs | http://localhost:3000/bin/api-docs |
| Dispatch Service | http://localhost:3002/api-docs | http://localhost:3000/dispatch/api-docs |
| Citizen Service | http://localhost:3003/api-docs | http://localhost:3000/citizen/api-docs |
| E-Waste Service | http://localhost:3004/api-docs | http://localhost:3000/ewaste/api-docs |

## 🔗 API Endpoints Summary

### Via API Gateway (http://localhost:3000)

**Bin Service**
- `GET  /api/bins/bins`
- `POST /api/bins/bins`
- `POST /api/bins/bins/:id/update-level`
- `GET  /api/bins/bins/status/full`

**Dispatch Service**
- `GET  /api/dispatch/tasks/active`
- `POST /api/dispatch/dispatch/assign`
- `PUT  /api/dispatch/tasks/:id/complete`
- `GET  /api/dispatch/trucks`

**Citizen Service**
- `GET  /api/citizen/profile/:id`
- `POST /api/citizen/citizens`
- `POST /api/citizen/points/add`
- `POST /api/citizen/rewards/redeem`
- `GET  /api/citizen/rewards/catalog`

**E-Waste Service**
- `POST /api/ewaste/ewaste/log`
- `GET  /api/ewaste/ewaste/centers`
- `GET  /api/ewaste/ewaste/reports`
- `GET  /api/ewaste/ewaste/audit-log`
