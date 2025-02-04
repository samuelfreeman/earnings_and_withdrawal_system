const { param } = require("express-validator");

exports.earningValidationRules = [
  param("merchantId")
    .notEmpty()
    .withMessage("Merchant Id is Required")
    .isString()
    .isUUID()
    .withMessage("Merchant Id must be a valid UUID"),
];
