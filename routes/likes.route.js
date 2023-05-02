const express = require('express');

const authMiddleware = require('../middleware/auth-middleware');
const LikesController = require("../controllers/likes.controller")
const likesController = new LikesController()

const router = express.Router();


// 좋아요 게시글 조회
router.get('/like', authMiddleware, likesController.findLikedPost);



module.exports = router;
