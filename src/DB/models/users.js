const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {     
		username: { type: String, required: true },
		password: { type: String, required: true }, 
		firstname: { type: String, required: true }, 
		surname: { type: String, required: true }, 
		address: { type: String, required: true }, 
		phone: { type: String, required: true }, 
		subscriptions: {type: [String], required: false },
	},
	{ timestamps: true },
)

module.exports = mongoose.model('users', User)