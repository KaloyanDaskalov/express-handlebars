const route = require('express').Router();

route.get('/', (req, res) => {
	res.render('about', { title: 'About Page' });
});

module.exports = route;