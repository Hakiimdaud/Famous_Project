import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard"; // Import the Dashboard component

function GetComplaintsData() {
  const [contacts, setContacts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9000/get/complaints")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch contacts:", err);
      });
  }, []);

  return (
    <div className="flex">
      <Dashboard />
      
      <div className={`min-h-screen w-full p-4 ${isMobile ? 'ml-0' : 'ml-56'}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Complaints</h1>

        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="w-full border border-gray-300">
            <thead className="bg-gradient-to-r from-purple-500 to-red-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Person</th>
                <th className="px-4 py-3 text-left">Complaint</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((item, index) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.person}</td>
                    <td className="px-4 py-3">{item.body}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (visible only on mobile) */}
        <div className="md:hidden space-y-4">
          {contacts.length > 0 ? (
            contacts.map((item, index) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                    #{index + 1}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    Complaint
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">From:</span>
                    <p className="font-medium">{item.name}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-600">About:</span>
                    <p className="font-medium">{item.person}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Complaint:</span>
                    <p className="mt-1 text-gray-700 bg-gray-50 p-2 rounded">{item.body}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                  <button className="text-sm text-blue-600 hover:text-blue-800 mr-3">
                    <i className="fas fa-eye mr-1"></i> View Details
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-800">
                    <i className="fas fa-trash-alt mr-1"></i> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow">
              <i className="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
              <p>No complaints found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetComplaintsData;