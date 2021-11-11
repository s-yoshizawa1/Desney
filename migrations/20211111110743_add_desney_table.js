exports.up = function(knex, Promise) {
    // create the 'attraction_info' table with two columns
    return knex.schema.createTable("attraction_info", (t) => {
      t.increments() // auto-incrementing id column
        .index(); // index this column
 
      t.string("attraction_name", 100)
        .notNullable()

    t.string("attraction_name_kana", 100)

    t.string("attraction_name_tusho", 100)

    t.string("area", 100)

    t.string("theme", 100)

    t.string("img_pass", 100)

    t.string("fast_passport", 100)

    t.string("priority_seating", 100)

    t.integer("average_waiting_time_during_busy_season")

    t.integer("average_waiting_time_during_low_season")

    t.string("congestion_level", 100)

    t.integer("ride_time")

    t.integer("vehicle_capacity")

    t.integer("number_of_vehicles")

    t.integer("total_number_of_vehicles")

    t.integer("next_interval")

    t.string("recommended_person", 100)

    t.timestamp("rec_create_date")

    t.timestamp("rec_updated_date")
    });
  };
 
  exports.down = function(knex, Promise) {
    // undo this migration by destroying the 'attraction_info' table
    return knex.schema.dropTable("attraction_info");
  };