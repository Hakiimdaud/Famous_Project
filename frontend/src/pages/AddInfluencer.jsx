import React, { useState } from 'react'
import Dashboard from './Dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ✅ Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInfluencer = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [category, setCategory] = useState('');
    const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
    const [photo, setPhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("description", description);
            formData.append("fullDescription", fullDescription);
            formData.append("category", category);
            formData.append("img", photo);

            // ✅ Social Links JSON string
            formData.append("social", JSON.stringify(socialLinks));

            await axios.post("http://localhost:9000/create/famous", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // ✅ Toast success
            toast.success("Famous person successfully added!", {
                position: "top-right",
                autoClose: 3000,
            });

            navigate("/influencer");
        } catch (error) {
            console.error("Error adding famous person:", error);

            // ❌ Toast error
            toast.error("Failed to add famous person. Check console for details.", {
                position: "top-right",
                autoClose: 4000,
            });
        }
    };

    return (
        <div className='flex gap-32'>
            <Dashboard />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 ml-40 w-full">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-[800px] max-w-3xl">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Add Famous Person
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                value={name} onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter name"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 mb-1">Address</label>
                            <input
                                value={address} onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="Enter address"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter email"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 mb-1">Phone</label>
                            <input
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                placeholder="Enter phone number"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Description</label>
                            <textarea
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short description"
                                className="w-full border rounded-xl p-2 h-20 focus:outline-none focus:ring focus:ring-blue-300"
                            ></textarea>
                        </div>

                        {/* Full Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Full Description</label>
                            <textarea
                                value={fullDescription} onChange={(e) => setFullDescription(e.target.value)}
                                placeholder="Detailed description"
                                className="w-full border rounded-xl p-2 h-28 focus:outline-none focus:ring focus:ring-blue-300"
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Category</label>
                            <input
                                value={category} onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder="Enter category"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Social Links</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    value={socialLinks[0].platform} onChange={(e) => {
                                        const newLinks = [...socialLinks];
                                        newLinks[0].platform = e.target.value;
                                        setSocialLinks(newLinks);
                                    }}
                                    type="text"
                                    placeholder="Platform (e.g. Facebook)"
                                    className="border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                                <input
                                    value={socialLinks[0].url} onChange={(e) => {
                                        const newLinks = [...socialLinks];
                                        newLinks[0].url = e.target.value;
                                        setSocialLinks(newLinks);
                                    }}
                                    type="url"
                                    placeholder="Profile URL"
                                    className="border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        {/* Photo */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Photo</label>
                            <input
                                onChange={(e) => setPhoto(e.target.files[0])}
                                type="file"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type='submit'
                                className="bg-blue-600 text-white w-full text-3xl py-2 rounded-xl shadow hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ✅ Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default AddInfluencer;
