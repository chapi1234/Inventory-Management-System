const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitCost: { type: Number, required: true, min: 0 },
  subtotal: { type: Number, required: true, min: 0 }
});

const schema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  items: [purchaseItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ['draft', 'ordered', 'received', 'cancelled'], 
    default: 'draft' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', schema);