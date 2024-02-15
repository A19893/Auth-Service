const { UserRepository } = require("../repositories");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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

    async login(data){
        const {email, password} = data;
        try{
            const user = await this.userRepository.getByEmail(email)
            if(user){
                const isPassWordValid = this.#checkPassword(password, user.password);
                if(!isPassWordValid){
                    throw {error:"Email/Password Invalid"}
                }
                else{
                    const  token = this.#createToken({email: user.email, id: user.id});
                    return token;
                }
            }
            else{
                throw {error:"Email/Password Invalid"}
            }
        }
        catch(error){
            console.log("Something went wrong in the service layer");
            throw {error}
        }
    }

    #createToken(user){
       try{
         const token = jwt.sign(user,process.env.AUTH_SECRET_KEY,{expiresIn: '1h'});
         return token;
       }
       catch(error){
        console.log("Something went wrong in the token creation");
        throw {error}
       }
    }

    #verifyToken(token){
        try{
            const response = jwt.verify(token, process.env.AUTH_SECRET_KEY)
            return response;
          }
          catch(error){
           console.log("Something went wrong in the token verification");
           throw {error}
          }
    }

    #checkPassword(originalPassword, hashedPassword){
        try{
          return bcrypt.compareSync(originalPassword, hashedPassword);
        }
        catch(error){
            console.log("Something went wrong while comparing Password");
            throw {error};
        }
    }
}

module.exports = UserService;