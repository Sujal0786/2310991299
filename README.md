# Notification System (Full Stack)

## 🚀 Overview

Full-stack **Notification System** for students with real-time updates and centralized logging.

**Features:**
- Real-time notifications (Placement, Result, Event)
- Centralized logging to AffordMed evaluation service
- MongoDB with optimized indexes
- Socket.io for instant updates

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express, MongoDB, Socket.io, Axios  
**Frontend:** React, Vite, Socket.io Client

---

## 📝 Logging Middleware Setup

This project uses a centralized logging system that sends structured logs to the AffordMed evaluation service.

### Step 1: Get Your Access Token

Obtain your access token from the AffordMed evaluation service. This token is required to authenticate log requests.

### Step 2: Configure Backend Environment

1. Navigate to `notification_app_be/`
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and replace the placeholder:
   ```
   ACCESS_TOKEN=replace_with_your_access_token
   ```
   Paste your actual access token after `ACCESS_TOKEN=`

### Step 3: Configure Frontend Environment

1. Navigate to `notification_app_fe/`
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and replace the placeholder:
   ```
   VITE_ACCESS_TOKEN=replace_with_your_access_token
   ```
   Paste your actual access token after `VITE_ACCESS_TOKEN=`

### Step 4: Install Dependencies

**Backend:**
```bash
cd notification_app_be
npm install
```

**Frontend:**
```bash
cd notification_app_fe
npm install
```

### Step 5: Start the Application

**Backend (Terminal 1):**
```bash
cd notification_app_be
npm run dev
```
Server runs on http://localhost:5000

**Frontend (Terminal 2):**
```bash
cd notification_app_fe
npm run dev
```
UI runs on http://localhost:5173

### How Logging Works

The `Log(stack, level, package, message)` function is automatically called throughout the application:

- **Backend** uses `notification_app_be/src/utils/logger.js` with Axios
- **Frontend** uses `notification_app_fe/src/utils/logger.js` with Fetch

**Log Parameters:**
- `stack`: "backend" or "frontend"
- `level`: "debug", "info", "warn", "error", "fatal"
- `package`: Component type (controller, service, api, component, etc.)
- `message`: Log message

**Where Logs Are Sent:**
- API: `http://20.207.122.201/evaluation-service/logs`
- Method: POST
- Auth: Bearer token from your `.env` file

**Important Notes:**
- Never commit `.env` files to git
- Only `.env.example` should be in version control
- Invalid log values show console warnings but don't crash the app
- API failures are caught and logged locally

---

## 📂 Project Structure

```
notification_system/
├── notification_app_be/          # Backend
│   ├── src/
│   │   ├── config/              # Database connection
│   │   ├── controllers/         # Business logic
│   │   ├── middlewares/         # Logger, Auth
│   │   ├── models/              # Mongoose schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Core logic
│   │   ├── utils/               # Logger utility
│   │   └── server.js            # Entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
├── notification_app_fe/          # Frontend
│   ├── src/
│   │   ├── components/          # UI components
│   │   ├── utils/               # Logger utility
│   │   ├── App.jsx              # Main app
│   │   └── main.jsx             # Entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
├── notification_systemdesign.md  # System design
├── QA_AUDIT_REPORT.md           # QA audit findings
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| GET    | /api/notifications              | Get all notifications |
| POST   | /api/notifications              | Create notification   |
| PATCH  | /api/notifications/:id/read     | Mark as read          |
| DELETE | /api/notifications/:id          | Delete notification   |
| GET    | /api/notifications/unread-count | Get unread count      |

---

## 🔄 Real-Time Flow

1. User connects via Socket.io
2. Server assigns user to room `student_{studentId}`
3. New notification triggers `io.emit("notification:new")`
4. UI updates instantly without refresh

---

## 🔍 QA Audit Report

**Production Readiness Score: 7.5/10**

Comprehensive audit covering:
- Installation & dependencies ✅
- Environment configuration ✅
- API functionality ✅
- Database validation ✅
- Logging middleware ✅
- Real-time Socket.io ✅
- Frontend functionality ✅
- Performance optimization ✅
- Security checks ⚠️
- Code quality ✅

**Detailed findings:** See `QA_AUDIT_REPORT.md`

---

## 👨‍💻 Author

Sujal Arora
