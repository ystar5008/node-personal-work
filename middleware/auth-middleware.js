const jwt = require("jsonwebtoken")
const User = require("../schemas/user")

module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" ");
    try {
        //# 403 Cookie가 존재하지 않을 경우
        if (authType !== "Bearer" || !authToken) {
            return res.status(403).json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
        }
        const { userId } = jwt.verify(authToken, "customized secret key")
        const user = await User.findById(userId)
        res.locals.user = user;
        next();
    } catch (err) {
        //403 Cookie가 비정상적이거나 만료된 경우
        console.error(err);
        res.status(403).json({ "errorMessage": "로그인이 필요한 기능입니다." });
        return;
    }
};

// try {
//     const { Authorization } = req.cookies;
//     const [authType, authToken] = (Authorization ?? '').split(' ');

//     if (!authToken || authType !== 'Bearer') {
//       return res.status(401).json({
//         errorMessage: 'Invalid or missing token',
//       });
//     }

//     const decodedToken = jwt.verify(authToken, 'customized secret key');
//     const user = await User.findById(decodedToken.userId);

//     if (!user) {
//       return res.status(401).json({
//         errorMessage: 'Invalid user ID',
//       });
//     }

//     res.locals.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({
//       errorMessage: 'Invalid or missing token',
//     });
//   }
// };
