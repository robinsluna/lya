const jwt = require('jsonwebtoken');
const usersDb = require('../data-access/users-db')
const config = require("../config");

const jwtAuthenticationMiddleware = async (req, res, next) => {
	const token = req.token;
	if (!token) {
		return next();
	}

	try {
		const decoded = jwt.verify(token, config.SECRET);
		const { sub } = decoded;
		const user = await usersDb.findUser('id', sub, { withToken: true });
		if (user && user.token === token) {
			req.userId = sub;
		}
	} catch (e) {
		return next();
	}

	next();
};

const isAuthenticatedMiddleware = async (req, res, next) => {
	if (req.userId) {
		return next();
	}

	res.status(401);
	res.json({ error: 'User not authenticated' });
};

module.exports = {
	jwtAuthenticationMiddleware,
	isAuthenticatedMiddleware
}

