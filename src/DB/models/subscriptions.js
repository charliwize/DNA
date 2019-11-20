const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subscription = new Schema(
  {
		subscription_name: {type: String, required: true },
		subscription_price: {type: String, required: true},
		subscription_speed: {type: String, required: true },
		formattedName: {type: String, required: true },
		subscription_rate: {type: String, required: true },
		subscription_opening_fee: {type: String, required: true},
		subscription_type: { type: String, required: true }, 
	},
	{ timestamps: true },
)

module.exports = mongoose.model('subscriptions', Subscription)