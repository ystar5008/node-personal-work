const mongoose = require("mongoose");

const Schema = mongoose.Schema;  // 추가
//스키마 내용 정의
const commentsSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
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

});

module.exports = mongoose.model("Comments", commentsSchema);