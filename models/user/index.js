const buildMake= require('./user')
const userSchema = require('./user-schema')
const userValidator = require('../validator/')(userSchema)

const makeUser = buildMake(userValidator)

module.exports = makeUser;