const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number
});

module.exports = model('Cube', cubeSchema);