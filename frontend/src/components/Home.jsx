import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [topInfluencers, setTopInfluencers] = useState([]);

  const handlegetData = () => {
    axios
      .get("http://localhost:9000/read/famous")
      .then((response) => {
        const data = response.data;
        // Sort by averageRating descending
        const sorted = data.sort((a, b) => b.averageRating - a.averageRating);
        // Take top 3
        const top3 = sorted.slice(0, 3);
        setTopInfluencers(top3);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handlegetData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-purple-500 to-red-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Order a message from your favorite celebrity!
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">
          Surprise your friends and family by requesting a personalized message from the stars you love.
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl shadow hover:scale-105 transition">
          Order Now
        </button>
      </section>

      {/* Top Influencers Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Top Influencers</h2>
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-8">
          {topInfluencers.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
              <div className="relative">
                <img
                  src={`http://localhost:9000/allImages/${item.photo}`}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "online"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status === "online" ? "Available" : "Offline"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < item.averageRating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.averageRating ? item.averageRating.toFixed(1) : "No ratings"} ({item.totalRatings || 0} reviews)
                  </span>
                </div>

                <Link to={`/viewfamous/${item._id}`}>
                  <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium flex items-center justify-center">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-[#E5AC07] text-white px-10 py-3 rounded-lg">Learn More</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">1. Choose Your Celebrity</h3>
            <p className="text-gray-600">
              Browse our list and select the star you’d like to receive a message from.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">2. Submit Your Request</h3>
            <p className="text-gray-600">
              Write your personalized message or request that you’d like them to send.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">3. Receive Your Message</h3>
            <p className="text-gray-600">
              Get your unique message delivered to you as a video or written note.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-700">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
}
