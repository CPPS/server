var database = require('./database');

var migration = {};

migration.model = function(model, seed) {
    return {
        model: model,
        seed: seed
    }
};

function migrate_models(models, next) {
    var element = models.shift();
    if (element) {
        element.model.sync({force : true}).then(function () {
            if (element.seed) {
                element.seed(element.model);
            }

            migrate_models(models, next);
        })
    } else {
        next();
    }
}

migration.migrate = function(models) {
    database
        .authenticate()
        .then(function () {
            console.log('Connection has been established successfully.');
            migrate_models(models, function () {
                database.sync({ force: "true"});
            });
        })
        .catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });
};

migration.seed = function(seeds) {
    database
        .authenticate()
        .then(function () {
            console.log('Connection has been established successfully.');
            seeds();
        })
        .catch(function (err) {
            console.error('Unable to connect to the database:', err);
        });
};

module.exports = migration;
