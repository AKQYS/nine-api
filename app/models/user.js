var bluebird = require('bluebird');
var knex = require('../../config/knex.js');
var Users = knex('users');


function User() {
    this.routes = new Routes(this);
}

User.prototype.lookup = function(username) {
    return bluebird.resolve().then(function() {
        return Users.where('username', username);
    }).then(function(res) {
        return res;
    });
};

function Routes(user) {
    var routes = {};
}

module.exports = User;

