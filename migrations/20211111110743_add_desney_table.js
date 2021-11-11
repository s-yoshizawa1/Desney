exports.up = function(knex, Promise) {
    // create the 'attraction_info' table with two columns
    return knex.schema.createTable("attraction_info", (t) => {
      t.increments() // auto-incrementing id column
        .index(); // index this column
 
      t.string("attraction_name", 100)
        .notNullable()
        .unique();
    });
  };
 
  exports.down = function(knex, Promise) {
    // undo this migration by destroying the 'attraction_info' table
    return knex.schema.dropTable("attraction_info");
  };