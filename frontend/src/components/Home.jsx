import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InfluencerCard from "../pages/InfluencerCard";

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Order a message from your favorite celebrity!
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Surprise your friends and family by requesting a personalized
            message from the stars you love.
          </p>
        </motion.div>
      </div>

      {/* Top Influencers */}
      <motion.section
        className="py-16 px-6"
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          Top Influencers
        </h2>
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-8">
          {topInfluencers.map((item) => (
            <InfluencerCard key={item._id} item={item} />
          ))}
        </div>
      
      </motion.section>
    </div>
  );
}
