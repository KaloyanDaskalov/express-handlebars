const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
		required: true,
		match: /^https?:\/\//
	},
	description: {
		type: String,
		required: true,
		maxLength: 500
	},
	cubes: [{
		type: Schema.Types.ObjectId,
		ref: 'Cube'
	}],
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true

	}
});

module.exports = model('Accessory', accessorySchema);
