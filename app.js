var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = require("./router/index");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

// start message
app.listen(3000, function () {
  console.log("Welcome!! exrpess server on port 3000!");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat", //key value : 다른값이 되어도 상관없음
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router); //path 지정 x
