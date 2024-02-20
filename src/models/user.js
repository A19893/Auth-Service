'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/serverConfig');
const { Sequelize } = require('./index');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles'
      })
      
      this.hasOne(models.token, {
        foreignKey: "userId",
        sourceKey: "id",
        as:"usersTokens"
      })
    }
  }
  User.init({
    uuid:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        len: [3,100]
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async(user) => {
   const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
   user.password = hashedPassword;
  })
  return User;
};

