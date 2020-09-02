const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");

// Card Model
const People = require("../models/people");

// @route   GET people
// @desc    Get All People
// @access  Public
router.get("/", (req, res, next) => {
    console.log("Usao sam");
    People.find()
        .then(doc => {
            const data = doc;
            res.status(200).json(data);
        })
        .catch(err => console.log(err));
});

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