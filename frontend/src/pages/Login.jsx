import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

      const [active, setActive] = useState("customer")
    
    const navigate = useNavigate()

    const handleLogin = () => {
        const url = active === "customer" ? "http://localhost:9000/login/customer" : "http://localhost:9000/login/admin";
        const playload = {email:email, password:password};
        axios.post(url, playload).then((res) => {
            alert("thanks you're welcome")
            localStorage.setItem(active === "customer" ? "customer" : "admin", JSON.stringify(res))
            navigate( active === "customer" ? "/" : "/dashboard");
        }).catch((error) => {
            alert("email or password are incorrect")
        })
    }



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                  <div className="flex justify-center mb-6">
                    <button onClick={() => setActive("customer")} className={`px-10 py-2 ${active === "customer" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`} >Customer</button>
                    <button onClick={() => setActive("admin")} className={`px-10 py-2 ${active === "admin" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`} >Admin</button>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">{active === "customer" ? "Customer Login" : "Admin Login"}</h2>
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
                    onClick={handleLogin}
                    className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login