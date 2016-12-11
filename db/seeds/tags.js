exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('tags').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('tags').insert({name: 'hurricane'}),
                knex('tags').insert({name: 'flooding'}),
                knex('tags').insert({name: 'car bomb'}),
                knex('tags').insert({name: 'fire'})
            ]);
        });
};