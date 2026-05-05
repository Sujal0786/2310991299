const notificationService = require("../services/notificationService");

const createNotification = async (req, res) => {
  try {
    const { studentId, type, message } = req.body;

    if (!studentId || !type || !message) {
      return res.status(400).json({
        success: false,
        message: "studentId, type and message are required"
      });
    }

    const notification = await notificationService.createNotification({
      studentId,
      type,
      message
    });

    const io = req.app.get("io");
    io.to(`student_${studentId}`).emit("notification:new", notification);

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications({
      studentId: req.user.studentId,
      page: req.query.page,
      limit: req.query.limit,
      type: req.query.type,
      isRead: req.query.isRead
    });

    return res.status(200).json({
      success: true,
      notifications
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead({
      studentId: req.user.studentId,
      notificationId: req.params.id
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const result = await notificationService.markAllAsRead({
      studentId: req.user.studentId
    });

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const notification = await notificationService.deleteNotification({
      studentId: req.user.studentId,
      notificationId: req.params.id
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const unreadCount = async (req, res) => {
  try {
    const count = await notificationService.unreadCount({
      studentId: req.user.studentId
    });

    return res.status(200).json({
      success: true,
      unreadCount: count
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  unreadCount
};
