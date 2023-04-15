const mongoose = require("mongoose");


//스키마 내용 정의
const cartSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Cart", cartSchema);