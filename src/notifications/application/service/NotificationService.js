const Notification = require('../../domain/model/Notification');

class NotificationService {
  /**
   * @param {import('../port/out/NotificationRepository')} repository
   * @param {import('../../infrastructure/ws/SocketManager')} socketManager
   */
  constructor(repository, socketManager) {
    this.repository = repository;
    this.socketManager = socketManager;
  }

  async handleNewMessage(command) {
    const notification = await this.repository.save(command);
    this.socketManager.sendToUser(notification.receiverId, 'new_notification', notification);
    return notification;
  }

  async markAsRead(command) {
    return this.repository.markAsRead(command.notificationId);
  }

  async getByUser(userId) {
    return this.repository.findByReceiverId(userId);
  }
}

module.exports = NotificationService;
