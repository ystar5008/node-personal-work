const express = require("express")

const router = express.Router()

const Posts = require("../schemas/posts.js")



//1. 게시글 조회 api
router.get('/posts/', (req, res) => {
    res.json({})
})

//2. 게시글 작성 api
router.post("/posts/", async (req, res) => {
    //에러 처리어떻게??
    const { postId, user, password, title, createdAt, content } = req.body
    const posts = await Posts.find({ postId })
    if (posts.length) {
        return res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
    } else {
        const createdPosts = await Posts.create({ _postId: postId, user, password, title, createdAt, content })
        res.status(200).json({ "message": "게시글을 생성하였습니다.", data: createdPosts })
    }
})

// 3. 게시글 상세 조회
router.get("/posts/:_postId", (req, res) => {
    res.json({})
})

// 4. 게시글 수정
router.put("/posts/:_postId", (req, res) => {

})

// 5. 게시글 삭제
router.delete("/posts/:_postId", (req, res) => {

})







// const Posts = require("../schemas/posts")
// router.post("/posts", async (req, res) => {
//     const { postsId, user, title, createdAt } = req.body;

//     const posts = await Posts.find({ postsId });

//     if (posts.length) {
//         return res.status(400).json({
//             success: false,
//             erroeMessage: "이미존재하는 postsId입니다."
//         })
//     }
//     const createPosts = await Posts.create({ postsId, user, title, createdAt })
//     res.json({ data: createPosts })

// })





module.exports = router;