
const { Likes } = require("../models/likes")

class LikeRepository {

    findLikeC = async (userId) => {
        const likedData = await Likes.findAll({
            where: { userId: userId },
            attributes: ["postId"],
        });
        return likedData;
    };

    isLikeC = async (postId, userId) => {
        const likeExistData = await Likes.findOne({
            where: {
                [Op.and]: [{ postId: postId }, { UserId: userId }],
            },
        });
        return likeExistData;
    };


    delLikeC = async (postId, userId) => {
        const createLikeData = await Likes.create(postId, userId);
        return { message: "게시글의 좋아요를 등록하였습니다." };
    }

    creLikeC = async (postId, userId) => {
        const deleteLikeData = await Likes.destroy(postId, userId);
        return { message: "게시글의 좋아요를 취소하였습니다." };
    }




}

module.exports = LikeRepository