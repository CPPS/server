var express = require('express');
var router = express.Router();
var database = require('../utils/database');

router.get('/providers', function(req, res, next) {
    var Provider = require('../app/model/provider');

    Provider.findAll().then(function (data) {
        var collection = [];

        data.forEach(function (element) {
            element = Provider.render(element);
            collection.push(element);
        });

        res.send(collection);
    }).catch(function (err) {
        next(err);
    });
});

module.exports = router;
