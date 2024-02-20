const { UserRepository } = require("../repositories");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const utils = require("../utils");
const TokenRepository = require("../repositories/token.repository");
const { sequelize } = require("../models");
const ClientError = require("../utils/client-error");
const { StatusCodes } = require("http-status-codes");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.tokenRepository = new TokenRepository();
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      let options = {
        transaction,
      };
      const user = await this.userRepository.create(data, options);
      const token = crypto.randomBytes(32).toString("hex");
      await this.tokenRepository.create(
        { userId: user.id, token: token },
        options
      );
      const verify_url = `${process.env.BASE_URL}api/v1/verified/${user.id}/${token}`
      const email_verification_template =
        await utils.get_html_template_creation_test({
          user_name: user.name,
          verify_url: verify_url,
        });
      await utils.send_email({
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: process.env.MAIL_SUBJECT,
        html: email_verification_template,
      });
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async login(data) {
    const { email, password } = data;
    try {
      const user = await this.userRepository.getByEmail(email);
      const isPassWordValid = this.#checkPassword(password, user.password);
      if (!isPassWordValid) {
        throw new ClientError(
            'InvalidPayloadError',
            '"Email/Password Invalid"',
            'Please check the request payload',
            StatusCodes.NOT_FOUND
          )
      }
      else if(!user.verified){
        throw new ClientError(
            'VerificationError',
            'Please Verify Your Email',
            'Please check the requested email',
            StatusCodes.NOT_FOUND
          )
      } else {
        const token = this.#createToken({ email: user.email, id: user.id });
        return token;
      }
    } catch (error) {
      if (error.name === "AttributeNotFoundError" || "InvalidPayloadError" || "VerificationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    const response = this.verifyToken(token);
    if (!response) {
      throw { error: "Invalid Token" };
    }
    const user = this.userRepository.getById(response.id);
    if (!user) {
      throw { error: "No user with the corresponding Token" };
    } else {
      return "User is Authenticated";
    }
  }

  async update(params) {
    const transaction = await sequelize.transaction();
    try {
      const { id, token } = params;
      let criteria = {
        id: id,
      };
      let user_payload = {
        verified: true,
      };
      let token_payload = {
        token: token,
      };
      let options = {
        transaction,
      };
      const response = await this.userRepository.update(
        criteria,
         user_payload ,
        options
      );
      await this.tokenRepository.destroy(token_payload);
      await transaction.commit();
      return response;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        throw error;
      }
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }
  #createToken(user) {
    try {
      const token = jwt.sign(user, process.env.AUTH_SECRET_KEY, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.log("Something went wrong in the token creation");
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, process.env.AUTH_SECRET_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in the token verification");
      throw { error };
    }
  }

  #checkPassword(originalPassword, hashedPassword) {
    try {
      return bcrypt.compareSync(originalPassword, hashedPassword);
    } catch (error) {
      console.log("Something went wrong while comparing Password");
      throw { error };
    }
  }

  isAdmin(userId) {
    try {
      return this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log("Something went wrong while checking user is a Admin");
      throw { error };
    }
  }
}

module.exports = UserService;
