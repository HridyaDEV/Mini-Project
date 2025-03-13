const express = require("express")
const {registerUser,  getUserProfile, updateUserProfile}= require("../controllers/userController")

const router = express.Router()

router.post("/register",registerUser)
router.get("/profile/:id",getUserProfile)
router.put("/profile/:id",updateUserProfile)

module.exports = router