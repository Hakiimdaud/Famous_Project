import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState([]);

  // Fetch only influencers
  const handleGetData = () => {
    axios
      .get("http://localhost:9000/read/famous")
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);


  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-red-700">
        Featured Influencers
      </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {influencers.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 text-center"
            >
              <img
                src={`http://localhost:9000/allImages/${item.photo}`}
                alt={item.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <Link to={`/viewfamous/${item._id}`}>
                <button className="bg-red-600 text-white w-full py-2 rounded-xl hover:bg-red-700">
                 view Details
                </button>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}
