const config = require('../config')
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function () {
	console.log('Connection has been made');
}).on('error', function (error) {
	console.log('Connect error', error);
}).on('disconnected', function () {
	console.log('Connection disconnected');
})

module.exports = mongoose