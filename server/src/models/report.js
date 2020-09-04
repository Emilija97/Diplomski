const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    personId: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
    },
    norm: {
        type: Number,
    },
    hours: {
        type: Number,
    },
    month: {
        type: String,
    },
},
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('Report', schema, 'reports');
