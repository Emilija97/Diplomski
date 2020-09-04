const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');

const router = Router();
// Report Model
const { Report } = require('models');

// @route   GET reports
// @desc    Get All Reports
// @access  Public
router.get("/year/:year", async (req, res, next) => {
    try {
        console.log("Usao sam u report");
        const { year } = req.params;

        const reports = await Report.find({ year }).lean().exec();

        return res.status(200).json(reports);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;