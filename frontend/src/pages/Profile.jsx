import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // ✅ custom modal state
  const navigate = useNavigate();

  useEffect(() => {
    const customer = localStorage.getItem("customer");
    const admin = localStorage.getItem("admin");

    if (customer && JSON.parse(customer).data.customer._id === id) {
      setUserType("customer");
    } else if (admin && JSON.parse(admin).data.admin._id === id) {
      setUserType("admin");
    } else {
      setUserType(null);
    }
  }, [id]);

  useEffect(() => {
    if (!userType) return;

    const url =
      userType === "customer"
        ? `http://localhost:9000/readSingle/customer/${id}`
        : `http://localhost:9000/readSingle/admin/${id}`;

    axios
      .get(url)
      .then((res) => setUser(res.data))
      .catch(() => toast.error("❌ Failed to fetch user data"));
  }, [userType, id]);

  const logOut = () => {
    localStorage.clear();
    toast.success("✅ Successfully logged out");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleDelete = async () => {
    try {
      const url =
        userType === "customer"
          ? `http://localhost:9000/delete/customer/${id}`
          : `http://localhost:9000/delete/admin/${id}`;

      await axios.delete(url);
      toast.success("🗑️ Profile-ka waa la tirtiray!");

      if (userType === "customer") localStorage.removeItem("customer");
      if (userType === "admin") localStorage.removeItem("admin");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Waxaa dhacay cilad, fadlan mar kale isku day.");
    }
  };

  if (!userType)
    return <p className="text-center mt-10 text-red-500">Access Denied</p>;
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
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
              src={`http://localhost:9000/allImages/${user.image}`}
              alt={user.name}
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
            />
          </div>

          {/* Content */}
          <div className="pt-16 pb-8 px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {userType === "admin" && (
              <p className="text-sm text-gray-500 mt-1">Role: {user.role}</p>
            )}

            <div className="mt-6 space-y-3">
              {/* Log Out */}
              <button
                onClick={logOut}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow transition"
              >
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>

              {/* Delete */}
              <button
                onClick={() => setShowConfirm(true)}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-black text-white py-2 rounded-xl shadow transition"
              >
                <i className="fas fa-trash-alt"></i> Delete Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ✅ Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-xl w-80 text-center"
          >
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
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Profile;
