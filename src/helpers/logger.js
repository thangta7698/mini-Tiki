const winston = require("winston");
const { format, transports } = winston;

const custom = format.printf((info) => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

const Logger = winston.createLogger({
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.colorize(),
    custom
  ),
  transports: [new transports.Console()],
});

module.exports = Logger;
