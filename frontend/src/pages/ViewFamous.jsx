import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewFamous = () => {
  const { id } = useParams();
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      {/* Photo */}
      {famous.photo && (
        <img
          src={`http://localhost:9000/allImages/${famous.photo}`} // haddii aad image server ka serve gareyso
          alt={famous.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      {/* Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{famous.name}</h1>

    
      <p className="text-gray-700 mt-4">{famous.fullDescription}</p>

      {/* Social media */}
      {famous.social && famous.social.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Social Media</h2>
          <ul className="space-y-2">
            {famous.social.map((s, index) => (
              <li key={index}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 underline hover:text-red-800"
                >
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewFamous;
