const { getCubes, getCube, addCube, updateCube, deleteCube } = require('../services/cubes');
const { getAccessory, getAccessories, addAccessory, attachAccessory, updateAccessory } = require('../services/accessories');

module.exports = () => (req, res, next) => {
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