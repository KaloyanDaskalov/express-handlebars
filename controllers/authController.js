const route = require('express').Router();
const formData = require('../helpers/getFormData');
const errorCodes = require('../helpers/errorCodes');
const env = process.env.NODE_ENV || 'development';
const { COOKIE_NAME, SECRET } = require('../config/config')[env];

route.get('/login', (req, res) => {
	res.render('login');
});

route.get('/register', (req, res) => {
	res.render('register');
});

route.post('/login', async (req, res) => {
	try {
		const userData = formData('login', req.body);
		const usr = await req.auth.login(userData);
		// req.user = usr;
		res.cookie(COOKIE_NAME, SECRET, { httpOnly: true }).redirect('/cubes');
	} catch (err) {
		res.locals.error = errorCodes.get(err);
		res.render('login');
	}
});

route.post('/register', async (req, res) => {
	try {
		const userData = formData('register', req.body);
		await req.auth.register(userData);
		res.redirect('/cubes');
	} catch (err) {
		res.locals.error = errorCodes.get(err);
		res.render('register');
	}
});

module.exports = route;