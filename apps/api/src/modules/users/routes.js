const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { createValidation } = require('./validation');
const authenticate = require('../../middleware/authenticate');
const { authorize } = require('../../middleware/authorize');

// Specific endpoints
router.get('/profile', authenticate, controller.getProfile);
router.put('/profile', authenticate, controller.updateProfile);
router.patch('/:id/role', authenticate, authorize('admin'), controller.updateRole);
router.patch('/:id/status', authenticate, authorize('admin'), controller.updateStatus);

// Standard CRUD endpoints
router.get('/', authenticate, authorize('admin', 'manager'), controller.list);
router.get('/:id', authenticate, authorize('admin', 'manager'), controller.getById);
router.post('/', authenticate, authorize('admin'), createValidation, validate, controller.create);
router.put('/:id', authenticate, authorize('admin'), controller.update); 
router.delete('/:id', authenticate, authorize('admin'), controller.remove);

module.exports = router;
