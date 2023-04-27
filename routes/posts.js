const express = require("express")
const router = express.Router()
const { Posts } = require("../models");
const authMiddleware = require("../middleware/auth-middleware.js")


//1. 게시글 작성 api
router.post("/", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { title, content } = req.body
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
        const post = await Posts.create({
            UserId: userId,
            nickname,
            title,
            content,
        });
        return res.status(201).json({ "message": "게시글 작성에 성공하였습니다." }
        )
    } catch (error) {
        // 400 예외 케이스에서 처리하지 못한 에러
        console.log(error)
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
    }
})

//2. 게시글 조회 api
router.get('/', authMiddleware, async (req, res) => {

    try {
        const posts = await Posts.findAll({
            attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt"],
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({ posts: posts });

    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
    }


})

//3. 게시글 상세 조회
router.get("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Posts.findOne({
            attributes: ["postId", "userId", "nickname", "title", "content", "createdAt", "updatedAt"],
            where: { postId }
        });
        res.status(200).json({ post: post })

    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
    }


})

// 4. 게시글 수정
router.put("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const { userId } = res.locals.user
    const { title, content } = req.body
    //에러처리
    try {
        const existsPosts = await Posts.findOne({ where: { postId } })
        console.log(existsPosts)
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
        if (userId !== existsPosts.UserId) {
            res.status(403).json({ "errorMessage": "게시글 수정의 권한이 존재하지 않습니다." })
            return
        }
        const updatePost = await Posts.update({ title: title, content: content }, {
            where: {
                postId: postId
            }
        }).catch((err) => {
            res.status(401).json({ "errorMessage": "게시글이 정상적으로 수정되지 않았습니다." })
        })
        res.status(200).json({ "message": "게시글을 수정하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
    }

})

// 5. 게시글 삭제
router.delete("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params
    const { userId } = res.locals.user
    //에러처리
    try {
        const existsPosts = await Posts.findOne({ where: { postId } })
        // 404 게시글이 존재하지 않는경우
        if (!existsPosts) {
            res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
            return
        }
        // 403 게시글을 삭제할 권한이 존재하지 않는 경우
        if (userId !== existsPosts.UserId) {
            res.status(403).json({ "errorMessage": "게시글의 삭제 권한이 존재하지 않습니다." })
            return
        }
        const deletePost = await Posts.destroy({
            where: { postId: postId }
        }).catch((err) => {
            res.status(401).json({ "errorMessage": "게시글이 정상적으로 삭제되지 않았습니다." })
        })
        res.status(200).json({ "message": "게시글을 삭제하였습니다." })
    } catch (err) {
        // 400 예외 케이스에서 처리하지 못한 에러
        res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
    }
})



module.exports = router;




