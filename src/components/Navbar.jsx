import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <header className="w-full px-4 py-4 bg-black text-white relative z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold logo">
          Nois<span className="text-cyan-400">ora</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-6 items-center italic">
          <li className="list-none flex items-center gap-1 cursor-pointer">
            🎧 <span>Listen Now</span>
          </li>
          <li className="list-none"><Link to="/">Home</Link></li>
          <li className="list-none"><Link to="/Artists">Artists</Link></li>
          <li className="list-none"><Link to="/register">Register</Link></li>
          {isAdmin && <li className="list-none"><Link to="/admin">Dashboard</Link></li>}
          {isUser && <li className="list-none"><Link to="/user">My Account</Link></li>}
        </nav>

        {/* Login button - always visible */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <button className="glow-btn1 text-sm" onClick={logout}>Logout</button>
          ) : (
            <button className="glow-btn1 text-sm" onClick={() => navigate("/login")}>Login</button>
          )}

          {/* Mobile Hamburger */}
          <button
            className="flex flex-col space-y-1 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-6 h-0.5 bg-white block"></span>
            <span className="w-4 h-0.5 bg-white block"></span>
            <span className="w-3 h-0.5 bg-white block"></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown NavLinks */}
         <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? "max-h-[500px] py-2" : "max-h-0"}`}>

        <ul className="  min-h-screen w-full flex flex-col space-y-3 bg-white p-4 rounded-lg text-sm italic cursor-pointer text-black">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/Artists" onClick={() => setMenuOpen(false)}>Artists</Link></li>
          <li><Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link></li>
          {isAdmin && <li><Link to="/admin" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>}
          {isUser && <li><Link to="/user" onClick={() => setMenuOpen(false)}>My Account</Link></li>}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
