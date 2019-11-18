const express = require('express');
const SubscriptionCtrl = require('../controllers/subscriptions');

const router = express.Router();

router.post('/createSubscription', SubscriptionCtrl.createSubscription);
router.get('/getSubscriptions/', SubscriptionCtrl.getSubscriptionsById);

module.exports = router;