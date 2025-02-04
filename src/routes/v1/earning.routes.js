const { Router } = require("express");
const router = Router();
const earning = require("../../controllers/earning.controller");
const { earningValidationRules } = require("../../validation/earning.model");
const {
  validateRequest,
} = require("../../middlewares/validationRequest.middleware");
const validate = [...earningValidationRules, validateRequest];
router.get("/:merchantId", validate, earning.getMerchantEarnings);

module.exports = router;
