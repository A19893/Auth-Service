const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models");
const ClientError = require("../utils/client-error");
const AppErrors = require("../utils/error-handler");
const ValidationError = require("../utils/validation-error");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if(error.name === 'SequelizeValidationError'){
      throw new ValidationError(error)
      }
      console.log("Something went wrong in user repo");
      throw new AppErrors('ServerError');
    }
  } 

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in user repo");
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.log("Something went wrong in user repo");
      throw { error };
    }
  }

  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if(!user){
        throw new ClientError(
          'AttributeNotFoundError',
          'Invalid Email sent in the request',
          'Please check the request, as there is no record of email',
          StatusCodes.NOT_FOUND
        )
      }
      return user;
    } catch (error) {
      console.log("Something went wrong in user repo");
      throw  error ;
    }
  }

  async isAdmin(userId){
    try{
     const user = await User.findByPk(userId);
     const adminRole =  await Role.findOne({
      where: {
        name: 'Admin'
      }
     });
     return await user.hasRole(adminRole)
    }
    catch(error){
      console.log("Something went wrong on repository layer");
      throw {error};
    }
  }
}

module.exports = UserRepository;
