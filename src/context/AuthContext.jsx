import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
const { jwtDecode } = require("jwt-decode");

  // Current logged-in user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // All registered users
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    try {
      const parsed = JSON.parse(savedUsers);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Active users (currently logged-in sessions)
  const [activeUsers, setActiveUsers] = useState(() => {
    const saved = localStorage.getItem("activeUsers");
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const predefinedUsers = [
    { email: "dummyAdmin@gmail.com", password: "27613537", role: "admin" },
    { email: "dummyUser@gmail.com", password: "12345678", role: "user" },
  ];

  // Helper functions
  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const saveActiveUsers = (updatedActive) => {
    setActiveUsers(updatedActive);
    localStorage.setItem("activeUsers", JSON.stringify(updatedActive));
  };

  // Login function
  const login = (userData) => {
    let newUser;

    if (typeof userData === "string") {
      // Google login: JWT token
      const decoded = jwtDecode(userData);
      newUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        role: "user",
      };
    } else {
      // Manual login
      const foundUser = predefinedUsers.find((u) => u.email === userData.email);
      if (!foundUser) return { success: false, message: "User not found" };
      if (foundUser.password !== userData.password)
        return { success: false, message: "Incorrect password" };
      newUser = foundUser;
    }

    // Set current user
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    // Add to all users if not exists
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (!prevUsers.some((u) => u.email === newUser.email)) {
      saveUsers([...prevUsers, newUser]);
    }

    // Add to active users if not exists
    const prevActive = JSON.parse(localStorage.getItem("activeUsers")) || [];
    if (!prevActive.some((u) => u.email === newUser.email)) {
      saveActiveUsers([...prevActive, newUser]);
    }

    // Navigate based on role
    if (newUser.role === "admin") navigate("/admin");
    else navigate("/user");

    return { success: true, user: newUser };
  };

  // Logout function
  const logout = () => {
    if (!user) return;
    const prevActive = JSON.parse(localStorage.getItem("activeUsers")) || [];
    const updatedActive = prevActive.filter((u) => u.email !== user.email);
    saveActiveUsers(updatedActive);

    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  // Delete user (admin)
  const deleteUser = (email) => {
    const prevUsers = JSON.parse(localStorage.getItem("users")) || [];
    saveUsers(prevUsers.filter((u) => u.email !== email));

    const prevActive = JSON.parse(localStorage.getItem("activeUsers")) || [];
    saveActiveUsers(prevActive.filter((u) => u.email !== email));

    if (user && user.email === email) {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, users, activeUsers, login, logout, deleteUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
