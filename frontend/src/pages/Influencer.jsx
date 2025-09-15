import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

// ✅ Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Influencer() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Read data from backend
  const handleReadData = () => {
    axios.get("http://localhost:9000/read/famous").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    handleReadData();
  }, []);

  // ✅ Delete influencer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this influencer?")) {
      axios
        .delete(`http://localhost:9000/delete/famous/${id}`)
        .then(() => {
          toast.success("Successfully deleted!", {
            position: "top-right",
            autoClose: 2000,
          });
          handleReadData();
        })
        .catch(() => {
          toast.error("Failed to delete!", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  // ✅ Function to truncate long text
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex">
      <Dashboard />
      
      <div className={`p-4 min-h-screen w-full overflow-hidden ${isMobile ? 'ml-0' : 'ml-56'}`}>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Influencer List</h2>
          <Link
            to="/addinfluencer"
            className="bg-gradient-to-r from-purple-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-red-700 transition whitespace-nowrap"
          >
            + Add New Influencer
          </Link>
        </div>

        {/* ✅ Desktop Table (hidden on mobile) */}
        <div className="hidden md:block bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-red-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Image</th>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Address</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Phone</th>
                <th className="py-3 px-4 text-left font-semibold">Price</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Category</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`http://localhost:9000/allImages/${item.photo}`}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">{truncateText(item.address, 15)}</td>
                  <td className="py-3 px-4">{item.email}</td>
                  <td className="py-3 px-4">{item.phone || "N/A"}</td>
                  <td className="py-3 px-4">${item.price || 0}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "online"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status || "offline"}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.category}</td>

                  {/* ✅ Actions */}
                  <td className="py-3 px-4">
                    <div className="flex space-x-3">
                      {/* Edit */}
                      <Link to={`/updateinfluencer/${item._id}`}>
                        <button
                          className="text-blue-500 hover:text-blue-700 transition"
                          title="Edit"
                        >
                          <i className="fa-solid fa-pen-to-square text-xl"></i>
                        </button>
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash text-xl"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ If no influencers */}
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No influencers found. Add your first influencer!
            </div>
          )}
        </div>

        {/* ✅ Mobile Cards (visible only on mobile) */}
        <div className="md:hidden grid gap-4">
          {data.map((item, index) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start gap-4">
                <img
                  src={`http://localhost:9000/allImages/${item.photo}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === "online"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status || "offline"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{item.email}</p>
                  <p className="text-gray-600 text-sm">{item.phone || "N/A"}</p>
                  <p className="text-gray-600 text-sm">${item.price || 0}</p>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-gray-600 text-sm">{truncateText(item.address, 30)}</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-4 pt-3 border-t border-gray-100">
                <Link to={`/updateinfluencer/${item._id}`}>
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <i className="fa-solid fa-pen-to-square text-xl"></i>
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete"
                >
                  <i className="fa-solid fa-trash text-xl"></i>
                </button>
              </div>
            </div>
          ))}
          
          {/* ✅ If no influencers */}
          {data.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No influencers found. Add your first influencer!
            </div>
          )}
        </div>

        {/* ✅ Toast container */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Influencer;