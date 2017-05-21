var TueStrategy = require('./strategies/tue');

// initialize all passport authentication strategies here
module.exports = function(passport) {

    // TUe authentication
    TueStrategy(passport);

};