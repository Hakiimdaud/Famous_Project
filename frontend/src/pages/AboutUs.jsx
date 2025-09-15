import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TeamSection from "../components/TeamSection";
import img1 from "../images/hakim.jpg"
import img2 from "../images/yaya.jpg"
import img3 from "../images/Yoonka.jpg"

export default function AboutUs() {
    return (
        <div className="w-full min-h-screen  text-gray-900">

            {/* Hero Section */}
            <section
                className="flex flex-col items-center justify-center text-center py-24 px-6  bg-gradient-to-r from-purple-500 to-red-600 text-white"

            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                    <p className="text-lg md:text-xl max-w-2xl">
                        Welcome to <span className="font-semibold">TekraConnect</span> – connecting ideas, people, and technology seamlessly.
                    </p>
                </motion.div>
            </section>

            {/* About Us Section */}
            <motion.section
                className="py-16 px-6 md:px-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <h2 className="text-3xl font-bold text-center mb-8">Who We Are</h2>
                <p className="text-gray-700 text-center max-w-3xl mx-auto mb-6">
                    TekraConnect is a team of passionate professionals dedicated to bridging the gap between businesses and technology. We provide innovative solutions that help companies grow and stay ahead in the digital world.
                </p>
                <p className="text-gray-700 text-center max-w-3xl mx-auto">
                    Our mission is to empower organizations through cutting-edge technology, insightful strategies, and seamless digital experiences.
                </p>
            </motion.section>

            {/* Vision & Mission Section */}
            <motion.section
                className="py-16 px-6 md:px-24 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
                        <p className="text-gray-600">
                            To be a leading technology partner, driving innovation and creating meaningful connections in the digital world.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                        <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
                        <p className="text-gray-600">
                            To deliver innovative solutions, empower businesses, and ensure seamless digital experiences for our clients.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Team Members Section */}
            <div className="mt-12 grid sm:grid-cols-3 gap-8 px-6 sm:px-20">
                <TeamSection  
                    image={img1}
                    name="Abdihakim A Daud"
                    role="Director"
                    description="Visionary leader who guides our projects with strategy and innovation, ensuring we always move forward with clear direction."
                />
                <TeamSection  
                    image={img2}
                    name="Yaya Hassan"
                    role="Manager"
                    description="Dynamic manager overseeing daily operations, ensuring our team stays aligned and projects are delivered on time."
                />
                <TeamSection  
                    image={img3}
                    name="Yoonis Gallad"
                    role="Event Planner"
                    description="Creative event planner orchestrating memorable experiences, ensuring every detail is perfect."
                />
            </div>

            {/* CTA Section */}
            <motion.section
                className="py-16 px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
            >
                <h2 className="text-3xl font-bold mb-6">Join Us on Our Journey</h2>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                    At TekraConnect, we’re always exploring new ways to innovate and connect. Let’s grow together.
                </p>
                <Link to="/contact">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-indigo-700 transition">
                        Contact Us
                    </button>
                </Link>
            </motion.section>
        </div>
    );
}
