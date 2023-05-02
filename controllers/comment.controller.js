const { Comments } = require("../models");
const CommentService = require("../services/comments.service")
const PostService = require("../services/posts.service")


class CommentController {
    postService = new PostService()
    commentService = new CommentService()

    getA = async (req, res, next) => {

        //입력받은 데이터 값을 req.body에 저장
        const { postId } = req.params
        try {
            const existsPosts = await this.postService.getB({ where: { postId } })
            if (!existsPosts) {
                res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
                return
            }
            const comments = await this.commentService.getB(postId)
                .catch((err) => {
                    res.status(401).json({ "errorMessage": "댓글이 정상적으로 조회되지 않았습니다." })
                })
            return res.status(200).json({ comments: comments });
        } catch (err) {
            res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
        }
    }


    postA = async (req, res) => {
        const { postId } = req.params
        const { comment } = req.body
        const { userId, nickname } = res.locals.user

        try {
            const existsPosts = await this.postService.getB({ where: { postId } })
            if (!existsPosts) {
                res.status(404).json({ "errorMessage": "게시글이 존재하지 않습니다." })
                return
            }

            if (Object.keys(req.body).length === 0) {
                res.status(412).json({ "errorMessage": "데이터 형식이 올바르지 않습니다." })
                return
            }

            if (!title) {
                res.status(412).json({ "errorMessage": "게시글 제목의 형식이 일치하지 않습니다." })
                return
            }

            if (!comment) {
                return res.status(412).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
            }
            const createComment = await this.commentService.postB(
                userId,
                postId,
                comment,
                nickname

            ).catch((err) => {
                res.status(401).json({ "errorMessage": "댓글이 정상적으로 조회되지 않았습니다." })
            });
            return res.status(201).json(createComment);

        } catch (error) {
            console.log(error)
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
        }

        putA = async (req, res, next) => {
            //입력받은 데이터 값을 req.body에 저장
            const { postId, commentId } = req.params
            const { comment } = req.body
            const { userId } = req.locals.user
            //에러 처리
            try {
                const existsPosts = await this.postService.postB({ postId })
                const existsComments = await this.commentService.getA({ commentId })
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

                const putComment = await this.commentService.putB(postId, userId, commentId, comment)
                    .catch((err) => {
                        res.status(401).json({ "errorMessage": "댓글이 정상적으로 수정되지 않았습니다." })
                    })
                res.status(200).json(putComment)
            } catch (err) {
                // 400 예외 케이스에서 처리하지 못한 에러
                res.status(400).json({ "errorMessage": "게시글 작성에 실패하였습니다." })
            }

        }


        deleteA = async (req, res, next) => {
            //입력받은 데이터 값을 req.body에 저장
            const { userId } = res.locals.user
            const { postId, commentId } = req.params
            //에러 처리
            try {
                const existsPosts = await this.postService.getDetailB(postId)
                const existsComments = await this.commentService.getB(postId)
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
                const deleteComment = await this.commentService.deleteB(postId, commentId, userId)
                    .catch((err) => {
                        res.status(401).json({ "errorMessage": "댓글이 정상적으로 삭제되지 않았습니다." })
                    })
                res.status(200).json(deleteComment)
            } catch (err) {
                // 400 예외 케이스에서 처리하지 못한 에러
                res.status(400).json({ "errorMessage": "댓글 삭제에 실패하였습니다." })
            }
        }

    }
}

module.exports = CommentController