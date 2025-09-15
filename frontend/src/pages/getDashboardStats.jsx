import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard"; // Import the Dashboard component
import { Link } from "react-router-dom";

const GetDashboardStats = () => {
  const [stats, setStats] = useState({
    customers: 0,
    admins: 0,
    influencers: 0,
    complaints: 0,
    contacts: 0
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:9000/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex">
      <Dashboard />
      
      <div className={`p-4 w-full ${isMobile ? 'ml-0' : 'ml-56'}`}>
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {/* Total Customers Card */}
          <div className="bg-blue-500 text-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-lg">Total Customers</h2>
              <i className="fas fa-users text-white text-lg md:text-xl"></i>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stats.customers}</p>
          </div>

          {/* Total Admins Card */}
          <div className="bg-purple-500 text-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-lg">Total Admins</h2>
              <i className="fas fa-user-shield text-white text-lg md:text-xl"></i>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stats.admins}</p>
          </div>

          {/* Total Influencers Card */}
          <div className="bg-green-500 text-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-lg">Total Influencers</h2>
              <i className="fas fa-star text-white text-lg md:text-xl"></i>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stats.influencers}</p>
          </div>

          {/* Complaints Card */}
          <div className="bg-red-500 text-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-lg">Complaints</h2>
              <i className="fas fa-exclamation-circle text-white text-lg md:text-xl"></i>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stats.complaints}</p>
          </div>

          {/* Contacts Card */}
          <div className="bg-yellow-500 text-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <h2 className="text-sm md:text-lg">Contacts</h2>
              <i className="fas fa-envelope text-white text-lg md:text-xl"></i>
            </div>
            <p className="text-2xl md:text-3xl font-bold mt-2">{stats.contacts}</p>
          </div>
        </div>

        {/* Additional Stats or Charts Section (optional) */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm md:text-base">New influencers this week</span>
                <span className="font-semibold text-green-600">+5</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm md:text-base">Pending complaints</span>
                <span className="font-semibold text-red-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base">New contacts today</span>
                <span className="font-semibold text-blue-600">+2</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/Addinfluencer"><button className="bg-blue-100 text-blue-700 p-3 rounded-lg text-sm md:text-base hover:bg-blue-200 transition">
                <i className="fas fa-plus mr-2"></i> Add Influencer
              </button>
              </Link>
              <Link to="/influencer"><button className="bg-green-100 text-green-700 p-3 rounded-lg text-sm md:text-base hover:bg-green-200 transition">
                <i className="fas fa-users mr-2"></i> View Influencer
              </button>
              </Link>
             <Link to="/getcontact"><button className="bg-purple-100 text-purple-700 p-3 rounded-lg text-sm md:text-base hover:bg-purple-200 transition">
                <i className="fas fa-chart-bar mr-2"></i> Reports
              </button>
              </Link> 
              <Link to="/getcomplaints"><button className="bg-red-100 text-red-700 p-3 rounded-lg text-sm md:text-base hover:bg-red-200 transition">
                <i className="fas fa-exclamation-circle mr-2"></i> Complaints
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetDashboardStats;