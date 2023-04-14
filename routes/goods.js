const express = require("express")
//express.Router를 router 변수에 할당
const router = express.Router()

//기본 url
//(요청, 응답)
//실제로 API를 실행할 API에 받은 데이터는 req(요청)라는 객체안에 들어있음
//app.js에서 넘어왔기때문에 localhost:3000/api/가 기본 경로 (GET)
// router.get('/', (req, res) => {
//     //res(응답, 반환).send메서드로 send안에 있는 값 반환
//     res.send("default url for goods.js GET Method")
// })

//localhost:3000/api/about GET
// router.get('/about', (req, res) => {
//     res.send("goods.js about PATH")
// })


// /routes/goods.js
const goods = [
    {
        goodsId: 4,
        name: "상품 4",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
        category: "drink",
        price: 0.1,
    },
    {
        goodsId: 3,
        name: "상품 3",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
        category: "drink",
        price: 2.2,
    },
    {
        goodsId: 2,
        name: "상품 2",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
        category: "drink",
        price: 0.11,
    },
    {
        goodsId: 1,
        name: "상품 1",
        thumbnailUrl:
            "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
        category: "drink",
        price: 6.2,
    },
];


//반환정보 전달
router.get("/goods", (req, res) => {
    //어떤 상태코드로 반환됐는지 확인 status()
    //"key"  : 변수goods
    res.status(200).json({ "goods": goods })
})


router.get("/goods/:goodsId", (req, res) => {
    // requset된 변수  goodsId 구조분해할당 
    const { goodsId } = req.params;

    // let result = null
    // for (const good of goods) {
    //     //입력 받은 goodsId와 객체 goods의 goodsId가 일치 할떄 변수 result에 상품정보 입력
    //     if (Number(goodsId) === good.goodsId) {
    //         result = good
    //     }
    // }


    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId)

    res.status(200).json({ "detail": result })
})

const Goods = require("../schemas/goods")

router.post("/goods/", async (req, res) => {
    const { goodsId, name, thumbnailUrl, category, price } = req.body;

    const goods = await Goods.find({ goodsId });

    if (goods.length) {
        return res.status(400).json({
            success: false,
            erroeMessage: "이미존재하는 GoodsId입니다."
        })
    }
    const createGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price })
    res.json({ goods: createGoods })
})

//router 모듈로 goods.js를 밖으로 내보냄 다른 파일에서 사용가능
module.exports = router;