const route = require('express').Router();

route.get('/:id', async (req, res) => {
	const cube = await req.store.getCube(req.params.id);
	res.render('details', { title: 'Cub Details', ...cube });
});

module.exports = route;