const route = require('express').Router();

route.get('/:id', async (req, res) => {
	try {
		const cube = await req.store.getCube(req.params.id);
		// console.log(cube.creator == req.user._id.toString());
		res.locals.owner = cube.creator == req.user._id.toString();
		res.render('details', { title: 'Cub Details', ...cube });
	} catch (err) {
		console.error(err);
		res.redirect('/');
	}
});

route.get('/accessory/:id', async (req, res) => {
	try {
		const accessory = await req.store.getAccessory(req.params.id);
		res.render('details-accessory', { title: 'Accessory Details', ...accessory });
	} catch (err) {
		console.error(err);
		res.redirect('/');
	}
});

module.exports = route;