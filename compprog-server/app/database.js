var config = require('config');
var configuration = config.get('database');

// var database = 'hello';
// var username = 'hello';
// var password = 'hello';
//
// var connection = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
//
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

module.exports = connection;