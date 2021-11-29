var express = require('express') 
var app = express()

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

app.get('post')


