const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})
//userId를 가지고올때 virtual값을 넣어줌
//가상의 userId값을 할당
UserSchema.virtual("userId").get(function () {
    return this._id.toHexString()
})

//user 정보를 JSON으로 형변환 할때 virtual 값이 출력되도록 설정
UserSchema.set("toJSON", {
    //JSON으로 변환할떄, userId를 출력시켜줌
    virtuals: true
})

module.exports = mongoose.model("User", UserSchema)