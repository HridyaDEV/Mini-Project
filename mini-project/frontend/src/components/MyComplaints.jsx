import React, { useEffect, useState } from 'react'
import { getUserComplaints } from '../api/complaintApi'

function MyComplaints() {

    const [complaints, setComplaints] = useState([])

    useEffect( ()=>{

        async function fetchComplaints () {
            const data = await getUserComplaints ()
            setComplaints(data.complaints || [])
        }
        fetchComplaints()
        }, [])
    
    return (
        <div className='flex flex-col items-center mt-8'>
            <h2 className='text-2xl font-semibold mb-4'>My Complaints</h2>
            {complaints.length === 0 ? (
                <p>No complaints found!</p>
            ) : (
                <div className='w-3/4'>
                    <table className=' table-auto w-full border-collapse border border-gray-400y'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className="border border-gray-400 px-4 py-2">Model</th>
                                <th className="border border-gray-400 px-4 py-2">Complaint</th>
                                <th className="border border-gray-400 px-4 py-2">Place</th>
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                                <th className="border border-gray-400 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint)=>(
                                <tr key = {complaint._id} className='text-center'>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.model}</td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.complaint}</td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.place}</td>
                                    <td className="border border-gray-400 px-4 py-2">{complaint.date}</td>
                                    {/* <td>

                                    </td> */}

                                </tr>
                           ) )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default MyComplaints
