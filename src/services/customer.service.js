const knex = require("../../db/db");

// create a new customer
exports.createcustomer = async (customerData) => {
  const { name, email, phone } = customerData;

  
    const result = await knex("customer").returning("*").insert({
      name,
      email,
      phone,
    });

    return result[0];

};

// get all customers
exports.getAllcustomers = async () => {
  
    const customers = await knex.select("*").from("customer");
    
    return customers;

};
