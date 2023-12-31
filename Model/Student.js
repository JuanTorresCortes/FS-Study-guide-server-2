const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const studentSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  testRecord: [],
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  gradeLevel: {
    type: String,
    enum: ["5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"],
    required: true,
  },
  passwordHash: { type: String, required: true },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
