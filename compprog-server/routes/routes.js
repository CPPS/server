var express = require('express');
var router = express.Router();
var util = require('./routeUtil');

router.get('/', function (req, res, next) {
    res.render('index', util.addDefaultParams(req, {
        title: 'CPPS Training Server'
    }));
});

router.get('/tuelogin', function (req, res, next) {
    res.render('tuelogin', util.addDefaultParams(req, {
        title: 'TU/e Login'
    }));
});

router.get('/profile', util.isLoggedIn, function(req, res, next) {
    res.render('profile', util.addDefaultParams(req, {
        title: req.user.name + "'s profile"
    }));
});


module.exports = router;
