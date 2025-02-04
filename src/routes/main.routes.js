const {Router} =require("express");
const versionRouter = require("./v1/v1.routes");

const app = Router();

app.use("/v1", versionRouter);

module.exports = app;