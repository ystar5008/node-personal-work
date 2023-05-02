const PostService = require("../services/posts.service")
const LikeService = require("../services/likes.service");

class PostsController {
    postService = new PostService()
    likeService = new LikeService()

    getA = async (req, res, next) => {

        try {
            //posts에 받아온 데이터 참조
            const posts = await postService.getB();
            return res.status(200).json({ posts: posts });
        } catch (err) {
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
        }

    }

    postA = async (req, res, next) => {

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
            //postService에 있는 createPost메서드 실행 데이터를 인자로 넘겨줌
            const createPostData = await this.postService.postB(nickname, userId, title, content);
            return res.status(201).json({ "message": "게시글 작성에 성공하였습니다." }
            )
        } catch (error) {
            // 400 예외 케이스에서 처리하지 못한 에러
            console.log(error)
            res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
        }
    }


    getDetailA = async (req, res, next) => {
        const { postId } = req.params;
        try {
            const post = await this.postService.getDetailB(postId);
            res.status(200).json({ post })

        } catch (err) {
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
        }
    }
    putA = async (req, res, next) => {
        const { postId } = req.params
        const { userId } = res.locals.user
        const { title, content } = req.body
        //에러처리
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
            // # 403 게시글을 수정할 권한이 존재하지 않는 경우
            if (userId !== existsPosts.UserId) {
                res.status(403).json({ "errorMessage": "게시글 수정의 권한이 존재하지 않습니다." })
                return
            }
            const putData = await this.postService.putB(
                postId,
                userId,
                title,
                content,
            );
            res.status(200).json({ "message": "게시글을 수정하였습니다." })
        } catch (err) {
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
        }

    }

    deleteA = async (req, res, next) => {
        const { postId } = req.params
        const { userId } = res.locals.user
        //에러처리
        try {
            const existsPosts = await this.postService.getDetailB(postId)
            if (!existsPosts) {
                res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
                return
            }

            if (userId !== existsPosts.UserId) {
                res.status(403).json({ "errorMessage": "게시글의 삭제 권한이 존재하지 않습니다." })
                return
            }

            const deleteData = await this.postService.deleteB(
                userId,
                postId
            )
            res.status(200).json({ "message": "게시글을 삭제하였습니다." })

        } catch (err) {
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 수정에 실패하였습니다." })
        }
    }

    likeA = async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            const isExistPost = await this.postService.getDetailB(postId);
            if (!isExistPost) {
                return res.status(404).json({
                    errorMessage: '게시글이 존재하지 않습니다.',
                });
            }

            const isLikeA = await this.likeService.isLikeB(postId, userId)
            if (!isLikeA) {
                const delLikeA = await this.likeService.delLikeB(postId, userId)
                const decLikeA = await this.postService.decLikeB(postId, userId)
                return res.status(200).json(delLikeA);
            } else {
                const creLikeA = await this.likeService.creLikeB(postId, userId)
                const incLikeA = await this.postService.incLikeB(postId, userId)
                return res.status(200).json(creLikeA);
            }

        } catch (error) {
            console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
            return res.status(400).json({
                errorMessage: '게시글 좋아요에 실패하였습니다.',
            });
        }
    }

}

module.exports = PostsController;