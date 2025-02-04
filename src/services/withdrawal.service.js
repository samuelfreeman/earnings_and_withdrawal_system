const knex = require("../../db/db");
exports.requestWithdrawal = async (merchant_id, amount) => {
  const trx = await knex.transaction();

  if (trx){

  
    // get the merchant's available earnings (sum of unwithdrawn earnings)
    const { available_earnings } = await trx("earning")
      .where({ merchant_id, is_withdrawn: false })
      .sum("amount as available_earnings")
      .first();

    if (!available_earnings || available_earnings < amount) {
      throw new Error("Insufficient balance for withdrawal.");
    }

    // create a withdrawal record
    const [withdrawal] = await trx("withdrawal")
      .insert({
        merchant_id,
        amount,
        status: "pending",
      })
      .returning(["id", "merchant_id", "amount", "status", "created_at"]);

    // mark earnings as withdrawn (until amount is covered)
    let remainingAmount = amount;
    const earningsToUpdate = await trx("earning")
      .where({ merchant_id, is_withdrawn: false })
      .orderBy("created_at", "asc");

    for (const earning of earningsToUpdate) {
      if (remainingAmount <= 0) break;

      if (earning.amount <= remainingAmount) {
        // mark full earning as withdrawn
        await trx("earning")
          .where({ id: earning.id })
          .update({ is_withdrawn: true, amount: 0 });
        remainingAmount -= earning.amount;
      } else {
        // partially withdraw from this earning (not marking as fully withdrawn)
        await trx("earning")
          .where({ id: earning.id })
          .update({ amount: earning.amount - remainingAmount });
        remainingAmount = 0;
      }
    }

    // calculate remaining total earnings
    const { remaining_earnings } = await trx("earning")
      .where({ merchant_id, is_withdrawn: false })
      .sum("amount as remaining_earnings")
      .first();

    // update merchant's total earnings
    await trx("merchant")
      .where({ id: merchant_id })
      .update({ total_earnings: remaining_earnings || 0 });

    await trx.commit();

    return withdrawal;
  }else{

    await trx.rollback();
  }
    
  
};

exports.getWithdrawals = async (merchant_id) => {
  
    const withdrawals = await knex("withdrawal")
      .where({ merchant_id: merchant_id })
      .select("id", "amount", "status", "created_at")
      .orderBy("created_at", "desc");

    return withdrawals;
 
};
