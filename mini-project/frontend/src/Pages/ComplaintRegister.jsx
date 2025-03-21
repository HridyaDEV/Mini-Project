import React, { useState } from "react";
import { submitComplaint } from "../api/complaintApi";

function ComplaintRegister() {
  
  const [model, setModel] = useState("")
  const [complaint, setComplaint] = useState("")
  const [place, setPlace] = useState("")
  const [date, setDate] = useState("")
  const [proof, setProof] = useState(null)

  const complaintModels = [
    "Traffic Viloation",
    "Public Disturbance",
    "Property Damage",
    "Domestic Violence",
    "Harassment",
    "Noise Complaint",
    "Theft",
    "Other"
  ]

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
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-6">
      <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg " onSubmit={handleSubmit}>
        <h1 className="text-gray-800 text-3xl font-bold mb-6 text-center">Report Issues Seamlessly</h1>
        <p className="text-gray-600 text-center mb-6">
          Our platform empowers users to submit complaints with ease, offering tools to upload
          multimedia for comprehensive issue reporting.
        </p>

        <div className="mb-4">
          <label className="text-gray-700 font-semibold block mb-1">Complaint Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full  p-3 border border-gray-300 rounded-md  focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select a model</option>
            {complaintModels.map((item,index)=>(
              <option key={index} value={item}>{item}</option>
            ))}
           
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-semibold block mb-1">Complaint</label>
          <textarea
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            placeholder="Describe your complaint"
            className="w-full  p-3 border border-gray-300 rounded-md  focus:ring focus:ring-blue-200"
             rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-semibold block mb-1">Place</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter place"
            className="w-full  p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 "
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-semibold block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 font-semibold block mb-1">Proof(Image/Videos)</label>
          <input
            type="file"
            onChange={(e) => setProof(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ComplaintRegister;
