var Sequelize = require('sequelize');
var database = require('../database');

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
});

module.exports = Provider;