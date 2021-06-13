const { model, Schema } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		minlength: 3,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true,
	}
});

module.exports = model('User', userSchema);