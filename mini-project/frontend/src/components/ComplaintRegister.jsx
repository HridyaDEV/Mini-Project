import React, { useState } from "react";
import { submitComplaint } from "../api/complaintApi";

function ComplaintRegister() {
  const [model, setModel] = useState("");
  const [complaint, setComplaint] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [proof, setProof] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("model", model);
      formData.append("complaint", complaint);
      formData.append("place", place);
      formData.append("date", date);
      if(proof){
        formData.append("proof", proof);

      }
      

      const response = await submitComplaint(formData);

      if (response?.status === 201) {
        alert("Complaint submitted successfully!");
        setModel("");
        setComplaint("");
        setPlace("");
        setDate("");
        setProof(null);
      } else {
        alert("Failed to submit complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-black text-2xl font-semibold mb-4 text-center">Report Issues Seamlessly</h1>
        <p className="text-gray-600 text-center mb-6">
          Our platform empowers users to submit complaints with ease, offering tools to upload
          multimedia for comprehensive issue reporting.
        </p>

        <div className="mb-4">
          <label className="text-black block">Complaint Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-400 rounded-md text-black bg-white"
            required
          >
            <option value="">Select a model</option>
            <option value="Traffic Violation">Traffic Violation</option>
            <option value="Public Disturbance">Public Disturbance</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="text-black block">Complaint</label>
          <input
            type="text"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Enter your complaint"
            className="w-full mt-1 p-2 border border-gray-400 rounded-md text-black bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-black block">Place</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter place"
            className="w-full mt-1 p-2 border border-gray-400 rounded-md text-black bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-black block">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-400 rounded-md text-black bg-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-black block">Proof</label>
          <input
            type="file"
            onChange={(e) => setProof(e.target.files[0])}
            className="w-full mt-1 p-2 border border-gray-400 rounded-md text-black bg-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ComplaintRegister;
