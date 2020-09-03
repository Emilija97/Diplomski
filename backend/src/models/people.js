const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
    },
    position: {
        type: String,
    },
    status: {
        type: Number,
    },
    type: {
        type: Number,
    },
    birthDate: {
        type: String,
    },
    homeAddress: {
        type: String,
    },
    enrolmentDate: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    salary: {
        type: String,
    },
},
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('People', schema, 'people');
