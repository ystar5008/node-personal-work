const express = require("express")
const router = express.Router()
const { Posts, Comments } = require("../models");
const authMiddleware = require("../middleware/auth-middleware.js");
const { where } = require("sequelize");



//6. 댓글 생성 api
router.post("/:postId/comments", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { comment } = req.body
    const { postId } = req.params
    //에러 처리
    console.log(userId, nickname, comment, postId)
    //# 404 댓글을 작성할 게시글이 존재하지 않는경우
    try {
        const existsPost = await Posts.findOne({ where: { postId } })
        if (!existsPost) {
            return res.status(404).json({ errorMessage: "게시글이 존재하지 않습니다." });
        }
        // # 412 body 데이터가 정상적으로 전달되지 않는 경우
        if (!comment) {
            return res.status(412).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const Comment = await Comments.create({
            PostId: postId,
            UserId: userId,
            comment,
            nickname
        });
        return res.status(201).json({ message: "댓글 작성하였습니다." });
    } catch (error) {
        console.log(error)
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//7. 댓글 목록조회 api
router.get("/:postId/comments", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { postId } = req.params
    //에러 처리
    try {
        const comments = await Comments.findAll({
            attributes: ["commentId", "postId", "userId", "nickname", "comment", "createdAt", "updatedAt"],
            order: [['createdAt', 'DESC']],
        });
        const existsPosts = await Posts.findOne({ where: { postId } })
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }

        return res.status(200).json({ comments: comments });
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//8. 댓글 수정 api
router.put("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId } = res.locals.user
    const { comment } = req.body
    const { postId, commentId } = req.params
    //에러 처리
    try {
        const existsPosts = await Posts.findOne({ where: { postId } })
        const existsComments = await Comments.findOne({ where: { commentId } })
        // 404 댓글을 수정할 게시글이 존재하지 않는경우
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }
        // # 404 댓글이 존재하지 않는경우
        if (!existsComments) {
            res.status(404).json({ "errorMessage": "댓글이 존재하지 않습니다." })
            return
        }
        // # 403 게시글을 수정할 권한이 존재하지 않는 경우
        if (userId !== existsComments.UserId) {
            res.status(403).json({ "errorMessage": "게시글 수정의 권한이 존재하지 않습니다." })
            return
        }
        // 412 body 데이터가 정상적으로 전달되지 않는 경우
        if (Object.keys(req.body).length === 0) {
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }


        const updateComment = await Comments.update({ comment: comment }, {
            where: {
                commentId: commentId
            }
        }).catch((err) => {
            res.status(400).json({ "errorMessage": "댓글이 정상적으로 수정되지 않았습니다." })
        })
        res.status(200).json({ "message": "댓글을 수정하였습니다." })

    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//9. 댓글 삭제 api
router.delete("/:postId/comments/:commentId", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId } = res.locals.user
    const { postId, commentId } = req.params
    //에러 처리
    try {
        const existsPosts = await Posts.findOne({ where: { postId } })
        const existsComments = await Comments.findOne({ where: { commentId } })
        // 404 댓글을 수정할 게시글이 존재하지 않는경우
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }
        // # 404 댓글이 존재하지 않는경우
        if (!existsComments) {
            //2
            res.status(404).json({ "errorMessage": "댓글이 존재하지 않습니다." })
            return
        }
        // # 403 게시글을 삭제할 권한이 존재하지 않는 경우
        if (userId !== existsComments.UserId) {
            res.status(403).json({ "errorMessage": "댓글 삭제 권한이 존재하지 않습니다." })
            return
        }
        const deleteComment = await Comments.destroy({
            where: { commentId: commentId }
        }).catch((err) => {
            res.status(401).json({ "errorMessage": "댓글이 정상적으로 삭제되지 않았습니다." })
        })
        res.status(200).json({ "message": "댓글을 삭제하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "댓글 삭제에 실패하였습니다." })
    }
})

module.exports = router