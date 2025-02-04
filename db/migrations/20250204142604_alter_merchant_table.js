/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("merchant", function (table) {
       table.renameColumn("totalEarnings", "total_earnings");
     });
   };
   
   /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
   exports.down = function (knex) {
     knex.schema.alterTable("merchant", function (table) {
       table.dropColumn("total_earnings");
     });
   };
   