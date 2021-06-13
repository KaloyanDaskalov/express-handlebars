const route = require('express').Router();

route.get('/:id', async (req, res) => {
    try {
        const cube = await req.store.getCube(req.params.id);
        res.render('delete', cube);
    } catch (err) {
        console.error(err);
    }
});

route.post('/:id', async (req, res) => {
    // TO DO check for creator 
    try {
        await req.store.deleteCube(req.params.id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

module.exports = route;