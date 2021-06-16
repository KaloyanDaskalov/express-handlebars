const Cube = require('../models/Cube');

exports.getCubes = async function (options = {}) {
	return Cube.find(options).lean();
}

exports.getCube = async function (id = '') {
	return Cube.findById(id).populate('accessories').lean();
}

exports.addCube = async function (cube) {
	const newCube = new Cube(cube);
	return newCube.save();
}

exports.deleteCube = async function (id) {
	return Cube.deleteOne({ _id: id });
}

exports.updateCube = async function (id, cube) {
	const existing = await Cube.findById(id);

	if (!existing) {
		throw new ReferenceError('No such ID in database');
	}

	Object.assign(existing, cube);
	return existing.save();
}

