const { body } = require("express-validator");

exports.merchantValidationRules = [
  body("name").notEmpty().withMessage("Username is Required").isString(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),
  body("phone")
    .notEmpty()
    .withMessage("Phone Number is required")
    .isMobilePhone("any")
    .withMessage("Must be a valid phoneNumber"),
];
