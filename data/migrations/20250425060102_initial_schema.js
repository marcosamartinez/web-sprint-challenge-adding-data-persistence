/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.text("project_name", 128).notNullable();
      tbl.text("project_description");
      tbl.boolean("project_completed").notNullable().defaultTo(false);
    })
    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.text("resource_name", 128).unique().notNullable();
      tbl.text("resource_description");
    })
    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.text("task_description").notNullable();
      tbl.text("task_notes");
      tbl.boolean("task_completed").defaultTo(false);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
