const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth-middleware.js");
const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();


//6. 댓글 생성 api
router.post("/:postId/comments", authMiddleware, commentController.postA)

//7. 댓글 목록조회 api
router.get("/:postId/comments", authMiddleware, commentController.getA)

//8. 댓글 수정 api
router.put("/:postId/comments/:commentId", authMiddleware, commentController.putA)

//9. 댓글 삭제 api
router.delete("/:postId/comments/:commentId", authMiddleware, commentController.getA)

module.exports = router