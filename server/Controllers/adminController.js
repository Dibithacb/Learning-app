const adminDB=require('../Models/adminModel')
const { createToken } = require('../Utilities/generateToken')
const { hashPassword, comparePassword } = require('../Utilities/passwordUtilities')
const register=async (req,res) => {
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const emailexist=await adminDB.findOne({email})
        if(emailexist){
           return res.status(400).json({error:"Email already exist"})
        }

        const hashedPassword=await hashPassword(password)

        const newAdmin=new adminDB({
            email,
            password:hashedPassword
        })

        const saved=await newAdmin.save()
        if(saved){
            return res.status(201).json({message:"Admin created successfully",saved})
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
            return res.status(404).json({error:"All fields are required"})
        }
        const adminexist=await adminDB.findOne({email})
        if(!adminexist){
            return res.status(404).json({error:"User not found"})
        }

        
        const passwordMatch=await comparePassword(password,adminexist.password)
        if(!passwordMatch){
            return res.status(404).json({error:"Passwords doesn't match"})
        }

        const token=await createToken(adminexist._id,"admin")
        res.cookie("Admin_token",token)
       return res.status(200).json({message:"Admin login successfull",adminexist})


    } catch (error) {
        console.log(error)
        return res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

const logout=async (req,res)=>{
    try {
        res.clearCookie("Admin_token")
        res.status(200).json({message:"Logout successfully"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error:error.message || "Internal server error"})
    }
}

module.exports={register,login,logout}