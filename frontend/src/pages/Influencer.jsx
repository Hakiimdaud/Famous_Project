import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

// ✅ Toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Influencer() {
  const [data, setData] = useState([])

  const handleReadData = () => {
    axios.get("http://localhost:9000/read/famous").then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    handleReadData()
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9000/delete/famous/${id}`).then(() => {
      toast.success("Successfully deleted!", {
        position: "top-right",
        autoClose: 2000,
      })
      handleReadData()
    }).catch(() => {
      toast.error("Failed to delete!", {
        position: "top-right",
        autoClose: 3000,
      })
    })
  }

  return (
    <div className='flex gap-32'>
      <Dashboard />
      {/* <div className="p-8  min-h-screen ml-64 w-full"> */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Influencer List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-[950px] bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-red-600">
              <tr>
                <th className="py-3 px-4 text-left text-white font-semibold">#</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Image</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Influencer Name</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Address</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Description</th>
                <th className="py-3 px-4 text-left text-white font-semibold">fullDescription</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Category</th>
                <th className="py-3 px-4 text-left text-white font-semibold">Action</th>
              </tr>
            </thead>
            {
              data.map((items, index) => {
                return <tbody key={index}>
                  <tr className="border-b hover:bg-gray-100 transition">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={`http://localhost:9000/allImages/${items.photo}`}
                        alt="influencer"
                        className="w-12 h-12 object-cover rounded-md"
                      />  
                    </td>
                    <td className="py-3 px-4">{items.name}</td>
                    <td className="py-3 px-4">{items.address}</td>
                    <td className="py-3 px-4">{items.email}</td>
                    <td className="py-3 px-4">{items.description}</td>
                    <td className="py-3 px-4">{items.fullDescription}</td>
                    <td className="py-3 px-4">{items.category}</td>
                    <td className="py-3 px-4 flex gap-3">
                      <Link to={`/updateinfluencer/${items._id}`}>
                        <button className="text-green-500 mt-2 text-xl">
                          <i className="fa-solid fa-pen-to-square text-green-500 mt-2 text-xl"></i>
                        </button>
                      </Link>
                      <button>
                        <i 
                          onClick={() => handleDelete(items._id)} 
                          className="fa-solid fa-trash text-red-500 mt-2 text-xl"
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              })
            }
          </table>
        </div>
      {/* </div> */}

      {/* ✅ Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Influencer;
