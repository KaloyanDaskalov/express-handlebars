const { register, login, jwtSession } = require('../services/auth');
const errorCodes = require('../helpers/errorCodes')

module.exports = () => async (req, res, next) => {

	try {
		const usr = await jwtSession(req.cookies);

		if (usr) {
			req.user = usr;
			res.locals.user = true;
		}
	} catch (err) {
		res.locals.error = errorCodes.get(err);
	}

	req.auth = {
		register,
		login
	};
	next();
}
