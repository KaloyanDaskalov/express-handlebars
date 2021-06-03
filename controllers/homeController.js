const route = require('express').Router();
const Cube = require('../models/cubeModel');

route.get('/', async (req, res) => {

	const searchParams = {};

	if (req.query.search || req.query.search === '') {
		searchParams.name = {
			$regex: req.query.search || '',
			$options: 'i'
		};
		searchParams.difficultyLevel = {
			$gte: Number(req.query.from) || 1,
			$lte: Number(req.query.to) || 6
		};
	}

	const cubs = await Cube.find(searchParams).lean();
	res.render('index', { cubs });
});


route.get('/about', (req, res) => {
	res.render('about', { title: 'About Page' });
});

module.exports = route;

