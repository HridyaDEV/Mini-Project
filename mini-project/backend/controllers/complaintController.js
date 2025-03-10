const Complaint = require("../models/complaintModel")

exports.submitComplaint = async (req,res)=>{
    try {
        
        const {model,complaint,place,date}= req.body
        
        if(!model || !complaint ||!place||!date){
            return res.status(400).json({message:"Provide Valid Data"})
        }

        if(!req.file){
           return res.status(400).json({message:"Provide file"})
        }
        const newComplaint = new Complaint({ model, complaint, place, date, proof:`/uploads/${req.file.filename}` });
    await newComplaint.save();

    res.status(201).json({ message: "Complaint submitted successfully!" });
    } catch (error) {
       
        res.status(500).json({ message: 'Error occurred', error: error.message })
    }
}