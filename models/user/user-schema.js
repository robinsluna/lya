const joi = require("joi");

module.exports = joi.object().keys({
	name: joi.string().required(),
	lastname: joi.string().required(),
	email: joi.string().required().email({ tlds: { allow: false } }),
	active: joi.boolean().not().required()
});