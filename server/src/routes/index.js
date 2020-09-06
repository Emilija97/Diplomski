const { Router } = require('express');
const usersRouter = require('./user');
const reportsRouter = require('./report');
const activitiesRouter = require('./activity');

const router = Router();

router.use('/users', usersRouter);
router.use('/reports', reportsRouter);
router.use('/activities', activitiesRouter);

module.exports = router;