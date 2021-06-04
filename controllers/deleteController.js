const route = require('express').Router();

route.get('/:id', async (req, res) => {
    try {
        await req.store.deleteCube(req.params.id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

module.exports = route;