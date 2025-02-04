/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
 return knex.schema.alterTable("merchant", function (table) {
    table.decimal("totalEarnings", 10, 2).defaultTo(0.0).notNullable;
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.alterTable("merchant", function (table) {
    table.dropColumn("totalEarnings");
  });
};
