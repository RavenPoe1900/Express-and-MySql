const CustomError = require('../utils/customError');
const {logger} = require('../utils/logger');
module.exports = (err, req, res, next) => {
    let customError = err;

  if (!(err instanceof CustomError)) {
    logger(err, 'Error', 'red');
    customError = new CustomError(
      `Server Error`
    );
  }
  res.status((customError).status).send(customError);
  next();
}