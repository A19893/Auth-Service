require("dotenv").config();

module.exports = {
  PORT: process.env.APP_PORT,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS)
};
