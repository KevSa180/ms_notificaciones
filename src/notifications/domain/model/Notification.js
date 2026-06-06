class Notification {
  constructor({ id, messageId, chatId, senderId, receiverId, content, sentAt, receivedAt, leida = false }) {
    this.id = id;
    this.messageId = messageId;
    this.chatId = chatId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.sentAt = sentAt;
    this.receivedAt = receivedAt;
    this.leida = leida;
  }
}

module.exports = Notification;
