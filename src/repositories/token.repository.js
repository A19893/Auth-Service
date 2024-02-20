const AppErrors = require("../utils/error-handler");
const ValidationError = require("../utils/validation-error");
const { token } = require('../models')

class TokenRepository {
 async create(data, options){
    try{
     const response = await token.create(data, options);
     return response;
    }
    catch(error){
        console.log(error)
        if(error.name === 'SequelizeValidationError'){
            throw new ValidationError(error)
            }
            console.log("Something went wrong in token repo");
            throw new AppErrors('ServerError');
    }
 }
}

module.exports  = TokenRepository;