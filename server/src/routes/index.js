const { Router } = require('express');
const usersRouter = require('./user');
const reportsRouter = require('./report');
const activitiesRouter = require('./activity');
const authRouter = require('./auth');
const requestRouter = require('./request');

const router = Router();

router.use('/users', usersRouter);
router.use('/reports', reportsRouter);
router.use('/activities', activitiesRouter);
router.use('/users/auth', authRouter);
router.use('/requests', requestRouter);

module.exports = router;