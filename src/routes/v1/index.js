const { userController } = require("../../controllers");
const { AuthRequestMiddleware } = require("../../middlewares");

const router = require("express").Router();

router.post('/users', AuthRequestMiddleware.ValidateUserSignup ,userController.create);
router.post('/signIn', userController.login);
router.get('/verified/:id/:token', userController.verifyEmail);
router.get('/isAuthenticated', userController.isAuthenticated);
router.get('/isAdmin', AuthRequestMiddleware.validateAdminRequest, userController.isAdmin)
module.exports = router;