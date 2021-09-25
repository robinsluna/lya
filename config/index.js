require('dotenv').config();

module.exports = {
	PORT: process.env.PORT,
	SECRET: process.env.SECRET,
	mongo: {
		URL: process.env.MONGODB_URL,
	},
	mqtt: {
		SERVER: process.env.MQTT_SERVER,
		CHANNEL: process.env.MQTT_CHANNEL,
		SEND_DATA: process.env.MQTT_SEND_DATA
	}
}