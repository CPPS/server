var Sequelize = require('sequelize');
var database = require('../../service/database');
var model = require('../../service/model');

var Contest = require('./Contest');

var Group = database.define('group', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        toJSON: model.data(function (data) {
            data.hideTimestamps();
        })
    }
});

Group.hasMany(Contest, {as: 'contests'});

module.exports = Group;