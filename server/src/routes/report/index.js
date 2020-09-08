const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
// ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');

const router = Router();
// Report Model
const { Report } = require('models');
const { ObjectId } = require("mongodb");

const createMappingObject = (object) => {
    return { ...object, id: object._id }
}

// @route   GET reports
// @desc    Get All Reports
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        const year = req.query.year;
        console.log(" 22.;inija " + " " + year);
        const id = req.query.personId;
        const personId = ObjectId(`${id}`);
        if (year && personId) {
            const reports = await Report.find({ personId, year }).lean().exec();
            const result = reports.map(report => createMappingObject(report));
            result.forEach(report => delete report._id);
            return res.status(200).json(result);
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