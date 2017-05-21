var Controller = require('../../utils/controller');
var User = require('../model/User');

var controller = {};

controller.get_user = function(req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findByID(User, {}, function (user) {
        return res.send(user);
    });
};

controller.get_user_contests = function(req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findByID(User, {}, function (user) {
        user.getContests().this(function () {
            return res.send(user);
        }).catch(next);
    });
};

controller.get_users = function(req, res, next) {
    var controller = new Controller(req, res, next);

    controller.findAll(User, {}, function (users) {
        return res.send(users);
    });
};

var credential_constraints = {
    username: {
        presence: true,
            length: {
            minimum: 4,
                message: "must be at least 4 characters"
        }
    },
    password: {
        presence: true,
            length: {
            minimum: 6,
                message: "must be at least 6 characters"
        }
    }
};

controller.register = function(req, res, next) {
    var controller = new Controller(req, res, next);

    var credentials = {
        username: req.body.username,
        password: req.body.password
    };

    controller.validate(credentials, credential_constraints, function () {
        var same_username = { where: { username: credentials.username }};
        controller.exists(User, same_username, function (exists) {
            if (!exists) {
                User.create({
                    username: credentials.username,
                    password: User.hash(credentials.password),
                    token: User.generateToken()
                }).then(function (user) {
                    // TODO handle successful register
                    return res.send({});
                });
            } else {
                res.status(409).send(["User already exists"]);
            }
        });
    });
};

controller.login = function(req, res, next) {
    var controller = new Controller(req, res, next);

    var credentials = {
        username: req.body.username,
        password: req.body.password
    };

    controller.validate(credentials, credential_constraints, function () {
        var same_username = { where: { username: credentials.username }};
        controller.find(User, same_username, function (user) {
            if (user && user.authenticate(credentials.password)) {
                // TODO handle successful login
                res.send({});
            } else {
                res.status(401).send(["Invalid credentials"]);
            }
        });
    });
};

module.exports = controller;