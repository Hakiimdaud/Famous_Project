import axios from "axios";
import { useEffect, useState } from "react";

function GetComplaintsData() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/get/complaints")
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch contacts:", err);
      });
  }, []);

  return (
    <div className="ml-[20%] min-h-screen  p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">All complaints</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
          <thead className="bg-gradient-to-r from-purple-500 to-red-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">person</th>
              <th className="px-4 py-2">body</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition text-center ">
                  <td className="px-4 py-2 text-left">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.person}</td>
                  <td className="px-4 py-2">{item.body}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetComplaintsData;
