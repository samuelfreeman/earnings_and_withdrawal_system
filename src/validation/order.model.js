const { body } = require("express-validator");

exports.orderValidationRules = [
  body("merchant_id")
    .notEmpty()
    .withMessage("merchantId is Required")
    .isString()
    .isUUID(),
  body("customer_id")
    .notEmpty()
    .withMessage("customerId is Required")
    .isString()
    .isUUID()
    .withMessage("customerId must be a valid UUID"),

  body("total_amount")
    .notEmpty()
    .withMessage("total amount is required")
    .isFloat({ decimalPlaces: 2 })
    .withMessage("total amount must be a number")
];
