import React, { useState, useEffect } from 'react'
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
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState('online');
    const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const navigate = useNavigate();

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Add a new social link field
    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: '', url: '' }]);
    };

    // Remove a social link field
    const removeSocialLink = (index) => {
        const newLinks = [...socialLinks];
        newLinks.splice(index, 1);
        setSocialLinks(newLinks);
    };

    // Update a specific social link
    const updateSocialLink = (index, field, value) => {
        const newLinks = [...socialLinks];
        newLinks[index][field] = value;
        setSocialLinks(newLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("address", address);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("description", description);
            formData.append("fullDescription", fullDescription);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("status", status);
            formData.append("img", photo);

            // Filter out empty social links and stringify
            const filteredSocialLinks = socialLinks.filter(
                link => link.platform.trim() !== '' && link.url.trim() !== ''
            );
            formData.append("social", JSON.stringify(filteredSocialLinks));

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

            // Navigate after a short delay to allow the toast to be seen
            setTimeout(() => {
                navigate("/influencer");
            }, 1000);
        } catch (error) {
            console.error("Error adding famous person:", error);

            // ❌ Toast error
            toast.error("Failed to add famous person. Check console for details.", {
                position: "top-right",
                autoClose: 4000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex'>
            <Dashboard />
            
            <div className={`min-h-screen flex items-center justify-center p-4 w-full ${isMobile ? 'ml-0' : 'ml-52'}`}>
                <div className="bg-white shadow-lg rounded-2xl p-4 md:p-8 w-full max-w-3xl">
                    <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">
                        Add Famous Person
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                        {/* Name */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Name *</label>
                            <input
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter name"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Address *</label>
                            <input
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="Enter address"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Email */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Email *</label>
                            <input
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter email"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Phone */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Phone</label>
                            <input
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                placeholder="Enter phone number"
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Price */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Price *</label>
                            <input
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                placeholder="Enter price"
                                required
                                min="0"
                                step="0.01"
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Status */}
                        <div className="md:col-span-1">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Status *</label>
                            <select
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Description *</label>
                            <textarea
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short description"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 h-20 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            ></textarea>
                        </div>

                        {/* Full Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Full Description</label>
                            <textarea
                                value={fullDescription} 
                                onChange={(e) => setFullDescription(e.target.value)}
                                placeholder="Detailed description"
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 h-28 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Category *</label>
                            <input
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder="Enter category"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2 text-sm md:text-base">Social Links</label>
                            {socialLinks.map((link, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4 items-end">
                                    <div>
                                        <label className="block text-gray-700 mb-1 text-sm md:text-base">Platform</label>
                                        <input
                                            value={link.platform}
                                            onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                            type="text"
                                            placeholder="Platform (e.g. Facebook)"
                                            className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1 text-sm md:text-base">URL</label>
                                        <div className="flex">
                                            <input
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                                type="url"
                                                placeholder="Profile URL"
                                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base"
                                            />
                                            {socialLinks.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocialLink(index)}
                                                    className="ml-2 bg-red-500 text-white px-2 md:px-3 py-2 rounded-lg md:rounded-xl hover:bg-red-600 transition text-sm md:text-base"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSocialLink}
                                className="mt-2 bg-gray-200 text-gray-700 px-3 md:px-4 py-2 rounded-lg md:rounded-xl hover:bg-gray-300 transition text-sm md:text-base"
                            >
                                + Add Social Link
                            </button>
                        </div>

                        {/* Photo */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1 text-sm md:text-base">Photo *</label>
                            <input
                                onChange={(e) => setPhoto(e.target.files[0])}
                                type="file"
                                accept="image/*"
                                required
                                className="w-full border rounded-lg md:rounded-xl p-2 md:p-3 focus:outline-none focus:ring focus:ring-blue-300 text-sm md:text-base file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className={`bg-gradient-to-r from-purple-500 to-red-600 text-white w-full text-lg md:text-xl py-2 md:py-3 rounded-lg md:rounded-xl shadow hover:from-purple-600 hover:to-red-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
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