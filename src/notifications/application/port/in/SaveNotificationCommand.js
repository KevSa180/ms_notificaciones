class SaveNotificationCommand {
  constructor({ messageId, chatId, senderId, receiverId, content, sentAt }) {
    this.messageId = messageId;
    this.chatId = chatId;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.content = content;
    this.sentAt = sentAt;
    this.receivedAt = new Date();
  }
}

module.exports = SaveNotificationCommand;
