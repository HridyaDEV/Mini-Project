import React, { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import { getAllFeedbacks } from "../api/userApi";

const Reports = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getAllFeedbacks();
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {feedbacks.length === 0 ? (
            <p>No feedbacks available.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">User Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Message</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{feedback.userId?.name || "Unknown"}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.userId?.email || "Unknown"}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.message}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.status ? "Approved" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
