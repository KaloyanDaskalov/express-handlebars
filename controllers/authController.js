const env = process.env.NODE_ENV || 'development';
const { COOKIE_NAME } = require('../config/config')[env];
const route = require('express').Router();
const errorCodes = require('../helpers/errorCodes');

route.get('/login', (req, res) => {
	res.render('login');
});

route.get('/register', (req, res) => {
	res.render('register');
});

route.post('/login', async (req, res) => {
	try {
		const usr = await req.auth.login(req.body);
		res.cookie(COOKIE_NAME, usr.jwtSign(), { httpOnly: true }).redirect('/cubes');
	} catch (err) {
		res.locals.error = errorCodes.get(err);
		res.render('login');
	}
});

route.post('/register', async (req, res) => {
	try {
		const usr = await req.auth.register(req.body);
		res.cookie(COOKIE_NAME, usr.username, { httpOnly: true }).redirect('/cubes');
	} catch (err) {
		console.log(err, err.message);
		// res.locals.error = errorCodes.get(err);
		res.locals.error = err.message;
		res.render('register');
	}
});

module.exports = route;