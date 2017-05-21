var Sequelize = require('sequelize');
var database = require('../../utils/database');
var model = require('../../utils/model');

var Provider = require('./provider');

var Contest = database.define('contest', {
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
    },

    client_endpoint: {
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

Contest.belongsTo(Provider);

module.exports = Contest;