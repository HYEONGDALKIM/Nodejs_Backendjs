var express = require('express') 
var app = express()
var bodyParser = require('body-parser')
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
    console.log('test');
    res.sendFile(__dirname + "/public/main.html")
});

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

app.post('/ajax_send_email', function(req, res){
    console.log(req.body.email)
    var responseData = {'result' : 'ok', 'email' : req.body.email}
    res.json(responseData)
});

