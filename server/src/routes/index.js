const { Router } = require('express');
const usersRouter = require('./user');
const reportsRouter = require('./report');

const router = Router();

router.use('/users', usersRouter);
router.use('/reports', reportsRouter);

module.exports = router;