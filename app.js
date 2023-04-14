//express 프레임워크를 가지고와 express 라는 변수에 넣음
const express = require('express');
//app 객체 생성
const app = express();
//app객체 포트넘버 설정
const port = 3000;
//goodsRouter 변수안에 goods.js를 가져옴
const goodsRouter = require('./routes/goods')

//get메서드로 app객체를 실행
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//app.use를사용해 API등록,
//app.use() 안에 있는 코드들이 실행된 다음에 그 밑에있는 코드들 실행
//api라는 경로가 추가되면 모두 goodsRouter로 가라는 의미
//localhost:3000/api => goodsRouter로 이동
// app.use("/api", [goodsRouter, userRouter, adminRouter]); 처럼 배열로 라우터를 사용할 수 있다.
app.use("/api", goodsRouter);

//3000번 포트에서 app.js실행
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

