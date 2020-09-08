const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');

const router = Router();
// Activity Model
const { Activity } = require('models');
ObjectId = require("mongodb").ObjectID;

const createMappingObject = (object) => {
    return { ...object, id: object._id }
}

// @route   GET activities
// @desc    Get All Activities
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        console.log("Usao sam u report");
        const query = req.query;

        if (query) {
            const activities = await Activity.find(query).lean().exec();
            const result = activities.map(activity => createMappingObject(activity));
            result.forEach(activity => delete activity._id);
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

// @route   POST activities
// @desc    Post New Activity
// @access  Public
router.post("/", async (req, res) => {
    try {
        const { ...attributes } = req.body;

        const activity = new Activity({
            ...attributes
        });

        await activity.save();

        res.status(200).json(activity);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   DELETE activities/:id
// @desc    Delete An Activity using ID
// @access  Public
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const _id = ObjectId(id);
        const activity = await Activity.findOne({ _id }).lean().exec();


        if (!activity) {
            return res.status(404).send({ message: 'Activity not found' });
        }

        await Activity.deleteOne({ _id: id }).lean().exec();

        return res.status(200).json(activity);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   PUT activities/:id
// @desc    Update An Activity using ID
// @access  Public
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...update } = req.body;

        const _id = ObjectId(id);
        const updatedActivity = await Activity.findByIdAndUpdate(_id, {
            $set: {
                ...update,
            }
        }, { new: true, useFindAndModify: false });

        if (!updatedActivity) {
            return res.status(400).send({ message: responses(400) });
        }

        return res.status(200).send({ data: updatedActivity });
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;