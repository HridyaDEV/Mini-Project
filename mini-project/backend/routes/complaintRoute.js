const express = require("express")
const { submitComplaint, getUserComplaints } = require("../controllers/complaintController")
const upload = require('../config/multer')

const router = express.Router()

router.post("/complaints",upload.single('proof'), submitComplaint)
router.get("/mycomplaints", getUserComplaints)

module.exports = router