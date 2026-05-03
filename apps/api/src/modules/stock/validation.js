const { body } = require('express-validator');

const createValidation = [
  body('productId').notEmpty().withMessage('Product ID is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity cannot be negative'),
  body('minQuantity').isInt({ min: 0 }).withMessage('Min quantity cannot be negative')
];

module.exports = { createValidation };