const env = process.env.NODE_ENV || 'development';
const { SALT_ROUNDS, COOKIE_NAME, SECRET } = require('../config/config')[env];
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorCodes = require('../helpers/errorCodes');

const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const userSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: true,
		minlength: [3, 'Your username must be at least 3 characters.'],
		index: {
			unique: true
		},
		validate: {
			validator: (value) => {
				return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
			},
			message: (props) =>
				`${props.value} is invalid username. Username should consist only english letters and digits!`
		}
	},
	password: {
		type: String,
		required: true,
		minlength: [3, 'Your password must be at least 3 characters.'],
		validate: {
			validator: (value) => {
				return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
			},
			message: () =>
				`Password should consist only english letters and digits!`
		}
	}
});

userSchema.pre('save', function (next) {
	bcrypt.hash(this.password, SALT_ROUNDS)
		.then(hash => {
			this.password = hash;
			next();
		})
		.catch(err => {
			throw errorCodes.get(err);
		});
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compare(password, this.password)
		.then(res => res)
		.catch(err => { throw errorCodes.get(err) })
};

userSchema.methods.jwtSign = function () {
	return jwt.sign({ id: this._id }, SECRET, { expiresIn: '1h' });
}

userSchema.statics.jwtValidation = function (cookies) {
	const token = jwt.verify(cookies[COOKIE_NAME], SECRET);
	const m_id = mongoose.Types.ObjectId(token.id);
	return this.findOne({ _id: m_id })
}

module.exports = model('User', userSchema);