const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");


const logDirectory = path.join(__dirname, "../logs");


const dailyRotateTransport = new winston.transports.DailyRotateFile({
  dirname: logDirectory,
  filename: "app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m", 
  maxFiles: "14d", 
});


const errorRotateTransport = new winston.transports.DailyRotateFile({
  dirname: logDirectory,
  filename: "error-%DATE%.log",
  level: "error",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d",
});

// defining the  log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
//   winston.format.printf(({ timestamp, level, message, stack }) => {
//     return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
//   })
);

// created the  Winston logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    dailyRotateTransport,
    errorRotateTransport,
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDirectory, "exceptions.log") }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logDirectory, "rejections.log") }),
  ],
});

// enabling console logging in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}


module.exports = logger;
