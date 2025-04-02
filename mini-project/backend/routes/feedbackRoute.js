const express = require("express")
const { submitFeedback, getAllFeedbacks } = require("../controllers/feedbackController")


const router = express.Router()

router.post("/submit", submitFeedback)
router.get("/all", getAllFeedbacks)

module.exports=router