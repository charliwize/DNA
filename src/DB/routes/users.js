const express = require('express');
const UserCtrl = require('../controllers/users');

const router = express.Router();

router.post('/createUser', UserCtrl.createUser);
router.get('/getUsers/', UserCtrl.getUserById);

module.exports = router;