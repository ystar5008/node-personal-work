const AuthService = require("../services/auth.service")
const jwt = require("jsonwebtoken")


class AuthController {
    authService = new AuthService()

    signupA = async (req, res) => {
        const { nickname, password, confirm } = req.body
        //유효성 검사 함수
        function isValidNickname(nickname) {
            const nicknameRegex = /^[a-zA-Z0-9]{4,}$/;
            return nicknameRegex.test(nickname);
        }

        try {
            // 1.닉네임 형식이 비정상적인 경우
            if (nickname.length < 4 || (isValidNickname(nickname) == false)) {
                res.status(412).json({ errorMessage: "닉네임의 형식이 일치하지 않습니다." })
                return
            }
            // 2. 닉네임이 중복된 경우
            const isExistNickname = await this.authService.findId(nickname)
            // 닉네임이 일치할때 조회함
            if (isExistNickname) {
                //보안을 위해 상세한 에러메세지 작성 x
                res.status(412).json({ "errorMessage": "중복된 닉네임입니다." })
                //위 조건문에서 코드가 걸렸을때 return으로 아래 코드가 더이상 수행되지 않게함
                return
            }
            //비밀번호 검증
            //3. 412 password가 4글자 이하, or 닉네임과 같은값이 포함된경우

            if (password.length < 4 || nickname.includes(password)) {
                res.status(412).json({ "errorMessage": "패스워드 형식이 일치하지 않습니다." })
                return
            }

            //4. password가 일치하지 않는 경우
            if (password !== confirm) {
                res.status(412).json({ "errorMessage": "패스워드가 일치하지 않습니다.", })
                return
            }
            const signupData = await this.authService.signupB(
                nickname,
                password,
                confirm
            );
            return res.status(200).json(signupData);
        } catch (err) {
            // 5. 400 예외 케이스에서 처리하지 못한 에러
            console.log(err)
            res.status(400).json({ "errorMessage": "요청한 데이터 형식이 올바르지 않습니다." })
        }

    }

    login = async (req, res) => {
        const { nickname, password } = req.body

        //에러처리
        try {
            const user = await this.authService.findId(nickname)
            // #412 해당하는 유저가 존재하지 않는 경우
            if (!user || user.password !== password) {
                res.status(412).json({ "errorMessage": "닉네임 또는 패스워드를 확인해주세요." })
                return
            }
            const token = jwt.sign({ userId: user.userId }, "customized secret key")
            res.cookie("Authorization", `Bearer ${token}`)
            res.status(200).json({ token })
        } catch (err) {
            //# 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ errorMessage: "로그인에 실패하였습니다." })
        }

    }

}

module.exports = AuthController