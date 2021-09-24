const jwt = require('jsonwebtoken');
const config = require('../config');
const usersDb = require('../data-access/users-db')

const auth = {};

auth.create = async (req, res, next) => {
	try {
		const { email } = req.body;
		let user = await usersDb.findUser('email', email);
		if (!user) {
			return res.status(400).send({ error: 'user not found !' });
		}
		if (!user.active) {
			return res.status(400).send({ error: 'inactive user!' });
		}
		const token = jwt.sign({ sub: user.id }, config.SECRET, { expiresIn: 60 * 5 });
		user = await usersDb.updateUser(user.id, { token }, { withToken: true });

		return res.send(user);
	} catch (err) {
		next(err);
	}

}

auth.delete = async (req, res, next) => {
	try {
		await usersDb.updateUser(req.userId, { token: null }, { withToken: true });
		return res.send({ message: 'logout' });
	} catch (err) {
		next(err);
	}

}

module.exports = auth;