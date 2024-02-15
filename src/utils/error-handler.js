const { StatusCodes } = require('http-status-codes')

class AppErrors extends Error {
  constructor(name = 'AppError', message = "Something Went Wrong", description = "Something Went Wrong", statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
   super();
    this.message = message;
    this.description = description;
    this.name = name
    this.statusCode = statusCode
  }
}


module.exports = AppErrors;