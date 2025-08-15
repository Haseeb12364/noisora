import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();

  const users = [
    { email: "dummyAdmin@gmail.com", password: "27613537", role: "admin" },
    { email: "dummyUser@gmail.com", password: "12345678", role: "user" }
  ];


  const login = (userData) => {
  
    if (typeof userData === "string") {
      const decoded = jwtDecode(userData);
      setUser(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));
      navigate("/");
      return { success: true, user: decoded };
    }


    const foundUser = users.find((u) => u.email === userData.email);
    if (!foundUser) {
      return { success: false, message: "User not found" };
    }

    if (userData.password === foundUser.password) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser)); 
      navigate("/");
      return { success: true, user: foundUser };
    } else {
      return { success: false, message: "Incorrect Password!!!" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
