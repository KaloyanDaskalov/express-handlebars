const route = require('express').Router();

route.get('/:id', async (req, res) => {
	const cube = await req.store.getCube(req.params.id);
	res.render('edit', { title: 'Edit Cube', ...cube });
});

route.post('/:id/update', async (req, res) => {
	const id = req.params.id;
	try {
		await req.store.updateCube(id, req.body);
	} catch (err) {
		console.error(err);
	};

	res.redirect('/details/' + id);
});

module.exports = route;