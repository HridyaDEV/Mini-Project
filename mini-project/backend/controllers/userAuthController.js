const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req,res)=>{
    try {
        const {fullName ,mobile,dob,email,password}= req.body
       
        if(!fullName ||!mobile ||!email ||!password){
            return res.status(400).json({message:"Provide valid data"})
        }

        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,8)

        const newUser = new User({fullName, email, password:hashedPassword})
        await newUser.save()

        res.status(201).json({ message : "Error occured", error:error.message })
    } catch (error) {
        
    }
}