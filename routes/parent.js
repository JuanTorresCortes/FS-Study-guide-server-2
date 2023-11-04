var express = require("express");
var router = express.Router();

const {
  registerParent,
  loginUser,
  getAllUsersParents,
  getParentById,
  deleteUser,
  validateUser,
  addStudentChild,
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

// login user parent
// http://localhost:4000/parent/login-user
router.post("/login-user", validateUserData, loginUser);

// validate
// http://localhost:4000/parent/validate
router.get("/validate", jwtValidate, validateUser);

// add student child
// http://localhost:4000/parent/add-student-child
router.post("/add-student-child", addStudentChild);

// get all users parents
// http://localhost:4000/parent/get-all-user-parent
router.get("/get-all-users-parents", getAllUsersParents);

// get user parent by id
// http://localhost:4000/parent/get-user-id/<user-id>
router.get("/get-user-id/:id", getParentById);

// delete user parent by id
// http://localhost:4000/parent/delete-user/<user-id>
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
