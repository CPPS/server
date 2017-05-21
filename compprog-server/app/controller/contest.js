var validate = require('validate.js');
var Contest = require('../model/contest');

var controller = {};

controller.get_contest = function(req, res, next) {
    var id = req.params.id;

    var validation_error = validate({id: id}, {
        id: {
            presence: true,
            numericality: {
                onlyInteger: true
            }
        }
    });

    if (validation_error) {
        return res.status(400).send(validation_error);
    }

    Contest.findById(id).then(function (data) {
        if (data) {
            return res.send(data);
        }

        return next();
    }).catch(function (err) {
        return next(err);
    });
};

controller.get_contests = function(req, res, next) {
    Contest.findAll().then(function (data) {
        res.send(data);
    }).catch(function (err) {
        next(err);
    });
};

module.exports = controller;