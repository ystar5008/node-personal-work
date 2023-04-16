const express = require("express")
const router = express.Router()



// 6. 댓글 생성
router.post("/posts/:_postId/comments", (req, res) => {

})

// 7. 댓글 목록 조회
router.get("/posts/:_postId/comments", (req, res) => {

})

// 8. 댓글 수정
router.put("/posts/:_postId/comments:_commentId", (req, res) => {

})

// 9. 댓글 삭제
router.delete("posts/:_postId/comments/:_commentId", (req, res) => {

})



module.exports = router