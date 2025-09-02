import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaMusic, FaChartPie, FaCog, FaTimes, FaPlay } from "react-icons/fa";

export default function UserDashboard() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activePlaylist, setActivePlaylist] = useState(null);

  // Load playlists from localStorage
  useEffect(() => {
    const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(savedPlaylists);
  }, []);

  // Get only recent 3 playlists
  const recentPlaylists = playlists.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-indigo-400 to-white text-white p-6">
      {/* Profile Section */}
      <div className=" rounded-2xl p-6 mb-8 shadow-lg">
        <div className="flex items-center space-x-4">
          {user?.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-cyan-500"
            />
          ) : (
            <FaUser className="w-16 h-16 text-gray-400" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {user?.name || "Guest User"}
            </h2>
            <p className="text-gray-400">{user?.email || "No email"}</p>
          </div>
        </div>
      </div>

      {/* Playlists Section */}
      <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Your Playlists</h3>
        {recentPlaylists.length > 0 ? (
          <>
            <ul className="space-y-3">
              {recentPlaylists.map((playlist, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-3 rounded-lg flex items-center justify-between hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setActivePlaylist(playlist);
                    setShowModal(true);
                  }}
                >
                  <span className="flex items-center space-x-2">
                    <FaMusic className="text-cyan-400" />
                    <span>{playlist.name}</span>
                  </span>
                  <span className="text-sm text-gray-400">
                    {playlist.songs?.length || 0} songs
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full bg-cyan-500 hover:bg-cyan-400 text-white py-2 rounded-lg font-medium"
              onClick={() => setShowModal(true)}
            >
              View All Playlists
            </button>
          </>
        ) : (
          <p className="text-gray-400">No playlists yet.</p>
        )}
      </div>

      {/* Extra Stats Section */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaChartPie className="text-3xl text-cyan-400 mb-2" />
          <p className="text-sm text-gray-400">Total Playlists</p>
          <p className="text-lg font-semibold">{playlists.length}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl flex flex-col items-center shadow-lg">
          <FaCog className="text-3xl text-cyan-400 mb-2" />
          <p className="text-sm text-gray-400">Settings</p>
          <p className="text-lg font-semibold">Manage</p>
        </div>
      </div>

      {/* Playlist Modal */}
    {/* Playlist Modal */}
{showModal && activePlaylist && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Background Overlay */}
    <div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      onClick={() => setShowModal(false)}
    ></div>

    {/* Modal Card */}
    <div className="relative bg-gray-900  text-black rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white  ">
          {activePlaylist.name}
        </h2>
        <button
          className="text-gray-400 hover:text-white transition"
          onClick={() => setShowModal(false)}
        >
          <FaTimes size={22} />
        </button>
      </div>

      {/* Playlist Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {activePlaylist.songs && activePlaylist.songs.length > 0 ? (
          activePlaylist.songs.map((song, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="text-white">
                  {song.title || `Song ${index + 1}`}
                </span>
              </div>
              <button className="text-cyan-400 hover:text-cyan-300">
                <FaPlay />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-6">
            No songs in this playlist.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 flex justify-end space-x-3">
        <button
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white font-medium transition"
        >
          ▶️ Play All
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}     