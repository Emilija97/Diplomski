const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    personId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
