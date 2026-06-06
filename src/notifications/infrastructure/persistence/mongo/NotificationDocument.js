const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    messageId:  { type: String, required: true },
    chatId:     { type: String, required: true },
    senderId:   { type: String, required: true },
    receiverId: { type: String, required: true, index: true },
    content:    { type: String, required: true },
    sentAt:     { type: Date,   required: true },
    receivedAt: { type: Date,   required: true },
    leida:      { type: Boolean, default: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model('Notification', notificationSchema);
