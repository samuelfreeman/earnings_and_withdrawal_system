const { validationResult } = require("express-validator");
const logger = require("../utils/Logger.util");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = {
      status: 400,
      error: "Validation error",
      errors: errors.array()
    };
    logger.error(errorObj);
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array()
    });
  }
  next();
};

module.exports = { validateRequest };
