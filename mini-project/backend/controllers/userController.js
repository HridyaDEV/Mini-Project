const User = require("../models/userModel")

exports.registerUser = async (req , res) => {
    try {
        const {fullName, mobile,dob,email,password} = req.body

        if (!fullName || !mobile || !dob || !email || !password) {
            return res.status(400).json({ message: 'Provide valid data' })
        }

        const existingUser = await User.findOne({email})
        if (existingUser)
            return res.status(400).json({error:"User already exists"})
        
        const newUser = new User({fullName,mobile,dob,email,password})
        await newUser.save()

        res.status(201).json({message : "User registered successfully "})
    } catch (error) {
        res.status(500).json({error: "Registration failed"})
        
    }
}

exports. viewUserProfile = async (req,res) =>{
    try {
        const {id} = req.params
        const userData = await User.findById(id)
        if(!userData){
            return res.status(400).json({message:"No data found"})
        }
        res.status(200).json(userData)
    } catch (error) {
       res.status(500).json({message:"Error while fetching data"}) 
    }
}