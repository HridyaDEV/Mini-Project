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

exports.getUserProfile = async (req,res) =>{
   try {
    
    const user = await User.findById(req.params.id)
    if (!user){
        return res.status(400).json({message:"User not found"})
    }
    res.status(200).json({
        fullName: user.fullName,
        mobile: user.mobile,
        dob:user.dob,
        email: user.email,
        password: user.password,
        address:user.address || "",
        state : user.state || "",
        idproof : user.idproof || "",
        idnumber : user.idnumber || ""
    })
   } catch (error) {
    res.status(500).json({message:"Error fetching user", error : error.message})
    
   }
}

exports.updateUserProfile = async (req,res) => {
    try {
        const userId = req.params.id
        const updateData = req.body

        const updatedUser = await User.findByIdAndUpdate(userId, updateData,{ new : true})

        if(!updatedUser){
            return res.status(404).json({message:"user not found"})
        }

        res.status(200).json({message:"Profile updated Successfuly", user: updatedUser})

    } catch (error) {
        res.status(500).json({message:"Error updating profile", error: error.message})
    }
}