const { Router } = require("express");
const merchant = require("../../controllers/merchant.controller");
const { merchantValidationRules } = require("../../validation/merchant.model");
const { earningValidationRules } = require("../../validation/earning.model");
const {
  validateRequest
} = require("../../middlewares/validationRequest.middleware");
const validate = [...merchantValidationRules, validateRequest];
const {
  withdrawalValidationRules,
  getWithdrawalsValidationRules
} = require("../../validation/withdrawal.model");

const postValidateWithdraw = [...withdrawalValidationRules, validateRequest];
const getValidateWithdraw = [...getWithdrawalsValidationRules, validateRequest];

const earnings = require("../../controllers/earning.controller");
const validateEarnings = [...earningValidationRules, validateRequest];
const withdrawal = require("../../controllers/withdrawal.controller");
const router = Router();

router.post("/signup", validate, merchant.saveMerchant);
router.get("/", merchant.retrieveMerchants);
router.get(
  "/:merchantId/earnings",
  validateEarnings,
  earnings.getMerchantEarnings
);

router.post(
  "/:merchantId/withdrawals",
  postValidateWithdraw,
  withdrawal.submitWithDrawalRequest
);
router.get(
  "/:merchantId/withdrawals",
  getValidateWithdraw,
  withdrawal.retrieveAllWithdrawals
);

module.exports = router;
