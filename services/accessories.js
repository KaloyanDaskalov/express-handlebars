const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

exports.getAccessory = async function (id = '') {
	return Accessory.findById(id).populate('cubes').lean();
}

exports.getAccessories = async function (options = {}) {
	return Accessory.find(options).lean();
}

exports.attachAccessory = async function (cubeId, accessoryId) {
	const cube = await Cube.findById(cubeId);
	const accessory = await Accessory.findById(accessoryId);

	if (!cube || !accessory) {
		throw new ReferenceError('No such ID in database');
	}

	try {
		cube.accessories.push(accessory);
	} catch {
		cube.accessories = [accessory];
	}

	try {
		accessory.cubes.push(cube);
	} catch {
		accessory.cubes = [cube];
	}

	return Promise.all([cube.save(), accessory.save()]);
}

exports.updateAccessory = async function (id = '', accessory = {}) {
	const existing = await Accessory.findById(id);

	if (!existing) {
		throw new ReferenceError('No such ID in database');
	}

	Object.assign(existing, accessory);
	return existing.save();
}


exports.addAccessory = async function (accessory) {
	const newAccessory = new Accessory(accessory);
	return newAccessory.save();
}