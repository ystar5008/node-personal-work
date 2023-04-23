const mongoose = require("mongoose");

const Schema = mongoose.Schema;  // 추가
//스키마 내용 정의
const commentsSchema = new Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    comment: {
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
        default: Date.now, // 기본값
        //autoincreament
    },

});

module.exports = mongoose.model("Comments", commentsSchema);