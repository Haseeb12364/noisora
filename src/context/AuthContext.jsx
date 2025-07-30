import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const users = [{
    email: "dummyAdmin@gmail.com",
    password: "27613537",
    role: "admin"
  }, {
    email: "dummyUser@gmail.com",
    password: "12345678",
    role: "user"
  }]

  const login = (userData) => {
    const user = users.find(user => user.email === userData.email)
    console.log(user);

    if (!user) {
      return { success: false, message: "Does not found any user with these credentials" }
    }

    if (userData.password === user.password) {
      setUser(user)
      return user
    } else {
      return { success: false, message: "Incorrect Password!!!" }
    }
  }
  const logout = () => {
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>

  );

};
export function useAuth() {
  return useContext(AuthContext)
}