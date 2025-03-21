import { NavLink } from "react-router-dom";
import { FiUser, FiFileText, FiSettings, FiAlertCircle } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white p-5 flex flex-col min-h-screen fixed">
      <h1 className="text-3xl font-extrabold mt-3 mb-3">
        Civic<span className="text-blue-400">Eye</span>
      </h1>
      <nav className="space-y-2">
        <SidebarButton to="/admin" icon={<FiFileText />} text="Dashboard" />
        <SidebarButton to="/complaintadmin" icon={<FiAlertCircle />} text="Complaints" />
        <SidebarButton to="/users" icon={<FiUser />} text="User Management" />
        <SidebarButton to="/reports" icon={<FiSettings />} text="Reports" />
      </nav>
    </div>
  );
};

const SidebarButton = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 py-3 px-5 rounded-lg transition duration-300 w-full text-left group ${
          isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
        }`
      }
    >
      <span className="group-hover:text-gray-200 transition-colors duration-200">{icon}</span>
      {text}
    </NavLink>
  );
};

export default Sidebar;
