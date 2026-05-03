const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createServer } = require('http');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const { initSocket } = require('./socket');

const app = express();
const httpServer = createServer(app);

// ── Security & Parsing Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api', routes);

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use(errorHandler);

// ── Socket.io ─────────────────────────────────────────────────────────────────
initSocket(httpServer);

module.exports = { app, httpServer };
