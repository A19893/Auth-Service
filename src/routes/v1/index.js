const { userController } = require("../../controllers");
const { AuthRequestMiddleware } = require("../../middlewares");

const router = require("express").Router();

router.post('/users', AuthRequestMiddleware.ValidateUserSignup ,userController.create);
router.post('/signIn', userController.login);
router.get('/isAuthenticated', userController.isAuthenticated);
module.exports = router;