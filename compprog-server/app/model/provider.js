var Sequelize = require('sequelize');
var database = require('../../utils/database');
var model = require('../../utils/model');

var Contest = require('./Contest');

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

    description: {
        type: Sequelize.TEXT,
        defaultValue: "",
        allowNull: false
    },

    type: {
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

Provider.hasMany(Contest, {foreignKey: 'providerId'});
Contest.belongsTo(Provider, {foreignKey: 'providerId'});

module.exports = Provider;