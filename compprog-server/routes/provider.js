var express = require('express');
var router = express.Router();

var provider_controller = require('../app/controller/provider');

router.get('/providers', provider_controller.get_providers);

router.get('/provider/:id', provider_controller.get_provider);

router.get('/provider/:id/contests', provider_controller.get_provider_contests);

module.exports = router;
