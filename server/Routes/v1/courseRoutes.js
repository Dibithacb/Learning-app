const { create, listCourses, courseDetails, updateCourse, deleteCourse } = require('../../Controllers/courseController')
const authAdmin = require('../../Middlewares/authAdmin')
const upload = require('../../Middlewares/multer')

const courseRouter=require('express').Router()

courseRouter.post('/create',authAdmin,upload.single("image"),create)
courseRouter.get('/listCourses',listCourses)
courseRouter.get('/courseDetails/:courseId',courseDetails)
courseRouter.put('/update/:courseId',authAdmin,upload.single("image"),updateCourse)
courseRouter.delete('/delete/:courseId',authAdmin,deleteCourse)
module.exports=courseRouter