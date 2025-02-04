const knex = require("../../db/db");

// get merchant earnings

exports.get_merchant_earnings = async (id) => {
  
    const merchant_earnings = await knex("earning")
      .where({ merchant_id: id })
      .orderBy("created_at", "desc");

    const [merchant_total_earnings] = await knex("merchant")
      .where({
        id,
      })
      .select("total_earnings");

    return {
      earnings: merchant_earnings,

      total_earnings: merchant_total_earnings.total_earnings,
    };
  
};
