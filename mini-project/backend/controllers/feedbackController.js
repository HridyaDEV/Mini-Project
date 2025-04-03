const FeedbackModel = require("../models/feedbackModel");  // Import the model

exports.submitFeedback = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("User in request:", req.user);
        const { userId, message } = req.body;
      

        if (!userId || !message) {
            return res.status(400).json({ error: "User ID and message are required" });
        }

        if (typeof userId !== "string") {
            return res.status(400).json({ error: "Invalid User ID format" });
        }

        // Create a new feedback entry using the model
        const newFeedback = new FeedbackModel({ user: userId, message });

        // Save it to the database
        await newFeedback.save(); 

        res.status(201).json({
            message: "Feedback submitted successfully!"
        });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({
            message: "Error submitting feedback",
            error: error.message
        });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedbackModel.find().populate("user", "fullName email"); // Fetch feedbacks with user details
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedbacks" });
    }
};

exports.updateFeedbackStatus = async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const { status } = req.body; // Accepting status from request body

        const feedback = await FeedbackModel.findById(feedbackId);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        feedback.status = status; // Updating status (true for approve, false for reject)
        await feedback.save();

        res.status(200).json({ message: `Feedback ${status ? "approved" : "rejected"} successfully!` });
    } catch (error) {
        console.error("Error updating feedback status:", error);
        res.status(500).json({ message: "Error updating feedback status", error: error.message });
    }
};
