import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [active, setActive] = useState("customer")

    const navigate = useNavigate()

    const handleRegister = () => {
        const url = active === "customer" ? "http://localhost:9000/create/customer" : "http://localhost:9000/create/admin";

        const playload = active === "customer" ? { name: name, phone: phone, email: email, password: password } : { name: name, email: email, password: password };

        axios.post(url, playload).then(() => {
            alert("thanks you're welcome")
            navigate("/login")
        }).catch((error) => {
            console.log(error);

        })
    }



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <button onClick={() => setActive("customer")} className={`px-10 py-2 ${active === "customer" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`} >Customer</button>
                    <button onClick={() => setActive("admin")} className={`px-10 py-2 ${active === "admin" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`} >Admin</button>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    {active === "customer" ? "Register as Customer" : "Register as Admin"}
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4" style={{ display: active === "admin" ? "none" : "" }}>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="number"
                        placeholder="Enter your phone number"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                    Register as Customer
                </button>
            </form>
        </div>
    );
};

export default Register;
