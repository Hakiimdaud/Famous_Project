import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/readSingle/customer/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

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

        {/* LogOut Button */}
        <button
          onClick={logOut}
          className="mt-6 bg-red-500 text-white font-semibold w-full py-2 rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
