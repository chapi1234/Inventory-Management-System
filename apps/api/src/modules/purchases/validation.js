const { body } = require('express-validator');

const createValidation = [
  body('supplierId').notEmpty().withMessage('Supplier ID is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required')
];

module.exports = { createValidation };