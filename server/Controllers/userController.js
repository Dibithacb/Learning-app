const userDB = require("../Models/userModel")
const { createToken } = require("../Utilities/generateToken")
const {hashPassword,comparePassword} = require("../Utilities/passwordUtilities")

const register=async(req,res)=>{
    try {
        const {name,email,phone,password,confirmPassword}=req.body
        console.log(req.body,"req body")
        if(!name||!email||!phone||!password||!confirmPassword){
            return res.status(400).json({error:"All fields are required"})
        }
        if(password!==confirmPassword){
            return res.status(400).json({error:"Passwords doesn't match"})
        }

        const userExist=await userDB.findOne({email:email})//first email db field:second from req.body destructuring
        if(userExist){
            return res.status(400).json({error:"Email already exist"})
        }

        const hashedPassword=await hashPassword(password)
        const newUser=new userDB({
            name,email,phone,password:hashedPassword
        })
        const saved=await newUser.save()
        if(saved){
            const token=await createToken(saved._id)
            console.log(token)
            res.cookie("token",token)
            return res.status(201).json({message:"User created"})
        }
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const login=async (req,res) => {
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userExist=await userDB.findOne({email})
        if(!userExist){
            return res.status(404).json({error:"User not found"})
        }
        const passwordMatch=await comparePassword(password,userExist.password)
        console.log(passwordMatch)
        if(!passwordMatch){
            return res.status(400).json({error:"Password doesn't match"})
        }
        const token=await createToken(userExist._id)
            console.log(token)
            res.cookie("token",token)
        res.status(200).json({message:"user login successfull",userExist})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }

}

const logout=(req,res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:"Logged Out"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}
module.exports={register,login,logout}