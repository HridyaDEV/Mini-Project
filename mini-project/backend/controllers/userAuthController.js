const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {

    try {
        const { fullName, mobile, dob, email, password, role } = req.body;


        if (!fullName || !mobile || !dob || !email || !password) {
            return res.status(400).json({ message: "Provide valid data" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });


        const hashedPassword = await bcrypt.hash(password, 10);

        // if no role is provided, default to user

        const userRole = role || "user"


        const newUser = new User({ fullName, mobile, dob, email, password: hashedPassword, userRole });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("❌ Error in Registration:", error);
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
};


exports.login = async (req,res)=>{
    try {
        const {email , password} = req.body

        const user =  await User.findOne({ email})
        if(!user){
            return res.status(400).json({error:"Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({error:"Invalid Password"})
        }

        const token = jwt.sign(
            {
                userId: user._id, role:user.role
            },
            process.env.JWT_KEY,
            {expiresIn:process.env.EXPIRING}
        )
        res.status(200).json({message:"Login successful"})
    } catch (error) {
        res.status(500).json({message:" Error occured", error: error.message})
    }
}