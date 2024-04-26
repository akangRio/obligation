const express = require("express");
const userController = require("../controllers/userController");
const instituteController = require("../controllers/insituteController");
const authenticating = require("../middleware/authenticator");
const errorHandler = require("../middleware/errorHandler");
const router = express.Router();

router.post("/login", userController.login);

router.use(authenticating);

router.get("/user", userController.getUsers);
router.post("/user", userController.createUser);
router.put("/user/edit", userController.editUser);
router.put("/user/password", userController.editUserPassword);

router.get("/institute", instituteController.getInstitutes);
router.post("/institute", instituteController.createInstitute);
router.put("/institute/edit", instituteController.editInstitute);
router.put("/institute/adduser", instituteController.addUser);

router.use(errorHandler);

module.exports = router;
