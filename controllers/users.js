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
	console.log(req.params.id);
	usersDb.findUser('id', req.params.id)
		.then(data => {
			res.send(data)
		}).catch( error =>{
			next(error);
		})
}

users.create = (req, res, next) => {
	usersDb.addUser(req.body)
		.then(data => {
			console.log(data);
			res.send(data)
		})
		.catch( error =>{
			next(error);
		})
}


users.delete = (req, res, next) => {
	usersDb.deleteUser('id', req.params.id)
		.then(data => {
			res.send(data)
		})
}