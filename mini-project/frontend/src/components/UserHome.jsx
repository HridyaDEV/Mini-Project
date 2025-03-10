import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaClipboardList, FaHourglassHalf } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

function UserHome() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userId = localStorage.getItem('userId')
  const {id} = useParams()


  const cardSection = [
    { title: 'Complaints Registered', value: 1200, icon: <FaClipboardList className="text-3xl text-blue-500" /> },
    { title: 'Solved Complaints', value: 950, icon: <FaCheckCircle className="text-3xl text-green-500" /> },
    { title: 'Pending Complaints', value: 250, icon: <FaHourglassHalf className="text-3xl text-yellow-500" /> },
  ];

  return (
    <>
      <div>
        <nav className=' bg-gray-100 h-15 p-4'>
          <ul className='flex justify-end gap-10 me-10 relative text-center '>
            <li  className="border border-transparent hover:border-black cursor-pointer w-15 text-center">Home</li>
            <li  className="border border-transparent hover:border-black cursor-pointer w-auto text-center">My Complaints</li>
            {/* <li  className="border border-transparent hover:border-black cursor-pointer w-15 text-center">About</li> */}
            <li className="border border-transparent hover:border-black cursor-pointer w-15 text-center">Contact</li>
            <div className='relative'>
              <button 
               
                onClick={() => setDropdownOpen(!dropdownOpen)}
              > <IoPersonSharp className='text-2xl border border-transparent hover:border-black cursor-pointer w-15 text-center' />
               
              </button>
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border'>
                  <ul>
                    <li 
                      className='px-4 py-2 hover:bg-gray-200 cursor-pointer' 
                      onClick={() => { navigate(`/profile/${id}`); setDropdownOpen(false); }}
                    >
                      View Profile
                    </li>
                    <li 
                      className='px-4 py-2 hover:bg-gray-200 cursor-pointer' 
                      onClick={() => { navigate('/'); setDropdownOpen(false); }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </ul>
        </nav>
        
        <div className='bg-black text-white flex flex-col items-center justify-center h-64  px-4 text-center'>
          <h1 className='text-3xl font-semibold mb-2'>Safe Communities Start with You!</h1>
          <h1 className='text-3xl font-semibold mb-4'>Report and Make an Impact</h1>
          <button
                    className="bg-blue-500 text-white font-medium px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate("/complaint")}
                >
                    File Complaint
                </button>
        </div>
      </div>
      <div className="py-10 bg-white text-center px-6">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-4xl mx-auto text-lg">
          Civic Eye is a platform dedicated to empowering communities by enabling citizens to report and track incidents efficiently.
          Our mission is to create a safer and more responsive society by bridging the gap between the public and authorities. 
          With a focus on transparency, accountability, and efficiency, we strive to make a meaningful impact in public safety and social responsibility.
        </p>
      </div>
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

export default UserHome;
