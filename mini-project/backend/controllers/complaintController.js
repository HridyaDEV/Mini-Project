const Complaint = require("../models/complaintModel")
const jwt = require("jsonwebtoken");

exports.submitComplaint = async (req, res) => {
    try {
        

        //  Extract token from headers
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
           
            return res.status(401).json({ message: "Access denied! No token provided." });
        }

        //  Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_KEY);
        } catch (err) {
           
            return res.status(401).json({ message: "Invalid token. Please log in again." });
        }

        const createdBy = decoded.userId // Extract user ID
        //  Validate required fields
        const { model, complaint, place, date } = req.body

        if (!model || !complaint || !place || !date) {
           
            return res.status(400).json({ message: "Provide all required fields" });
        }

        if (!req.file) {
            
            return res.status(400).json({ message: "Provide proof file" });
        }

        //  Save complaint in MongoDB
        const newComplaint = new Complaint({
            createdBy, // Automatically set user ID
            model,
            complaint,
            place,
            date,
            proof: `/uploads/${req.file.filename}`,
            status: "Pending"
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

    const complaints = await Complaint.find({ createdBy: userId }).select('model complaint place date status createdAt proof')

    res.status(200).json({ complaints });
} catch (error) {
    console.error(" Error fetching complaints:", error);
    res.status(500).json({ message: "Error fetching complaints", error: error.message });
}
}

exports.getComplaintById = async (req, res) => {
    try {
        const complaintId = req.params.id;

        // Find the complaint by ID
        const complaint = await Complaint.findById(complaintId).select("model complaint place date status createdAt proof");

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json(complaint);
    } catch (error) {
        console.error("Error fetching complaint:", error);
        res.status(500).json({ message: "Error fetching complaint", error: error.message });
    }
};
