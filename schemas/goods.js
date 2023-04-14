const mongoose = require("mongoose");
const { string } = require("prop-types");

//스키마 내용 정의
const goodsSchema = new mongoose.Schema({
    goodsId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnailUrl: {
        type: String,

    },
    category: {
        type: String,

    },
    price: {
        type: Number,
    },
});

module.exports = mongoose.model("Goods", goodsSchema);