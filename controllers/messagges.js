/* eslint-disable no-unused-vars */

const mqtt = require("mqtt");
const axios = require('axios');
const config = require("../config")

let messagges = module.exports = {}


messagges.send = async (req, res, next) => {
	try {
		const client = mqtt.connect(config.mqtt.SERVER);
		let publish = false;
		let data = (await axios.get(config.mqtt.SEND_DATA)).data;
		const json = JSON.stringify({ message: data, user: req.userId });

		client.on('connect', () => {
			console.log('Connected');
			client.publish(config.mttq.CHANNEL, Buffer.from(json), () => {
				publish = true;
				console.log('published');
				client.end();
			});
		});
		setTimeout(() => {
			res.send({ send: publish });
		}, (10 * 1000));
	} catch (err) {
		console.log(err);
		next(err);
	}



}