var express = require('express');
var router = express.Router();

var contest_controller = require('../app/controller/contest');

router.get('/contests', contest_controller.get_contests);

router.get('/contest/:id', contest_controller.get_contest);

router.get('/contest/:id/provider', contest_controller.get_contest_provider);

router.get('/contest/:id/users', contest_controller.get_contest_users);

module.exports = router;
