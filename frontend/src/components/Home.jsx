// import img1 from "../src/images/dyx.jpg"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

  const [getdata, setGetdata] = useState([]);

  const handlegetData  = () => {
    axios.get("http://localhost:9000/read/famous")
      .then((response) => {
        setGetdata(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

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

      {/* Celebrities Showcase Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Celebrities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {getdata.map((item,index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-4 text-center"
            >
              <img
                src={`http://localhost:9000/allImages/${item.photo}`}
                alt={`Celebrity ${item.id}`}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <p className="text-gray-600 mb-3">{item.category}</p>
              <Link to={`/viewfamous/${item._id}`}>
              <button className="bg-red-500 text-white w-full text-2xl py-2 rounded-xl hover:bg-red-700">
                view Details
              </button>
              </Link>
            </div>
          ))}
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