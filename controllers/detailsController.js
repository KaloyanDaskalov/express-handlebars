const route = require('express').Router();
const db = require('../models/query');

route.get('/:id', async (req, res) => {
	const id = req.params.id;
	const cub = await db.getOne(id);

	res.render('details', { title: 'Cub Details', id, ...cub });
});

module.exports = route;