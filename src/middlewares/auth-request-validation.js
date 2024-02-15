const ValidateUserSignup = (req, res, next) =>{
   if(!req.body.email || !req.body.password){
    return res.status(400).json({
        success: false,
        data: {},
        message: "Something went wrong",
        err:"Email/Password is missing in payload"
    })
   }

   next();
}

const ValidateToken = (req,res,next) => {

}
module.exports ={ValidateUserSignup, ValidateToken}

