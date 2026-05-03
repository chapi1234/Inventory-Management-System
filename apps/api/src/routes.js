const express = require('express');
const router = express.Router();

// The IMS modules will be wired here
router.use('/auth',          require('./modules/auth/routes'));
router.use('/products',      require('./modules/products/routes'));
router.use('/stock',         require('./modules/stock/routes'));
router.use('/purchases',     require('./modules/purchases/routes'));
router.use('/sales',         require('./modules/sales/routes'));
router.use('/suppliers',     require('./modules/suppliers/routes'));
router.use('/reports',       require('./modules/reports/routes'));
router.use('/users',         require('./modules/users/routes'));

module.exports = router;
