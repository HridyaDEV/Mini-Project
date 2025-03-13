const Complaint = require("../models/complaintModel")
const jwt = require("jsonwebtoken");

exports.submitComplaint = async (req, res) => {
    try {
        

        // 1️⃣ Extract token from headers
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
           
            return res.status(401).json({ message: "Access denied! No token provided." });
        }

        // 2️⃣ Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
           
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }

        const createdBy = decoded.userId; // Extract user ID

       

        // 4️⃣ Validate required fields
        const { model, complaint, place, date } = req.body;
        if (!model || !complaint || !place || !date) {
           
            return res.status(400).json({ message: "Provide all required fields" });
        }

        if (!req.file) {
            
            return res.status(400).json({ message: "Provide proof file" });
        }

        // 5️⃣ Save complaint in MongoDB
        const newComplaint = new Complaint({
            createdBy, // Automatically set user ID
            model,
            complaint,
            place,
            date,
            proof: `/uploads/${req.file.filename}`,
        });

        await newComplaint.save();
        
        res.status(201).json({ message: "Complaint registered successfully!" });

    } catch (error) {
      
        res.status(500).json({ message: "Error occurred", error: error.message });
    }
};

exports.getUserComplaints = async (req, res) =>{
    try {
       // Extract token from headers
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            return res.status(401).json({message : "Access deneid ! no token provided"})
        }
        let decoded;
        try{
            decoded = jwt.verify(token, process.env.JWT_KEY)
            console.log("Token verified:" ,decoded);
            
        }


    catch (error) {
        console.error(" Token verification failed:", err.message);
        return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    const userId = decoded.userId

    const complaints = await Complaint.find({ createdBy: userId })

    res.status(200).json({ complaints });
} catch (error) {
    console.error("❌ Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
}
}
