import { TfiAngleLeft } from "react-icons/tfi";
import { useState } from "react";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Userdashboard() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = ["Folders", "Playlists", "Artists", "Albums", "Liked"];

  const recentlyPlayed = [
    { id: 1, title: "Chill Vibes", img: "/covers/cover1.jpg", lastPlayed: "2 days ago" },
    { id: 2, title: "Top Hits", img: "/covers/cover2.jpg", lastPlayed: "5 days ago" },
    { id: 3, title: "Workout Mix", img: "/covers/cover3.jpg", lastPlayed: "1 week ago" },
    { id: 4, title: "Late Night", img: "/covers/cover4.jpg", lastPlayed: "3 days ago" },
    { id: 5, title: "Acoustic Mornings", img: "/covers/cover5.jpg", lastPlayed: "6 days ago" },
  ];

  const recommended = [
    { id: 1, title: "Evening Chill", img: "/covers/cover6.jpg", description: "Relax & unwind" },
    { id: 2, title: "Pakistani Classics", img: "/covers/cover7.jpg", description: "Golden oldies" },
    { id: 3, title: "Pop Hits 2025", img: "/covers/cover8.jpg", description: "Trending now" },
    { id: 4, title: "Instrumental Bliss", img: "/covers/cover9.jpg", description: "Focus mode" },
    { id: 5, title: "Morning Motivation", img: "/covers/cover10.jpg", description: "Start strong" },
  ];

  const continueListening = [
    { id: 1, title: "Lo-fi Beats", img: "/covers/cover3.jpg", progress: 70 },
    { id: 2, title: "Atif Aslam Favourites", img: "/covers/cover1.jpg", progress: 45 },
    { id: 3, title: "Coding Playlist", img: "/covers/cover5.jpg", progress: 20 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        {/* Back + Logo */}
        <div className="flex items-center space-x-4">
          <Link to={"/"}>
            <TfiAngleLeft className="text-2xl cursor-pointer hover:text-gray-300 transition" />
          </Link>
          <img src="/musium logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-semibold">Your Library</h1>
        </div>

        {/* Search + Menu */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch
              className="text-xl cursor-pointer hover:text-gray-300 transition"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="absolute right-0 mt-2 bg-gray-900 text-white rounded-md px-4 py-2 w-56 border border-gray-700 focus:border-gray-500 focus:outline-none"
                autoFocus
              />
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-2xl hover:text-gray-300 transition"
            >
              {showMenu ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMenu && (
        <nav className="md:hidden px-4 py-3 border-b border-gray-800">
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <button
                key={item}
                className="px-3 py-2 rounded-md hover:bg-gray-800 text-left transition"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-4 px-4 py-4 border-b border-gray-800">
        {menuItems.map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="px-4 py-6">
        {/* Recently Played */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold">Recently Played</h2>
            <button className="text-sm text-gray-400 hover:text-white transition">
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {recentlyPlayed.map((playlist) => (
              <div key={playlist.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/60 relative">
                  <img
                    src={playlist.img}
                    alt={playlist.title}
                    className="w-full h-44 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent opacity-80"></div>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium truncate">{playlist.title}</h3>
                  <p className="text-gray-500 text-xs">Last played {playlist.lastPlayed}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

    

        {/* Continue Listening */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-5">Continue Listening</h2>
          <div className="space-y-4">
            {continueListening.map((track) => (
              <div key={track.id} className="flex items-center space-x-4">
                <img
                  src={track.img}
                  alt={track.title}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-800"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{track.title}</h3>
                  <div className="w-full bg-gray-700 h-1 rounded-full mt-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full "
                      style={{ width: `${track.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voice Note Playlist */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Voice Note Playlist 🎙️</h2>
          <div className="bg-gray-900 rounded-lg p-5 border border-gray-800">
            <p className="text-gray-400 mb-3">
              Record short voice notes and save them as quick playlist ideas.
            </p>
            <button className="px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition">
              Record Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
