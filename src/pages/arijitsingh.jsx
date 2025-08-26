import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";

export default function Arijitsingh() {
  const [songs] = useState([
    { id: 1, title: "Akhiyan Milawanga", album: "Single", year: 2020, audio: "/Artists/Arijit-singh/Akhyan milawanga.mp3" },
    { id: 2, title: "Teri Meri Baaton Ka", album: "Single", year: 2019, audio: "/Artists/Arijit-singh/hua rai.mp3" },
    { id: 3, title: "Koi Tum Jaisa Kahan", album: "Single", year: 2021, audio: "/Artists/Arijit-singh/jo tum agay.mp3" },
    { id: 4, title: "Jo Tum Saath Ho", album: "Tamasha", year: 2015, audio: "/Artists/Arijit-singh/jo tum sath ho.mp3", },
    { id: 5, title: "Kya Hua Tera Wada", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/kya hua.mp3" },
    { id: 6, title: "Aaja Mahi", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/mahi aaja.mp3" },
    { id: 7, title: "Mera Hona", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/mera hona.mp3" },
    { id: 8, title: "Bheeg Jaunga / Naina", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/naina.mp3" },
    { id: 9, title: "Neki Ki Raahon Pe Chal", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/neki ki rah.mp3" },
    { id: 10, title: "Zaalima", album: "Raees", year: 2017, audio: "/Artists/Arijit-singh/zalima-raees.mp3" },
    { id: 11, title: "Tujhse Juda Juda", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/tujh sa juda juda.mp3" },
    { id: 12, title: "Teri Meri Kahani", album: "Gabbar Is Back", year: 2015, audio: "/Artists/Arijit-singh/teri meri kahani.mp3" },
    { id: 13, title: "Tere Bina", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/tere bina.mp3" },
    { id: 14, title: "O Re Piya (Cover)", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/tijh/t/oovsoniya.mp3" },
    { id: 15, title: "Dil Jhoom", album: "Gadar 2", year: 2023, audio: "/Artists/Arijit-singh/Dil jhoom.mp3" },
    { id: 16, title: "Dil Razi Hai", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/dil razi ha.mp3" },
    { id: 17, title: "Bas Tu Hi", album: "Single", year: 2022, audio: "/Artists/Arijit-singh/bs tu hi.mp3" },
  ]);
                
  const [query, setQuery] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([])
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [viewPlaylist, setViewPlaylist] = useState(null);
const [popup, setPopup] = useState({ show: false, message: "" });

  const audioRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("playlists");
    if (saved) setPlaylists(JSON.parse(saved));
  }, []);

  const savePlaylists = (updated) => {
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const setAudioData = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, []);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % filteredSongs.length);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const playPrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    setCurrentSongIndex(0);
    setProgress(0);
    setCurrentTime(0);
  };

  
    // Function to show popup
const showPopup = (message) => {
  setPopup({ show: true, message });
  setTimeout(() => {
    setPopup({ show: false, message: "" });
  }, 2000); // Auto close in 2 sec
};


  // Update addSongToPlaylist
const addSongToPlaylist = (plName, song) => {
  const updated = playlists.map((pl) => {
    if (pl.name === plName) {
      const already = (pl.songs || []).some((s) => s.id === song.id);
      if (already) {
        showPopup("⚠️ Song already exists in playlist!");
        return pl; // skip duplicate
      }
      return { ...pl, songs: [...(pl.songs || []), song] };
    }
    return pl;
  });
  
    savePlaylists(updated);

 
  if (viewPlaylist && viewPlaylist.name === plName) {
    const refreshed = updated.find((p) => p.name === plName);
    setViewPlaylist(refreshed);
  }
  setIsModalOpen(false);
};


  const handleRemoveSong = (plName, songId) => {
    const updated = playlists.map((pl) =>
      pl.name === plName
        ? { ...pl, songs: (pl.songs || []).filter((s) => s.id !== songId) }
        : pl
    );
    savePlaylists(updated);

    if (viewPlaylist && viewPlaylist.name === plName) {
      const refreshed = updated.find((p) => p.name === plName);
      setViewPlaylist(refreshed);
    }
  };



  const handleDeletePlaylist = (plName) => {
    const updated = playlists.filter((pl) => pl.name !== plName);
    savePlaylists(updated);
    setViewPlaylist(null);
  };

  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-500 to-black min-h-screen text-white">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/arijit.webp"
          alt="Arijit"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">Arijit Singh</h1>
          <p className="mt-2 text-gray-200 max-w-lg">
            Arijit Singh is an Indian playback singer and music composer best known for
            his soulful voice in Bollywood hits like "Tum Hi Ho" and "Channa Mereya".
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, album or year..."
          className="w-full md:w-2/3 px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Song List */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <ul className="space-y-3">
          {filteredSongs.map((song, index) => (
            <li
              key={song.id}
              className={`p-3 rounded-lg transition ${currentSongIndex === index
                ? "bg-black text-white"
                : "bg-white/5 hover:bg-white/20"
                }`}
            >
              <div className="flex justify-between items-center">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setTimeout(() => {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }, 100);
                  }}
                >
                  <span>{song.title}</span>
                  <span className="ml-2 text-sm text-gray-300">
                    {song.album} • {song.year}
                  </span>
                </div>

                {/* 3 dots button */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === song.id ? null : song.id)}
                    className="p-2 rounded-full hover:bg-gray-700"
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpen === song.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-lg z-50">
                      <button
                        onClick={() => {
                          setSelectedSong(song);
                          setIsModalOpen(true);
                          setMenuOpen(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Add to Playlist
                      </button>


                    </div>
                  )}



                </div>
              </div>
            </li>
          ))}
          {filteredSongs.length === 0 && (
            <li className="text-gray-300 p-3">No songs found.</li>
          )}
        </ul>
      </div>

      {/* Playlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">

            {viewPlaylist ? (
              <>
                <h2 className="text-xl font-bold mb-4">{viewPlaylist.name} - Songs</h2>
                {viewPlaylist.songs && viewPlaylist.songs.length > 0 ? (
                  <ul className="space-y-2 mb-4">
                    {viewPlaylist.songs.map((song, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 bg-white/10 rounded-lg flex justify-between items-center"
                      >
                        <span>{song.title}</span>
                        <button
                          onClick={() => handleRemoveSong(viewPlaylist.name, song.id)}
                          className="text-red-500 text-sm ml-2"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mb-4">No songs in this playlist</p>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={() => setViewPlaylist(null)}
                    className="px-4 py-2 bg-gray-600 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => handleDeletePlaylist(viewPlaylist.name)}
                    className="px-4 py-2 bg-red-600 rounded-lg"
                  >
                    Delete Playlist
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Add to Playlist</h2>
                {playlists.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {playlists.map((pl, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <button
                          onClick={() => {
                            if (selectedSong) {
                              addSongToPlaylist(pl.name, selectedSong);
                            }
                          }}


                          className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-left"
                        >
                          {pl.name}
                        </button>
                        <button
                          onClick={() => setViewPlaylist(pl)}
                          className="ml-2 px-3 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setShowCreate(true)}
                      className="w-full px-4 py-2 mt-2 bg-cyan-600 rounded-lg hover:bg-cyan-700"
                    >
                      + Add New
                    </button>
                  </div>
                ) : (
                  <p className="mb-4 text-gray-300">No playlist available</p>
                )}
                {(playlists.length === 0 || showCreate) && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Create Playlist</h3>
                    <input
                      type="text"
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      placeholder="Enter playlist name..."
                      className="w-full px-3 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
                    />
                    <div className="flex justify-end mt-3 space-x-2">
                      <button
                        onClick={() => {
                          setShowCreate(false);
                          setPlaylistName("");
                        }}
                        className="px-4 py-2 bg-gray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (playlistName.trim() === "") return;
                          savePlaylists([
                            ...playlists,
                            { name: playlistName, songs: [selectedSong] },
                          ]);
                          setPlaylistName("");
                          setShowCreate(false);
                          setIsModalOpen(false);
                        }}
                        className="px-4 py-2 bg-cyan-500 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {/* popupshow---song alredy exists */}
      {popup.show && (
  <div className="fixed top-12 right-16 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg animate-fade-in-out z-[9999] ">
    {popup.message}
  </div>
)}

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg p-4 flex flex-col justify-between items-center">
        <div className="flex justify-between items-center">
          <button onClick={closePlayer} className="text-red-500 top-3 right-6 fixed  text-lg font-bold items-center rounded-full">
            <FaTimes size={20} />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={playPrev}>
              <FaStepBackward size={20} />
            </button>
            <button
              onClick={playPause}
              className="bg-cyan-500 p-3 rounded-full hover:bg-gray-600"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext}>
              <FaStepForward size={20} />
            </button>
          </div>
        </div>

        <div className="mt-3 w-full">
          {filteredSongs[currentSongIndex] && (
            <>
              <div className="text-md mb-5 justify-center items-center">
                {filteredSongs[currentSongIndex].title} •{" "}
                {filteredSongs[currentSongIndex].album}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300">{formatTime(currentTime)}</span>
                <input 
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => {
                    const newProgress = e.target.value;
                    setProgress(newProgress);
                    audioRef.current.currentTime =
                      (newProgress / 100) * audioRef.current.duration;
                  }}
                  className="w-full "
                />
                <span className="text-xs text-gray-300">{formatTime(duration)}</span>
              </div>
            </>
          )}
        </div>

        <audio ref={audioRef} src={filteredSongs[currentSongIndex]?.audio} />
      </div>
    </div>
  );
}
