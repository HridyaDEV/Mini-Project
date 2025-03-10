const express = require("express")
const {registerUser, viewUserProfile}= require("../controllers/userController")

const router = express.Router()

router.post("/register",registerUser)
router.get("/profile/:id",viewUserProfile)

module.exports = router