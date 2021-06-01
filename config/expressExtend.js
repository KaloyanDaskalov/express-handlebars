const hbs = require('express-handlebars');

module.exports = function (app, static, urlencoded) {

	app.use('/static', static('static'));
	app.use(urlencoded({ extended: false }));

	app.engine('hbs', hbs({ extname: 'hbs' }));
	app.set('view engine', 'hbs');
	// app.enable('view cache');
}

