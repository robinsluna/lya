const _serialize = (user) => {
	return {
		'id': user._id,
		'name': user.name,
		'lastname': user.lastname,
		'email': user.email,
		'active': user.active,
		'fullname': user.fullname
	};
};

const serializer = (data) => {
	if (!data) {
		return null;
	}
	if (Array.isArray(data)) {
		return data.map(_serialize);
	}
	return _serialize(data);
}

module.exports = serializer;