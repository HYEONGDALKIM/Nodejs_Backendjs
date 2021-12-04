var express = require('express') 
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

// start message
app.listen(3000, function(){
    console.log('Welcome!! exrpess server on port 3000!')
});

app.use(express.static('public')) //static
app.use(bodyParser.json()) // bodyparser
app.use(bodyParser.urlencoded({extended:true})); // bodyparser
app.set('view engine', 'ejs')

app.use(router) //path 지정 x

