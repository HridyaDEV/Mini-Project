import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FiUser, FiFileText, FiSettings, FiAlertCircle } from "react-icons/fi";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const complaintStats = [
    { name: "Total Complaints", count: 220, color: "#3b82f6" },
    { name: "Verified Complaints", count: 190, color: "#10b981" },
    { name: "Pending Complaints", count: 30, color: "#f59e0b" },
    { name: "Rejected Complaints", count: 10, color: "#ef4444" },
  ];

  const categoryData = [
    { name: "Traffic Violation", count: 40 },
    { name: "Public Disturbance", count: 45 },
    { name: "Harassment", count: 35 },
    { name: "Property Damage", count: 30 },
    { name: "Noise Complaint", count: 10 },
    { name: "Domestic Violence", count: 25 },
    { name: "Theft", count: 20 },
    { name: "Other", count: 15 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-5 flex flex-col">
      <h1 className="text-3xl font-extrabold mt-3 mb-3">Civic<span className='text-blue-400'>Eye</span></h1>
      <nav className="space-y-2">
          <SidebarButton icon={<FiFileText />} text="Dashboard" activeTab={activeTab} setActiveTab={setActiveTab} tab="dashboard" />
          <SidebarButton icon={<FiAlertCircle />} text="Complaints" activeTab={activeTab} setActiveTab={setActiveTab} tab="reports" />
          <SidebarButton icon={<FiUser />} text="Users" activeTab={activeTab} setActiveTab={setActiveTab} tab="users" />
          <SidebarButton icon={<FiSettings />} text="Settings" activeTab={activeTab} setActiveTab={setActiveTab} tab="settings" />
        </nav>
      </div>
  
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {complaintStats.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg border-l-4" style={{ borderColor: item.color }}>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Complaints by Category</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={categoryData} margin={{ bottom: 60, top: 10, right: 30, left: 20 }}>
                <XAxis dataKey="name" interval={0} tick={{ angle: -25, textAnchor: "end", fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Complaints Status Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={complaintStats} dataKey="count" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {complaintStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conditional Tabs */}
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "reports" && <ReportsContent />}
        {activeTab === "users" && <UsersContent />}
        {activeTab === "settings" && <SettingsContent />}
      </div>
    </div>
  );
};

// Sidebar Button Component
const SidebarButton = ({ icon, text, activeTab, setActiveTab, tab }) => {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 py-3 px-5 rounded-lg transition duration-300 w-full text-left group ${
        activeTab === tab ? "bg-blue-700" : "hover:bg-blue-700"
      }`}
    >
      <span className="group-hover:text-gray-200 transition-colors duration-200">{icon}</span>
      {text}
    </button>
  );
};

// Tab Content Components
const DashboardContent = () => <div className="bg-white p-4 rounded-lg shadow-lg">Welcome to CivicEye Dashboard</div>;
const ReportsContent = () => <div className="bg-white p-4 rounded-lg shadow-lg">Manage Complaints Here</div>;
const UsersContent = () => <div className="bg-white p-4 rounded-lg shadow-lg">Manage Users Here</div>;
const SettingsContent = () => <div className="bg-white p-4 rounded-lg shadow-lg">Admin Settings</div>;

export default Dashboard;
