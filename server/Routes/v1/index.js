const adminRouter = require('./adminRoutes')
const cartRouter = require('./cartRoutes')
const courseRouter = require('./courseRoutes')
const paymentRouter = require('./paymentRoutes')
const userRouter = require('./userRoutes')

const v1Router=require('express').Router()

v1Router.use("/user",userRouter)
v1Router.use("/admin",adminRouter)
v1Router.use("/course",courseRouter)
v1Router.use("/cart",cartRouter)
v1Router.use("/payment",paymentRouter)

module.exports=v1Router