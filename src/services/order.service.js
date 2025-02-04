const knex = require("../../db/db");
// create an order
exports.createOrder = async (orderData) => {
  // get data from controller
  const { merchant_id, total_amount, customer_id } = orderData;

  const trx = await knex.transaction(); // initiate transaction
  try {
    // check if the merchant exists
    const find_merchant = await trx("merchant")
      .where({ id: merchant_id })
      .first()
      .returning("*");

    if (!find_merchant) {
      throw new Error("Invalid merchant ID");
    } else {
      // register the order
      const [order] = await trx("order").returning("*").insert({
        merchant_id,
        customer_id,
        total_amount,
      });

      // calculate and register the merchant's earnings
      const merchant_percentage = total_amount * 0.1;
      const merchant_earnings = total_amount - merchant_percentage;
      
      // register the earnings
      const [earnings] = await trx("earning")
        .insert({
          merchant_id,
          amount: merchant_earnings,
          order_id: order.id,
        })
        .returning("*");

      // sum up the amount of all available earnings where withdrawn is false
      const find_earnings = await trx("earning")
        .where({ is_withdrawn: false })
        .sum("amount as sum") // use alias to get the total sum
        .first();

      // Ensure find_earnings.sum is numeric, and extract the value
      const totalEarnings = Number(find_earnings.sum); 

      // update the merchant's total earnings
      const [merchant] = await trx("merchant")
        .where({ id: merchant_id })
        .update({ total_earnings: totalEarnings })
        .returning("*");

      await trx.commit(); // commit transaction

      return { order, earnings, merchant };
    }
  } catch (error) {
    await trx.rollback();

    throw error;
  }
};
