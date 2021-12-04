var express = require('express') 
var app = express()
var bodyParser = require('body-parser')
var main = require('./router/main')
var email = require('./router/email')


// start message
app.listen(3000, function(){
    console.log('Welcome!! exrpess server on port 3000!')
});

app.use(express.static('public')) //static
app.use(bodyParser.json()) // bodyparser
app.use(bodyParser.urlencoded({extended:true})); // bodyparser
app.set('view engine', 'ejs')

app.use('/main', main)
app.use('/email', email)

//url routing, Home
app.get('/', function(req,res){ //asynchronous
    res.sendFile(__dirname + "/public/main.html")
});
