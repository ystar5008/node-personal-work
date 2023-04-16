
//변수 mongoose 안에 몽구스 할당
const mongoose = require("mongoose");

const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/node_db")
        .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
    //에러 발생시 처리내용
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
