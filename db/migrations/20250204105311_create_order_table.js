/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("merchant_id")
      .notNullable()
      .references("id")
      .inTable("merchant")
      .onDelete("CASCADE")
      .onUpdate("CASCADE"); // Foreign key linking to merchants
    table.decimal("total_amount", 10, 2).notNullable(); // Order amount
    table.string("status").notNullable().defaultTo("completed"); // Order status (e.g., pending, completed)
    table.timestamps(true, true); // created_at & updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("order");
};
