var Sequelize = require('sequelize');
var database = require('../../utils/database');
var model = require('../../utils/model');

var Provider = database.define('provider', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    endpoint: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        toJSON: model.data(function (data) {
            data.hideTimestamps();
            data.hide('id');
        })
    }
});

module.exports = Provider;