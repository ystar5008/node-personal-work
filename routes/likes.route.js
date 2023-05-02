const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const LikesController = require("../controllers/likes.controller")
const likesController = new LikesController()


// 좋아요 게시글 조회
router.get('/like', authMiddleware, likesController.findLikeA);



module.exports = router;
