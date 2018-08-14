import { createLogger, format, transports } from 'winston'; // import only some objects from winston libary.

const { combine, timestamp, label, printf, colorize, align } = format;

const logsFormat = printf(info => `${info.timestamp} ${info.level} ${info.label}: ${info.message}`);

const Logger = location => {
  const consoleLogger = new transports.Console({
    level: 'info',
    format: combine(colorize(), timestamp(), align(), label({ label: location }), logsFormat),
  });
  const fileLogger = new transports.File({
    filename: 'logs/combined',
    level: 'debug',
    format: combine(colorize(), timestamp(), align(), label({ label: location }), logsFormat),
  });
  const logger = createLogger({ transports: [consoleLogger, fileLogger] });
  return logger;
};

export default Logger;
