var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var _ = require('../package.json');

    res.send({
        version : _.version,
        api : _.api
    })
});

router.get('/config', function (req, res, next) {
    var config = require('../config/app.json');
    res.send(config)
});

router.use('/', require('./user'));
router.use('/', require('./provider'));
router.use('/', require('./contest'));

module.exports = router;
