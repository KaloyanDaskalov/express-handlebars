const { register, login } = require('../services/auth');
const env = process.env.NODE_ENV || 'development';
const { COOKIE_NAME, SECRET } = require('../config/config')[env];

module.exports = () => (req, res, next) => {
	const token = req.cookies[COOKIE_NAME];
	if (token) {
		req.user = token;
		res.locals.user = token;
	}


	req.auth = {
		register,
		login
	};
	next();

}