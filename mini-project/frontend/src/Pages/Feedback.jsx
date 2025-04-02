import React, { useState, useEffect } from "react";
import { submitFeedback } from "../api/userApi";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Fetch user ID from localStorage
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {

        const feedbackData = {
            userId: userId, // ✅ Ensure `userId` is included correctly
            message: feedback, // ✅ Ensure message field is properly referenced
        };

      const response = await submitFeedback(feedbackData);

      if (response ) {
        alert("Feedback submitted successfully!");
        setFeedback("");
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Give Feedback</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-600 font-medium">Your Feedback:</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
