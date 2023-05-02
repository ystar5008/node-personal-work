const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/auth.controller")
const authController = new AuthController

//1. 회원가입 API
router.post('/signup', authController.signupA)

//2. 로그인
router.post("/login", authController.login)

module.exports = router