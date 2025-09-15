import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfluencerCard from "../pages/InfluencerCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [topInfluencers, setTopInfluencers] = useState([]);

  const handlegetData = () => {
    axios
      .get("http://localhost:9000/read/famous")
      .then((response) => {
        const sorted = response.data.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        setTopInfluencers(sorted.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    handlegetData();
  }, []);

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-purple-500 to-red-600 text-white">
        <motion.div
          className="flex flex-col items-center"
          variants={sectionVariant}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-6">
            <i className="fas fa-star text-5xl md:text-6xl text-yellow-300 mb-4"></i>
            <i className="fas fa-video text-5xl md:text-6xl text-white mx-4 mb-4"></i>
            <i className="fas fa-heart text-5xl md:text-6xl text-pink-300 mb-4"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Order a message from your favorite celebrity!
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            <i className="fas fa-gift text-yellow-300 mr-2"></i>
            Surprise your friends and family by requesting a personalized
            message from the stars you love.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <i className="fas fa-check-circle text-green-300 mr-2"></i>
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <i className="fas fa-bolt text-yellow-300 mr-2"></i>
              <span>Quick Delivery</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <i className="fas fa-lock text-blue-300 mr-2"></i>
              <span>Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.section
        className="py-16 px-6 bg-gray-50"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <i className="fas fa-play-circle text-purple-600 mr-3"></i>
            How It Works
          </h2>
          <div className="grid grid-cols-1 ml-0 md:ml-56 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Choose a Celebrity</h3>
              <p className="text-gray-600">Browse our top influencers and select your favorite celebrity.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-edit text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Customize Your Request</h3>
              <p className="text-gray-600">Tell us what you want the celebrity to say in their personalized message.</p>
            </div>
           
          </div>
        </div>
      </motion.section>

      {/* Top Influencers */}
      <motion.section
        className="py-16 px-6"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <i className="fas fa-crown text-yellow-500 mr-3"></i>
            Top Influencers
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Discover our most popular influencers with the highest ratings from our community
          </p>
          <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-8">
            {topInfluencers.map((item) => (
              <InfluencerCard key={item._id} item={item} />
            ))}
          </div>
          
          {topInfluencers.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">No influencers available at the moment.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 px-6 bg-gradient-to-r from-purple-500 to-red-600 text-white"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          <i className="fas fa-quote-left text-4xl text-white opacity-50 mb-6"></i>
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-20 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300"></i>
              </div>
              <p className="italic mb-4">"The perfect birthday surprise for my wife! She was speechless!"</p>
              <div className="flex items-center justify-center">
                <i className="fas fa-user-circle text-2xl mr-2"></i>
                <span>- Alex Johnson</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300 mr-1"></i>
                <i className="fas fa-star text-yellow-300"></i>
              </div>
              <p className="italic mb-4">"Incredible service! The video came quickly and was exactly what I asked for."</p>
              <div className="flex items-center justify-center">
                <i className="fas fa-user-circle text-2xl mr-2"></i>
                <span>- Sarah Williams</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-16 px-6 bg-gray-100"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl mx-auto text-center">
          <i className="fas fa-rocket text-5xl text-purple-600 mb-6"></i>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Join thousands of satisfied customers who made their loved ones smile</p>
          <Link to="/influencers"><button className="bg-gradient-to-r from-purple-600 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-red-700 transition shadow-lg">
            <i className="fas fa-play-circle mr-2"></i>Browse All Influencers
          </button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}