# 📢 Notification System (Full Stack)

## 🚀 Overview

This project is a full-stack **Notification System** designed to handle real-time and persistent notifications for students.

It supports:

* Placement updates
* Result announcements
* Event notifications

The system is built with a focus on **scalability, real-time communication, and clean architecture**.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io

### Frontend

* React.js
* Vite
* Socket.io Client

---

## 📂 Project Structure

notification_system/
├── notification_app_be/ # Backend
├── notification_app_fe/ # Frontend
├── notification_systemdesign.md # System Design
├── .gitignore

---

## ⚙️ Features

### Backend

* Create notification
* Fetch notifications
* Mark as read
* Delete notification
* Unread count
* Logging middleware
* Real-time notifications (Socket.io)

### Frontend

* Notification dashboard
* Real-time updates
* Unread badge count
* Mark as read UI

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

* User connects via Socket.io
* Server assigns user to a room
* New notification triggers:
  → `io.emit("notification:new")`
* UI updates instantly without refresh

---

## 🧠 Design Highlights

* Layered architecture (Routes → Controller → Service → Model)
* Logging middleware for request tracking
* Indexed queries for performance
* Pagination for scalability
* Queue-based design for bulk notifications

---

## ▶️ How to Run

### Backend

```bash
cd notification_app_be
npm install
npm run dev
```

### Frontend

```bash
cd notification_app_fe
npm install
npm run dev
```

---

## 📊 System Design

Refer to:
📄 `notification_systemdesign.md`

Includes:

* API Design
* Database Design
* Query Optimization
* Scaling Strategy
* Bulk Notification System

---

## 👨‍💻 Author

Sujal Arora
