import { axiosInstance } from "../axios/axiosInstance"


export const listCourses=()=>{
    return axiosInstance.get("/course/listCourses")
}

export const userSignUp=(data)=>{
    return axiosInstance.post("/user/register",data)
}

export const userLogin=(data)=>{
    return axiosInstance.post("/user/login",data)
}

export const userLogout=()=>{
    return axiosInstance.post("/user/logout")
}

export const addToCart=(courseId)=>{
    return axiosInstance.post(`/cart/addtocart/${courseId}`)
}

export const getCartItems=()=>{
    return axiosInstance.get(`/cart/getcart`)
}

export const removeCartItem=(courseId)=>{
    return axiosInstance.delete(`/cart/removefromcart/${courseId}`)
}

export const makepaymentOnStripe=(body)=>{
    return axiosInstance.post(`payment/makepayment`,body)
}

export const clearCartItems=(body)=>{
    return axiosInstance.post('cart/clearCart',body)
}