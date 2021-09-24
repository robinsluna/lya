require('dotenv').config();

module.exports = {
	PORT: process.env.PORT,
	SECRET: process.env.SECRET,
	mongo: {
		MONGODB_URL: process.env.MONGODB_URL,
	}
}