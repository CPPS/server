var express = require('express');
var passport = require('passport');
var util = require('./routeUtil');
var router = express.Router();

var user_controller = require('../controller/user');

router.get('/users', user_controller.get_users);

router.get('/user/:id', user_controller.get_user);

router.get('/user/:id/contests', user_controller.get_user_contests);

router.post('/user', user_controller.register);

router.post('/login', util.redirectIfLoggedIn, user_controller.login);

router.post('/tuelogin', util.redirectIfLoggedIn, user_controller.login_tue_user);

module.exports = router;
