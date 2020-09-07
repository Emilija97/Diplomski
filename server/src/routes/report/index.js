const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const { ObjectId } = require('mongodb');

const router = Router();
// Report Model
const { Report } = require('models');

const createMappingObject = (object) => {
    return { ...object, id: object._id }
}

// @route   GET reports
// @desc    Get All Reports
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        const query = req.query;

        const id = req.query.personId.toString();
        const personId = ObjectId(`${id}`);
        const year = req.query.year;
        if (query) {
            const reports = await Report.find({ personId: personId, year: year }).lean().exec();
            const result = reports.map(report => createMappingObject(report));
            result.forEach(report => delete report._id);
            return res.status(200).send(result);
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