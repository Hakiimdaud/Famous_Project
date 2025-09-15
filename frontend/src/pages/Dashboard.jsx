import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const customer = localStorage.getItem("customer");
  const admin = localStorage.getItem("admin");

  // Determine logged in user
  const loggedInUser = customer
    ? { type: "customer", data: JSON.parse(customer).data.customer }
    : admin
      ? { type: "admin", data: JSON.parse(admin).data.admin }
      : null;

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center bg-gradient-to-r from-purple-900 to-red-600 text-white p-4 fixed">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none text-2xl"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-purple-900 to-red-600 text-white shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col justify-between`}
      >
        {/* Menu Items */}
        <ul className="flex flex-col gap-8 mt-6 text-[18px] px-4">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-home"></i> Home
            </li>
          </Link>
          <Link to="/getDashboardStats" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>
          </Link>
          <Link to="/influencer" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-user-friends"></i> Influencer
            </li>
          </Link>
          <Link to="/Addinfluencer" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-user-plus"></i> Add Influencer
            </li>
          </Link>
          <Link to="/getcomplaints" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> Complaints
            </li>
          </Link>
          <Link to="/getcontact" onClick={() => setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-chart-line"></i> Reports
            </li>
          </Link>
        </ul>

        {/* Bottom User Profile */}
        {loggedInUser && (
          <div className="flex items-center mt-6 pt-4 border-t border-white px-4 mb-4">
            <Link to={`/ProfileDashboard/${loggedInUser.data._id}`}>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mr-3">
                <img
                  src={`http://localhost:9000/allImages/${loggedInUser.data.image}`}
                  alt={loggedInUser.data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <span className="font-semibold">{loggedInUser.data.name}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
