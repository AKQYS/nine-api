exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('uploads').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('uploads').insert({
                    title: 'Hurricane Matthew',
                    location_id: 1,
                    tags: 'hurricane, flooding'
                }),
                knex('uploads').insert({
                    title: 'Car Bomb causes Huge Fire',
                    location_id: 2,
                    tags: 'bombing, fire, car bomb'
                })
            ]);
        });
};