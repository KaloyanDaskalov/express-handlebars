const route = require('express').Router();
const db = require('../models/query');

route.get('/', async (req, res) => {
	const search = req.query.search || '';
	const from = Number(req.query.from) || 1;
	const to = Number(req.query.to) || 6;

	const allCubs = await db.getAll();
	const cubs = Object.keys(allCubs)
		.map(key => {
			return { id: key, ...allCubs[key] }
		})
		.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && Number(cube.difficultyLevel) >= from && Number(cube.difficultyLevel) <= to);

	res.render('index', { cubs });
});


route.get('/about', (req, res) => {
	res.render('about', { title: 'About Page' });
});

module.exports = route;

