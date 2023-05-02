const { Comment } = require("../models");

class CommentRepository {

    getC = async (postId) => {
        // Comment 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
        const comments = await Comment.findAll({
            where: { PostId: postId },
            attributes: [
                "commentId",
                "UserId",
                "nickname",
                "comment",
                "createdAt",
                "updatedAt"
            ],
            order: ["createdAt", "DESC"]
        })
        return comments;
    }


    postC = async (userId, postId, nickname, comment) => {

        // Comment 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const createComment = await Comment.create({
            UserId: userId,
            PostId: postId,
            nickName: nickname,
            comment: comment,
        })
        return createComment;

    }

    putC = async (postId, userId, commentId, comment) => {

        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const createCommentData = await Comment.update(
            { comment },
            { where: { commentId: commentId, } }
        )
        return createCommentData;

    }
    deleteC = async (postId, commentId, userId) => {

        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const deleteComment = await Comment.destory({
            where: {
                commentId: commentId
            }

        })
        return deleteComment;

    }

}

module.exports = CommentRepository