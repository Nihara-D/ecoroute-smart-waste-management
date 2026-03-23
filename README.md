<h1 align="center">🌿 EcoRoute</h1>
<h3 align="center">Smart Waste Management System</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
  <img src="https://img.shields.io/badge/SLIIT-003087?style=for-the-badge&logoColor=white"/>
</p>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=0066FF&center=true&vCenter=true&width=600&lines=ECOROUTE+INITIALIZING...;SMART+WASTE+MANAGEMENT+SYSTEM;MICROSERVICES+ARCHITECTURE+ACTIVE;API+GATEWAY+ON+PORT+3000;4+SERVICES+DEPLOYED;IT4020+%7C+SLIIT+%7C+2026" alt="Typing SVG" />

<p align="center">
  <a href="https://final-black-9zd7gnuc2q.edgeone.app">
    <img src="https://img.shields.io/badge/🌐 View Live Project Page-00873E?style=for-the-badge"/>
  </a>
  <a href="https://github.com/Nihara-D/ecoroute-smart-waste-management">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</p>

---

## 🏗️ Architecture

```
              ┌──────────────────────┐
              │     API Gateway      │
              │      Port 3000       │
              └──────────┬───────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │                │
   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
   │   Bin   │      │Dispatch │      │ Citizen │      │ E-Waste │
   │  :3001  │      │  :3002  │      │  :3003  │      │  :3004  │
   └─────────┘      └─────────┘      └─────────┘      └─────────┘
```

---

## 👥 Team Members

| # | Member | Service | Port |
|---|--------|---------|------|
| 1 | Sewwandi M.P.S.S.S. | 🗑️ Smart Bin Management | 3001 |
| 2 | Hansika J.A.J. | 🚛 Logistics & Dispatch | 3002 |
| 3 | Dayarathnne S.H.N.R. | 🏆 Citizen Engagement & Rewards | 3003 |
| 4 | Gunarathene A.A.D.T. | ☢️ Hazardous & E-Waste Tracker | 3004 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x

### Installation

```bash
cd bin-service && npm install && cd ..
cd dispatch-service && npm install && cd ..
cd citizen-service && npm install && cd ..
cd ewaste-service && npm install && cd ..
cd api-gateway && npm install && cd ..
```

### Run (5 separate terminals)

```bash
cd bin-service && npm start        # Terminal 1
cd dispatch-service && npm start   # Terminal 2
cd citizen-service && npm start    # Terminal 3
cd ewaste-service && npm start     # Terminal 4
cd api-gateway && npm start        # Terminal 5 — start last
```

> **Windows:** double-click `start-all.bat` to open all 5 terminals automatically

---

## 📖 Swagger Documentation

| Service | Direct URL | Via API Gateway |
|---------|-----------|-----------------|
| 🗑️ Bin | http://localhost:3001/api-docs | http://localhost:3000/bin/api-docs |
| 🚛 Dispatch | http://localhost:3002/api-docs | http://localhost:3000/dispatch/api-docs |
| 🏆 Citizen | http://localhost:3003/api-docs | http://localhost:3000/citizen/api-docs |
| ☢️ E-Waste | http://localhost:3004/api-docs | http://localhost:3000/ewaste/api-docs |
| ⚡ Gateway | http://localhost:3000/api-docs | — |

---

## 🔗 API Endpoints

### 🗑️ Smart Bin Management — `/api/bins`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/bins` | Get all bins |
| `POST` | `/bins` | Register a new bin |
| `POST` | `/bins/:id/update-level` | Update fill level (triggers alert at 80%) |
| `GET` | `/bins/status/full` | Get all full bins |
| `GET` | `/bins/notifications/all` | Get threshold notifications |
| `DELETE` | `/bins/:id` | Decommission a bin |

### 🚛 Logistics & Dispatch — `/api/dispatch`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks/active` | Get active collection tasks |
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/dispatch/assign` | Assign task to nearest truck |
| `PUT` | `/tasks/:id/complete` | Mark task as completed |
| `GET` | `/trucks` | Get all trucks |
| `GET` | `/trucks/fleet-status` | Get fleet availability summary |

### 🏆 Citizen Engagement & Rewards — `/api/citizen`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/citizens` | Get all citizens |
| `POST` | `/citizens` | Register new citizen |
| `GET` | `/profile/:id` | Get citizen profile |
| `PUT` | `/citizens/:id` | Update citizen profile |
| `DELETE` | `/citizens/:id` | Remove citizen |
| `POST` | `/points/add` | Add Eco-Points for recycling |
| `POST` | `/rewards/redeem` | Redeem points for reward |
| `GET` | `/rewards/catalog` | Get rewards catalog |

### ☢️ Hazardous & E-Waste Tracker — `/api/ewaste`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ewaste/log` | Log new e-waste item |
| `GET` | `/ewaste` | Get all e-waste logs |
| `GET` | `/ewaste/centers` | Get processing centers |
| `GET` | `/ewaste/reports` | Get compliance report |
| `GET` | `/ewaste/audit-log` | Get full audit trail |
| `PUT` | `/ewaste/:id/status` | Update item status |

---

## ⚡ API Gateway Routing

| Gateway Prefix | Routes To | Port |
|----------------|-----------|------|
| `/api/bins/*` | Bin Service | 3001 |
| `/api/dispatch/*` | Dispatch Service | 3002 |
| `/api/citizen/*` | Citizen Service | 3003 |
| `/api/ewaste/*` | E-Waste Service | 3004 |

**Health Check:** http://localhost:3000/health  
**Service Registry:** http://localhost:3000/services

---

## 📁 Project Structure

```
ecoroute/
├── api-gateway/
│   └── src/index.js
├── bin-service/
│   └── src/{index, routes, controllers, models}
├── dispatch-service/
│   └── src/{index, routes, controllers, models}
├── citizen-service/
│   └── src/{index, routes, controllers, models}
├── ewaste-service/
│   └── src/{index, routes, controllers, models}
├── README.md
├── index.html          ← Animated live project page
├── start-all.bat       ← Windows launcher
└── start-all.sh        ← Mac/Linux launcher
```

---

<p align="center">
  <i>EcoRoute · IT4020 Assignment 2 · SLIIT · Year 4 Semester 1/2 · 2026</i>
</p>
