const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require('config');

module.exports = function () {
  winston.add(
    new winston.transports.Console()
  );
  
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtException.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  winston.add(
    new winston.transports.MongoDB({
      db: config.get('db'),
      level: "error",
    })
  );
};
