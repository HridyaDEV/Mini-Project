const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    fullName : {
        type : "String",
        required: true
    },
    mobile : {
        type : "String",
        required: true
    },
    dob: { 
        type: "String",
         required: true 
        },
        email: {
             type: "String", 
             required: true, 
             },
    password: { type: "String",
         required: true,
    }
})
 module.exports = mongoose.model("User",UserScheme)