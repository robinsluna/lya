/* eslint-disable no-unused-vars */

const usersDb = require('../data-access/users-db')

let users = module.exports = {}

users.index = (req, res, next) => {
	usersDb.listUsers()
		.then(data => {
			res.send(data)
		})
}

users.show = (req, res, next) => {
	usersDb.findUser('id', req.params.id)
		.then(data => {
			if (!data.active) {
				return res.status(400).send({ error: 'inactive user!' });
			}
			res.send(data)
		}).catch(next)
}

users.create = (req, res, next) => {
	usersDb.addUser({ ...req.body, active: false })
		.then(data => {
			res.send(data)
		})
		.catch(next)
}

users.update = (req, res, next) => {
	usersDb.updateUser(req.params.id, req.body)
		.then(data => {
			res.send(data)
		})
		.catch(next)
}

users.activate = (req, res, next) => {
	usersDb.updateUser(req.params.id, { active: true })
		.then(data => {
			res.send(data)
		})
		.catch(next)
}



users.delete = (req, res, next) => {
	usersDb.deleteUser('id', req.params.id)
		.then(data => {
			res.send(data)
		}).catch(next)
}
