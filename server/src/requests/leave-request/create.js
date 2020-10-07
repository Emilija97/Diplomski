const Joi = require('@hapi/joi');

module.exports = Joi.object({
    id: Joi.string().empty('').default('default value'),
    employeeImageSrc: Joi.string().required(),
    employeeFullName: Joi.string().required(),
    employeePosition: Joi.string().required(),
    employeeId: Joi.string().required(),
    durationInDays: Joi.number().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    message: Joi.string().empty('').default('default value'),
    status: Joi.number().required(),
    type: Joi.number().required(),

})