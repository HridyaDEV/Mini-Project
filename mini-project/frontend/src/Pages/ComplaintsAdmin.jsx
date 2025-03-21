import Sidebar from "../components/Sidebar";

const ComplaintAdmin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="bg-white p-4 rounded-lg shadow-lg">Manage Complaints Here</div>
      </div>
    </div>
  );
};

export default ComplaintAdmin;
