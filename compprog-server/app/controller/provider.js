var Provider = require('../model/provider');

var controller = {};

controller.get_providers = function(req, res, next) {
    Provider.findAll().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        next(err);
    });
};

module.exports = controller;