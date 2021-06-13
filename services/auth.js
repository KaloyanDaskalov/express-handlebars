const User = require('../models/User');
const errorCodes = require('../helpers/errorCodes');

async function register(data) {
	const usr = new User(data);
	await usr.save();
}

async function login(data) {
	const usr = await User.findOne({ username: data.username.toLocaleLowerCase() });
	// TODO if not found
	if (usr) {
		return usr;
	} else {
		throw errorCodes.set('Username or password is incorrect');
	}
}

module.exports = {
	register,
	login
}