var Sequelize = require('sequelize');
var database = require('../../utils/database');
var model = require('../../utils/model');

var Visibility = database.define('visibility', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Visibility;