import { useLocation } from "react-router-dom"; 
import { FiMenu, FiX } from 'react-icons/fi';
import { TfiAngleLeft } from "react-icons/tfi";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/Themecontext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldhideMenu = location.pathname === '/login';
  const isloginPage = location.pathname === "/login";
  const isAdmin = user?.role === "admin";
   const isUser = user?.role === "user";
        
  return (
    <header className="w-full px-4 py-4 bg-black text-white relative z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold logo">
          Nois<span className="text-cyan-400">ora</span>
        </h1>

        <nav className="hidden lg:flex space-x-6 items-center italic">
          <li className="list-none flex items-center gap-1 cursor-pointer">
            🎧 <span>Listen Now</span>
          </li>
          <li className="list-none"><Link to="/">Home</Link></li>
          <li className="list-none"   onClick={() => {
              if (user) {
                navigate("/Artists");
              } else {
                alert("Please login to see the Artists...");
              }
            }}>
            <Link to="/artists">Artists</Link>
          
          </li>
          {/* <li className="list-none"><Link to="/register">Register</Link></li> */}
          {isAdmin && <li className="list-none"><Link to="/admin">Dashboard</Link></li>}
          {isUser && <li className="list-none"><Link to="/user">My Account</Link></li>}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl transition"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {user?.email ? (
            <button className="text-sm glow-btn2" onClick={logout}>Logout</button>
          ) : (
            <button className="text-sm glow-btn" onClick={() => navigate("/login")}>Login</button>
          )}

          {!shouldhideMenu && (
            <button
              className="flex flex-col space-y-1 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-0.5 bg-white dark:bg-black block"></span>
              <span className="w-4 h-0.5 bg-white dark:bg-black block"></span>
              <span className="w-3 h-0.5 bg-white dark:bg-black block"></span>
            </button>
          )}
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-[500px] py-2" : "max-h-0"}`}>
        <ul className="min-h-screen w-full flex flex-col space-y-3 bg-white dark:bg-black p-4 rounded-lg text-sm italic cursor-pointer text-black dark:text-white">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/artists" onClick={() => setMenuOpen(false)}>Artists</Link></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          {isAdmin && <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>}
          {isUser && <li><Link to="/user" onClick={() => setMenuOpen(false)}>My Account</Link></li>}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
