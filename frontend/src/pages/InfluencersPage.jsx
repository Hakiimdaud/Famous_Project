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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Function to get social media icon based on platform name
  const getSocialIcon = (platform) => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes("face") || platformLower === "fb") {
      return "fab fa-facebook-f";
    } else if (platformLower.includes("twitter") || platformLower === "x") {
      return "fab fa-twitter";
    } else if (platformLower.includes("insta")) {
      return "fab fa-instagram";
    } else if (platformLower.includes("you")) {
      return "fab fa-youtube";
    } else if (platformLower.includes("tiktok")) {
      return "fab fa-tiktok";
    } else if (platformLower.includes("linkedin")) {
      return "fab fa-linkedin-in";
    } else if (platformLower.includes("snap")) {
      return "fab fa-snapchat-ghost";
    } else if (platformLower.includes("pinterest")) {
      return "fab fa-pinterest-p";
    } else {
      return "fas fa-share-alt"; // Default icon
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 text-red-700">
          Featured Influencers
        </h1>
        <p className="text-center text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-base">
          Discover our talented influencers ready to collaborate with your brand
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {influencers.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
              <InfluencerCard item={item} onRate={openRatingModal} />
              
              {/* Social Media Icons - Moved to bottom of card */}
              
            </div>
          ))}
        </div>

        {influencers.length === 0 && (
          <div className="text-center py-12 md:py-16">
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
          <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
              Rate {selectedInfluencer.name}
            </h2>

            {/* Stars */}
            <div className="mb-3 md:mb-4">
              <label className="block text-gray-700 mb-1 md:mb-2">Your Rating</label>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className={`w-7 h-7 md:w-8 md:h-8 text-xl md:text-2xl ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 md:mb-4">
              <label className="block text-gray-700 mb-1 md:mb-2">Your Name (optional)</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
              />
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-gray-700 mb-1 md:mb-2">Your Comment (optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience"
                rows="3"
                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-2 md:space-x-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg md:rounded-xl text-gray-700 hover:bg-gray-100 transition text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg md:rounded-xl hover:from-red-700 hover:to-red-800 transition text-sm md:text-base"
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