import React, { useEffect, useState } from 'react'
import Card from '../../components/user/Card'
import { axiosInstance } from '../../axios/axiosInstance'
import { listCourses } from '../../services/userServices'

const Courses = () => {

  const [courses,setCourses]=useState([])

  useEffect(()=>{
    listCourses().then((res)=>{
      console.log(res)
      setCourses(res.data)
    }).catch((err)=>console.log(err))
  },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
      {
        courses && courses.map((course,i)=>(
          <Card key={i} course={course}/>
        ))
    }
      
    </div>
  )
}

export default Courses
