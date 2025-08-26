import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaTimes } from "react-icons/fa";

export default function Playlists() {
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Load playlist songs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("playlist");
    if (stored) {
      setPlaylistSongs(JSON.parse(stored));
    }
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const nextSong = () => {
    if (currentSong) {
      const currentIndex = playlistSongs.findIndex((s) => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlistSongs.length;
      setCurrentSong(playlistSongs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = playlistSongs.findIndex((s) => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + playlistSongs.length) % playlistSongs.length;
      setCurrentSong(playlistSongs[prevIndex]);
    }
  };

  const removeFromPlaylist = (id) => {
    const updated = playlistSongs.filter((s) => s.id !== id);
    setPlaylistSongs(updated);
    localStorage.setItem("playlist", JSON.stringify(updated));
    if (currentSong?.id === id) {
      setCurrentSong(null);
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Playlist</h1>

      {playlistSongs.length === 0 ? (
        <p className="text-gray-400">No songs in playlist yet. Add from 3 dots menu!</p>
      ) : (
        <ul className="space-y-3">
          {playlistSongs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
            >
              <div>
                <h2 className="font-semibold">{song.title}</h2>
                <p className="text-sm text-gray-400">
                  {song.album} • {song.year}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => playSong(song)}
                  className="px-3 py-1 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  onClick={() => removeFromPlaylist(song.id)}
                  className="px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Music Controls */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-between items-center">
          <button onClick={prevSong}>
            <FaStepBackward />
          </button>
          <div className="text-center">
            <h2 className="font-semibold">{currentSong.title}</h2>
            <p className="text-sm text-gray-400">
              {currentSong.album} • {currentSong.year}
            </p>
          </div>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={nextSong}>
            <FaStepForward />
          </button>
          <audio ref={audioRef} src={currentSong.audio} onEnded={nextSong} />
        </div>
      )}
    </div>
  );
}
