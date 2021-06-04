const Cube = require('../models/Cube');

async function getCubes(options = {}) {
    return Cube.find(options).lean();
}

async function getCube(id = '') {
    return Cube.findById(id).lean();
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

module.exports = (req, res, next) => {
    req.store = {
        getCubes,
        getCube,
        addCube,
        updateCube,
        deleteCube
    };
    next();
};