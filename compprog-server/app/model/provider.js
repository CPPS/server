var Sequelize = require('sequelize');
var database = require('../../utils/database')();

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

Provider.render = function (data) {
    data = data.dataValues;

    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    return data;
};

module.exports = Provider;