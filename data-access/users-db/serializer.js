const _serialize = (user, options = {}) => {
	const data = {
		'id': user._id,
		'name': user.name,
		'lastname': user.lastname,
		'email': user.email,
		'active': user.active
	};
	if (options.withToken) {
		data.token = user.token;
	}
	return data;
};

const serializer = (data, options = {}) => {
	if (!data) {
		return null;
	}
	if (Array.isArray(data)) {
		return data.map(element => _serialize(element, options));
	}
	return _serialize(data, options);
}

module.exports = serializer;