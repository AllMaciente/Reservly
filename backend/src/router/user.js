const express = require("express");
const userController = require("../controller/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", userController.CreateUser);
router.post("/login", userController.LoginUser);

router.get("/", auth, userController.GetUsers);
router.get("/:id", auth, userController.GetUser);
router.put("/:id", auth, userController.UpdateUser);
router.delete("/:id", auth, userController.DeleteUser);

module.exports = router;
