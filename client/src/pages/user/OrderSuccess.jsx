import React, { useEffect } from 'react'
import { clearCartItems } from '../../services/userServices'

const OrderSuccess = () => {
    useEffect(()=>{
        clearCartItems().then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    })
  return (
    <div>
      <p>ORDER PLACED SUCCESSFULLY</p>
      <button className='btn bg-blue-600'>View Details</button>
    </div>
  )
}

export default OrderSuccess
