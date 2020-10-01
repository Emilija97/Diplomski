const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');

const router = Router();
// Report Model
const { Report } = require('models');
const { ObjectId } = require("mongodb");

const createMappingObject = (object) => {
    return { ...object, id: object._id }
}

router.get("/", async (req, res, next) => {
    try {
        const query = req.query;

        if (query) {
            const reports = await Report.find(query).lean().exec();
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

router.get("/reports", async (req, res, next) => {
    try {
        const query = req.query;

        if (query) {
            const reports = await Report.find(query).lean().exec();
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

router.post("/", async (req, res) => {
    try {
        const { ...attributes } = req.body;

        const report = new Report({
            ...attributes
        });

        await report.save();

        res.status(200).json(report);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...update } = req.body;

        const _id = ObjectId(id);
        const updatedReport = await Report.findByIdAndUpdate(_id, {
            $set: {
                ...update,
            }
        }, { new: true, useFindAndModify: false });

        if (!updatedReport) {
            return res.status(400).send({ message: responses(400) });
        }

        return res.status(200).send({ data: updatedReport });
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;