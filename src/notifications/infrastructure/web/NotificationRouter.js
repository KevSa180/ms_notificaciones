const { Router } = require('express');
const SaveNotificationCommand = require('../../application/port/in/SaveNotificationCommand');
const MarkAsReadCommand       = require('../../application/port/in/MarkAsReadCommand');

/**
 * @param {import('../../application/service/NotificationService')} service
 */
function createNotificationRouter(service) {
  const router = Router();

  // APIM fire-and-forget — llega cuando ms_mensajes guarda un mensaje nuevo
  router.post('/api/notify', async (req, res) => {
    const { type, data } = req.body;

    if (type !== 'new-message' || !data) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const command = new SaveNotificationCommand({
      messageId:  data.messageId,
      chatId:     data.chatId,
      senderId:   data.senderId,
      receiverId: data.receiverId,
      content:    data.content,
      sentAt:     data.sentAt,
    });

    try {
      await service.handleNewMessage(command);
      res.status(202).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Obtener todas las notificaciones de un usuario
  router.get('/notifications/:userId', async (req, res) => {
    try {
      const notifications = await service.getByUser(req.params.userId);
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Marcar notificación como leída
  router.patch('/notifications/:id/read', async (req, res) => {
    try {
      const command      = new MarkAsReadCommand({ notificationId: req.params.id });
      const notification = await service.markAsRead(command);
      res.json(notification);
    } catch (err) {
      const status = err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ error: err.message });
    }
  });

  return router;
}

module.exports = { createNotificationRouter };
