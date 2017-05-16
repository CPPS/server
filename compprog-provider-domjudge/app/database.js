var Sequelize = require('sequelize');
var config = require('config');
var configuration = config.get('database');

var database = configuration.get('database');
var username = configuration.get('username');
var password = configuration.get('password');
var host = configuration.get('host');
var dialect = configuration.get('dialect');

var connection = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = connection;