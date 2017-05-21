var Sequelize = require('sequelize');
var database = require('../../utils/database');
var model = require('../../utils/model');

var User = require('./User');

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

    type: {
        type: Sequelize.STRING,
        allowNull: false
    },

    visibility: {
        type:   Sequelize.ENUM,
        values: ['public', 'protected', 'private'],
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

User.belongsToMany(Contest, {through: 'contest_users' });
Contest.belongsToMany(User, {through: 'contest_users' });

module.exports = Contest;