import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="w-64 bg-gradient-to-r from-purple-900 to-red-600 text-white min-h-screen p-6 shadow-md fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
      <ul className="flex flex-col gap-3">
        <Link to="/dashboard"><li className="p-2 rounded-md text-white hover:bg-black  cursor-pointer transition">Dashboard</li></Link>
        <Link to="/influencer"><li className="p-2 rounded-md text-white hover:bg-black  cursor-pointer transition">Influencer</li></Link>
        <Link to="/Addinfluencer"><li className="p-2 rounded-md hover:bg-black   cursor-pointer transition">Add Influencer</li></Link>
        <Link to="/getcomplaints"><li className="p-2 rounded-md hover:bg-black   cursor-pointer transition">Complaints</li></Link>
        <li className="p-2 rounded-md text-white hover:bg-black  cursor-pointer transition">Order</li>
        <li className="p-2 rounded-md text-white hover:bg-black  cursor-pointer transition">Add Order</li>
        <Link to="/getcontact"><li className="p-2 rounded-md hover:bg-black   cursor-pointer transition">Reports</li></Link>
        <li className="p-2 rounded-md text-white hover:bg-black  cursor-pointer transition">Setting</li>
      </ul>
    </div>
  );
}

export default Dashboard;