import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Logged in as: {user?.email}</p>

      <h2 className="text-2xl font-semibold mb-3">All Users</h2>
      <div className="space-y-3">
        {users.length > 0 ? (
          users.map((u, index) => (
            <div
              key={index}
              className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
            >
              <span>{u.email}</span>
              <span className="text-sm text-gray-400">{u.role}</span>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}
