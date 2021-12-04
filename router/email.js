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

//Router
//post method
router.post('/form', function(req,res){ 
    //get : req.param('email')
    console.log(req.body.email)
    // res.send("<h1>Welcome!!!! <br> ID : " + req.body.email + "</h1>")
    res.render('email.ejs', {'email': req.body.email})
});

//ajax method 
router.post('/ajax', function(req, res){
    // console.log(req.body.email)
    // var responseData = {'result' : 'ok', 'email' : req.body.email}
    // 이메일정보가 실제 db에 있는지 확인하고 email정보가 있다면 main을 포함한 json을 반환
    var email = (req.body.email);
    var responseData = {};
  
    // 쿼리 날리기 위해 DB접속

    connection.query('select name from user where email="' + email + '"', function (err, rows) {
        if (err) throw err;
        // email로 조회해서 받은 경우
        if(rows[0]) {
            responseData.result = "ok"; // 성공
            responseData.name = rows[0].name; // 이름 받기
        }else {
            responseData.result = "none"; // 실패
            responseData.name = "";
        }
        res.json(responseData); // 비동기라 이 블록 안에서 줘야 함
    })
});

module.exports = router;