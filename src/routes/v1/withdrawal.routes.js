const { Router } = require("express");
const router = Router();
const withdrawal = require("../../controllers/withdrawal.controller");
const {
  withdrawalValidationRules,
  getWithdrawalsValidationRules
} = require("../../validation/withdrawal.model");
const {
  validateRequest
} = require("../../middlewares/validationRequest.middleware");
const validate = [...withdrawalValidationRules, validateRequest];
const getValidate = [...getWithdrawalsValidationRules, validateRequest];

router.post("/:merchantId", validate, withdrawal.submitWithDrawalRequest);
router.get("/:merchantId", getValidate, withdrawal.retrieveAllWithdrawals);
module.exports = router;
