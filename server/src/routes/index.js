const { Router } = require('express');
const usersRouter = require('./user');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;