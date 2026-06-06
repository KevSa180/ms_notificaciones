class SocketManager {
  constructor() {
    /** @type {Map<string, string>} userId → socketId */
    this.userSockets = new Map();
    this.io = null;
  }

  /** @param {import('socket.io').Server} io */
  attach(io) {
    this.io = io;

    io.on('connection', (socket) => {
      const userId = socket.handshake.query.userId;
      if (userId) {
        this.userSockets.set(userId, socket.id);
        console.log(`[WS] user ${userId} connected (socket ${socket.id})`);
      }

      socket.on('disconnect', () => {
        if (userId) {
          this.userSockets.delete(userId);
          console.log(`[WS] user ${userId} disconnected`);
        }
      });
    });
  }

  sendToUser(userId, event, payload) {
    if (!this.io) return;
    const socketId = this.userSockets.get(userId);
    if (socketId) {
      this.io.to(socketId).emit(event, payload);
    }
  }
}

module.exports = new SocketManager();
