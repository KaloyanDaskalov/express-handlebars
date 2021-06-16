const route = require('express').Router();

route.get('/cube', (req, res) => {
	res.render('create-cube', { title: 'Create Cube' });
});

route.post('/add-cube', async (req, res) => {
	try {
		await req.store.addCube({ ...req.body, creator: req.user });
	} catch (err) {
		console.error(err)
	}
	res.redirect('/');
});

route.get('/accessory', (req, res) => {
	res.render('create-accessory', { title: 'Create Accessory' });
});

route.get('/attach-accessory/:id', async (req, res) => {
	const options = {};
	const cube = await req.store.getCube(req.params.id);
	if (cube.accessories && cube.accessories.length !== 0) {
		options._id = {
			$nin: cube.accessories.map(a => a._id)
		}
	}
	const accessories = await req.store.getAccessories(options);
	res.render('attach-accessory', { title: 'Accessories', ...cube, accessories });
});

route.post('/attach-accessory/:id/attach', async (req, res) => {
	await req.store.attachAccessory(req.params.id, req.body.accessory);
	res.redirect('/details/' + req.params.id);
});

route.post('/add-accessory', async (req, res) => {
	try {
		await req.store.addAccessory(req.body);
	} catch (err) {
		console.error(err)
	}
	res.redirect('/');
});

module.exports = route;