const {
  requestWithdrawal,
  getWithdrawals
} = require("../services/withdrawal.service");
const logger = require("../utils/Logger.util");

exports.submitWithDrawalRequest = async (req, res,next) => {
  try {
    const { merchantId } = req.params;
    const { amount } = req.body;
    const withdrawal = await requestWithdrawal(merchantId, amount);
    res.status(200).json(withdrawal);
  } catch (error) {
    logger.error(error);
    next(error)
    
  }
};

exports.retrieveAllWithdrawals = async (req, res,next) => {
  try {
    const { merchantId } = req.params;
    const withdrawals = await getWithdrawals(merchantId);
    res.status(200).json({ withdrawals });
  } catch (error) {
    logger.error(error);
    next(error)
  }
};
