const mongoose = require("mongoose");


//스키마 내용 정의
const commentsSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true,
    },
    user: {
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

module.exports = mongoose.model("Commnets", commentsSchema);