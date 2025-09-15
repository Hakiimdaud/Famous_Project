import { Link } from "react-router-dom";

function Dashboard() {
  const customer = localStorage.getItem("customer");
  const admin = localStorage.getItem("admin");

  // Determine logged in user
  const loggedInUser = customer
    ? { type: "customer", data: JSON.parse(customer).data.customer }
    : admin
      ? { type: "admin", data: JSON.parse(admin).data.admin }
      : null;

  return (
    <div className="w-64 bg-gradient-to-r from-purple-900 to-red-600 text-white min-h-screen p-6 shadow-md fixed top-0 left-0 flex flex-col justify-between">

      {/* Menu Items */}
      <ul className="flex flex-col gap-8  mt-4 text-[20px] w-full">
        <Link to="/">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-home"></i>
            Home
          </li>
        </Link>
        <Link to="/getDashboardStats">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </li>
        </Link>
        <Link to="/influencer">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-user-friends"></i>
            Influencer
          </li>
        </Link>
        <Link to="/Addinfluencer">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-user-plus"></i>
            Add Influencer
          </li>
        </Link>
        <Link to="/getcomplaints">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-exclamation-circle"></i>
            Complaints
          </li>
        </Link>
        
        <Link to="/getcontact">
          <li className="p-2 rounded-md text-white hover:bg-black cursor-pointer transition flex items-center gap-2">
            <i className="fas fa-chart-line"></i>
            Reports
          </li>
        </Link>

      </ul>

      {/* Bottom User Profile under Settings */}
      {loggedInUser && (
        <div className="flex items-center mt-6 pt-4 border-t border-white">
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
  );
}

export default Dashboard;
