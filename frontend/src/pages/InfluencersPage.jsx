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

  // Fetch influencers
  const handleGetData = () => {
    axios
      .get("http://localhost:9000/read/famous")
      .then((response) => {
        // Sort influencers by averageRating descending
        const sortedInfluencers = response.data.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        setInfluencers(sortedInfluencers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // Render star ratings
  const renderStars = (ratingValue, interactive = false, size = "w-4 h-4") => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : "span"}
          onClick={interactive ? () => setRating(i) : null}
          className={`${size} ${i <= ratingValue ? "text-yellow-400" : "text-gray-300"} ${
            interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""
          }`}
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

  // Open rating modal
  const openRatingModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setRating(0);
    setComment("");
    setUserName("");
    setShowRatingModal(true);
  };

  // Submit rating to backend
  const submitRating = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const ratingData = {
      influencerId: selectedInfluencer._id,
      rating: rating,
      comment: comment,
      userName: userName || "Anonymous",
    };

    axios
      .post("http://localhost:9000/rating", ratingData)
      .then((response) => {
        // Update local state
        const updatedInfluencers = influencers.map((infl) => {
          if (infl._id === selectedInfluencer._id) {
            const newRatings = [...infl.ratings, { ...ratingData, createdAt: new Date() }];
            const sum = newRatings.reduce((total, r) => total + r.rating, 0);
            return {
              ...infl,
              ratings: newRatings,
              averageRating: parseFloat((sum / newRatings.length).toFixed(1)),
              totalRatings: newRatings.length,
            };
          }
          return infl;
        });

        // Sort after updating
        const sortedInfluencers = updatedInfluencers.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );

        setInfluencers(sortedInfluencers);
        setShowRatingModal(false);
        alert("Rating submitted successfully!");
      })
      .catch((error) => {
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

                <div className="flex items-center text-lg font-bold text-red-600 mb-2">
                  ${item.price || 0}{" "}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    / collaboration
                  </span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex mr-2">{renderStars(item.averageRating || 0)}</div>
                  <span className="text-sm text-gray-600">
                    {item.averageRating ? item.averageRating.toFixed(1) : "No ratings"} (
                    {item.totalRatings || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg
                    className="w-4 h-4 mr-1 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{item.address}</span>
                </div>

                <p className="text-gray-600 mb-5 line-clamp-3">{item.description}</p>

                <div className="mt-auto flex flex-col space-y-3">
                  <Link to={`/viewfamous/${item._id}`}>
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium flex items-center justify-center">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => openRatingModal(item)}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2.5 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-medium flex items-center justify-center"
                  >
                    Rate This Influencer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {influencers.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No influencers found</h3>
            <p className="text-gray-600">Check back later or add new influencers to your collection.</p>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Rate {selectedInfluencer.name}</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex space-x-1">{renderStars(rating, true, "w-8 h-8")}</div>
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
                placeholder="Share your experience"
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
