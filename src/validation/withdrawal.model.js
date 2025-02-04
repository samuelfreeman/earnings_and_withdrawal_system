const { param, body } = require("express-validator");

exports.withdrawalValidationRules = [
  param("merchantId")
    .notEmpty()
    .withMessage("Merchant Id is Required")
    .isString()
    .isUUID()
    .withMessage("Merchant Id must be a valid UUID"),
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isFloat({ decimalPlaces: 2 })
    .withMessage("amount must be a number"),
];

exports.getWithdrawalsValidationRules = [
  param("merchantId")
    .notEmpty()
    .withMessage("Merchant Id is Required")
    .isString()
    .isUUID()
    .withMessage("Merchant Id must be a valid UUID"),
];
