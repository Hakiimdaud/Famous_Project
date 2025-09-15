import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
    const [name, setName] = useState("");
    const [person, setPerson] = useState("");
    const [body, setBody] = useState("");
    const [isOpen, setIsOpen] = useState(false); // modal control

    const navigate = useNavigate();

    const handlePostData = () => {
        axios
            .post("http://localhost:9000/post/complaints", { name, person, body })
            .then(() => {
                toast.success("✅ Success: new Complaint registered", {
                    position: "top-right",
                    autoClose: 3000,
                });
                setIsOpen(false); // close modal after submit
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                toast.error("❌ Failed to register Complaint", {
                    position: "top-right",
                    autoClose: 4000,
                });
            });
    };

    return (
        <div className="w-full min-h-screen ">
            {/* Hero Section */}
            <motion.section
                className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-red-600 bg-clip-text text-transparent">
                    Welcome to the Place You Send Your Opinion!
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-6  bg-gradient-to-r from-purple-500 to-red-600 bg-clip-text text-transparent">
                    Have questions, ideas, or just want to say hello?
                    I’d love to hear from you! Click below to send your complaint.
                </p>
                <motion.button
                    className="text-white font-semibold px-6 py-3 rounded-2xl shadow bg-gradient-to-r from-purple-500 to-red-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)} // open modal
                >
                    Complaints Now
                </motion.button>
            </motion.section>

            {/* Modal (Form Pop-up) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-purple-500 to-red-600 text-white rounded-2xl p-8 w-full max-w-lg shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-center mb-4">
                                Send Your Complaint
                            </h2>

                            {/* Form */}
                            <div className="space-y-4">
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-12 border rounded-lg text-lg pl-3 focus:outline-none text-black"
                                    type="text"
                                    placeholder="Enter Name"
                                />
                                <input
                                    value={person}
                                    onChange={(e) => setPerson(e.target.value)}
                                    className="w-full h-12 border rounded-lg text-lg pl-3 focus:outline-none text-black"
                                    type="text"
                                    placeholder="Enter the Person Your Complaint"
                                />
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full h-28 border rounded-lg text-lg p-3 focus:outline-none text-black"
                                    placeholder="Enter your Complaint"
                                />

                                <div className="flex justify-between mt-4">
                                    <button
                                        className="px-6 py-2 rounded-lg bg-gray-300 text-black hover:bg-gray-400"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handlePostData}
                                        className="px-6 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-100"
                                    >
                                        Confirm To Send
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ToastContainer />
        </div>
    );
}

export default Complaints;
