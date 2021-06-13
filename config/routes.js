const router = require('express').Router();

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const notFoundController = require('../controllers/notFoundController');
const detailsController = require('../controllers/detailsController');
const editController = require('../controllers/editController');
const createController = require('../controllers/createController');
const deleteController = require('../controllers/deleteController');
const authController = require('../controllers/authController');

router.use('/', homeController);
router.use('/about', aboutController);
router.use('/create', createController);
router.use('/delete', deleteController);
router.use('/details', detailsController);
router.use('/edit', editController);
router.use('/auth', authController);
router.use('*', notFoundController);

module.exports = router;