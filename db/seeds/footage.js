exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('footage').del()
        .then(function () {
            return Promise.all([
                // Inserts seed entries
                knex('footage').insert({
                    upload_id: 1,
                    key: "59856f83-c26e-4105-96cd-87a0be0ea89c"
                }),
                knex('footage').insert({
                    upload_id: 1,
                    key: "33b14ae4-e8d6-481f-aaeb-2d458eeadc22"
                }),
                knex('footage').insert({
                    upload_id: 1,
                    key: "28dbfee7-11a6-472b-b433-137a31cc5bdc"
                }),
                knex('footage').insert({
                    upload_id: 2,
                    key: "5193c9f6-0b4a-4aee-9404-08bd03908419"
                })
            ]);
        });
};