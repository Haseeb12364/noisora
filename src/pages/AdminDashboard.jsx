import React from "react"; 
import { useAuth } from "../context/AuthContext"; 
import { FaUser, FaMusic, FaChartPie, FaCog } from "react-icons/fa";

export default function AdminDashboard() {

  const { users, activeUsers, deleteUser } = useAuth();

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-gray-500 to-black shadow-lg sticky">
        <div className="p-6 font-bold text-2xl border-b justify-between items-center text-white">
          <img className="h-10 mr-2 mb-2" src="/app logo.png" alt="Logo" />
        </div>
        <nav className="p-4 space-y-4">
          <a className="flex items-center gap-2 text-white hover:text-indigo-600" href="#">
            <FaUser /> Users
          </a>
          <a className="flex items-center gap-2 text-white hover:text-indigo-600" href="#">
            <FaMusic className="text-yellow-500 h-8"  /> Songs
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
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-medium">Admin</span>
            <img src="/nain.jpeg" alt="profile" className="rounded-full w-10 h-10" />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Active Users</h2>
            <p className="text-2xl font-bold">{activeUsers.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-sm text-gray-500">Total Songs</h2>
            <p className="text-2xl font-bold">50</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Active Users List</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {activeUsers.length > 0 ? (
                activeUsers.map((u) => (
                  <tr key={u.email} className="border-b hover:bg-gray-50">
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.role}</td>
                    <td className="p-3">
                      <button
                        onClick={() => deleteUser(u.email)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-3 text-center text-gray-500">
                    No active users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
