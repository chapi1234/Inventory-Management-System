const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validate = require('../../middleware/validate');
const { loginValidation } = require('./validation');

router.post('/login', loginValidation, validate, controller.login);

module.exports = router;
