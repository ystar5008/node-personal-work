const express = require("express")
//express.Router를 router 변수에 할당
const router = express.Router()

//기본 url
//(요청, 응답)
//실제로 API를 실행할 API에 받은 데이터는 req(요청)라는 객체안에 들어있음
//app.js에서 넘어왔기때문에 localhost:3000/api/가 기본 경로 (GET)
router.get('/', (req, res) => {
    //res(응답, 반환).send메서드로 send안에 있는 값 반환
    res.send("default url for goods.js GET Method")
})

//localhost:3000/api/about GET
router.get('/about', (req, res) => {
    res.send("goods.js about PATH")
})

//router 모듈로 goods.js를 밖으로 내보냄 다른 파일에서 사용가능
module.exports = router;