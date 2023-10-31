var express = require("express");
var router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  deleteUser,
  validateUser,
} = require("../Controllers/studentController");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register new user
// http://localhost:4000/users/register-user
router.post("/register-user", validateUserData, registerUser);

// login user
// http://localhost:4000/users/login-user
router.post("/login-user", validateUserData, loginUser);

router.get("/validate", jwtValidate, validateUser);

// get all users
// http://localhost:4000/users/get-all-users
router.get("/get-all-users", getAllUsers);

// get user by id
// http://localhost:4000/users//get-user-id/users-id
router.get("/get-user-id/:id", getUser);

// delete user by id
// http://localhost:4000/users/users-id
router.delete("/delete-User/:id", deleteUser);

module.exports = router;