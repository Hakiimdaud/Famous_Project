import axios from "axios";
import { useEffect, useState } from "react";
import InfluencerCard from "../pages/InfluencerCard";

export default function InfluencersPage() {
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Generate persistent userId (saved in localStorage)
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", "guest_" + Date.now());
    }
  }, []);

  const userId = localStorage.getItem("userId");

  // Fetch influencers
  const handleGetData = () => {
    axios
      .get("http://localhost:9000/read/famous")
      .then((response) => {
        const sorted = response.data.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
        setInfluencers(sorted);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // Open Rating Modal
  const openRatingModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setRating(0);
    setComment("");
    setUserName("");
    setShowRatingModal(true);
  };

  // Submit Rating
  const submitRating = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const ratingData = {
      influencerId: selectedInfluencer._id,
      rating,
      comment,
      userName: userName || "Anonymous",
      userId: userId, // Persistent user
    };

    axios
      .post("http://localhost:9000/rating", ratingData)
      .then((res) => {
        alert(res.data.message);
        setShowRatingModal(false);
        handleGetData();
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Failed to submit rating.");
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
            <InfluencerCard key={item._id} item={item} onRate={openRatingModal} />
          ))}
        </div>

        {influencers.length === 0 && (
          <div className="text-center py-16">
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

            {/* Stars */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`w-8 h-8 text-2xl ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
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
