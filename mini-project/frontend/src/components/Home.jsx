import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClipboardList, FaHourglassHalf } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { LuFileSearch } from 'react-icons/lu';
import { MdLockOutline } from 'react-icons/md';
import { PiNotePencilDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));


  useEffect(() => {
    const checkLoginStatus = () => {
        setIsLoggedIn(!!localStorage.getItem("token"));
    };

    checkLoginStatus(); // Run on initial load

    // Listen for localStorage changes (triggered after login/register)
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload(); // Ensures UI updates immediately
  };

  const cardSection = [
    { title: 'Complaints Registered', value: 1200, icon: <FaClipboardList className="text-3xl text-blue-500" /> },
    { title: 'Solved Complaints', value: 950, icon: <FaCheckCircle className="text-3xl text-green-500" /> },
    { title: 'Pending Complaints', value: 250, icon: <FaHourglassHalf className="text-3xl text-yellow-500" /> },
  ];
  const steps = [
    { title: "Step 1", desc: "Login to your account" },
    { title: "Step 2", desc: "Submit a report securely." },
    { title: "Step 3", desc: "Authorities take necessary actions." },
    { title: "Step 4", desc: "Track progress and stay informed." },
  ]
  const whatWeDo = [
    { icon: <MdLockOutline />, title: "Safe & Secure", desc: "Report safely with complete anonymity." },
    { icon: <PiNotePencilDuotone />, title: "Easy Reporting", desc: "User-friendly process to file a report in minutes." },
    { icon: <LuFileSearch />, title: "Case Tracking", desc: "Monitor progress and updates on your report." },

  ]
  return (
    <>
      {/* Navbar */}
      <nav className='mt-5 flex justify-between items-center px-10'>
        <h1 className="text-xl font-bold">Civic Eye</h1>
        <ul className='flex gap-10'>
          <li className="border border-transparent hover:border-black cursor-pointer">Home</li>
          <li className="border border-transparent hover:border-black cursor-pointer">About</li>
          <li className="border border-transparent hover:border-black cursor-pointer">Contact</li>
        </ul>

        {!isLoggedIn ? (
          <div className="flex gap-5">
            <button className="border px-4 py-1 rounded-md hover:border-black" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="border px-4 py-1 rounded-md hover:border-black" onClick={() => navigate("/register")}>
              Sign Up
            </button>
          </div>
        ) : (
          <div className='relative flex items-center gap-6'>
            <button className="border px-4 py-1 rounded-md hover:border-black" onClick={() => navigate("/complaint")}>
              File a Complaint
            </button>
            <button className="border px-4 py-1 rounded-md hover:border-black" onClick={() => navigate("/my-complaints")}>
              My Complaints
            </button>
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <IoPersonSharp className='text-2xl border border-transparent hover:border-black cursor-pointer' />
            </button>
            {dropdownOpen && (
              <div className='absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border'>
                <ul>
                  <li
                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={() => { navigate(`/profile`); setDropdownOpen(false); }}
                  >
                    View Profile
                  </li>
                  <li
                    className='px-4 py-2 hover:bg-gray-200 cursor-pointer'
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-black text-white flex flex-col items-center justify-center h-78 mt-4 px-4 text-center">
        <h1 className="text-3xl font-semibold mb-2">Safe Communities Start with You!</h1>
        <h1 className="text-3xl font-semibold mb-4">Report and Make an Impact</h1>
      </div>
      {/* about us */}
      <div className="py-10 bg-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg">
          Civic Eye is a platform dedicated to empowering communities by enabling citizens to report and track incidents efficiently.
          Our mission is to create a safer and more responsive society by bridging the gap between the public and authorities.
          With a focus on transparency, accountability, and efficiency, we strive to make a meaningful impact in public safety and social responsibility.
        </p>
      </div>
      {/* How does it works */}
      <div className="py-12 bg-gray-100 text-center px-6">
        <h2 className="text-3xl font-bold mb-8">How Does It Work?</h2>

        <div className="relative max-w-3xl mx-auto">
          <div className="border-l-4 border-blue-500 absolute h-full left-1/2 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} mb-8 relative`}>
              <div className="bg-white p-6 border-2 rounded-xl shadow-lg w-64 text-center z-10 md:w-80 md:mx-4">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600 mt-2">{step.desc}</p>
              </div>
              <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 md:-translate-x-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Impact */}
      <div className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {cardSection.map((card, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              {card.icon}
              <h3 className="text-xl font-semibold mt-3">{card.title}</h3>
              <p className="text-2xl font-bold mt-2 text-gray-700">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
