exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('locations').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('locations').insert({
                    address: '285 Fulton St, New York, NY 10007',
                    check_in_code: 1234567890
                }),
                knex('locations').insert({
                    address: '123 Paper Street',
                    check_in_code: 11112222
                })
            ]);
        });
};
