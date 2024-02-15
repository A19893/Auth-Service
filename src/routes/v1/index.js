const { userController } = require("../../controllers");

const router = require("express").Router();

router.post('/users', userController.create);
router.post('/signIn', userController.login)

module.exports = router;