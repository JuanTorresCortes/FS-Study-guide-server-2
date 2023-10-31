const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const Student = require("../Model/Student");

const parentSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  student: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
});

const Parent = mongoose.model("parent", parentSchema);

module.exports = Parent;
