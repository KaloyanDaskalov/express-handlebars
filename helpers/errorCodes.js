module.exports = {
	11000() {
		return 'Username already exist';
	},
	100(err) {
		return err.message;
	},
	set(message = 'Custom Error', code = 100) {
		const customError = new Error();
		customError.message = message;
		customError.code = code;
		return customError;
	},
	get(err) {
		return this.hasOwnProperty(err.code) ?
			this[err.code](err)
			: 'Something went wrong!';
	}
};