/// Importing express package and other middlewares
const express = require("express");
const mainRoute = require("./src/routes/main.routes");
const app = express(); 
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
const PORT = process.env.PORT || 8080;

const helmet = require("helmet");

const cors = require("cors");
const compression = require("compression");
const bodyparser = require("body-parser");

app.use(cors({ origin: true, credentials: true }));

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

// middleware for body parser
app.use(bodyparser.json());

app.use("/api", mainRoute);


app.use((err, req, res,next ) => {
  console.log("error message",err);
  
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", `http://localhost:${PORT}`);
});
