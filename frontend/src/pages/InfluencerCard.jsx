import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function InfluencerCard({ item, onRate }) {
  // Render Stars
  const renderStars = (ratingValue) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < ratingValue ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
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

  // Animations
  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      whileHover="hover"
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

        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderStars(item.averageRating || 0)}</div>
          <span className="text-sm text-gray-600">
            {item.averageRating ? item.averageRating.toFixed(1) : "No ratings"} (
            {item.totalRatings || 0} reviews)
          </span>
        </div>

        <div className="flex items-center text-lg font-bold text-red-600 mb-3">
          ${item.price || 0}{" "}
          <span className="text-sm font-normal text-gray-500 ml-1">
            / collaboration
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        {/* Social Media Icons */}
        {item.social && item.social.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {item.social.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-purple-600 hover:text-purple-800 hover:bg-gray-200 transition-colors"
                  title={social.platform}
                >
                  <i className={getSocialIcon(social.platform)}></i>
                </a>
              ))}
              {item.social.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs" title="More social links">
                  +{item.social.length - 4}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex flex-col space-y-3">
          <Link to={`/viewfamous/${item._id}`}>
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium flex items-center justify-center">
              <i className="fas fa-eye mr-2"></i> View Details
            </button>
          </Link>
          {onRate && (
            <button
              onClick={() => onRate(item)}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2.5 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 font-medium flex items-center justify-center"
            >
              <i className="fas fa-star mr-2"></i> Rate This Influencer
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}