import React, { useEffect, useState } from 'react'
import CartCard from '../components/user/CartCard'
import { getCartItems, makepaymentOnStripe } from '../services/userServices'
import { useNavigate } from 'react-router-dom'
import {loadStripe} from '@stripe/stripe-js';

const stripe_publickey=import.meta.env.VITE_PUBLISHED_KEY_STRIPE
const stripePromise = loadStripe(stripe_publickey);

const CartPage = () => {

    const [cartItems,setCartItems]=useState([])
    const [total,setTotal]=useState(0)

    const navigate=useNavigate()

    const updateCartFromChild=(id,totalPrice)=>{
        console.log(id,totalPrice,"data from child")
        setCartItems((prev)=>prev.filter(item=>item.courseId._id != id))
        setTotal(totalPrice)
    }

    function EmptyCart(){
        return(
            <div className='flex justify-center items-center flex-col h-screen'>
                <p>Cart is empty</p>
                <button className="btn btn-primary" onClick={()=>navigate("/courses")}>Get Courses</button>
            </div>
        )
    }

    const makePayment=async ()=>{
        const body={
            products:cartItems
        }

        const response = await makepaymentOnStripe(body);

        if (response.data.url) {
            window.location.href = response.data.url;
        } else {
            console.log("Checkout URL not received");
        }
    }
    useEffect(()=>{
        getCartItems().then((res)=>{
            console.log(res.data,"data")
            setCartItems(res.data.courses)
            setTotal(res.data.totalPrice)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

  return (
    <>
    {
        cartItems.length ? <>
        {
            cartItems.map((cartItem)=>(<CartCard key={cartItem._id} item={cartItem} updateCartFromChild={updateCartFromChild} />))
        }
        <div className='text-right mt-5'>
            <p>Total Price:{total}</p>
            <button className='btn bg-green-700 text-white' onClick={makePayment}>Check Out</button>
        </div>
        </> : <EmptyCart/>
    }
        
    </>
  )
}

export default CartPage