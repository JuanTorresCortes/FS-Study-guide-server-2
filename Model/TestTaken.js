const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const testTakenSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  studentOwner: { type: String, ref: "student", require: true },
  testTopic: { type: String, required: true },
  testGrade: { type: String, required: true },
  score: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAT: { type: Date, default: Date.now },
});

const TestTaken = mongoose.model("testTaken", testTakenSchema);

module.exports = TestTaken;
