const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // id: {
    //     type: String
    // },
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
// schema.index({ '$**': 'text' }); //for option search for mongodb atlas

module.exports = mongoose.model('Report', schema, 'reports');
