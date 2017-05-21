var Controller = require('../../utils/controller');
var User = require('../model/User');

var controller = {};

controller.get_user = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findByID(User, function (user) {
        return res.send(user);
    });
};

controller.get_user_contests = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findByID(User, function (user) {
        user.getContests().this(function () {
            return res.send(user);
        }).catch(next);
    });
};

controller.get_users = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findAll(User, function (users) {
        return res.send(users);
    });
};

module.exports = controller;