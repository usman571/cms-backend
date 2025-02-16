const express = require('express');
const router = express.Router();
const { signup, login, whoAmI } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/who-am-i', whoAmI);

module.exports = router;