const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

async function getCubes(options = {}) {
    return Cube.find(options).lean();
}

async function getCube(id = '') {
    return Cube.findById(id).populate('accessories').lean();
}

async function addCube(cube) {
    const newCube = new Cube(cube);
    return newCube.save();
}

async function deleteCube(id) {
    return Cube.deleteOne({ _id: id });
}

async function updateCube(id, cube) {
    const existing = await Cube.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(existing, cube);
    return existing.save();
}

async function addAccessory(accessory) {
    const newAccessory = new Accessory(accessory);
    return newAccessory.save();
}

async function getAccessory(id = '') {
    return Accessory.findById(id).populate('cubes').lean();
}

async function getAccessories(options = {}) {
    return Accessory.find(options).lean();
}

async function attachAccessory(cubeId, accessoryId) {
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

async function updateAccessory(id = '', accessory = {}) {
    const existing = await Accessory.findById(id);

    if (!existing) {
        throw new ReferenceError('No such ID in database');
    }

    Object.assign(existing, accessory);
    return existing.save();
}

module.exports = (req, res, next) => {
    req.store = {
        getCubes,
        getCube,
        addCube,
        updateCube,
        deleteCube,
        getAccessory,
        getAccessories,
        addAccessory,
        attachAccessory,
        updateAccessory
    };
    next();
};