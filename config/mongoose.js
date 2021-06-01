const mongoose = require('mongoose');

async function dbConnection(dbUri) {

	const db = await mongoose.connect(dbUri, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true
	});

	console.log('Database is connected...');

	/*
	const cubeSchema = new mongoose.Schema({
		name: String,
		description: String,
		imageUrl: String,
		difficultyLevel: Number
	});

	const Cube = mongoose.model('Cube', cubeSchema);

	const newCube = new Cube({
		name: "Eco-Dark",
		description: "In geometry, a cube is a three-dimensional solid object bounded by six square faces, facets or sides, with three meeting at each vertex. The cube is the only regular hexahedron and is one of the five Platonic solids. It has 6 faces, 12 edges, and 8 vertices.",
		imageUrl: "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
		difficultyLevel: 5
	});

	await newCube.save();

	const data = await Cube.find();
	console.log(data);
	*/
}

module.exports = {
	dbConnection,
	db: mongoose.connection
}