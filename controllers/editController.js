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

route.get('/accessory/:id', async (req, res) => {
	const accessory = await req.store.getAccessory(req.params.id);
	res.render('edit-accessory', { title: 'Edit Accessory', ...accessory });
});

route.post('/accessory/:id/update', async (req, res) => {
	const id = req.params.id;
	try {
		await req.store.updateAccessory(id, req.body);
	} catch (err) {
		console.error(err);
	};

	res.redirect('/details/accessory/' + id);
});

module.exports = route;