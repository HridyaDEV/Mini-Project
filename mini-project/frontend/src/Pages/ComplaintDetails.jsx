import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaintById } from "../api/complaintApi";
import { ArrowLeftIcon } from "lucide-react";

function ComplaintDetails() {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) {

            console.error("Complaint ID is missing");
            return;
        }
        async function fetchComplaint() {
            const data = await getComplaintById(id);
            setComplaint(data);
        }
        fetchComplaint();
    }, [id]);

    if (!complaint) {
        return 
    }

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
             {/* Back Button */}
             <button 
                onClick={() => navigate(-1)} 
                className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4 self-start ml-6"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
            </button>
            
            <h2 className="text-3xl font-bold mb-6">Complaint Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
                <p className="text-lg">
                    <strong>Complaint Model:</strong> {complaint.model}
                </p>
                <p className="text-lg mt-2">
                    <strong>Description:</strong> {complaint.complaint}
                </p>
                <p className="text-lg mt-2">
                    <strong>Place:</strong> {complaint.place}
                </p>
                <p className="text-lg mt-2">
                    <strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}
                </p>
                <p className="text-lg mt-2">
                    <strong>Status:</strong> {complaint.status}
                </p>
                {/* {complaint.proof && (
                    <div className="mt-4">
                        <strong>Proof:</strong>
                        <img
                            src={`http://localhost:5111${complaint.proof}`}
                            alt="Complaint Proof"
                            className="w-full mt-2 rounded-lg"
                        />
                    </div>
                )} */}
                {complaint.proof && (
    <div className="mt-4">
        <strong>Proof:</strong>
        {complaint.proof.endsWith(".mp4") || complaint.proof.endsWith(".mov") || complaint.proof.endsWith(".avi") ? (
            <video
                controls
                className="w-full mt-2 rounded-lg"
                style={{ maxHeight: "400px" }} // Adjust size as needed
            >
                <source src={`http://localhost:5111${complaint.proof}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        ) : (
            <img
                src={`http://localhost:5111${complaint.proof}`}
                alt="Complaint Proof"
                className="w-full mt-2 rounded-lg"
                onError={(e) => { e.target.style.display = "none"; }} // Hide if broken
            />
        )}
    </div>
)}

            </div>
        </div>
    );
}

export default ComplaintDetails;
