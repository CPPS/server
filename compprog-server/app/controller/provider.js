var Controller = require('../../utils/controller');
var Provider = require('../model/Provider');


var controller = {};

controller.get_provider = function(req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findByID(Provider, function (provider) {
        return res.send(provider);
    });
};

controller.get_provider_contests = function(req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findByID(Provider, function (provider) {
        provider.getContests().then(function (contests) {
            return res.send(contests);
        }).catch(next);
    });
};

controller.get_providers = function (req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findAll(Provider, {}, function (providers) {
        return res.send(providers);
    })
};

module.exports = controller;