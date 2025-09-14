import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const customer = localStorage.getItem("customer");
  const admin = localStorage.getItem("admin");

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // Determine logged in user
  const loggedInUser = customer
    ? { type: "customer", data: JSON.parse(customer).data.customer }
    : admin
    ? { type: "admin", data: JSON.parse(admin).data.admin }
    : null;

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-2xl md:text-3xl font-bold text-red-500">
        Find <span className="text-gray-800">influencer</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-700">
        <Link className="font-bold text-lg text-black" to="/">Home</Link>
        <Link className="font-bold text-lg text-black" to="/influencers">Influencers</Link>
        <Link className="font-bold text-lg text-black" to="/complaints">Complaints</Link>
        <Link className="font-bold text-lg text-black" to="/contact">Contact</Link>
        {loggedInUser && loggedInUser.type === "admin" && (
          <Link className="font-bold text-lg text-black" to="/dashboard">Admin Dashboard</Link>
        )}
      </nav>

      {/* Auth + Buttons (desktop) */}
      {loggedInUser ? (
        <div className="hidden md:flex gap-4 items-center">
          {loggedInUser.data.image && (
            <Link to={`/Profile/${loggedInUser.data._id}`}>
              <div className="w-10 h-10 bg-red-500 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={`http://localhost:9000/allImages/${loggedInUser.data.image}`} // hubi image path sax
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
         
        </div>
      ) : (
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/login">
            <button className="text-gray-600 font-semibold border-2 border-black px-6 py-1 rounded-md">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-gray-600 font-semibold border-2 border-black px-6 py-1 rounded-md">
              Register
            </button>
          </Link>
         
        </div>
      )}
    </header>
  );
}

export default Header;
