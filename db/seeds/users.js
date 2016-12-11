var bcrypt = require('bcrypt');
var bluebird = require('bluebird');

var bcryptHash = bluebird.promisify(bcrypt.hash);



exports.seed = function (knex, Promise) {
    return bcryptHash('password', 10).then(function(hash) {
        // Deletes ALL existing entries
        return knex('users').del()
            .then(function () {
                return Promise.all([
                    // Inserts seed entries
                    knex('users').insert({
                        email: 'jack.daniels@nine.com',
                        first_name: "Jack",
                        last_name: "Daniels",
                        hash: hash
                    })
                ]);
            });
    });
};
