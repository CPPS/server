var Sequelize = require('sequelize');
var config = require('../config/db_config.json');

var connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

connection
    .authenticate()
    .catch(function (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    });

module.exports = connection;
