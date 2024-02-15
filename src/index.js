const express = require("express");
const { PORT } = require("./config/serverConfig");
// const { UserService } = require("./services");
const { User, Role } = require("./models");
const db = require("./models");
const setupAndStartServer = async () => {
  const app = express();
  app.use(express.json({ limit: "50mb", extended: true }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use("/api", require("./routes"));

  app.listen(PORT, async function () {
    console.clear();
    console.log(`Server listening on port ${PORT}`);
    // if(process.env.DB_SYNC){
    // db.sequelize.sync({alter:true})
    // }
    // const u1 = await User.findByPk(1);
    // const r1 = await Role.findByPk(1);
    // u1.addRole(r1);
    // const response = await u1.hasRole(r1);
    // console.log(response)
    // const service = new UserService();
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inlhc2gxMkBnbWFpbC5jb20iLCJpZCI6MiwiaWF0IjoxNzA3OTkyMjcxLCJleHAiOjE3MDc5OTU4NzF9.6huXl_XVAuAtQ2ee-iBCTjntvXklv6ifc9_5ekf3Eu8"
    // const response = service.verifyToken(token)
    // console.log(response)
    // const token = service.createToken({email : "yash12@gmail.com", id:2});
    // console.log(token)
  });
};

setupAndStartServer();
