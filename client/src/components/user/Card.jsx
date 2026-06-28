import React from "react";
import { addToCart } from "../../services/userServices";
import { toast } from "react-toastify";

const Card = ({course}) => {

  const addCourseToCart=(courseId)=>{
    try {
      addToCart(courseId).then((res)=>{
        console.log(res.data)
        toast.success("Course added to Cart",{
          position:'top-center'
        })

      }).catch((err)=>{
        console.log(err.response)
        toast.error(err.response.data.error,{
          position:'top-center'
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card card-side bg-base-100 shadow-sm grid grid-cols-1">
      <figure className="w-full h-48">
        <img
          src={course.image}
          alt="Movie" className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{course.title}</h2>
        <p>{course.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>addCourseToCart(course._id)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
