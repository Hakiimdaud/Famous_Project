import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handlePostData = () => {
        axios
            .post("http://localhost:9000/create/CONTACT", {
                "name": name,
                "email": email,
                "address": address,
                "gender": gender,
                "message": message
            })
            .then(() => {
                toast.success("✅ Success: new contact registered", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/getcontact"); // halka route sax ku qor
            })
            .catch((err) => {
                console.error(err);
                toast.error("❌ Failed to register contact", {
                    position: "top-right",
                    autoClose: 4000,
                });
            });
    };

    return (
        <div>
            <div className="text-center" >
                <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-purple-500 to-red-600 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome the Place You br Send your Opinion!
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-6">Have questions, ideas, or just want to say hello?
                    I’d love to hear from you! Please fill out the form below with your details and message,
                    and I’ll get back to you as soon as possible.</p>
                    <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl shadow hover:scale-105 transition">
                        Contact Now
                    </button>
                </section>

            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center pt-10 pb-4">Please fill This Form</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6 text-center ml-72">Please fill out the form below with your details and message,
                    and I’ll get back to you as soon as possible</p>
            <div className="flex justify-center items-center h-screen ml-[4%] -mt-28">
                <div className="bg-gradient-to-r from-purple-500 to-red-600 w-[60%] rounded-2xl p-10 grid grid-cols-2 gap-6">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="text" placeholder="Enter Name" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="email" placeholder="Enter Email" />
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="text" placeholder="Enter Address" />
                    <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3">
                        <option value="">Choose your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3 col-span-2" type="text" placeholder="Enter Your Opinion" />

                    <div className="col-span-2 flex justify-center">
                        <button type="button" onClick={handlePostData} className="bg-white px-12 py-3 rounded-lg text-black font-semibold hover:bg-gray-200">Confirm To Send</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Contact;
