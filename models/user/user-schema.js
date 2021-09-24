const Joi = require("joi");

module.exports = Joi.object().keys({
	id: Joi.string().optional(),
	name: Joi.string().when('id', { is: Joi.exist(), then: Joi.valid() }),
	lastname: Joi.string().when('id', { is: Joi.exist(), then: Joi.valid() }),
	email: Joi.string().email({ tlds: { allow: false } }).when('id', { is: Joi.exist(), then: Joi.valid() }),
	active: Joi.boolean().optional()
});