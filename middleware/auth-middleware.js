// middlewares/auth-middleware.js

const jwt = require("jsonwebtoken");
const { Users } = require("../models");


module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");
    try {
        //# 403 Cookie가 존재하지 않을 경우
        if (authType !== "Bearer" || !authToken) {
            return res.status(403).json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
        }
        const { userId } = jwt.verify(authToken, "customized secret key")
        const user = await Users.findOne({ where: { userId } })
        res.locals.user = user;

        next();
    } catch (err) {
        //403 Cookie가 비정상적이거나 만료된 경우
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ errorMessage: "인증 정보가 만료되었습니다." });
        }
        if (err instanceof jwt.JsonWebTokenError) {
            // 401: 토큰이 조작된 경우
            return res.status(401).json({ errorMessage: "인증 정보가 올바르지 않습니다." });
        }
        res.status(403).json({ "errorMessage": "로그인이 필요한 기능입니다." });

    }
};


