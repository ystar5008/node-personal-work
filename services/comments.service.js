
const CommentRepository = require("../repositories/comment.repository")


class CommentService {
    commentRepository = new CommentRepository()

    getB = async (postId) => {
        try {
            //posts에 받아온 데이터 참조
            const comments = await this.commentRepository.getC(postId);
            return comments.map((item) => {
                return {
                    commentId: item.commentId,
                    userId: item.UserId,
                    nickname: item.nickName,
                    comment: item.comment,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                };
            });
        } catch (err) {
            // 400 예외 케이스에서 처리하지 못한 에러
            res.status(400).json({ "errorMessage": "게시글 조회에 실패하였습니다." })
        }

    }


    postB = async (userId, postId, nickname, comment) => {
        const createComment = await this.commentRepository.postC(
            userId,
            postId,
            nickname,
            comment
        );
        return { message: "댓글 작성에 성공하였습니다." };

    };

    putB = async (postId, userId, commentId, comment) => {

        const putComment = await this.commentRepository.putC(
            postId,
            userId,
            title,
            content,
        );
        return { "message": "댓글을 수정하였습니다." }
    }

    deleteB = async (postId, commentId, userId) => {
        const deleteComment = await this.commentRepository.deleteC(postId, commentId, userId)
        return { message: "댓글을 삭제하였습니다." };
    }

}

module.exports = CommentService