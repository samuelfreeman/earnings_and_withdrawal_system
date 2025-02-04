/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("earning", (table) => {
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
      .uuid("order_id")
      .notNullable()
      .references("id")
      .inTable("order")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table.boolean("is_withdrawn").defaultTo(false);
    table
      .dateTime("created_at")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("earning");
};
