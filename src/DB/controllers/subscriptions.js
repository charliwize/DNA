var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

const Subscription = require('../models/subscriptions');

createSubscription = (req, res) => {
  console.log(req)
  const data = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      error: 'A subscription must be provided',
    })
  }

  const subscription = new Subscription(data);
  if (!subscription) {
    return res.status(400).json({ success: false, error: err })
  }

  // save the new subscription to DB
  subscription
  .save()
  .then(() => {
    return res.status(201).json({
      success: true,
      id: subscription._id,
      message: "Subscription Created!",
    })
  })
}

// get all subscriptions
getSubscriptionsById = async (req, res) => {
  await Subscription.findOne({_id: req.query.subscription_id }, (e, subscriptions) => {
    if (e) {
      return res.status(400).json({ success: false, error: e })
    }

    if (!subscriptions) {
      return res
      .status(404)
      .json({ success: false, error: `Subscription not found` })
    }

    return res.status(200).json({ success: true , data: subscriptions})

  }).catch(err => console.log(err))
}

module.exports = { createSubscription, getSubscriptionsById }