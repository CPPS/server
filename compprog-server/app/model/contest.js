var Sequelize = require('sequelize');
var database = require('../database');
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
    }
});

Contest.hasOne(Provider, {as: "Provider"});

module.exports = Contest;