const route = require('express').Router();

route.get('/:id', async (req, res) => {
	try {
		const cube = await req.store.getCube(req.params.id);
		res.render('details', { title: 'Cub Details', ...cube });
	} catch (err) {
		console.error(err);
		res.redirect('/');
	}
});

module.exports = route;