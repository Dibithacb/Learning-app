const { paymentFunction } = require('../../Controllers/paymentController')
const authUser = require('../../Middlewares/authUser')

const paymentRouter=require('express').Router()

paymentRouter.post('/makepayment',authUser,paymentFunction)

module.exports=paymentRouter 