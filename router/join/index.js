var express = require('express') 
var app = express()
var router = express.Router()
var path = require('path') // 상대경로
var mysql = require('mysql') // mysql 모듈 가져오기

//DATABASE SETTING
var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'wodo1965~!',
    database : 'jsman'
  })
  connection.connect();

router.get('/', function(req,res){ 
  console.log('get join url');
  res.render('join.ejs')
})
//passport use
router.post('/', function(req,res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var pwd = body.password;

    var sql = {email: email, name : name, pw: pwd};
    var query = connection.query('insert into user set ?', sql, function(err,rows){
        if(err) throw err;
        else res.render('welcome.ejs', {'name': name, 'id':rows.insertId})
    })
})

module.exports = router;