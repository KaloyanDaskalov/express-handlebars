const User = require('../models/User');
const errorCodes = require('../helpers/errorCodes');
const formData = require('../helpers/getFormData');

async function register(body) {
	const userData = formData('register', body);
	if (userData.password != userData.repeatPassword) {
		throw errorCodes.set('Passwords don\'t match');
	}
	const usr = new User(userData);
	return await usr.save();
}

async function login(body) {
	const userData = formData('login', body);
	const usr = await User.findOne({ username: userData.username.toLocaleLowerCase() });
	// check in if password match!!!
	if (usr && await usr.checkPassword(userData.password)) {
		return usr;
	} else {
		throw errorCodes.set('Username or password is incorrect');
	}
}

// TODO jwt verify!!!
async function jwtSession(cookies) {
	if (Object.keys(cookies).length === 0) {
		return false;
	}
	return await User.jwtValidation(cookies);
}

module.exports = {
	register,
	login,
	jwtSession
}