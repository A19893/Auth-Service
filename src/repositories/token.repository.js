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

 async update(criteria, payload, options) {
    try {
      const token = await token.update(criteria, payload, options);
      return token;
    } catch (error) {
      if(error.name === 'SequelizeValidationError'){
      throw new ValidationError(error)
      }
      console.log("Something went wrong in token repo");
      throw new AppErrors('ServerError');
    }
  }

  async destroy(criteria) {
    try {
      await token.destroy({
        where: criteria
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in token repo");
      throw { error };
    }
  }
}

module.exports  = TokenRepository;