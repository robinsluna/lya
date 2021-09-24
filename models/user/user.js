const buildMakeUser = (userValidator) => {
	return ({
		name,
		lastname,
		email,
		active,
		token,
	} = {}) => {
		let { error } = userValidator({ name, lastname, email, active, token });
		if (error) throw new Error(error);

		return {
			getName: () => name,
			getLastName: () => lastname,
			getEmail: () => email,
			isActive: () => active,
			getToken: () => token
		};
	};
};

module.exports = buildMakeUser;