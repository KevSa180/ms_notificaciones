const NotificationRepository = require('../../../application/port/out/NotificationRepository');
const NotificationDocument   = require('./NotificationDocument');
const Notification           = require('../../../domain/model/Notification');

class NotificationMongoAdapter extends NotificationRepository {
  async save(command) {
    const doc = await NotificationDocument.create({
      messageId:  command.messageId,
      chatId:     command.chatId,
      senderId:   command.senderId,
      receiverId: command.receiverId,
      content:    command.content,
      sentAt:     command.sentAt,
      receivedAt: command.receivedAt,
    });
    return this.#toModel(doc);
  }

  async markAsRead(notificationId) {
    const doc = await NotificationDocument.findByIdAndUpdate(
      notificationId,
      { leida: true },
      { new: true }
    );
    if (!doc) throw new Error(`Notification ${notificationId} not found`);
    return this.#toModel(doc);
  }

  async findByReceiverId(userId) {
    const docs = await NotificationDocument.find({ receiverId: userId }).sort({ receivedAt: -1 });
    return docs.map(this.#toModel);
  }

  #toModel(doc) {
    return new Notification({
      id:         doc._id.toString(),
      messageId:  doc.messageId,
      chatId:     doc.chatId,
      senderId:   doc.senderId,
      receiverId: doc.receiverId,
      content:    doc.content,
      sentAt:     doc.sentAt,
      receivedAt: doc.receivedAt,
      leida:      doc.leida,
    });
  }
}

module.exports = NotificationMongoAdapter;
