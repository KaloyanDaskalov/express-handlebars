const route = require('express').Router();
const db = require('../models/query');

route.get('/:id', async (req, res) => {
	const id = req.params.id;
	const cub = await db.getOne(id);

	res.render('edit', { title: 'Edit Cube', id, ...cub });
});

route.post('/:id', async (req, res) => {
	const id = req.params.id;
	const cubs = await db.getAll(id);
	cubs[id] = req.body;
	await db.save(cubs);

	res.redirect('/details/' + id);
});

module.exports = route;