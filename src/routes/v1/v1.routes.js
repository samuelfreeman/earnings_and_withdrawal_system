const { Router } = require("express");
const merchantRouter = require("./merchant.routes");
const orderRouter = require("./order.routes");
const earningRouter = require("./earning.routes");
const withdrawalRouter = require("./withdrawal.routes");
const customerRouter = require("./customer.routes");
const router = Router();

router.use("/merchants", merchantRouter);
router.use("/customer",customerRouter); 
router.use("/order", orderRouter);
router.use("/earning", earningRouter);
router.use("/withdrawal", withdrawalRouter);

module.exports = router;
