const { Server } = require('socket.io');

let io;

function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // Join user-specific room for targeted notifications
    socket.on('join', ({ userId }) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`👤 User ${userId} joined room user:${userId}`);
      }
    });

    // Join company-wide room for announcements
    socket.on('join-company', ({ companyId }) => {
      if (companyId) {
        socket.join(`company:${companyId}`);
      }
    });

    // Real-time events clients can subscribe to:
    // 'notification'     — new notification for user
    // 'leave-request'    — new leave request (for HR)
    // 'leave-approved'   — leave approved (for employee)
    // 'leave-rejected'   — leave rejected (for employee)
    // 'task-assigned'    — new task assigned
    // 'task-updated'     — task status changed
    // 'announcement'     — company-wide announcement

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

/**
 * Broadcast an announcement to all users in a company
 */
function broadcastAnnouncement(companyId, data) {
  if (io) io.to(`company:${companyId}`).emit('announcement', data);
}

/**
 * Send notification to a specific user
 */
function sendToUser(userId, event, data) {
  if (io) io.to(`user:${userId}`).emit(event, data);
}

module.exports = { initSocket, getIO, broadcastAnnouncement, sendToUser };
