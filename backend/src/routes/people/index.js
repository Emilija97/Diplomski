const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
var mongoose = require("mongoose");

const router = Router();
// People Model
const { People } = require('models');

// @route   GET people
// @desc    Get All People
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        console.log("Usao sam");
        const people = await People.find().lean().exec();

        return res.status(200).json(people);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});
// router.get("/", (req, res, next) => {
//     console.log("Usao sam");
//     People.find()
//         .then(doc => {
//             const data = doc;
//             res.status(200).json(data);
//         })
//         .catch(err => console.log(err));
// });

// @route   GET people
// @desc    Get All People
// @access  Public
router.get("/:id", (req, res, next) => {
    console.log("Usao sam");
    const id = req.params.id;
    People.findOne({ id })
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});


module.exports = router;