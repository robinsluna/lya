const validator = (schema) =>
	(data) => {
		let { error } = schema.validate(data);
		if (error) {
			let message = error.details.map(el => el.message).join('\n')
			return {
				error: message
			}
		}
		return true
	}

module.exports = validator;