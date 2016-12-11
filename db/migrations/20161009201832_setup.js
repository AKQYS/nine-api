exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists('users', function(table) {
            table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').unique().notNullable();
            table.binary('hash').notNullable();
            table.timestamps(true, true);   // Not nullable, and default to the current timestamps
        }),
        knex.schema.createTableIfNotExists('tags', function(table) {
            table.increments('id').primary();
            table.string('name', 10).unique();
        }),
        knex.schema.createTableIfNotExists('locations', function(table) {
            table.increments('id').primary();
            table.integer('check_in_code', 10).unique();
            table.string('address', 255);
        }),
        knex.schema.createTableIfNotExists('uploads', function(table) {
            table.increments('id').primary();
            table.string('title', 255);
            table.integer('location_id', 255);
            table.string('tags', 255);
        }),
        knex.schema.createTableIfNotExists('footage', function(table) {
            table.increments('id').primary();
            table.integer('upload_id', 255);
            table.string('key', 255).unique();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('tags'),
        knex.schema.dropTable('locations'),
        knex.schema.dropTable('uploads'),
        knex.schema.dropTable('footage')
    ]);
};
