// app.js 에 /main.js 에 해당되는 부분을 분리시킴
// router 하위 main.js에서 처리하도록
var express = require("express");
var app = express();
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
  console.log("main.js loaded", req.user);
  var id = req.user;
  //res.sendFile(path.join(__dirname + "/../public/main.html"))
  res.render("main.ejs", { id: id });
});

module.exports = router;
