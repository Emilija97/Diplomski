const { Router } = require('express');
const peopleRouter = require('./people');

const router = Router();

router.use('/people', peopleRouter);

module.exports = router;