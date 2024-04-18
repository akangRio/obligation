const express = require("express");
const userController = require("../controllers/userController");
const instituteController = require("../controllers/insituteController");
const router = express.Router();

router.post("/", userController.createUser);
router.post("/institute", instituteController.createInstitute);
router.put("/institute/adduser", instituteController.addUser);

module.exports = router;
