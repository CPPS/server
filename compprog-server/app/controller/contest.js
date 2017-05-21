var Controller = require('../../utils/controller');
var Contest = require('../model/Contest');

var controller = {};

controller.get_contest = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findByID(Contest, function (contest) {
        return res.send(contest);
    });
};

controller.get_contest_users = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findByID(Contest, function (contest) {
        contest.getUsers().then(function (users) {
            return res.send(users);
        }).catch(next)
    });
};

controller.get_contest_provider = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findByID(Contest, function (contest) {
        contest.getProvider().then(function (provider) {
            return res.send(provider);
        }).catch(next)
    });
};

controller.get_contests = function(req, res, next) {
    var controller = new Controller(req, res, next);
    controller.findAll(Contest, function (contests) {
        return res.send(contests);
    });
};

module.exports = controller;