const express = require("express")
const router = express.Router()
const Cart = require("../schemas/cart")
const Goods = require("../schemas/goods")


// localhost:3000/api/carts GET Method로 호출할때
router.get("/carts", async (req, res) => {
    //carts = {goodsId, quantity}
    // [goodsId: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    // quantity: {
    //     type: Number,
    //     required: true,

    // }]
    const carts = await Cart.find({})
    //goodsid만 가져온 값을 배열로 만듬
    const goodsIds = carts.map((cart) => {
        return cart.goodsId
        //[2,4,7,15]

    })

    const goods = await Goods.find({ goodsId: goodsIds })
    //Goods에 해당하는 모든 정보를 가지오 온다
    //goodsIds 변수 안에 존재하는 값일 때만 조회
    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item) => item.goodsId === cart.goodsId),

        }

    })
    res.json({
        "carts": results,
    })

})






module.exports = router