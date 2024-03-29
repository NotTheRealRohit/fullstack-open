/* eslint-disable consistent-return */
const logger = require('./logger');

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === 'CastError') { return res.status(400).json({ message: 'Invlid id' }); }
  if (error.name === 'ValidationError') { return res.status(400).json({ error: error.message }); }
  next(error);
};

module.exports = {
  errorHandler,
};
