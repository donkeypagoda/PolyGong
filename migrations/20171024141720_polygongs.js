
exports.up = function(knex, Promise) {
  return knex.schema.createTable('polygongs', (table) => {
  table.increments();
  table.string('polygong_url').notNullable().unique();
  table.json('polygong_data');
  table.timestamps(true, true);
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('polygongs')
};
