const mongoose = require('mongoose');

async function dbConnection(dbUri) {

	const db = await mongoose.connect(dbUri, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true
	});

	console.log('Database is connected...');
}

module.exports = {
	dbConnection,
	db: mongoose.connection,
}