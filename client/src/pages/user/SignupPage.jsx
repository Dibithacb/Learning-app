import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSignUp } from '../../services/userServices'
import { toast } from 'react-toastify'

const SignupPage = () => {
  const [values,setValues]=useState({
    name:'',
    email:'',
    phone:'',
    password:'',
    confirmPassword:''
  })

  const navigate=useNavigate()
  const onSubmit=()=>{
    console.log(values,"values")
    userSignUp(values).then((res)=>{
      console.log(res)
      toast.success("SignUp Successfull")
      navigate('/')
    }).catch(err=>{
      console.log(err,"error")
      //toast.warning,success
      toast.error(err.response.data.error,
        {position:'top-center'}
      )
    }
    )
  }
  return (
    <div className="hero bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name='name' className="input" placeholder="Name" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>  
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
          <label className="label">Phone</label>
          <input type="tel" name='phone' className="input" placeholder="Phone" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
          <label className="label">Confirm Password</label>
          <input type="password" name='confirmPassword' className="input" placeholder="ConfirmPassword" required onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
          <button className="btn btn-neutral mt-4" onClick={onSubmit}>Sign Up</button>
          <div className="text-center p-2">
                    Already have an account?<Link to={"/login"} className="text-blue-600 underline">Login</Link>
              </div>
        </fieldset>
      </div>
    </div>
  </div>
</div>
  )
}

export default SignupPage