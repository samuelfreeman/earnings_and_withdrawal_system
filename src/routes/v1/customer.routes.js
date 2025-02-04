const { Router } = require("express");
const customer = require("../../controllers/customer.controller");
const { customerValidationRules } = require("../../validation/customer.model");
const {
  validateRequest
} = require("../../middlewares/validationRequest.middleware");
const validate = [...customerValidationRules, validateRequest];
const router = Router();

router.post("/signup", validate, customer.savecustomer);
router.get("/", customer.retrievecustomers);

module.exports = router;
