const ValidateUserSignup = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email/Password is missing in payload",
    });
  }

  next();
};

const validateAdminRequest = (req,res,next) => {
  if (!req.body.id) {
    return res.status(400).json({
        success: false,
        data: {},
        err: "Id is not given",
        mesage: "Something went wrong"
    });
  }

  next();
};
module.exports = { ValidateUserSignup, validateAdminRequest };
