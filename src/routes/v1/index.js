const { userController } = require("../../controllers");

const router = require("express").Router();

router.post('/users', userController.create);

module.exports = router;