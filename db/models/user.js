const mongoose = require('../connection');

var UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	active: { type: Boolean, required: false, default: false },
	token: { type: String, required: false },
}, { timestamps: true });

UserSchema
	.virtual("fullName")
	.get(function () {
		return `${this.name} ${this.lastName}`;
	});

const User = mongoose.model('User', UserSchema);

module.exports = User;