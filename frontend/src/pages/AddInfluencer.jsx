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
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState('online');
    const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
    const [photo, setPhoto] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

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
        <div className='flex gap-32'>
           
            <div className="min-h-screen flex items-center justify-center p-6  w-full">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-[800px] max-w-3xl ml-[10%]">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Add Famous Person
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Name *</label>
                            <input
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter name"
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 mb-1">Address *</label>
                            <input
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                placeholder="Enter address"
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-1">Email *</label>
                            <input
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter email"
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-700 mb-1">Phone</label>
                            <input
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)}
                                type="number"
                                placeholder="Enter phone number"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 mb-1">Price *</label>
                            <input
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)}
                                type="number"
                                placeholder="Enter price"
                                required
                                min="0"
                                step="0.01"
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-gray-700 mb-1">Status *</label>
                            <select
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Description *</label>
                            <textarea
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Short description"
                                required
                                className="w-full border rounded-xl p-2 h-20 focus:outline-none focus:ring focus:ring-blue-300"
                            ></textarea>
                        </div>

                        {/* Full Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Full Description</label>
                            <textarea
                                value={fullDescription} 
                                onChange={(e) => setFullDescription(e.target.value)}
                                placeholder="Detailed description"
                                className="w-full border rounded-xl p-2 h-28 focus:outline-none focus:ring focus:ring-blue-300"
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Category *</label>
                            <input
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                                type="text"
                                placeholder="Enter category"
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-2">Social Links</label>
                            {socialLinks.map((link, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
                                    <div>
                                        <label className="block text-gray-700 mb-1">Platform</label>
                                        <input
                                            value={link.platform}
                                            onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                            type="text"
                                            placeholder="Platform (e.g. Facebook)"
                                            className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-1">URL</label>
                                        <div className="flex">
                                            <input
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                                type="url"
                                                placeholder="Profile URL"
                                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                                            />
                                            {socialLinks.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocialLink(index)}
                                                    className="ml-2 bg-red-500 text-white px-3 rounded-xl hover:bg-red-600 transition"
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
                                className="mt-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
                            >
                                + Add Another Social Link
                            </button>
                        </div>

                        {/* Photo */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 mb-1">Photo *</label>
                            <input
                                onChange={(e) => setPhoto(e.target.files[0])}
                                type="file"
                                accept="image/*"
                                required
                                className="w-full border rounded-xl p-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className={`bg-gradient-to-r from-purple-500 to-red-600 text-white w-full text-3xl py-2 rounded-xl shadow hover:from-purple-600 hover:to-red-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
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