var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String
}),
	user = mongoose.model('user', userSchema);

module.exports = user;