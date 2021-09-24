const User = require('../../db/models/user');
const makeUser = require('../../models/user/index');
const serialize = require('./serializer');
var mongoose = require('mongoose');

let listUsers = () => {
	return User.find({})
		.then(serialize)
}

let findUser = (prop, val) => {
	if (prop === 'id') {
		prop = '_id'
		if (!mongoose.Types.ObjectId.isValid(val)) {
			throw new Error('id invalid');
		}
	}
	return User.find({ [prop]: val })
		.then(resp => {
			return serialize(resp[0])
		})
}

let findUserBy = (prop, val) => {
	return User.find({ [prop]: val })
		.then(serialize)
}

let addUser = (info) => {
	delete info.id;
	let data = makeUser(info)
	let newUser = {
		name: data.getName(),
		lastname: data.getLastName(),
		email: data.getEmail(),
		active: data.isActive(),
	}
	return User.create(newUser)
		.then(serialize)
}

let updateUser = (id, info) => {
	let data = makeUser({ id, ...info })
	let updateUser = {
		name: data.getName(),
		lastname: data.getLastName(),
		email: data.getEmail(),
		active: data.isActive(),
	}

	return User.findOneAndUpdate({ _id: id }, updateUser, { new: true })
		.then(serialize)
}


let deleteUser = (id) => {
	return User.findByIdAndDelete(id)
		.then(resp => {
			return {
				id: resp._id.toString(),
				status: 'success'
			}
		})
		.catch(() => {
			return {
				status: 'fail'
			}
		})
}

let dropAllUsers = () => {
	return User.remove()
}

module.exports = {
	listUsers,
	findUser,
	findUserBy,
	addUser,
	updateUser,
	deleteUser,
	dropAllUsers
}