const { Schema, model } = require('mongoose');

const cubeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: Schema.Types.ObjectId,
        ref: 'Accessory'
    }]
});

module.exports = model('Cube', cubeSchema);

/*
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 500 },
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
    difficulty: { type: Number, min: 1, max: 6 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory' }]
*/