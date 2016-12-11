var bluebird = require('bluebird');
var knex = require('../../config/knex.js');
var Users = knex('users');

function User() {
    this.routes = new Routes(this);
}

User.prototype.lookup = function(email) {
    return knex('users').where('email', email).then(function(rows) {
        return rows;
    });
};

User.prototype.create = function(user) {
    return Users.insert({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        hash: user.hash
    });
};

function Routes(user) {
    var routes = {};
}

module.exports = User;

