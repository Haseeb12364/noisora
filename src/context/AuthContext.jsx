import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Current logged-in user
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // All users list
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return Array.isArray(JSON.parse(savedUsers)) ? JSON.parse(savedUsers) : [];
  });

  const navigate = useNavigate();

  // Hardcoded users for manual login
  const predefinedUsers = [
    { email: "dummyAdmin@gmail.com", password: "27613537", role: "admin" },
    { email: "dummyUser@gmail.com", password: "12345678", role: "user" },
  ];

  const saveUsersToStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = (userData) => {
    // ✅ Case 1: Google login (token string)
    if (typeof userData === "string") {
      const decoded = jwtDecode(userData);

      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        role: "user", // default role
      };

      setUser(googleUser);
      localStorage.setItem("user", JSON.stringify(googleUser));

      // Add to users array if not exists
      const exists = users.find((u) => u.email === googleUser.email);
      if (!exists) {
        saveUsersToStorage([...users, googleUser]);
      }

      navigate("/user");
      return { success: true, user: googleUser };
    }

    // ✅ Case 2: Manual login (email/password)
    const foundUser = predefinedUsers.find((u) => u.email === userData.email);
    if (!foundUser) {
      return { success: false, message: "User not found" };
    }

    if (userData.password === foundUser.password) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));

      // Add to users array if not exists
      const exists = users.find((u) => u.email === foundUser.email);
      if (!exists) {
        saveUsersToStorage([...users, foundUser]);
      }

      if (foundUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

      return { success: true, user: foundUser };
    } else {
      return { success: false, message: "Incorrect Password!!!" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
