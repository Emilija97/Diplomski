const Joi = require('@hapi/joi');

module.exports = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
};
