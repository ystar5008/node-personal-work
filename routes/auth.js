const express = require("express")
const router = express.Router()
const User = require("../schemas/user")
const jwt = require("jsonwebtoken")

router.post("/auth", async (req, res) => {
    const { nickname, password } = req.body
    const user = await User.findOne({ nickname })
    //에러처리
    try {
        // #412 해당하는 유저가 존재하지 않는 경우
        if (!user || user.password !== password) {
            res.status(412).json({ errorMessage: { "errorMessage": "닉네임 또는 패스워드를 확인해주세요." } })
            return
        }
    } catch (err) {
        //# 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ errorMessage: "로그인에 실패하였습니다." })
    }
    const token = jwt.sign({ userId: user.userId }, "customized secret key")
    res.cookie("Autorization", `Bearer ${token}`)
    res.status(200).json({ token })
})

module.exports = router