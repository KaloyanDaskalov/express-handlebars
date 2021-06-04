const route = require('express').Router();

route.get('/', (req, res) => {
	res.render('create');
});

route.post('/add-cube', async (req, res) => {
	const cube = await req.store.addCube(req.body);
	console.log(cube);
	res.redirect('/');
});

module.exports = route;