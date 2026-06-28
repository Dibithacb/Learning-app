const uploadToCloudinary = require("../Utilities/imageUpload")
const courseDB=require('../Models/courseModel')
const create=async (req,res)=>{
    try {
        
        const {title,description,duration,price}=req.body

        if(!title || !description || !duration || !price){
            return res.status(400).json({error:"All fields are required "})
        }
        if(!req.file){
            return res.status(400).json({error:"Image not found"})
        }

        const cloudinaryResponse=await uploadToCloudinary(req.file.path)
        console.log(cloudinaryResponse,"image uploaded by cloudinary")
        const newCourse=new courseDB({
            title,description,duration,price,image:cloudinaryResponse
        })
        let savedCourse=await newCourse.save()
        if(savedCourse){
            return res.status(201).json({
                message:"Course added successfully",
                savedCourse
            })
        }
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const listCourses=async (req,res)=>{
    try {
        const courseList=await courseDB.find()
        res.status(200).json(courseList)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const courseDetails=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const courseData=await courseDB.findById({_id:courseId})
        if(!courseData){
           return res.status(404).json({error:"Course not found"})
        }
        return res.status(200).json(courseData)
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const updateCourse=async(req,res)=>{
    try {
        const {courseId}=req.params;
        const {title,description,duration,price}=req.body
        let imageUrl;
        let isCourseExist=await courseDB.findById({_id:courseId})
        if(!isCourseExist){
            return res.status(404).json({error:"Course not found"})
        }
        if(req.file){
           const cloudinaryResponse=await uploadToCloudinary(req.file.path) 
           imageUrl=cloudinaryResponse
        }

        const updatedCourse=await courseDB.findByIdAndUpdate(
            courseId,
            {title,description,duration,price,image:imageUrl},
            {new:true}
        )
        res.status(201).json({message:"Course Updated",updatedCourse})
    } catch (error) {
         console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const deleteCourse=async(req,res)=>{
    try {
        const {courseId}=req.params
        const deleteCourse=await courseDB.findByIdAndDelete(courseId)
        if(!deleteCourse){
            return res.status(404).json({error:"Course Not found"})
        }
        res.status(200).json({message:"Course deleted"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Invalid server error"})
    }    
}

module.exports={create,listCourses,courseDetails,updateCourse,deleteCourse}