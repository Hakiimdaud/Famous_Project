import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const customer = localStorage.getItem("customer");
  const admin = localStorage.getItem("admin");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Determine logged in user
  const loggedInUser = customer
    ? { type: "customer", data: JSON.parse(customer).data.customer }
    : admin
      ? { type: "admin", data: JSON.parse(admin).data.admin }
      : null;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebar when switching to mobile view
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Initialize sidebar state based on screen size
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-purple-900 text-white shadow-lg"
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-purple-900 to-red-600 text-white shadow-md flex flex-col justify-between transform transition-transform duration-300 z-50
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}`}>
        
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1 text-white"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        )}

        {/* Menu Items */}
        <ul className="flex flex-col gap-8 mt-6 text-[18px] px-4">
          <Link to="/" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-home"></i> Home
            </li>
          </Link>
          <Link to="/getDashboardStats" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </li>
          </Link>
          <Link to="/influencer" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-user-friends"></i> Influencer
            </li>
          </Link>
          <Link to="/Addinfluencer" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-user-plus"></i> Add Influencer
            </li>
          </Link>
          <Link to="/getcomplaints" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-exclamation-circle"></i> Complaints
            </li>
          </Link>
          <Link to="/getcontact" onClick={() => isMobile && setIsOpen(false)}>
            <li className="p-2 rounded-md hover:bg-black cursor-pointer flex items-center gap-2">
              <i className="fas fa-chart-line"></i> Reports
            </li>
          </Link>
        </ul>

        {/* Bottom User Profile */}
        {loggedInUser && (
          <div className="flex items-center mt-6 pt-4 border-t border-white px-4 mb-4">
            <Link to={`/ProfileDashboard/${loggedInUser.data._id}`} onClick={() => isMobile && setIsOpen(false)}>
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