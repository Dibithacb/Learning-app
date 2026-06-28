const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const apiRouter = require('./Routes')
const cookieParser=require('cookie-parser')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"https://learning-app-frontend-rho.vercel.app",
    credentials:true
}))

mongoose.connect(process.env.MONGO_URL).then((res)=>{
    console.log("DB Connection successfull")
}).catch((err)=>{
    console.log(err)
})
app.get("/", (req, res) => {
  res.send("Server running");
});
app.use('/api',apiRouter)

const port=process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server starts on port ${port}`)
})

//p9f8pLGtFYoapleq
//dibitha123_db_user