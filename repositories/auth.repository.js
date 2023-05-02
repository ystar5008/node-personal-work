const { Users } = require("../models");

class AuthRepository {

    signupC = async (nickname, password) => {
        const createUser = await Users.create({
            nickname,
            password
        })
        return createUser
    }

    loginC = async (nickname) => {
        const findId = await Users.finOne({
            where: { nickname: nickname }
        })
        return findId
    }


}

module.exports = AuthRepository