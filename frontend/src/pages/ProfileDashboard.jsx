import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDashboard = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminLS = localStorage.getItem("admin");

    if (!adminLS || JSON.parse(adminLS).data.admin._id !== id) {
      // Haddii admin-ka sax ah aanu jirin ama id-ku uusan is waafaqin
      navigate("/access-denied"); // page custom ama route aad samaysay
    } else {
      // Fetch admin data
      axios
        .get(`http://localhost:9000/readSingle/admin/${id}`)
        .then((res) => setAdmin(res.data))
        .catch((err) => console.log(err));
    }
  }, [id, navigate]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Ma hubtaa inaad rabto inaad tirtirto profile-ka admin-ka permanently?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/delete/admin/${id}`);
      alert("Admin-ka waa la tirtiray!");

      // Nadiifi localStorage
      localStorage.removeItem("admin");

      navigate("/"); // Dib u gudub home
    } catch (error) {
      console.error(error);
      alert("Waxaa dhacay cilad, fadlan mar kale isku day.");
    }
  };

  if (!admin) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Top Section with Profile Image */}
      <div className="bg-red-500 h-40 w-full relative">
        <img
          src={`http://localhost:9000/allImages/${admin.image}`}
          alt={admin.name}
          className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-1/2 transform -translate-x-1/2 object-cover"
        />
      </div>

      {/* Admin Info */}
      <div className="mt-20 text-center px-6 pb-6">
        <h2 className="text-2xl font-bold text-gray-800">{admin.name}</h2>
        <p className="text-gray-600 mt-2">{admin.email}</p>
        <p className="text-sm text-gray-500 mt-1">Role: {admin.role}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={logOut}
            className="bg-red-500 text-white font-semibold w-full py-2 rounded-lg hover:bg-red-600 transition"
          >
            Log Out
          </button>

          <button
            onClick={handleDelete}
            className="bg-gray-700 text-white font-semibold w-full py-2 rounded-lg hover:bg-black transition"
          >
            Delete Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
