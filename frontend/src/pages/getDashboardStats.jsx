import { useEffect, useState } from "react";
import axios from "axios";

const GetDashboardStats = () => {
  const [stats, setStats] = useState({
    customers: 0,
    admins: 0,
    influencers: 0,
    complaints: 0,
    contacts: 0
  });

  useEffect(() => {
    axios.get("http://localhost:9000/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6 flex flex-wrap flex-col ml-64">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Total Customers</h2>
          <p className="text-3xl font-bold">{stats.customers}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Total Admins</h2>
          <p className="text-3xl font-bold">{stats.admins}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Total Influencers</h2>
          <p className="text-3xl font-bold">{stats.influencers}</p>
        </div>

        <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Complaints</h2>
          <p className="text-3xl font-bold">{stats.complaints}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg">Contacts</h2>
          <p className="text-3xl font-bold">{stats.contacts}</p>
        </div>

      </div>
    </div>
  );
}

export default GetDashboardStats;
