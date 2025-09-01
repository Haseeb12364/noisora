import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaMusic, FaChartPie, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  // Load users from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user"); 
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUsers([{ id: 1, email: parsedUser.email, role: parsedUser.role }]);
    }
    
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-700 ">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-gray-500 to-black shadow-lg sticky ">
        <div className="p-6 font-bold text-2xl border-b text-white">
          <img className="h-10 mr-2 mb-2" src="/app logo.png" alt="" />
        </div>
        <nav className="p-4 space-y-4">
          <a className="flex items-center gap-2 text-white hover:text-indigo-600" href="#">
            <FaUser /> Users
          </a>
          <a className="flex items-center gap-2 text-white hover:text-indigo-600" href="#">
            <FaMusic /> Songs
          </a>
          <a className="flex items-center gap-2 text-white hover:text-indigo-600" href="#">
            <FaChartPie /> Analytics
          </a>
          <a className="flex items-center gap-2" href="#">
            <FaCog /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* <span className="font-medium">{ || "Guest"}</span> */}
            <img
              src="/nain.jpeg"
              alt="profile"
              className="rounded-full w-10 h-10"
            />
          </div>
        </header>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Users List</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
