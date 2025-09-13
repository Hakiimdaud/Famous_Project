import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Complaints() {
    const [name, setName] = useState("");
    const [person, setPerson] = useState("");
    const [body, setBody] = useState("");

    const navigate = useNavigate();

    const handlePostData = () => {
        axios
            .post("http://localhost:9000/post/complaints", {
                "name": name,
                "person": person,
                "body": body
            })
            .then(() => {
                toast.success("✅ Success: new Complaints registered", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/getcomplaints"); // halka route sax ku qor
            })
            .catch((err) => {
                console.error(err);
                toast.error("❌ Failed to register Complaints", {
                    position: "top-right",
                    autoClose: 4000,
                });
            });
    };

    return (
        <div>
            <div className="text-center " >
                <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-purple-500 to-red-600 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome the Place You br Send your Opinion!
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-6">Have questions, ideas, or just want to say hello?
                    I’d love to hear from you! Please fill out the form below with your details and message,
                    and I’ll get back to you as soon as possible.</p>
                    <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-2xl shadow hover:scale-105 transition">
                        Complaints Now
                    </button>
                </section>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center pt-4 pb-4">Please fill This Form</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6 text-center ml-72">Please fill out the form below with your details and message,
                    and I’ll get back to you as soon as possible</p>
            <div className="flex justify-center items-center h-screen ml-[4%] -mt-28">
                <div className="bg-gradient-to-r from-purple-500 to-red-600 w-[60%] rounded-2xl p-10 grid grid-cols-2 gap-6">
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="text" placeholder="Enter Name" />
                    <input value={person} onChange={(e) => setPerson(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="email" placeholder="Enter the person Your Complaints" />
                    <input value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-12 rounded-lg text-lg pl-3" type="text" placeholder="Enter your Complaints" />

                    <div className="col-span-2 flex justify-center">
                        <button type="button" onClick={handlePostData} className="bg-white px-12 py-3 rounded-lg text-black font-semibold hover:bg-gray-200">Confirm To Send</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Complaints;
