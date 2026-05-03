const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: String, required: true, default: 'Main Warehouse' },
  quantity: { type: Number, required: true, default: 0 },
  minQuantity: { type: Number, required: true, default: 10 }
}, { timestamps: true });

schema.virtual('status').get(function() {
  if (this.quantity <= 0) return 'out_of_stock';
  if (this.quantity <= this.minQuantity) return 'low_stock';
  return 'in_stock';
});

schema.set('toJSON', { virtuals: true });
schema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Stock', schema);