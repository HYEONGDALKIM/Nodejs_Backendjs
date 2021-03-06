var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");
var mysql = require("mysql");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// DATABASE SETTING (Google Cloud SQL)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "wodo1965~!",
  database: "jsman",
});

connection.connect();

router.get("/", function (req, res) {
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("join.ejs", { message: msg });
});

//passport.serialize
passport.serializeUser(function (user, done) {
  console.log("passport session save : ", user.id);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport session get id: ", id);
  done(null, id);
}); //세션값을 뽑아서 db에 전달

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email", //default 속성값
      passwordField: "password", //default 속성값
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      var query = connection.query(
        "select * from user where email=?",
        [email],
        function (err, rows) {
          if (err) return done(err);

          if (rows.length) {
            console.log("existed user");
            return done(null, false, { message: "Your email is already used" });
          } else {
            var sql = { email: email, password: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              function (err, rows) {
                if (err) throw err;
                return done(null, { email: email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main",
    failureRedirect: "/join",
    failureFlash: true,
  })
);

module.exports = router;
