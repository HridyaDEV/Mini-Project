import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllComplaints, updateComplaintStatus } from "../api/complaintApi";
import { useNavigate } from "react-router-dom";

const ComplaintsAdmin = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const complaints = await getAllComplaints();
    if (Array.isArray(complaints)) {
      setComplaints(complaints);
      setFilteredComplaints(complaints);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    await updateComplaintStatus(id, status);
    fetchComplaints();
  };

  // Filtering function
  const handleFilter = () => {
    let filtered = complaints;

    if (statusFilter) {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    if (modelFilter) {
      filtered = filtered.filter((c) => c.model === modelFilter);
    }

    setFilteredComplaints(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* Header with Filters */}
          <div className="flex justify-between items-center border-b pb-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              Complaint Management
            </h1>

            {/* Filter Section */}
            <div className="flex space-x-3">
              <select
                className="border px-3 py-2 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Solved">Solved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                className="border px-3 py-2 rounded-md"
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
              >
                <option value="">All Models</option>
                {Array.from(new Set(complaints.map((c) => c.model))).map(
                  (model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  )
                )}
              </select>

              <button
                onClick={handleFilter}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Filter
              </button>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase">
                  <th className="py-3 px-4 border">Model</th>
                  <th className="py-3 px-4 border">Complaint</th>
                  <th className="py-3 px-4 border">Place</th>
                  <th className="py-3 px-4 border">Submitted On</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="text-center border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 border">{complaint.model}</td>
                      <td className="py-3 px-4 border">{complaint.complaint}</td>
                      <td className="py-3 px-4 border">{complaint.place}</td>
                      <td className="py-3 px-4 border text-gray-600">
                        {new Date(complaint.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </td>
                      <td
                        className={`py-3 px-4  font-semibold ${
                          complaint.status === "Solved"
                            ? "text-green-600"
                            : complaint.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {complaint.status}
                      </td>
                      <td className="py-3 px-4 border-l border-r flex justify-center space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(complaint._id, "Solved")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                        >
                          Solve
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(complaint._id, "Rejected")
                          }
                          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
                        >
                          Reject
                        </button>
                        <button
  onClick={() => navigate(`/admin/viewcomplaint/${complaint._id}`)}
  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg transition"
>
  View
</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-gray-500">
                      No complaints available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsAdmin;
