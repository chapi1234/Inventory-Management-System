const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  costPrice: { type: Number, min: 0 },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Product', schema);