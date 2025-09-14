import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);

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

  // Function to render star ratings
  const renderStars = (rating, interactive = false, size = "w-4 h-4") => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : "span"}
          onClick={interactive ? () => setRating(i) : null}
          className={`${size} ${i <= rating ? "text-yellow-400" : "text-gray-300"} ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
          disabled={!interactive}
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    }
    
    return stars;
  };

  // Function to get social media icon
  const getSocialIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('facebook')) {
      return (
        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    } else if (platformLower.includes('instagram')) {
      return (
        <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    } else if (platformLower.includes('tiktok')) {
      return (
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.589 6.686a4.793 4.793 0 01-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 01-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 013.183-4.51v-3.5a6.329 6.329 0 00-5.394 10.692 6.33 6.33 0 0010.857-4.424V8.687a8.182 8.182 0 004.773 1.526V6.79a4.831 4.831 0 01-3.77-1.105zm0 0V6.79a4.831 4.831 0 01-3.77-1.105z" />
        </svg>
      );
    } else if (platformLower.includes('twitter') || platformLower.includes('x')) {
      return (
        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      );
    } else if (platformLower.includes('youtube')) {
      return (
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    } else {
      // Default icon for unknown platforms
      return (
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.514 0-10-4.486-10-10S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm1-17h-2v10h2V5z" />
        </svg>
      );
    }
  };

  // Function to open rating modal
  const openRatingModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setRating(0);
    setComment("");
    setUserName("");
    setShowRatingModal(true);
  };

  // Function to submit rating
  const submitRating = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const ratingData = {
      userId: "current-user-id", // You would replace this with actual user ID
      userName: userName || "Anonymous",
      rating: rating,
      comment: comment,
      createdAt: new Date()
    };

    // Send rating to the server
    axios.post(`http://localhost:9000/rate/famous/${selectedInfluencer._id}`, ratingData)
      .then(response => {
        // Update the local state with the new rating
        const updatedInfluencers = influencers.map(infl => {
          if (infl._id === selectedInfluencer._id) {
            // Add the new rating to the influencer's ratings array
            const newRatings = [...infl.ratings, ratingData];
            const sum = newRatings.reduce((total, r) => total + r.rating, 0);
            return {
              ...infl,
              ratings: newRatings,
              averageRating: parseFloat((sum / newRatings.length).toFixed(1)),
              totalRatings: newRatings.length
            };
          }
          return infl;
        });
        
        setInfluencers(updatedInfluencers);
        setShowRatingModal(false);
        alert("Rating submitted successfully!");
      })
      .catch(error => {
        console.error("Error submitting rating:", error);
        alert("Failed to submit rating. Please try again.");
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-3 text-red-700">
          Featured Influencers
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover our talented influencers ready to collaborate with your brand
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {influencers.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image with status indicator */}
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

              {/* Content */}
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center text-lg font-bold text-red-600 mb-2">
                  ${item.price || 0} <span className="text-sm font-normal text-gray-500 ml-1">/ collaboration</span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(item.averageRating || 0)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {item.averageRating ? item.averageRating.toFixed(1) : "No ratings"} ({item.totalRatings || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg
                    className="w-4 h-4 mr-1 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{item.address}</span>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-3">
                  {item.description}
                </p>

                {/* Social Media Links */}
                {item.social && item.social.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Follow on:</p>
                    <div className="flex space-x-3">
                      {item.social.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          title={social.platform}
                        >
                          {getSocialIcon(social.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex flex-col space-y-3">
                  <Link to={`/viewfamous/${item._id}`}>
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium flex items-center justify-center">
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </Link>
                  
                  <button 
                    onClick={() => openRatingModal(item)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2.5 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-medium flex items-center justify-center"
                  >
                    Rate This Influencer
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {influencers.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block bg-red-100 p-4 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No influencers found
            </h3>
            <p className="text-gray-600">
              Check back later or add new influencers to your collection.
            </p>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Rate {selectedInfluencer.name}
            </h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {renderStars(rating, true, "w-8 h-8")}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name (optional)</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Your Comment (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this influencer"
                rows="4"
                className="w-full border rounded-xl p-3 focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}