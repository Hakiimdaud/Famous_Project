import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ProfileDashboard = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ modal state
  const navigate = useNavigate();

  useEffect(() => {
    const adminLS = localStorage.getItem("admin");

    if (!adminLS || JSON.parse(adminLS).data.admin._id !== id) {
      navigate("/access-denied");
    } else {
      axios
        .get(`http://localhost:9000/readSingle/admin/${id}`)
        .then((res) => setAdmin(res.data))
        .catch(() => toast.error("Failed to fetch admin data"));
    }
  }, [id, navigate]);

  const logOut = () => {
    localStorage.clear();
    toast.success("Successfully logged out");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/delete/admin/${id}`);
      toast.success("Admin-ka waa la tirtiray!");
      localStorage.removeItem("admin");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Waxaa dhacay cilad, fadlan mar kale isku day.");
    }
  };

  if (!admin)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <>
      {/* Main Profile Card */}
      <motion.div
        className="flex justify-center items-center min-h-screen bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-red-500 to-pink-500 relative">
            <img
              src={`http://localhost:9000/allImages/${admin.image}`}
              alt={admin.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
            />
          </div>

          {/* Admin Info */}
          <div className="pt-16 pb-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{admin.name}</h2>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-sm text-gray-500 mt-1">Role: {admin.role}</p>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow transition"
              >
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white py-2 rounded-xl shadow transition"
              >
                <i className="fas fa-trash-alt"></i> Delete Admin
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ✅ Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Ma hubtaa inaad rabto inaad tirtirto?
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Tani waa action permanent ah, laguma soo celin karo.
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  handleDelete();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDashboard;
