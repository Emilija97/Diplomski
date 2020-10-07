const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    employeeImageSrc: {
        type: String,
    },
    employeeFullName: {
        type: String,
    },
    employeePosition: {
        type: String,
    },
    durationInDays: {
        type: Number,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: Number,
    },
    type: {
        type: Number
    }
},
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('Request', schema, 'requests');