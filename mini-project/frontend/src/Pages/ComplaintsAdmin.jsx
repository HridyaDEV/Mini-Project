import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllComplaints, updateComplaintStatus } from "../api/complaintApi";

const ComplaintsAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [solvedComplaints, setSolvedComplaints] = useState([]);
  const [rejectedComplaints, setRejectedComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const complaints = await getAllComplaints();

    if (Array.isArray(complaints) && complaints.length > 0) {
      setComplaints(complaints.filter((c) => c.status === "Pending"));
      setSolvedComplaints(complaints.filter((c) => c.status === "Solved"));
      setRejectedComplaints(complaints.filter((c) => c.status === "Rejected"));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await updateComplaintStatus(id, status);
    fetchComplaints();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="bg-white p-10 rounded-xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center border-b pb-4">Complaint Management</h1>

          {/* Complaints Section */}
          <div className="grid grid-cols-1 gap-8 mb-8">
            {/* All Complaints */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Complaints</h2>
              <div className="h-64 overflow-y-auto space-y-4">
                {complaints.length > 0 ? (
                  complaints.map((complaint) => (
                    <div key={complaint._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300">
                      <div>
                        <p className="text-lg font-bold text-gray-900">{complaint.model}</p>
                        <p className="text-sm text-gray-700">{complaint.complaint}</p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleUpdateStatus(complaint._id, "Solved")}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                          Solve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(complaint._id, "Rejected")}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No pending complaints</p>
                )}
              </div>
            </div>
          </div>

          {/* Solved & Rejected Complaints Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solved Complaints */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-4">Solved Complaints</h2>
              <div className="h-64 overflow-y-auto space-y-4">
                {solvedComplaints.length > 0 ? (
                  solvedComplaints.map((complaint) => (
                    <div key={complaint._id} className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300">
                      <p className="text-lg font-bold text-gray-900">{complaint.model}</p>
                      <p className="text-sm text-gray-700">{complaint.complaint}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No solved complaints</p>
                )}
              </div>
            </div>

            {/* Rejected Complaints */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-red-300">
              <h2 className="text-2xl font-semibold text-red-800 mb-4">Rejected Complaints</h2>
              <div className="h-64 overflow-y-auto space-y-4">
                {rejectedComplaints.length > 0 ? (
                  rejectedComplaints.map((complaint) => (
                    <div key={complaint._id} className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300">
                      <p className="text-lg font-bold text-gray-900">{complaint.model}</p>
                      <p className="text-sm text-gray-700">{complaint.complaint}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No rejected complaints</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsAdmin;