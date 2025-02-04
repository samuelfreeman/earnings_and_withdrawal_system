const knex = require("../../db/db");

// create a new merchant
exports.createMerchant = async (merchantData) => {
  const { name, email, phone } = merchantData;

  
    const result = await knex("merchant").returning("*").insert({
      name,
      email,
      phone,
    });

    return result[0];

};

// get all merchants
exports.getAllMerchants = async () => {
  
    const merchants = await knex.select("*").from("merchant");
    
    return merchants;

};

// get a merchant by ID
exports.getMerchantById = async (id) => {
  
    const merchant = await knex("merchant").where({ id }).first();
    return merchant;
  
};

// update a merchant by ID
exports.updateMerchantById = async (id, merchantData) => {
  const { name, email, phone } = merchantData;

  
    const result = await knex("merchant")
      .where({ id })
      .update({ name, email, phone });

    return result;
 
};

// delete a merchant by ID
exports.deleteMerchantById = async (id) => {
  
    const result = await knex("merchant").where({ id }).del();
    return result;
  
   
};


