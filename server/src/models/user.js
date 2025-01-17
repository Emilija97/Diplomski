const mongoose = require("mongoose");
const validateEmail = require('../util/validateEmail');

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
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
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    phone: {
        type: String,
    },
    salary: {
        type: String,
    },
    cv: {
        type: String,
    },
},
    {
        timestamps: true,
        minimize: false,
    },
);

module.exports = mongoose.model('User', schema, 'users');