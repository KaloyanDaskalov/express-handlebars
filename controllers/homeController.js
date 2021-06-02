const route = require('express').Router();
const Cube = require('../models/cubeModel');

route.get('/', async (req, res) => {

	const dbCubs = await Cube.find().lean();

	if (req.query.search || req.query.search === '') {
		const search = req.query.search || '';
		const from = Number(req.query.from) || 1;
		const to = Number(req.query.to) || 6;

		const cubs = dbCubs.filter(cube => cube.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && Number(cube.difficultyLevel) >= from && Number(cube.difficultyLevel) <= to);

		res.render('index', { cubs });
	} else {
		res.render('index', { cubs: dbCubs });
	}

});


route.get('/about', (req, res) => {
	res.render('about', { title: 'About Page' });
});

module.exports = route;

