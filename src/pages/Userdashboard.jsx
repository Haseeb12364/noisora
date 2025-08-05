import { TfiAngleLeft } from "react-icons/tfi";
import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom"
export default function Userdashboard() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Link to={"/"}>
      <div className="">      <TfiAngleLeft className="text-2xl cursor-pointer  text-white font-bold  m-3" /></div>

      </Link>
    <div className="min-h-screen w-full bg-black text-white p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 mb-4">
        {/* Logo & Heading */}
        <div className="flex items-center space-x-4">
          <img src="/musium logo.png" className="w-12 h-12 object-contain" />
          <h1 className="text-xl md:text-3xl font-bold text-cyan-400">Your library</h1>
        </div>

        {/* Search + Hamburger */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch
              className="text-white text-2xl md:text-3xl cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`absolute right-0 top-0 bg-gray-800 text-white rounded-md px-4 py-2 w-64 transition-all duration-500 ease-in-out ${
                showSearch ? "opacity-100 translate-y-12 visible " : "opacity-0 -translate-y-4 invisible"
              }`}
            />
          </div>

          {/* Hamburger for mobile */}
          <div className="md:hidden">
            <button onClick={() => setShowMenu(!showMenu)} className="text-3xl">
              {showMenu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMenu && (
        <div className="md:hidden px-4 mb-4">
          <div className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-xl">
            <button className="glow-btn">Folders</button>
            <button className="glow-btn">Playlists</button>
            <button className="glow-btn">Artists</button>
            <button className="glow-btn">Albums</button>
            <button className="glow-btn">Liked</button>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-wrap gap-4 px-4 mb-6">
        <button className="glow-btn">Folders</button>
        <button className="glow-btn">Playlists</button>
        <button className="glow-btn">Artists</button>
        <button className="glow-btn">Albums</button>
        <button className="glow-btn">Liked</button>
      </div>

      {/* Recently Played */}
      <div className="px-4">
        <h2 className="text-xl font-bold mb-3">Recently Played</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition"
            >
              <h3 className="font-semibold text-lg mb-1">Playlist #{item}</h3>
              <p className="text-gray-400 text-sm">Last played: 2 days ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Note Playlist */}
      <div className="px-4 mt-8">
        <h2 className="text-xl font-bold mb-3">Voice Note Playlist 🎙️</h2>
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400">
            Record short voice notes and save them as quick playlist ideas.
          </p>
          <button className="glow-btn mt-3">Record Now</button>
        </div>
      </div>
    </div>
    </>
  );
}
