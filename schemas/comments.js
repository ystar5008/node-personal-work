const mongoose = require("mongoose");


//스키마 내용 정의
const commentsSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,

    }

});

module.exports = mongoose.model("Commnets", commentsSchema);