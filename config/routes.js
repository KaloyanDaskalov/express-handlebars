const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/guardMiddleware');

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
router.use('/create', isAuth(), createController);
router.use('/delete', isAuth(), deleteController);
router.use('/details', detailsController);
router.use('/edit', isAuth(), editController);
router.use('/auth', isGuest(), authController);
router.use('*', notFoundController);

module.exports = router;