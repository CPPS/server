var Sequelize = require('sequelize');
var crypto = require('crypto');
var bcrypt   = require('bcrypt-nodejs');
var database = require('../../utils/database');
var model = require('../../utils/model');

var User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        authenticate: function(password) {
            return bcrypt.compareSync(password, this.get('password'));
        },

        toJSON: model.data(function (data) {
            data.hideTimestamps();
            data.hide('password');
            data.hide('token');
        })
    }
});

User.generateToken = function() {
    return crypto.randomBytes(64).toString('base64');
};

User.hash = function(password) {
    var salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
};

module.exports = User;