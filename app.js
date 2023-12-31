var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

const cors = require("cors"); // Cross-Origin Resource Sharing middleware
require("dotenv").config(); // Loads environment variables from a .env file

const { mongooseConnect } = require("./mongoose"); // Custom module for connecting to MongoDB using Mongoose
mongooseConnect(); // Connect to the MongoDB database

const parentRouter = require("./routes/parent");
const studentRouter = require("./routes/student");
const testsRouter = require("./routes/test");
const testTakenRouter = require("./routes/testTaken");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
); // Enable Cross-Origin Resource Sharing

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/parent", parentRouter);
app.use("/student", studentRouter);
app.use("/test", testsRouter);
app.use("/testTaken", testTakenRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
