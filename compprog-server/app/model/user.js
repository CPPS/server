var Sequelize = require('sequelize');
var database = require('../../utils/database')();

var User = database.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

module.exports = User;