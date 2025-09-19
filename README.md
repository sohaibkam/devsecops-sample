# DevSecOps Sample Application

This repository contains a **Node.js/Express + MongoDB microservice** built to demonstrate **DevSecOps practices** for securing applications at build, deployment, and runtime stages.

---

## 📂 Project Structure
```
.
├── Dockerfile
├── app
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── note.controller.js
│   ├── middleware
│   │   ├── asyncHandler.js
│   │   └── errorHandler.js
│   ├── models
│   │   └── note.model.js
│   ├── routes
│   │   └── note.routes.js
│   ├── server.js
│   ├── services
│   │   └── note.service.js
│   └── utils
│       └── logger.js
├── ci-artifacts
│   ├── semgrep-report.json
│   ├── trivy-fs-report.json
│   └── trivy-image-report.json
├── docker-compose.yaml
├── inspect-app
│   ├── app
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── server.js
│   │   ├── services
│   │   └── utils
│   ├── package-lock.json
│   └── package.json
├── package-lock.json
├── package.json
├── trivy-fs-report.json
└── trivy-image-report.json
```

## Features

- **CRUD API for Notes**  
  - `POST /api/notes` → create a note  
  - `GET /api/notes` → list notes  
- **Health & Readiness endpoints**  
  - `/health` → liveness  
  - `/ready` → readiness (checks MongoDB connectivity)  
- **Security middleware**: [Helmet](https://github.com/helmetjs/helmet) for HTTP headers.  
- **Graceful shutdown** on `SIGTERM` and `SIGINT`.  
- **Retry with exponential backoff** for MongoDB connection.  

---

## Prerequisites
- Docker (>= 20.x)
- Docker Compose (v2 recommended)
- Git
- curl or HTTP client (for testing APIs)

##  Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sohaibkam/devsecops-sample.git
cd devsecops-sample
```
### 2. Environment variables

#### Create a .env file (or export them inline):
```
PORT=3000
MONGO_URI=mongodb://mongo:27017/notesdb
```
### 3. Local development with Docker Compose
```
docker-compose up --build
```

This will start:

app → Node.js service on port 3000
mongo → MongoDB service on port 27017

### 4. Test endpoints

#### Health
```
curl http://localhost:3000/health
```

#### Create a note
```
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"text":"hello from devsecops"}'
```

#### List notes
```
curl http://localhost:3000/api/notes
```

### 5. How to Run Security Scans Locally

## 🛠 Running Security Scans Locally
Run Trivy against the source code:
```bash
trivy fs .
```

Run Trivy against the built image:
```
docker build -t devsecops-sample:local .
trivy image devsecops-sample:local
```

Run Semgrep:
```
semgrep --config=p/ci .
```
