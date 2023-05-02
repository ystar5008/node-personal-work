const AuthRepository = require("../repositories/auth.repository")
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

class AuthService {
    authRepository = new AuthRepository(Users)

    signupB = async (nickname, password) => {
        await this.authRepository.signupC(nickname, password)
        return ({ "message": "회원 가입에 성공하였습니다." })
    }

    loginB = async (nickname) => {
        const user = await this.authRepository.loginC(nickname)
        const token = jwt.sign({ userId: user.userId }, "customized secret key")
        res.cookie("Authorization", `Bearer ${token}`)

    }

    findId = async (nickname) => {
        const findIdDb = await this.authRepository.loginC(nickname)
        return findIdDb
    }
}

module.exports = AuthService