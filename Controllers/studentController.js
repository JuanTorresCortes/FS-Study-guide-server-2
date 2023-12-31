const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("validator");
const Student = require("../Model/Student");

// controller function to create new user (registration);
const registerStudent = async (req, res) => {
  const errorObject = {};
  try {
    const { firstName, lastName, email, gradeLevel, password, testRecord } =
      req.body;

    //--------password plain text => bcrypt.genSalt() + bcrypt.hash() = passwordHash ------
    // Generate a random salt and hash the password using bcrypt;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // create new user data
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gradeLevel: gradeLevel,
      passwordHash: hash,
      testRecord: testRecord,
    };

    if (isEmpty(firstName)) {
      errorObject.firstName = "First name is required";
    } else if (isEmpty(lastName)) {
      errorObject.lastName = "Last name is required";
    } else if (isEmpty(gradeLevel)) {
      errorObject.gradeLevel = "Grade level is required";
    }

    // create a new User instance and save it to the database
    const newUser = await new Student(userInfo); // grab data;
    await newUser.save(); // save to database
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      // Duplicate email error
      errorObject.email = "email is already in use";
    }

    if (Object.keys(errorObject).length > 0) {
      return res.status(401).json({
        success: false,
        message: "Controller Error",
        error: errorObject,
      });
    }
  }
};

// Controller function for user student login
const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email in the database
    const foundUser = await Student.findOne({ email: email });

    // If user not found or password does not match, return an error response
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
        error: { email: "User or Password does not match" }, // Send the error in an error object
      });
    }

    // bcrypt.compare(): This method takes the plain-text password and the hashed password as arguments.
    // It hashes the plain-text password using the same salt as the stored hashed password and then compares the two hashes.
    // If they match, it means the plain-text password is correct.
    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
        error: { password: "User or Password does not match" }, // Send the error in an error object
      });
    }

    // Generate a JWT token for authentication => save token to local storage @ frontend
    //----token------------------saved data----------------signature-----------
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      //--time expiration--
      expiresIn: "1hr",
    });

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error.message);

    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

// Controller function for validating user with JWT
const validateUser = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;
    // Find the user in the database using the decoded user ID from the JWT
    const findUser = await Student.findOne({ _id: decodedToken.userId });

    if (!findUser) {
      res.status(401).json({
        success: false,
        message: "error",
        error: { user: "User not found" },
      });
    }

    res.status(200).json({
      success: true,
      _id: findUser._id,
      name: `${findUser.firstName} ${findUser.lastName}`,
      email: findUser.email,
      gradeLevel: findUser.gradeLevel,
      testRecord: findUser.testRecord,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

const getAllUserStudents = async (req, res) => {
  try {
    const allUsers = await Student.find({});
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user's ID from the request parameters

    // Find the user by ID
    const user = await Student.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user's information
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gradeLevel: user.gradeLevel,
        testRecord: user.testRecord,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user by its ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user's ID from the request parameters

    // Wait for the database to delete the user by its ID
    const user = await Student.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return a success message
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  validateUser,
  getAllUserStudents,
  getStudentById,
  deleteUser,
};
