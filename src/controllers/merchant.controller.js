const {
  createMerchant,
  getAllMerchants,
} = require("../services/merchant.service");
const logger = require("../utils/Logger.util");
exports.saveMerchant = async (req, res,next) => {
  try {
    const merchant = await createMerchant(req.body);
    res.status(200).json({ message: "Merchant saved successfully", merchant });
  } catch (error) {
    logger.error(error);
    next(error)
  }
};

exports.retrieveMerchants = async (req, res,next) => {
  try {
    const merchants = await getAllMerchants();

    res.status(200).json({ merchants });
  } catch (error) {
    logger.error(error);
    next(error)
  }
};
