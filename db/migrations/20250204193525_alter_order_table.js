/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("order", function (table) {
    table
      .uuid("customer_id")
      .notNullable()
      .references("id")
      .inTable("customer")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("order", function (table) {
    table.dropColumn("customer_id");
  });
};
