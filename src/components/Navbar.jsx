import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin"
  const isUser = user?.role === "user"

  return (
    <header className="w-full px-4 py-4 flex items-center justify-between bg-black text-white">

      <h1 className="text-2xl font-bold logo">
        Nois<span>ora</span>
      </h1>


      <nav className="hidden lg:flex space-x-6 items-center italic">
        <li className="list-none flex items-center gap-1 cursor-pointer">
          🎧 <span>Listen Now</span>
        </li>
        <li className="list-none"><a href="/">Home</a></li>
        <li className="list-none"><a href="/Artists">Artists</a></li>
        <li className="list-none"><a href="">Register</a></li>
        {isAdmin &&
          <li className="list-none"><Link to="/admin">Dashboard</Link></li>}
        {isUser && <li className="list-none"><Link to="/user">My Account</Link></li>}
      </nav>

      <div className="flex lg:hidden items-center gap-4 mx-2">
        <button className="flex flex-col space-y-1 ">
          <span className="w-6 h-0.5 bg-white block"></span>
          <span className="w-4 h-0.5 bg-white block"></span>
          <span className="w-3 h-0.5 bg-white block"></span>
        </button>
      </div>

      {user?.email ? <button className="ml-4 glow-btn1" onClick={() => logout()}>Logout</button> : <button className="ml-4 glow-btn1" onClick={() => navigate("/login")}>Login</button>}
    </header>
  );
}

export default Navbar;
