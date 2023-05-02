// app.js

const express = require("express");
const cookieParser = require("cookie-parser");
const router = require('./routes')
const authRouter = require("./routes/auth.route");

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/', [router, authRouter]);

app.listen(PORT, () => {
    console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})