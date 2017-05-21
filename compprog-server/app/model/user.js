var Sequelize = require('sequelize');
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
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    authentication_token: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        toJSON: model.data(function (data) {
            data.hideTimestamps();
            data.hide('salt');
            data.hide('password');
            data.hide('authentication_token');
        })
    }
});

module.exports = User;