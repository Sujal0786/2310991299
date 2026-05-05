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

## � How to Get Access Token (Required for Logging API)

To use logging middleware, you must generate an **access token** from AffordMed test server.

### Step 1: Register Yourself

Make a **POST request** to:

```http
POST http://20.207.122.201/evaluation-service/register
```

#### Request Body:

```json
{
  "email": "your_college_email",
  "name": "Your Full Name",
  "mobileNo": "your_mobile_number",
  "githubUsername": "your_github_username",
  "rollNo": "your_roll_number",
  "accessCode": "access_code_from_email"
}
```

**Important:**
- Use your **college email**
- GitHub username should be **only username (not full URL)**

---

### Step 2: Generate Access Token

Make another **POST request** to:

```http
POST http://20.207.122.201/evaluation-service/auth
```

#### Request Body:

```json
{
  "email": "your_college_email",
  "name": "Your Full Name",
  "rollNo": "your_roll_number",
  "accessCode": "your_access_code",
  "clientID": "received_from_registration",
  "clientSecret": "received_from_registration"
}
```

---

### Step 3: Copy Access Token

Response will contain:

```json
{
  "token_type": "Bearer",
  "access_token": "your_access_token_here",
  "expires_in": 1777960758
}
```

---

### Step 4: Add Token to Environment Variables

#### Backend `.env`

```env
ACCESS_TOKEN=your_access_token_here
```

#### Frontend `.env`

```env
VITE_ACCESS_TOKEN=your_access_token_here
```

---

### ⚠️ Important Notes

- Do **NOT** push `.env` file to GitHub
- Keep token **secure**
- Token is required for **Logging API**
- If token expires, regenerate using Step 2

---

### 🧪 Test Logging API

```http
POST http://20.207.122.201/evaluation-service/logs
```

**Headers:**

```http
Authorization: Bearer your_access_token
Content-Type: application/json
```

**Body:**

```json
{
  "stack": "backend",
  "level": "info",
  "package": "controller",
  "message": "test log working"
}
```

---

### ✅ Expected Response

```json
{
  "logID": "xxxx",
  "message": "log created successfully"
}
```

---

## 📝 Logging Middleware Setup

After getting your access token, configure the application:

### Step 1: Configure Backend Environment

1. Navigate to `notification_app_be/`
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and add your access token:
   ```
   ACCESS_TOKEN=your_actual_access_token_here
   ```

### Step 2: Configure Frontend Environment

1. Navigate to `notification_app_fe/`
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and add your access token:
   ```
   VITE_ACCESS_TOKEN=your_actual_access_token_here
   ```

### Step 3: Install Dependencies & Run

**Backend:**
```bash
cd notification_app_be
npm install
npm run dev
```

**Frontend:**
```bash
cd notification_app_fe
npm install
npm run dev
```

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
- Invalid log values show console warnings but don't crash app
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
