import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/userServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../redux/features/userSlice";

const LoginPage = () => {
  const [values,setValues]=useState({
    email:'',
    password:''
  })

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const onSubmit=()=>{
    userLogin(values).then((res)=>{
      console.log(res)
      toast.success("Login Successful",{
        position:'top-center'
      })
      dispatch(saveUser(res.data.userExist))
      navigate('/')
    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.error,{
        position:'top-center'
      })
    })
    console.log(values,"states")
  }
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" name="email" className="input" placeholder="Email" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
              <label className="label">Password</label>
              <input type="password" name="password" className="input" placeholder="Password" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4" onClick={onSubmit}>Login</button>
              <div className="text-center p-2">
                    Don't have an account?<Link to={"/signup"} className="text-blue-600 underline">Sign up</Link>
              </div>
              
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
