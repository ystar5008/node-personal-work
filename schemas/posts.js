const mongoose = require("mongoose");

const Schema = mongoose.Schema;  // 추가
//스키마 내용 정의
const postsSchema = new Schema({  // 수정
    userId: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // 기본값
        //autoincreament
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

//1
module.exports = mongoose.model("Posts", postsSchema);