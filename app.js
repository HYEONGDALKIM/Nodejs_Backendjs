var express = require('express') 
var app = express()
var bodyParser = require('body-parser')

app.listen(3000, function(){
    console.log('Welcome!! exrpess server on port 3000!')
});

app.use(express.static('public')) // main.js를 static으로 받음

//url routing
app.get('/', function(req,res){ // 비동기처리
    console.log('test');
    res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req,res){ // 비동기처리
    res.sendFile(__dirname + "/public/main.html")
});

// 포스트 방식
app.post('/email_post', function(req,res){ 
    //get : req.param('email')
    res.send("post response")
});



