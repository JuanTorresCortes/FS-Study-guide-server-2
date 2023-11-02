var express = require("express");
var router = express.Router();

const {
  registerStudent,
  loginStudent,
  validateUser,
  getAllUserStudents,
  getStudentById,
  deleteUser,
} = require("../Controllers/studentController");

const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register new user student
// http://localhost:4000/student/register-user-student
router.post("/register-user-student", validateUserData, registerStudent);

// login user student
// http://localhost:4000/student/login-user
router.post("/login-user", validateUserData, loginStudent);

// validate
// http://localhost:4000/student/validate
router.get("/validate", jwtValidate, validateUser);

// get all users students
// http://localhost:4000/student/get-all-user-students
router.get("/get-all-user-students", getAllUserStudents);

// get user student by id
// http://localhost:4000/student/get-user-student/<users-id>
router.get("/get-user-student/:id", getStudentById);

// delete user by id
// http://localhost:4000/student/delete-user/<user-id>
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
