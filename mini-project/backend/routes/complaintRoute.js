const express = require("express")
const { submitComplaint, getUserComplaints, getComplaintById, getAllComplaints, updateComplaintStatus } = require("../controllers/complaintController")
const upload = require('../config/multer')

const router = express.Router()

router.post("/complaints",upload.single('proof'), submitComplaint)
router.get("/mycomplaints", getUserComplaints)
router.get("/viewcomplaint/:id",  getComplaintById)
router.get("/allcomplaints",getAllComplaints)
router.put("/complaints/:id/status", updateComplaintStatus)


module.exports = router