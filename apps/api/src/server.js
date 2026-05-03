require('dotenv').config();
const { connectDB } = require('./config/database');
const { validateEnv } = require('./config/env');
const { httpServer } = require('./app');

// Validate environment variables first
validateEnv();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`🚀 IMS API running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

// ── Graceful Shutdown ──────────────────────────────────────────────────────────
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  httpServer.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

start();
