const mongoose = require("mongoose");

const Schema = mongoose.Schema;  // 추가
//스키마 내용 정의
const postsSchema = new Schema({  // 수정
    _postId: {
        type: String,
        // unique: true,
    },
    user: {
        type: String,
        // required: true,
    },
    password: {
        type: Number,
        // required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,

    },
});

module.exports = mongoose.model("Posts", postsSchema);