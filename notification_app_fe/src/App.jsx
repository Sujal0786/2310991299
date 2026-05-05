import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NotificationCard from "./components/NotificationCard";

const API_URL = "http://localhost:5000/api/notifications";
const STUDENT_ID = 1042;

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("Placement");
  const [message, setMessage] = useState("");

  const fetchNotifications = async () => {
    const response = await fetch(API_URL, {
      headers: {
        "x-student-id": STUDENT_ID
      }
    });
    const data = await response.json();
    setNotifications(data.notifications || []);
  };

  const createNotification = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        studentId: STUDENT_ID,
        type,
        message
      })
    });

    setMessage("");
  };

  const markRead = async (id) => {
    await fetch(`${API_URL}/${id}/read`, {
      method: "PATCH",
      headers: {
        "x-student-id": STUDENT_ID
      }
    });

    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();

    const socket = io("http://localhost:5000", {
      query: { studentId: STUDENT_ID }
    });

    socket.on("notification:new", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Notification Center</h1>
          <p>Real-time student notification dashboard</p>
        </div>
        <div className="badge">{unreadCount} unread</div>
      </section>

      <form className="form" onSubmit={createNotification}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Placement</option>
          <option>Result</option>
          <option>Event</option>
        </select>

        <input
          placeholder="Enter notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>

      <section className="list">
        {notifications.length === 0 ? (
          <p className="empty">No notifications yet.</p>
        ) : (
          notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onMarkRead={markRead}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;
