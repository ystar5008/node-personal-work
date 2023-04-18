const express = require("express")
const router = express.Router()
const Comments = require("../schemas/comments.js")


// 6. 댓글 생성
router.post("/posts/:_postId/comments", async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { user, password, content, createdAt } = req.body
    const { _postId } = req.params
    try {
        const createdPosts = await Comments.create({ user, password, content, createdAt })
        res.status(200).json({ "message": "게시글을 생성하였습니다." })

    } catch (error) {
        // # 400 body 또는 params를 입력받지 못한 경우
        if ((!password || !user) || null) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
        // # 400 body의 content를 입력받지 못한 경우
        else if (!content || null) {
            res.status(400).json({ message: "댓글 내용을 입력해주세요" })
        }
    }
})

// 7. 댓글 목록 조회
router.get("/posts/:_postId/comments", async (req, res) => {
    const { _postId } = req.params
    const _data = await Comments.find({}).sort({ createdAt: 1 })
    //_id => postId
    const data = _data.map((item) => {
        return {
            commnetId: item._id,
            user: item.user,
            content: item.content,
            createdAt: item.createdAt,
            _id: undefined
        };
    });
    //에러처리
    try {
        res.status(200).json({ data })
    } catch {
        // # 400 body 또는 params를 입력받지 못한 경우
        if (_postId.length) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
    }
})

// 8. 댓글 수정
router.put("/posts/:_postId/comments/:_commentId", async (req, res) => {
    const { _postId, _commentId } = req.params
    const { password, content } = req.body
    try {
        let comment = await Comments.findOne({ _id: _commentId })

        // { message: '데이터 형식이 올바르지 않습니다.' }
        if (Number(password) !== comment.password) {
            res.status(400).json({ message: '비밀 번호가 일치하지 않습니다.' })
        }
        // # 400 body 또는 params를 입력받지 못한 경우
        if ((!password || !content) || null) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
        else if (Number(password) === comment.password) {
            await Comments.updateOne({ _id: _commentId }, { $set: { content: content } })
            res.status(200).json({ "message": "게시글을 수정하였습니다." })
        }
    } catch (err) {
        // # 404 _commentId에 해당하는 댓글이 존재하지 않을 경우
        if (_commentId.length) {
            res.status(404).json({ message: '댓글 조회에 실패하였습니다.' })
        }
    }
})

// 9. 댓글 삭제
router.delete("/posts/:_postId/comments/:_commentId", async (req, res) => {
    const { _postId, _commentId } = req.params
    const { password } = req.body

    //에러처리
    try {
        let comment = await Comments.findOne({ _id: _commentId })
        //#400 body의 content를 입력받지 못한 경우
        if ((!password) || null) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
        //#404 body 또는 params를 입력받지 못한 경우
        else if (Number(password) !== comment.password) {
            res.status(400).json({ message: '비밀 번호가 일치하지 않습니다.' })
        }
        else if (Number(password) === comment.password) {
            await Comments.deleteOne({ _id: _commentId })
            res.status(200).json({ "message": "댓글을 삭제하였습니다." })
        }
    } catch (err) {
        // # 404 _commentId에 해당하는 댓글이 존재하지 않을 경우
        if (_commentId.length) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' })
        }
    }
})

module.exports = router