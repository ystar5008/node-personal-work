// app.js

const express = require("express");
const cookieParser = require("cookie-parser");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const likeRouter = require("./routes/likes");
const commentRouter = require("./routes/comments");

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/posts', [likeRouter, postsRouter, commentRouter, authRouter]);
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
})