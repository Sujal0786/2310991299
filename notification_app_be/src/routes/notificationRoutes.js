const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const notificationController = require("../controllers/notificationController");

router.get("/", auth, notificationController.getNotifications);
router.get("/unread-count", auth, notificationController.unreadCount);
router.post("/", notificationController.createNotification);
router.patch("/:id/read", auth, notificationController.markAsRead);
router.patch("/read-all", auth, notificationController.markAllAsRead);
router.delete("/:id", auth, notificationController.deleteNotification);

module.exports = router;
