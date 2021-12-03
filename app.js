var express = require('express') 
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql') // mysql 모듈 가져오기

var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'wodo1965~!',
    database : 'jsman'
  })

  connection.connect();

// start message
app.listen(3000, function(){
    console.log('Welcome!! exrpess server on port 3000!')
});

app.use(express.static('public')) //static
app.use(bodyParser.json()) // bodyparser
app.use(bodyParser.urlencoded({extended:true})); // bodyparser
app.set('view engine', 'ejs')

//url routing, Home
app.get('/', function(req,res){ //asynchronous
    res.sendFile(__dirname + "/public/main.html")
});

//main page 
app.get('/main', function(req,res){ //asynchronous
    res.sendFile(__dirname + "/public/main.html")
});

//post method
app.post('/email_post', function(req,res){ 
    //get : req.param('email')
    console.log(req.body.email)
    // res.send("<h1>Welcome!!!! <br> ID : " + req.body.email + "</h1>")
    // ejs
    res.render('email.ejs', {'email': req.body.email})

});



//ajax method 
app.post('/ajax_send_email', function(req, res){
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
        }
        else {
            responseData.result = "none"; // 실패
            responseData.name = "";
        }
  
        res.json(responseData); // 비동기라 이 블록 안에서 줘야 함
    })
});

