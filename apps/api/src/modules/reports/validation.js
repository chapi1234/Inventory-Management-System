const { body } = require('express-validator');

const createValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').notEmpty().withMessage('Type is required')
];

module.exports = { createValidation };