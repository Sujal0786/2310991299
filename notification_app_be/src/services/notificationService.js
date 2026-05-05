const Notification = require("../models/Notification");
const Log = require("../utils/logger");

const createNotification = async ({ studentId, type, message }) => {
  return Notification.create({ studentId, type, message });
};

const getNotifications = async ({ studentId, page = 1, limit = 20, type, isRead }) => {
  Log("backend", "debug", "service", "fetching notifications from database");
  const filter = { studentId };

  if (type) filter.type = type;
  if (isRead !== undefined) filter.isRead = isRead === "true" || isRead === true;

  const skip = (Number(page) - 1) * Number(limit);

  const notifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return notifications;
};

const markAsRead = async ({ studentId, notificationId }) => {
  Log("backend", "debug", "service", "marking notification as read");
  return Notification.findOneAndUpdate(
    { _id: notificationId, studentId },
    { isRead: true, readAt: new Date() },
    { new: true }
  );
};

const markAllAsRead = async ({ studentId }) => {
  return Notification.updateMany(
    { studentId, isRead: false },
    { isRead: true, readAt: new Date() }
  );
};

const deleteNotification = async ({ studentId, notificationId }) => {
  return Notification.findOneAndDelete({ _id: notificationId, studentId });
};

const unreadCount = async ({ studentId }) => {
  Log("backend", "debug", "service", "counting unread notifications");
  return Notification.countDocuments({ studentId, isRead: false });
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  unreadCount
};
