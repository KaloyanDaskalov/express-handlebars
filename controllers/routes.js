const router = require('express').Router();

const homeController = require('./homeController');
const notFoundController = require('./notFoundController');
const detailsController = require('./detailsController');
const editController = require('./editController');
const createController = require('./createController');
const deleteController = require('./deleteController');

router.use('/', homeController);
router.use('/create', createController);
router.use('/delete', deleteController);
router.use('/details', detailsController);
router.use('/edit', editController);
router.use('*', notFoundController);

module.exports = router;