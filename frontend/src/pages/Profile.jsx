import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // "admin" ama "customer"
  const navigate = useNavigate();

  // 1️⃣ Ogaado user type
  useEffect(() => {
    const customer = localStorage.getItem("customer");
    const admin = localStorage.getItem("admin");

    if (customer && JSON.parse(customer).data.customer._id === id) {
      setUserType("customer");
    } else if (admin && JSON.parse(admin).data.admin._id === id) {
      setUserType("admin");
    } else {
      setUserType(null); // Haddii user-ka sax ah aan loo ogoleyn
    }
  }, [id]);

  // 2️⃣ Fetch data backend
  useEffect(() => {
    if (!userType) return;

    const url =
      userType === "customer"
        ? `http://localhost:9000/readSingle/customer/${id}`
        : `http://localhost:9000/readSingle/admin/${id}`;

    axios
      .get(url)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [userType, id]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // 3️⃣ Delete user
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Ma hubtaa inaad rabto inaad tirtirto profile-kan permanently?"
    );
    if (!confirmDelete) return;

    try {
      const url =
        userType === "customer"
          ? `http://localhost:9000/delete/customer/${id}`
          : `http://localhost:9000/delete/admin/${id}`;

      await axios.delete(url);
      alert("Profile-ka waa la tirtiray!");

      // Nadiifi localStorage haddii uu yahay user-ka hadda jira
      if (userType === "customer") localStorage.removeItem("customer");
      if (userType === "admin") localStorage.removeItem("admin");

      navigate("/"); // Dib u gudub home
    } catch (error) {
      console.error(error);
      alert("Waxaa dhacay cilad, fadlan mar kale isku day.");
    }
  };

  if (!userType) return <p className="text-center mt-10 text-red-500">Access Denied</p>;
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Top Section with Profile Image */}
      <div className="bg-red-500 h-40 w-full relative">
        <img
          src={`http://localhost:9000/allImages/${user.image}`}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-1/2 transform -translate-x-1/2 object-cover"
        />
      </div>

      {/* User Info */}
      <div className="mt-20 text-center px-6 pb-6">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 mt-2">{user.email}</p>
        {userType === "admin" && <p className="text-sm text-gray-500 mt-1">Role: {user.role}</p>}

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
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
