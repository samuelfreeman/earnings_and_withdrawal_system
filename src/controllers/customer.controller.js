const {
  createcustomer,
  getAllcustomers
} = require("../services/customer.service");
const logger = require("../utils/Logger.util");
exports.savecustomer = async (req, res, next) => {
  try {
    const customer = await createcustomer(req.body);
    res.status(200).json({ message: "customer saved successfully", customer });
  } catch (error) {
    logger.error(error);
    next(error );
  }
};

exports.retrievecustomers = async (req, res, next) => {
  try {
    const customers = await getAllcustomers();

    res.status(200).json({ customers });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
