var express = require('express');
var router = express.Router();

var database = require('../app/database');

/* GET home page. */
router.get('/', function(req, res, next) {
    database
        .authenticate()
        .then(function (err) {
            console.log('Connection has been established successfully.');
        })
        .catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });
});

module.exports = router;
