require('dotenv').config();

module.exports = {
	PORT: process.env.PORT,
	mongo: {
		MONGODB_URL: process.env.MONGODB_URL,
	}
}