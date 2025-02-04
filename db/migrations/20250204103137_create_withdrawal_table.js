/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("withdrawal", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("merchant_id")
      .notNullable()
      .references("id")
      .inTable("merchant")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.decimal("amount", 10, 2).notNullable();
    table
      .enum("status", ["pending", "completed", "failed"])
      .defaultTo("pending");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("withdrawal");
};
