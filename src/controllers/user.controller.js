const { UserService } = require("../services");

const userService = new UserService();
const create =  async(req,res) => {
    try{
     const user = await userService.create(req.body);
     return res.status(201).json({
        message: "User Created Successfully",
        data: user,
        success: true
     })
    } 
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err : error
        })
    }    
}

module.exports ={ create}