const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { createValidation } = require('./validation');

// Specific endpoints
router.patch('/:id/status', controller.updateStatus);


// Standard CRUD endpoints
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', createValidation, validate, controller.create);
router.put('/:id', controller.update); // Ideally add updateValidation here
router.delete('/:id', controller.remove);

module.exports = router;
