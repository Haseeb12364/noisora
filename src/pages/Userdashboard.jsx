import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaBars, FaTimes, FaPlay, FaPause } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Userdashboard() {
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const menuItems = ["Overview", "Albums", "Folders", "Playlists", "Settings"];

  useEffect(() => {
    const stored = localStorage.getItem("playlists");
    if (stored) setSavedPlaylists(JSON.parse(stored));
  }, []);

  const playSong = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setTimeout(() => audioRef.current.play(), 100);
    }
  };

  const handleNextSong = () => {
    if (!selectedPlaylist || !currentSong) return;
    const index = selectedPlaylist.songs.findIndex((s) => s.id === currentSong.id);
    const nextIndex = (index + 1) % selectedPlaylist.songs.length;
    const nextSong = selectedPlaylist.songs[nextIndex];
    setCurrentSong(nextSong);
    setTimeout(() => audioRef.current.play(), 100);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (!selectedPlaylist || !currentSong) return;
    const index = selectedPlaylist.songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (index - 1 + selectedPlaylist.songs.length) % selectedPlaylist.songs.length;
    const prevSong = selectedPlaylist.songs[prevIndex];
    setCurrentSong(prevSong);
    setTimeout(() => audioRef.current.play(), 100);
    setIsPlaying(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-black text-white min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <button
            className="md:hidden hover:text-gray-400"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-400">
            <FaSearch size={18} />
          </button>
        </div>
      </header>

      {/* User Info */}
      <section className="px-6 py-6 flex flex-col items-center text-center">
        <img src="nain.jpeg" alt="User Avatar" className="h-28 w-28 rounded-full" />
        <h2 className="text-3xl font-bold mt-4">Haseeb Ahmad</h2>
        <p className="text-gray-400">Premium Member</p>
      </section>

      {/* Desktop Menu */}
      <nav className="hidden md:flex justify-center gap-6 px-4 py-4 border-b border-gray-800">
        {menuItems.map((item) =>
          item === "Playlists" ? (
            <Link
              key={item}
              to="/playlists"
              className="px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {item}
            </Link>
          ) : (
            <button
              key={item}
              className="px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              {item}
            </button>
          )
        )}
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <nav className="md:hidden px-4 py-3 border-b border-gray-800">
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) =>
              item === "Playlists" ? (
                <Link
                  key={item}
                  to="/playlists"
                  className="px-3 py-2 rounded-md hover:bg-gray-800 text-left transition"
                >
                  {item}
                </Link>
              ) : (
                <button
                  key={item}
                  className="px-3 py-2 rounded-md hover:bg-gray-800 text-left transition"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </nav>
      )}

      {/* Your Playlists */}
      <section className="px-6 py-6">
        <h3 className="text-xl font-bold mb-4">Your Playlists</h3>
        {savedPlaylists.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedPlaylists.map((pl, idx) => {
              const uniqueArtists = [...new Set(pl.songs.map((s) => s.artist))];
              let coverImage;
              if (uniqueArtists.length === 1) coverImage = pl.songs[0]?.image;

              return (
                <div
                  key={idx}
                  className="bg-white text-black font-bold rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer"
                  onClick={() => setSelectedPlaylist(pl)}
                >
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={pl.name}
                      className="rounded-md mb-2"
                    />
                  ) : (
                    <div className="grid grid-cols-2 gap-1 mb-2">
                      {pl.songs.slice(0, 4).map((song, i) => (
                        <img
                          key={i}
                          src={song.image}
                          alt={song.artist}
                          className="rounded-md"
                        />
                      ))}
                    </div>
                  )}
                  <p className="font-semibold">{pl.name}</p>
                  <p className="text-sm text-gray-400">{pl.songs.length} songs</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400">No playlists created yet.</p>
        )}
      </section>

      {/* Playlist Songs */}
      {selectedPlaylist && (
        <section className="px-6 py-6">
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="text-red-400 hover:text-white text-2xl mb-4"
          >
            ✖ Close
          </button>
          <h3 className="text-xl font-bold mb-4">{selectedPlaylist.name}</h3>
          <div className="space-y-2">
            {selectedPlaylist.songs.map((song, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-12 w-12 rounded-md"
                  />
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.artist}</p>
                  </div>
                </div>

                <button
                  onClick={() => playSong(song)}
                  className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded-full"
                >
                  {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <audio ref={audioRef} src={currentSong?.audio} onEnded={handleNextSong} />

      {/* Modal Player */}
      {currentSong && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl w-96 text-center relative">
            <button
              onClick={() => {
                audioRef.current.pause();
                setIsPlaying(false);
                setCurrentSong(null);
              }}
              className="absolute top-2 right-3 text-red-400 hover:text-white text-2xl"
            >
              ✖
            </button>

            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="h-40 w-40 mx-auto rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{currentSong.title}</h3>
            <p className="text-gray-400">{currentSong.artist}</p>

            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={handlePrevSong}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full"
              >
                ⏮
              </button>
              <button
                onClick={() => playSong(currentSong)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-full"
              >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
              </button>
              <button
                onClick={handleNextSong}
                className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full"
              >
                ⏭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
