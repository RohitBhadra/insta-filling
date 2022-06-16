const express = require('express');
const user_controller = require('../controller/user.controller');

var router = express.Router();

// router.post('/register', user_controller.register);

router.post('/register', function(req, res){
    user_controller.register
  });

router.post('/login', user_controller.login);
router.post('/verifyOtp', user_controller.verifyOtp);

module.exports = router;