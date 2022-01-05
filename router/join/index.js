var express = require("express");
var app = express();
var router = express.Router();
var path = require("path"); // 상대경로
var mysql = require("mysql"); // mysql 모듈 가져오기
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var flash = require("connect-flash");

//DATABASE SETTING
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

//post >> passport use
// router.post('/', function(req,res){
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var pwd = body.password;
//     var sql = {email: email, name : name, pw: pwd};
//     var query = connection.query('insert into user set ?', sql, function(err,rows){
//         if(err) throw err;
//         else res.render('welcome.ejs', {'name': name, 'id':rows.insertId})
//     })
// })

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      var query = connection.query(
        "select *from user where email=?",
        [email],
        function (err, rows) {
          if (err) return done(err);

          if (rows.length) {
            console.log("Oh!!! existed user");
            return done(null, false, { message: "your email is already used" });
          } else {
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