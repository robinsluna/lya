const buildMakeUser = (userValidator) => {
	return ({
		name,
		lastname,
		email,
		active
	} = {}) => {
		let { error } = userValidator({ name, lastname, email, active });
		if (error) throw new Error(error);

		return {
			getName: () => name,
			getLastName: () => lastname,
			getEmail: () => email,
			isActive: () => active
		};
	};
};

module.exports = buildMakeUser;