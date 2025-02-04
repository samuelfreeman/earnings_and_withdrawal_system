const { Router } = require("express");
const order = require("../../controllers/order.controller");
const { orderValidationRules } = require("../../validation/order.model");
const {
  validateRequest,
} = require("../../middlewares/validationRequest.middleware");
const validate = [...orderValidationRules, validateRequest];
const router = Router();

router.post("/", validate, order.make_an_order);

module.exports = router;
