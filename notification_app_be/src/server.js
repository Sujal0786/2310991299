require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");
const Log = require("./utils/logger");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

app.set("io", io);

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Notification backend is running"
  });
});

app.use("/api/notifications", notificationRoutes);

io.on("connection", (socket) => {
  const studentId = socket.handshake.query.studentId || "1042";
  socket.join(`student_${studentId}`);

  console.log(`Socket connected: ${socket.id}, room: student_${studentId}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

Log("backend", "info", "config", "server startup initiated");

connectDB().then(() => {
  Log("backend", "info", "db", "database connected successfully");
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  Log("backend", "fatal", "db", `database connection failed: ${error.message}`);
});
