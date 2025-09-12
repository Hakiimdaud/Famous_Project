import axios from "axios"
import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function AddInfluencer() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [img, setImage] = useState(null)

    
   

   const handleCreate = (e) => {
    e.preventDefault()
    axios.post("http://localhost:9000/create/famous", formData)
    .then(() => {
        toast.success("product add success 🚀")
        setTimeout(() => {
            
        }, 2000);
    })
   }
    
    const formData = new FormData()

    formData.append("name", name)
    formData.append("address", address)
    formData.append("email", email)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("img", img)

    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Register Influencer</h2>
            
            <div>
                <label className="block text-gray-700 font-medium mb-1">Influencer Name</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">address</label>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
             <div>
                <label className="block text-gray-700 font-medium mb-1">Category</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Image</label>
                <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    className="w-full text-gray-700"
                />
            </div>

            <div>
                <button onClick={handleCreate} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                    Add influencer
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default AddInfluencer