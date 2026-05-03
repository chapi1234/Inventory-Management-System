const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['sales', 'inventory', 'purchases'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Report', schema);