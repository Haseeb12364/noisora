import { useLocation } from "react-router-dom"; 
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

  const shouldhideMenu = location.pathname === "/login";
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <header className="w-full px-4 py-4 bg-black text-white relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold logo flex">
          <img
            src="/app logo.png"
            className="h-14 object-contain ml-2 mt-2 font-bold"
          />
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 items-center italic">
          <li className="list-none flex items-center gap-1 cursor-pointer">
            <Link to="/Explorenow"> 🎧Listen Now</Link>
          </li>
          <li className="list-none">
            <Link to="/">Home</Link>
          </li>
          <li
            className="list-none"
            onClick={() => {
              if (user) {
                navigate("/Artists");
              } else {
                alert("Please login to see the Artists...");
              }
            }}
          >
            <Link to="/artists">Artists</Link>
          </li>
          {isAdmin && (
            <li className="list-none">
              <Link to="/admin">Dashboard</Link>
            </li>
          )}
          {isUser && (
            <li className="list-none">
              <Link to="/user">My Account</Link>
            </li>
          )}
        </nav>

        {/* Right Side (Desktop Buttons) */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xl transition hidden lg:block"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Auth Buttons (Desktop only) */}
          {user?.email ? (
            <button className="text-sm glow-btn2 hidden lg:block" onClick={logout}>
              Logout
            </button>
          ) : (
            <button
              className="text-sm glow-btn hidden lg:block"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}

          {/* Hamburger Button */}
          {!shouldhideMenu && (
            <button
              className="flex flex-col space-y-1 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-0.5 bg-white block"></span>
              <span className="w-4 h-0.5 bg-white block"></span>
              <span className="w-3 h-0.5 bg-white block"></span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] py-2" : "max-h-0"
        }`}
      >
        <ul className="min-h-screen w-full flex flex-col space-y-3 bg-black text-white dark:bg-white p-4 rounded-lg text-sm italic cursor-pointer dark:text-black">
          <li>
            <Link to="/Explorenow" onClick={() => setMenuOpen(false)}>
              🎧Listen Now
            </Link>
          </li>
          <li>
            <Link to="/artists" onClick={() => setMenuOpen(false)}>
              Artists
            </Link>
          </li>
          <li>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </li>

          {/* Dark Mode Toggle in Mobile */}
          <li>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                setMenuOpen(false);
              }}
              className="text-left w-full"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </li>

          {isAdmin && (
            <li>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}
          {isUser && (
            <li>
              <Link to="/user" onClick={() => setMenuOpen(false)}>
                My Account
              </Link>
            </li>
          )}

          {/* ✅ Only show Logout in mobile, hide Login */}
          {user?.email && (
            <li>
              <button
                className="w-full text-left text-red-400 hover:text-red-300"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                🚪 Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
