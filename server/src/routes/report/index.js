const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');

const router = Router();
// Report Model
const { Report } = require('models');

// @route   GET reports
// @desc    Get All Reports
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        const query = req.query;

        if (query) {
            const reports = await Report.find(query).lean().exec();
            return res.status(200).json(reports);
        }
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;