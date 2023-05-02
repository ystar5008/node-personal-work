//repository 계층 가져오기
const PostRepository = require('../repositories/posts.repository');

class PostService {
    //인스턴스
    postRepository = new PostRepository();

    getB = async () => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        // allPost에 받아온 데이터 참조
        const allPost = await this.postRepository.getC();

        // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
        allPost.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return allPost.map(item => {
            return {
                postId: item.postId,
                nickname: item.nickname,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        });
    }

    postB = async (nickname, userId, title, content) => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const createPostData = await this.postRepository.postC(nickname, userId, title, content);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { message: "게시글 작성에 성공하였습니다." };
    }


    getDetailB = async (postId) => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const getData = await this.postRepository.getDetailC(postId);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return {
            postId: getData.postId,
            userId: getData.UserId,
            nickname: getData.nickname,
            title: getData.title,
            content: getData.content,
            likes: getData.likes,
            createdAt: getData.createdAt,
            updatedAt: getData.updatedAt,
        };
    }



    putB = async (nickname, userId, title, content) => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const createPostData = await this.postRepository.putC(nickname, userId, title, content);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { message: "게시글 수정에 성공하였습니다." };
    }


    deleteB = async (userId, postId) => {
        // 저장소(Repository)에게 데이터를 요청합니다.
        const deleteData = await this.postRepository.deleteC(userId, postId);

        // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
        return { message: "게시글 삭제에 성공하였습니다." };
    }


    likeB = async (likedData) => {
        const findLikedPostData = await this.postRepository.likeC(
            likedData
        );

        const posts = findLikedPostData.map((post) => ({
            postId: post.postId,
            userId: post.UserId,
            nickname: post.nickname,
            title: post.title,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            likes: post.like,
        }));

        return posts;
    };

    decLikeB = async (postId, userId) => {
        const decLike = await this.postRepository.decLikeC(postId, userId)
        return decLike
    }

    incLikeB = async (postId, userId) => {
        const incLike = await this.postRepository.incLikeC(postId, userId)
        return incLike

    }
}

module.exports = PostService;