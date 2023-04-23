const express = require("express")
const router = express.Router()
const Posts = require("../schemas/posts.js")
const User = require("../schemas/user.js")
const Comments = require("../schemas/comments.js")
const authMiddleware = require("../middleware/auth-middleware.js")


//1. 게시글 작성 api
router.post("/posts", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { title, content, createdAt } = req.body
    //에러 처리
    try {
        //412 body 데이터가 정상적으로 전달되지 않는 경우
        if (Object.keys(req.body).length === 0) {
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }
        //# 412 Title의 형식이 비정상적인 경우
        if (!title) {
            res.status(412).json({ "errorMessage": "게시글 제목의 형식이 일치하지 않습니다." })
            return
        }
        // # 412 Content의 형식이 비정상적인 경우
        if (!content) {
            res.status(412).json({ "errorMessage": "게시글 내용의 형식이 일치하지 않습니다." })
            return
        }
        const createdPosts = await Posts.create({ userId, nickname, title, content, createdAt })
        return res.status(201).json({ "message": "게시글 작성에 성공하였습니다." })
    } catch (error) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//2. 게시글 조회 api
router.get('/posts', authMiddleware, async (req, res) => {
    const posts = await Posts.find({}).sort("createdAt").exec()
    try {
        const result = posts.map((item) => {
            return {
                postId: item._id,
                userId: item.userId,
                nickname: item.nickname,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        })
        res.json({ posts: result })

    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
    }


})

//3. 게시글 상세 조회
router.get("/posts/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const posts = await Posts.findOne({ _id: postId }).sort("date").exec()//내림 차순으로 정렬

    try {
        const result = {
            postId: posts._id,
            userId: posts.userId,
            nickname: posts.nickname,
            title: posts.title,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt
        }
        res.json({ posts: result })

    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
    }


})

// 4. 게시글 수정
router.put("/posts/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const { userId } = res.locals.user
    const { title, content } = req.body
    //에러처리
    try {
        const existsPosts = await Posts.findOne({ _id: postId })
        //412 body 데이터가 정상적으로 전달되지 않는 경우

        if (Object.keys(req.body).length === 0) {
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }
        //# 412 Title의 형식이 비정상적인 경우
        if (!title) {
            res.status(412).json({ "errorMessage": "게시글 제목의 형식이 일치하지 않습니다." })
            return
        }
        // # 412 Content의 형식이 비정상적인 경우
        if (!content) {
            res.status(412).json({ "errorMessage": "게시글 내용의 형식이 일치하지 않습니다." })
            return
        }
        // # 403 게시글을 수정할 권한이 존재하지 않는 경우
        if (userId !== existsPosts.userId) {
            res.status(403).json({ "errorMessage": "게시글 수정의 권한이 존재하지 않습니다." })
            return
        }
        if (existsPosts) {
            await Posts.updateOne(
                { _id: postId },
                { $set: { title: title, content: content } }
                //# 401 게시글 수정이 실패한 경우
            ).catch((err) => {
                res.status(401).json({ "errorMessage": "게시글이 정상적으로 수정되지 않았습니다." })
            })
        }
        res.status(200).json({ "message": "게시글을 수정하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
    }
})

// 5. 게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const { userId } = res.locals.user
    //에러처리
    try {
        const existsPosts = await Posts.findOne({ userId, _id: postId })
        // 404 게시글이 존재하지 않는경우
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }
        // 403 게시글을 삭제할 권한이 존재하지 않는 경우
        if (userId !== existsPosts.userId) {
            res.status(403).json({ "errorMessage": "게시글의 삭제 권한이 존재하지 않습니다." })
            return
        }
        if (existsPosts) {
            await Posts.deleteOne({ userId, _id: postId })
                // 401 게시글 삭제에 실패한 경우
                .catch((err) => {
                    res.status(401).json({ "errorMessage": "게시글 삭제에 실패하였습니다." })
                })
        }
        res.status(200).json({ "message": "게시글을 삭제하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
    }

})

//6. 댓글 생성 api
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { comment } = req.body
    const { postId } = req.params
    //에러 처리
    //# 404 댓글을 작성할 게시글이 존재하지 않는경우
    try {
        const existsPost = await Posts.findById(postId);
        if (!existsPost) {
            return res.status(404).json({ errorMessage: "게시글이 존재하지 않습니다." });
        }
        // # 412 body 데이터가 정상적으로 전달되지 않는 경우
        if (!comment) {
            return res.status(412).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
        }
        const createdComment = await Comments.create({ postId, userId, nickname, comment });
        return res.status(201).json({ message: "댓글 작성하였습니다." });
    } catch (error) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//7. 댓글 목록조회 api
router.get("/posts/:postId/comments", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { postId } = req.params
    //에러 처리
    try {
        const comments = await Comments.find({ postId }).sort("createdAt").exec()
        const existsPosts = await Posts.findOne({ _id: postId })
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }
        const result = comments.map((item) => {
            return {
                commentsId: item._id,
                userId: item.userId,
                nickname: item.nickname,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }
        })
        res.json({ comments: result })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//8. 댓글 수정 api
router.put("/posts/:postId/comments/:commentsId", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId } = res.locals.user
    const { comment } = req.body
    const { postId, commentsId } = req.params
    //에러 처리
    try {
        const existsPosts = await Posts.findOne({ _id: postId })
        const existsComments = await Comments.findOne({ _id: commentsId })
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
        if (userId !== existsComments.userId) {
            res.status(403).json({ "errorMessage": "게시글 수정의 권한이 존재하지 않습니다." })
            return
        }
        // 412 body 데이터가 정상적으로 전달되지 않는 경우
        if (Object.keys(req.body).length === 0) {
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }

        if (existsComments) {
            await Comments.updateOne(
                { _id: commentsId },
                { $set: { comment: comment } }
            ).catch((err) => {
                // # 400 댓글 수정에 실패한 경우
                res.status(400).json({ "errorMessage": "댓글 수정이 정상적으로 처리되지 않았습니다." })
            })
        }
        res.status(200).json({ "message": "댓글을 수정하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//9. 댓글 삭제 api
router.delete("/posts/:postId/comments/:commentsId", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId } = res.locals.user
    const { postId, commentsId } = req.params
    //에러 처리
    try {
        const existsPosts = await Posts.findOne({ _id: postId })
        const existsComments = await Comments.findOne({ _id: commentsId })
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
        if (userId !== existsComments.userId) {
            res.status(403).json({ "errorMessage": "댓글 삭제 권한이 존재하지 않습니다." })
            return
        }
        if (existsComments) {
            await Comments.deleteOne(
                { _id: commentsId }
            ).catch((err) => {
                // # 400 댓글 삭제에 실패한 경우
                res.status(400).json({ "errorMessage": "댓글 삭제가 정상적으로 처리되지 않았습니다." })
            })
        }
        res.status(200).json({ "message": "댓글을 삭제하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "댓글 삭제에 실패하였습니다." })
    }
})

module.exports = router;




