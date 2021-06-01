const router = require('express').Router();
const db = require('../models/query');

const homeController = require('./homeController');
const notFoundController = require('./notFoundController');
const detailsController = require('./detailsController');
const editController = require('./editController');
const createController = require('./createController');

router.use('/', homeController);
router.use('/details', detailsController);
router.use('/edit', editController);
router.use('/create', createController);
router.use('*', notFoundController);

module.exports = router;