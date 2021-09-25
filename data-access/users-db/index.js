const User = require('../../db/models/user');
const makeUser = require('../../models/user/index');
const serialize = require('./serializer');
var mongoose = require('mongoose');

let listUsers = (options = {}) => {
	return User.find({})
		.then(element => serialize(element, options))
}

let findUser = (prop, val, options = {}) => {
	if (prop === 'id') {
		prop = '_id'
		if (!mongoose.Types.ObjectId.isValid(val)) {
			throw new Error('id invalid');
		}
	}
	return User.findOne({ [prop]: val })
		.then(element => serialize(element, options))
}

let findUserBy = (prop, val, options = {}) => {
	return User.find({ [prop]: val })
		.then(element => serialize(element, options))
}

let addUser = (info, options = {}) => {
	delete info.id;
	let data = makeUser(info)
	let newUser = {
		name: data.getName(),
		lastname: data.getLastName(),
		email: data.getEmail(),
		active: data.isActive(),
	}
	return User.create(newUser)
		.then(element => serialize(element, options))
}

let updateUser = (id, info, options = {}) => {
	let data = makeUser({ id, ...info })
	let updateUser = {
		name: data.getName(),
		lastname: data.getLastName(),
		email: data.getEmail(),
		active: data.isActive(),
		token: data.getToken(),
	}

	return User.findOneAndUpdate({ _id: id }, updateUser, { new: true })
		.then(element => serialize(element, options))
}


let deleteUser = (id) => {
	return User.findByIdAndDelete(id)
		.then(resp => {
			return {
				id: resp._id.toString(),
				status: 'success'
			}
		});
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