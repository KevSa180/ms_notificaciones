/**
 * Puerto de salida — contrato que debe implementar el adaptador de persistencia.
 */
class NotificationRepository {
  /** @param {import('../../port/in/SaveNotificationCommand')} command @returns {Promise<import('../../../domain/model/Notification')>} */
  async save(command) { throw new Error('Not implemented'); }

  /** @param {string} notificationId @returns {Promise<import('../../../domain/model/Notification')>} */
  async markAsRead(notificationId) { throw new Error('Not implemented'); }

  /** @param {string} userId @returns {Promise<import('../../../domain/model/Notification')[]>} */
  async findByReceiverId(userId) { throw new Error('Not implemented'); }
}

module.exports = NotificationRepository;
