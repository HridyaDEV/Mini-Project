const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true 
        }, // Reference to User
    message: { 
        type: String,
         required: true
         },

         status: {
            type: Boolean,
            default: false, // ✅ Default status is false (admin needs to approve)
        },
   
   
  },{ timestamps: true });
  
  module.exports = mongoose.model("Feedback", FeedbackSchema)