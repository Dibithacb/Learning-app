const { addCart, getCart, removeFromCart, clearCart } = require('../../Controllers/cartController')
const authUser = require('../../Middlewares/authUser')

const cartRouter=require('express').Router()

cartRouter.post("/addtocart/:courseId",authUser,addCart)
cartRouter.get('/getcart',authUser,getCart)
cartRouter.delete('/removefromcart/:courseId',authUser,removeFromCart)
cartRouter.post('/clearcart',authUser,clearCart)

module.exports=cartRouter