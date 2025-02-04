// Update with your config settings.

require("dotenv").config({path:"../.env"});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "earningsdb",
      user: "postgres",
      password: "0912",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory:"./migrations",
    },
  },
};
