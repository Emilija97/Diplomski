const express = require("express");
const Router = require('services/modelBindings');
const logger = require('services/logger');
var mongoose = require("mongoose");

const router = Router();
// User Model
const { User } = require('models');

// @route   GET users
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
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   GET users/:id
// @desc    Get User with specific id
// @access  Public
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ id }).lean().exec();

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).json(user);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});


module.exports = router;