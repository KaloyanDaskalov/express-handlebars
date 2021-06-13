const errorCodes = require('../helpers/errorCodes');
const formsFields = {
	register: ['username', 'password', 'repeatPassword'],
	login: ['username', 'password'],
};

module.exports = (form, data = {}) => {

	return formsFields[form].reduce((acc, key) => {
		if (data[key]?.trim()) {
			acc[key] = data[key];
		} else {
			throw errorCodes.set(`${key} is required`);
		}
		return acc;
	}, {});

};