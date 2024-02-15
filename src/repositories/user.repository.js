const { User, Role } = require("../models");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in user repo");
      throw { error };
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
      return user;
    } catch (error) {
      console.log("Something went wrong in user repo");
      throw { error };
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
