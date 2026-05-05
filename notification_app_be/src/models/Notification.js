const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ["Placement", "Result", "Event"],
      required: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    readAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

notificationSchema.index({ studentId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ studentId: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
