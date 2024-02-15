const { UserRepository } = require("../repositories");
const jwt = require("jsonwebtoken")
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
          const user = await this.userRepository.create(data);
          return user;
        }
        catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    createToken(user){
       try{
         const token = jwt.sign(user,process.env.AUTH_SECRET_KEY,{expiresIn: '1h'});
         return token;
       }
       catch(error){
        console.log("Something went wrong in the token creation");
        throw {error}
       }
    }

    verifyToken(token){
        try{
            const response = jwt.verify(token, process.env.AUTH_SECRET_KEY)
            return response;
          }
          catch(error){
           console.log("Something went wrong in the token verification");
           throw {error}
          }
    }
}

module.exports = UserService;