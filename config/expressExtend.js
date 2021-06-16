const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/authMiddleware');
const storeMiddleware = require('../middlewares/storeMiddleware');

module.exports = function (app, static, urlencoded) {

	app.use('/static', static('static'));
	app.use(urlencoded({ extended: false }));

	app.engine('hbs', hbs({ extname: 'hbs' }));
	app.set('view engine', 'hbs');
	// app.enable('view cache');
	app.use(cookieParser());
	app.use(authMiddleware());
	app.use(storeMiddleware());
}

