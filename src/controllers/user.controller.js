const { UserService } = require("../services");
const userService = new UserService();
const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    
    return res.status(201).json({
      message: "User Created Successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    return res.status(200).json({
      message: "User Login Successfully",
      data: response,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "User is Authenticated",
      data: response,
      success: true,
      //    err : {}
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      success: true,
      message: "Successfully fetch user is Admin or Not",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
  const response = await userService.update(req.params);
  return res.status(200).json({
    // data: response,
    success: true,
    message: "Successfully done with verification of user",
  });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = { create, login, isAuthenticated, isAdmin, verifyEmail };
