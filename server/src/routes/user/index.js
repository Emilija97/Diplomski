const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
var mongoose = require("mongoose");

const router = Router();
// User Model
const { User } = require('models');

// @route   GET User
// @desc    Get All User
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        console.log("Usao sam");
        const users = await User.find().lean().exec();

        return res.status(200).json(users);
    }
    catch (e) {
        logger.error(e);
        // return res.status(500).send({
        //     message: responses(500),
        // });
    }
});
// router.get("/", (req, res, next) => {
//     console.log("Usao sam");
//     User.find()
//         .then(doc => {
//             const data = doc;
//             res.status(200).json(data);
//         })
//         .catch(err => console.log(err));
// });

// @route   GET User
// @desc    Get All User
// @access  Public
router.get("/:id", (req, res, next) => {
    console.log("Usao sam");
    const id = req.params.id;
    User.findOne({ id })
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});


module.exports = router;