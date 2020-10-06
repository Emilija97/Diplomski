const Joi = require('@hapi/joi');

module.exports = {
    email: Joi.string()
        .email()
        .required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
};
