// config/passport.js

// load all the things weneed
var bcrypt = require('bcrypt');
var bluebird = require('bluebird');
var LocalStrategy   = require('passport-local').Strategy;
var utils = require('../utils');

// load up the user model
var User = require('../app/models/user');
var user = new User();

var bcryptHash = bluebird.promisify(bcrypt.hash);
var bcryptCompare = bluebird.promisify(bcrypt.compare);

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(item, done) {
        done(null, item.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        user.lookup(email).then(function(res) {
            done(null, res[0]);
        }).catch(function(err) {
            done(err, false);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            console.log(req.body, email, password);

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            return user.lookup(email).then(function(res) {
                if (!res[0]) {
                    throw new utils.HttpError(401, 'The username or password you entered is incorrect')
                }

                this.user = res[0];
                return bcryptCompare(password, this.user.hash);
            }).then(function(match) {
                if (match) {
                    done(null, this.user);
                } else {
                    throw new utils.HttpError(401, 'The username or password you entered is incorrect')
                }
            }).catch(function(err) {
                done(err);
            });
        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            return user.lookup(email).then(function(res) {
                if (res.length) {
                    throw new utils.HttpError(409, 'That email address is already in use')
                }
            }).then(function () {
                return bcryptHash(password, 10);
            }).then(function (hash) {
                this.hash = hash;
                return user.create({
                    email: email,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    hash: hash
                });
            }).then(function() {
                return user.lookup(email);
            }).then(function (res) {
                if (!res) {
                    throw new utils.HttpError(409, 'User was not created. Please try again.');
                }
                done(null, res[0]);
            }).catch(function(err) {
                done(err);
            });
        }));
};
