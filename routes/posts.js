const express = require("express")
const router = express.Router()
const Posts = require("../schemas/posts.js")
const User = require("../schemas/user.js")
const authMiddleware = require("../middleware/auth-middleware.js")

//1. 게시글 작성 api
router.post("/posts", authMiddleware, async (req, res) => {
    //입력받은 데이터 값을 req.body에 저장
    const { userId, nickname } = res.locals.user
    const { title, content, createdAt } = req.body
    //에러 처리
    try {
        //몽고db에 생성할 스키마
        const createdPosts = await Posts.create({ userId, nickname, title, content, createdAt })
        const isExisttitle = Object.keys(req.body).includes('title')
        const isExistcontent = Object.keys(req.body).includes('content')
        //412 body 데이터가 정상적으로 전달되지 않는 경우
        if (!title || !content) {
            console.log(1)
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }
        if (typeof title !== 'string' || typeof content !== 'string') {
            console.log(1)
            res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
            return
        }
        //# 412 Title의 형식이 비정상적인 경우
        if (!isExisttitle) {
            console.log(2)
            res.status(412).json({ "errorMessage": "게시글 제목의 형식이 일치하지 않습니다." })
            return
        }
        // # 412 Content의 형식이 비정상적인 경우
        if (!isExistcontent) {
            console.log(3)
            res.status(412).json({ "errorMessage": "게시글 내용의 형식이 일치하지 않습니다." })
            return
        }
        return res.status(201).json({ "message": "게시글 작성에 성공하였습니다." })
    } catch (error) {
        // 400 예외 케이스에서 처리하지 못한 에러
        console.log(4)
        res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })

    }
})

//2. 게시글 조회 api
router.get('/posts', async (req, res) => {
    const data = await Posts.find({}).sort({ createdAt: 1 })
    const _data = Posts.map((item) => {
        return item._id;
    })
    console.log(data)
    res.json({ posts: data })
})

//3. 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    let _data = await Posts.find({})
    //_id => postId
    let data = _data.map((item) => {
        return {
            postId: item._id,
            user: item.user,
            password: item.password,
            title: item.title,
            content: item.content,
            createdAt: item.createdAt,
            _id: undefined
        };
    });
    try {
        const [result] = data.filter((item) => _postId === String(item.postId))
        res.status(200).json({ "data": result })
    } catch (err) {
        res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
    }
})

// 4. 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    const { password, title, content } = req.body
    //에러처리
    try {
        let post = await Posts.findOne({ _id: _postId })
        //# 400 body 또는 params를 입력받지 못한 경우
        if ((!password || !title || !content) || null) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
        //# 400 비밀번호가 일치하지 않는 경우
        else if (Number(password) !== post.password) {
            res.status(400).json({ message: '비밀 번호가 일치하지 않습니다.' })
        }
        else if (Number(password) === post.password) {
            await Posts.updateOne({ _id: _postId }, { $set: { title: title, content: content } })
            res.status(200).json({ "message": "게시글을 수정하였습니다." })
        }
    } catch (err) {
        // # 404 _postId에 해당하는 게시글이 존재하지 않을 경우
        if (_postId.length) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' })
        }
    }
})

// 5. 게시글 삭제
router.delete("/posts/:_postId", async (req, res) => {
    const { _postId } = req.params
    const { password } = req.body

    //에러처리
    try {
        let post = await Posts.findOne({ _id: _postId })
        //# 400 body 또는 params를 입력받지 못한 경우
        if (!password || null) {
            res.status(400).json({ message: '데이터 형식이 올바르지 않습니다.' })
        }
        //# 400 비밀번호가 일치하지 않는 경우
        else if (Number(password) !== post.password) {
            res.status(400).json({ message: '비밀 번호가 일치하지 않습니다.' })
        }
        else if (Number(password) === post.password) {

            await Posts.deleteOne({ _id: _postId })
            res.status(200).json({ "message": "게시글을 삭제하였습니다." })
        }
    } catch (err) {
        // # 404 _postId에 해당하는 게시글이 존재하지 않을 경우
        if (_postId.length) {
            res.status(404).json({ message: '게시글 조회에 실패하였습니다.' })
        }
    }

})



router.get("/user", async (req, res) => {
    const result = await User.find({})
    const _result = result.map((item) => {
        return {
            userId: item._id,
            name: item.name,
            ID: item.ID,
            pw: item.pw,
            _id: undefined
        }
    })
    try {
        res.status(200).json({ "result": _result })
    } catch (err) {
        res.status(400).json({ message: "회원 목록 조회 실패" })
    }
})

router.get("/user/:userid", async (req, res) => {
    const { userid } = req.params
    const result = await User.findById({ _id: userid })
    const _result = result.map((item) => {
        return {
            userId: item._id,
            name: item.name,
            ID: item.ID,
            pw: item.pw,
            _id: undefined
        }
    })
    try {
        res.status(200).json({ "result": [_result] })
    } catch (err) {
        res.status(400).json({ message: "회원 상세 조회 실패" })
    }
})

module.exports = router;




