import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //   const [active, setActive] = useState("customer")
    
    const navigate = useNavigate()

    const handleLogin = () => {
        // const url = active === "customer" ? "http://localhost:3003/login/customer" : "http://localhost:3003/login/admin";
        // const playload = {email:email, password:password};
        axios.post("http://localhost:9000/login/customer", {
            email: email,
            password: password
        }).then((res) => {
            alert("thanks you're welcome")
            localStorage.setItem("customer", JSON.stringify(res))
            navigate("/");
        }).catch((error) => {
            alert("email or password are incorrect")
        })
    }



    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={(e) => e.preventDefault()} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <button  className={`px-10 py-2 `} >Customer</button>
                    <button  className={`px-10 py-2 `} >Admin</button>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">Customer Login</h2>
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