const jwt = require("jsonwebtoken")
const User = require("../schemas/user")

module.exports = async (req, res, next) => {
    const { Autorization } = req.cookies
    const [authType, authToken] = (Autorization ?? "").split(" ");

    if (authType !== "Bearer" || !authToken) {
        res.status(400).json({
            errorMessage: "로그인 후에 이용할 수 있는 기능입니다."
        })
        return
    }
    try {
        const { userId } = jwt.verify(authToken, "customized secret key")
        const user = await User.findById(userId)
        //# 403 Cookie가 존재하지 않을 경우
        if (!Autorization) {
            res.status(412).json({ "errorMessage": "로그인이 필요한 기능입니다." })
            return
        }

        //# 403 Cookie가 비정상적이거나 만료된 경우
        if (!Autorization) {
            res.status(412).json({ "errorMessage": "로그인이 필요한 기능입니다." })
            return
        }
        res.locals.user = user
        next()
    } catch (err) {

        console.error(err)
        res.status(400).json({ errorMessage: "로그인 후에 이용할 수 있는 기능입니다." })
        return
    }

}