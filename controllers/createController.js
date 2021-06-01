const route = require('express').Router();
const db = require('../models/query');

route.get('/', (req, res) => {
	res.render('create');
});

route.post('/', async (req, res) => {
	await db.add(req.body);
	res.redirect('/');
});

module.exports = route;