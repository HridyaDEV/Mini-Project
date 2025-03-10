const express = require("express")
const { submitComplaint } = require("../controllers/complaintController")
const upload = require('../config/multer')

const router = express.Router()

router.post("/complaints",upload.single('proof'), submitComplaint)

module.exports = router