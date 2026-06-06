require('dotenv').config();

const http    = require('http');
const express = require('express');
const { Server } = require('socket.io');

const { connectMongo } = require('./config/db');

const NotificationMongoAdapter  = require('./notifications/infrastructure/persistence/mongo/NotificationMongoAdapter');
const socketManager             = require('./notifications/infrastructure/ws/SocketManager');
const NotificationService       = require('./notifications/application/service/NotificationService');
const { createNotificationRouter } = require('./notifications/infrastructure/web/NotificationRouter');

async function bootstrap() {
  await connectMongo();

  const app    = express();
  const server = http.createServer(app);
  const io     = new Server(server, { cors: { origin: '*' } });

  app.use(express.json());

  const repository = new NotificationMongoAdapter();
  socketManager.attach(io);
  const service = new NotificationService(repository, socketManager);

  app.use(createNotificationRouter(service));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`[Server] Listening on port ${PORT}`));
}

bootstrap().catch((err) => {
  console.error('[Bootstrap] Fatal error:', err);
  process.exit(1);
});
