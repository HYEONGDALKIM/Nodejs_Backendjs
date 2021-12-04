// 라우팅처리 집합
var express = require('express') 
var router = express.Router()
var path = require('path') 
var main = require('./main/main')
var email = require('./email/email')

//url routing, Home
router.get('/', function(req,res){ //asynchronous
    res.sendFile(path.join(__dirname, "../public/main.html"))
});

router.use('/main', main) // 다른 모듈 사용시 use 사용
router.use('/email', email)

module.exports = router;