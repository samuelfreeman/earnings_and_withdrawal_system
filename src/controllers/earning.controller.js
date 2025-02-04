const { get_merchant_earnings } = require("../services/earning.service");
const logger = require("../utils/Logger.util");

exports.getMerchantEarnings = async (req, res, next) => {
  try {
    const { merchantId } = req.params;
    const merchantEarnings = await get_merchant_earnings(merchantId);
    res.status(200).json(merchantEarnings);
  } catch (error) {
    logger.error(error);
    next(error )
  }
};
