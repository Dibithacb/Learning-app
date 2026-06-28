import React from "react";
import { removeCartItem } from "../../services/userServices";

const CartCard = ({item,updateCartFromChild}) => {

  const removeItem=(courseId)=>{
    try {
      removeCartItem(courseId).then((res)=>{
        console.log(res.data)
        updateCartFromChild(courseId,res.data.cart.totalPrice)
      }).catch((err)=>{
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

    console.log(item)
  return (
    <div className="bg-gray-100 bg-base-100 w-full shadow-sm flex items-center justify-between py-5 text-black">
      <figure>
        <img
          src={item.courseId.image}
          alt="Shoes" className="h-25"
        />
      </figure>
      <div className="">
        
        <p>Price:{item.price}</p>
        
      </div>
      <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>removeItem(item.courseId._id)}>Remove</button>
        </div>
    </div>
  );
};

export default CartCard;
