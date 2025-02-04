const { createOrder } = require("../services/order.service");
const logger = require("../utils/Logger.util");

exports.make_an_order = async (req, res,next) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    logger.error(error);
    next(error)
  }
};
