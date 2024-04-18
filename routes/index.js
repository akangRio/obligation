const express = require("express");
const userController = require("../controllers/userController");
const instituteController = require("../controllers/insituteController");
const authenticating = require("../middleware/authenticator");
const errorHandler = require("../middleware/errorHandler");
const router = express.Router();

router.post("/login", userController.login);

router.use(authenticating);

router.post("/", userController.createUser);
router.post("/institute", instituteController.createInstitute);
router.put("/institute/adduser", instituteController.addUser);

router.use(errorHandler);

module.exports = router;
