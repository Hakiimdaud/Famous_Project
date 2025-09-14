import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewFamous = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [famous, setFamous] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/readSingle/famous/${id}`)
      .then((res) => {
        setFamous(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!famous) return <div className="text-center mt-10 text-red-500">Famous not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Influencers
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          {famous.photo && (
            <img
              src={`http://localhost:9000/allImages/${famous.photo}`}
              alt={famous.name}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
          )}

          <div className="mb-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                famous.status === "online"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {famous.status === "online"
                ? "Available for collaborations"
                : "Currently unavailable"}
            </span>
          </div>

          <div className="bg-red-50 p-4 rounded-xl mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Collaboration Rate
            </h3>
            <p className="text-2xl font-bold text-red-600">
              ${famous.price || 0}{" "}
              <span className="text-sm font-normal text-gray-600">
                per collaboration
              </span>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{famous.name}</h1>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
            {famous.category}
          </span>

          <div className="bg-gray-50 p-4 rounded-xl mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{famous.description}</p>
          </div>

          {famous.fullDescription && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Detailed Biography
              </h3>
              <p className="text-gray-700 leading-relaxed">{famous.fullDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewFamous;
