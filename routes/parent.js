var express = require("express");
var router = express.Router();

const {
  registerParent,
  loginUser,
  getAllUsersParents,
  getUser,
  deleteUser,
  validateUser,
} = require("../Controllers/parentController");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register new user parent
// http://localhost:4000/parent/register-parent
router.post("/register-parent", validateUserData, registerParent);

// login user
// http://localhost:4000/users/login-user
router.post("/login-user", validateUserData, loginUser);

// validate
// http://localhost:4000/parent/validate
router.get("/validate", jwtValidate, validateUser);

// get all users parents
// http://localhost:4000/parent/get-all-user-parent
router.get("/get-all-users-parents", getAllUsersParents);

// get user by id
// http://localhost:4000/parent/get-user-id/user-id
router.get("/get-user-id/:id", getUser);

// delete user by id
// http://localhost:4000/users/users-id
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
