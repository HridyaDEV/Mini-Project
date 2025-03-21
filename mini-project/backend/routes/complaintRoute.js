const express = require("express")
const { submitComplaint, getUserComplaints, getComplaintById } = require("../controllers/complaintController")
const upload = require('../config/multer')

const router = express.Router()

router.post("/complaints",upload.single('proof'), submitComplaint)
router.get("/mycomplaints", getUserComplaints)
router.get("/viewcomplaint/:id",  getComplaintById); // New route for fetching a complaint by ID


module.exports = router