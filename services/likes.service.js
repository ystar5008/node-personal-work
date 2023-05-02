const LikeRepository = require("../repositories/likes.repository")


class LikeService {
    likeRepository = new LikeRepository()

    findLikeB = async (userId) => {
        const likedData = await this.likeRepository.findLikeC(userId);
        const postId = likedData.map((item) => {
            return item.postId;
        });
        return postId;
    };

    isLikeB = async (postId, userId) => {
        const likeExistData = await this.likeRepository.isLikeC(
            postId,
            userId
        );
        return likeExistData;
    };


    delLikeB = async (postId, userId) => {
        const createLikeData = await this.likeRepository.delLikeB(postId, userId);
        return { message: "게시글의 좋아요를 등록하였습니다." };
    }

    creLikeB = async (postId, userId) => {
        const deleteLikeData = await this.likeRepository.creLikeB(postId, userId);
        return { message: "게시글의 좋아요를 취소하였습니다." };
    }





}

module.exports = LikeService