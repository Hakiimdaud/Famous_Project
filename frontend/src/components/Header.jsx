import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ animation
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
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between relative z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold text-red-500"
      >
        Tekra <span className="text-gray-800">Connect</span>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="hidden md:flex gap-8 text-gray-700"
      >
        <Link className="font-bold text-lg text-black hover:text-red-500 transition" to="/">Home</Link>
        <Link className="font-bold text-lg text-black hover:text-red-500 transition" to="/influencers">Influencers</Link>
        <Link className="font-bold text-lg text-black hover:text-red-500 transition" to="/complaints">Complaints</Link>
        <Link className="font-bold text-lg text-black hover:text-red-500 transition" to="/contact">Contact</Link>
        {loggedInUser && loggedInUser.type === "admin" && (
          <Link className="font-bold text-lg text-black hover:text-red-500 transition" to="/getDashboardStats">Admin Dashboard</Link>
        )}
      </motion.nav>

      {/* Desktop Auth */}
      {loggedInUser ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="hidden md:flex gap-4 items-center"
        >
          {loggedInUser.data.image && (
            <Link to={`/Profile/${loggedInUser.data._id}`}>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500">
                <img
                  src={`http://localhost:9000/allImages/${loggedInUser.data.image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="hidden md:flex gap-4 items-center"
        >
          <Link to="/login">
            <button className="text-gray-600 hover:text-red-500 font-semibold border-2 border-black px-6 py-1 rounded-md transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-gray-600 hover:text-red-500 font-semibold border-2 border-black px-6 py-1 rounded-md transition">
              Register
            </button>
          </Link>
        </motion.div>
      )}

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <i className="fas fa-times text-2xl"></i>
          ) : (
            <i className="fas fa-bars text-2xl"></i>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: isOpen ? 0 : -200, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden ${
          !isOpen && "pointer-events-none"
        }`}
      >
        <Link className="font-semibold text-lg hover:text-red-500 transition" to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link className="font-semibold text-lg hover:text-red-500 transition" to="/influencers" onClick={() => setIsOpen(false)}>Influencers</Link>
        <Link className="font-semibold text-lg hover:text-red-500 transition" to="/complaints" onClick={() => setIsOpen(false)}>Complaints</Link>
        <Link className="font-semibold text-lg hover:text-red-500 transition" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        {loggedInUser && loggedInUser.type === "admin" && (
          <Link className="font-semibold text-lg hover:text-red-500 transition" to="/getDashboardStats" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
        )}

        {loggedInUser ? (
          <>
            {loggedInUser.data.image && (
              <Link to={`/Profile/${loggedInUser.data._id}`} onClick={() => setIsOpen(false)}>
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-red-500">
                  <img
                    src={`http://localhost:9000/allImages/${loggedInUser.data.image}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="text-gray-600 hover:text-red-500 font-semibold border-2 border-black px-6 py-1 rounded-md transition">
                Login
              </button>
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <button className="text-gray-600 hover:text-red-500 font-semibold border-2 border-black px-6 py-1 rounded-md transition">
                Register
              </button>
            </Link>
          </>
        )}
      </motion.div>
    </motion.header>
  );
}

export default Header;
