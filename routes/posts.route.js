const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth-middleware.js")
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

//1. 게시글 작성 api
router.post("/", authMiddleware, postsController.postA)

//2. 게시글 조회 api
router.get('/', authMiddleware, postsController.getA)

//3. 게시글 상세 조회
router.get("/:postId", authMiddleware, postsController.getDetailA)

// 4. 게시글 수정
router.put("/:postId", authMiddleware, postsController.putA)

// 5. 게시글 삭제
router.delete("/:postId", authMiddleware, postsController.deleteA)

// 6. 좋아요 업데이트
router.put('/:postId/like', authMiddleware, postsController.likeA);

module.exports = router;




