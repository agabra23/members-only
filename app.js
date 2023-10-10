require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const User = require("./models/User");

var indexRouter = require("./routes/index");
var signUpRouter = require("./routes/sign-up");
var logInRouter = require("./routes/log-in");

var app = express();

//mongodb setup
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_KEY;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specify the field name for the email in your HTML form
      passwordField: "password", // Specify the field name for the password in your HTML form
    },
    async (email, password, done) => {
      console.log("Local strategy");
      console.log("Password is:", password);
      try {
        const user = await User.findOne({ email: email });
        console.log("User is:", user);
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        if (user.password !== password) {
          console.log("no pswd match");
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        console.log("LS doesnt work");
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serialized");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserialized");

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);

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
