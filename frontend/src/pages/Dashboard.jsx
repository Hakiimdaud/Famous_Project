import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="w-64 bg-gray-100 min-h-screen p-6 shadow-md fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <Link to="/dashboard"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Dashboard</li></Link>
        <Link to="/influencer"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Influencer</li></Link>
        <Link to="/Addinfluencer"><li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Add Influencer</li></Link>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Customer</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Order</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Add Order</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Reports</li>
        <li className="p-2 rounded-md hover:bg-gray-200 cursor-pointer transition">Setting</li>
      </ul>
    </div>
  );
}

export default Dashboard;