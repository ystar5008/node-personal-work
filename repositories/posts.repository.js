//sequelize를 사용해 레포지토리에 접근
const { Posts } = require('../models');

class PostRepository {

    getC = async () => {
        // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
        const posts = await Posts.findAll({
            attributes: ["postId", "userId", "nickname", "title", "createdAt", "updatedAt"],
            order: [['createdAt', 'DESC']],
        })
        return posts;

    }

    postC = async (userId, nickname, title, content) => {
        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const createPostData = await Posts.create({ UserId: userId, nickname, title, content });

        return createPostData;
    }


    getDetailC = async (postId) => {
        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
        const createPostData = await Posts.findOne(
            {
                attributes: ["postId", "UserId", "nickname", "title", "content", "createdAt", "updatedAt"],
                where: { postId }
            });

        return createPostData;
    }

    putB = async (title, content, postId, UserId) => {
        const postUpdate = await Posts.update({ title: title, content: content },
            { where: { postId, UserId } })

        return postUpdate
    }

    deleteC = async (userId, postId) => {
        // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.

        const deletePost = await Posts.destroy({
            where: { postId: postId, UserId: userId }
        })
        return deletePost;
    }

    likeC = async (likedData) => {
        const likedPostData = await Posts.findAll({
            where: {
                postId: {
                    [Op.in]: likedData,
                },
            },
        });
        return likedPostData;
    };

    decLikeC = async (postId, userId) => {
        const likeDec = await Posts.findOne({
            where: { postId: postId },
        });
        await postDecrease.decrement("likes", { by: 1 });
        return likeDec;
    };

    incLikeC = async (postId, userId) => {
        const likeInc = await Posts.findOne({
            where: { postId: postId },
        });
        await postIncrease.increment("likes", { by: 1 });

        return likeInc;
    };


}

module.exports = PostRepository;