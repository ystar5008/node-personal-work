const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")
const port = 3000;
const postsRouter = require('./routes/posts')
const commentsRouter = require("./routes/comments")
const usersRouter = require("./routes/users")
const authRouter = require("./routes/auth")

const connect = require("./schemas")
connect()
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/work", [postsRouter, commentsRouter, usersRouter, authRouter]);

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});

