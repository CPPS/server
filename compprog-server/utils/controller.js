var validate = require('validate.js');

var Controller = function (req, res, next) {
    this.constraints = {};
    this.constraints.validID = {
        id: {
            presence: true,
            numericality: {
                onlyInteger: true
            }
        }
    };

    this.validate = function (object, constraints, handler) {
        var error = validate(object, constraints);
        if (error) {
            return res.status(400).send(error);
        } else {
            return handler();
        }
    };

    this.validate_id = function (handler) {
        return this.validate({id: req.params.id }, this.constraints.validID, handler);
    };

    this.findByID = function (model, handler) {
        this.validate_id(function () {
            model.findById(req.params.id).then(function (element) {
                if (element) {
                    return handler(element);
                } else {
                    return next();
                }
            }).catch(next);
        });
    };

    this.findAll = function (model, handler) {
        model.findAll().then(function (elements) {
            handler(elements)
        }).catch(next);
    };
};

module.exports = Controller;