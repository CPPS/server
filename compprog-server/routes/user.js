var express = require('express');
var router = express.Router();

var user_controller = require('../app/controller/user');

router.get('/users', user_controller.get_users);

router.get('/user/:id', user_controller.get_user);

router.get('/user/:id/contests', user_controller.get_user_contests);

router.post('/user', user_controller.register);

router.post('/login', user_controller.login);

module.exports = router;
