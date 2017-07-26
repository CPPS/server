var LocalStrategy = require('passport-local').Strategy;
var User = require('../../../model/user');
var config = require('../../../config/app.json');

// LDAP authentication, used by TU/e
var ldap = require('ldapjs');
var EqualityFilter = ldap.filters.EqualityFilter;
var client = ldap.createClient({
    url: config.tueLdap.url
});

// Flash login messages
var incorrectCredentials = 'Username or password is incorrect, please try again.';


module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(function(err) {
                done(err);
            });
    });

    // TU/e login strategy
    //
    // This will accept any valid TU/e user, even users
    // that have not logged in before. For these new users
    // it will register them in our database and call the
    // appropriate handlers to set up default user settings
    // such as access to contests.
    passport.use('tue-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // passes back the entire request to the callback
    }, function(req, username, password, done) {

            getTUeUserAccount(username, password, function(err, ldapUser) {
                if (err) {
                    return done(err);
                }

                if (ldapUser) {
                    // valid TU/e user credentials
                    // check if user is new in our system
                    User.findOne({
                        where: {
                            tueId: username
                        }
                    })
                        .then(function(dbUser) {
                            if (!dbUser) {
                                // new user -> register!
                                registerUser(ldapUser, function(err, dbUser) {
                                    if (err) {
                                        return done(err);
                                    }
                                    return done(null, dbUser);
                                });
                            } else {
                                // existing user -> login
                                return done(null, dbUser);
                            }
                        })
                        .catch(function(err) {
                            return done(err);
                        })
                } else {
                    // invalid credentials
                    return done(null, false, req.flash('message', incorrectCredentials));
                }
            });

    }));
};

/**
 * Get user data from TU/e ldap authentication service.
 * @param username The username (s-number)
 * @param password The user's password
 * @param callback Callback(err, user)
 */
function getTUeUserAccount(username, password, callback) {
    var TUEUsername = 'TUE\\' + username;

    client.bind(TUEUsername, password, function(err) {
        if (err) {
            // invalid credentials
            return callback(null, null);
        } else {
            var searchOpts = {
                scope: 'sub',
                attributes: ['mail', 'name', 'sAMAccountName'], // select attributes to return (remove to return all attributes)
                                                                // sAMAccountName is student s-number
                filter: new EqualityFilter({ // make filter: (samaccountname=<username>), prevent injection
                    attribute: config.tueLdap.accountNameAttribute,
                    value: username}) // without TUE\
            };

            var searchResult = null;

            client.search(config.tueLdap.base, searchOpts, function(err, ldapRes) {
                if (err) {
                    return callback(err);
                }

                ldapRes.on('searchEntry', function(entry) {
                    searchResult = entry.object;
                });
                ldapRes.on('error', function(error) {
                    // not sure if this will also call 'end', if not, callback should be called back here
                    // todo find out
                });
                ldapRes.on('end', function(result) {
                    callback(null, searchResult);
                });
            });
        }
    });
}

/**
 * Registers the TU/e user in the system.
 * @param ldapUser The user returned by the ldap TU/e authentication
 * @param done callback(err, user) where user is a record of the User model
 */
function registerUser(ldapUser, done) {
    User.create({
        name: ldapUser.name,
        tueId: ldapUser.sAMAccountName,
        username: ldapUser.sAMAccountName,
        email: ldapUser.mail,
        password: null,
        token: User.generateToken()
    })
        .then(function(user) {
            done(null, user);
        })
        .catch(function(err) {
            done(err);
        })
}