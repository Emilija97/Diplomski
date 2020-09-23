const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: Number, //enum
    },
    date: {
        type: String,
    },
    comment: {
        type: String,
    },
    endDate: {
        type: String,
    },
    salary: {
        type: Number,
    },
    bonus: {
        type: Number,
    },
    status: {
        type: Number,
    },
},
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('Activity', schema, 'activities');
