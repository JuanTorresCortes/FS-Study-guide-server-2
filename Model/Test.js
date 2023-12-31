const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const testSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  testTopic: { type: String, required: true },
  grade: { type: String, required: true },
  testKey: { type: String, required: true },
  pdfData: { type: Buffer, required: true },
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;
