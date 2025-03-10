    const mongoose = require("mongoose")

    const complaintSchema = new mongoose.Schema({
        model: {
            type: "String",
            required: true
        },
        complaint: {
            type: "String",
            required: true
        },
        place: {
            type: "String",
            required: true
        },
        date: {
            type: "String",
            required: true
        },
        proof: { type: "String" }

    })

    module.exports = mongoose.model("Complaint",complaintSchema)