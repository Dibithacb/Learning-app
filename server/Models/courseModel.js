const { duration } = require('@mui/material')
const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    image:{
       type:String,
        required:true
    }
},{timestamps:true})

module.exports=new mongoose.model("courses",courseSchema)