import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
  FaEllipsisV,
  FaPlus,
} from "react-icons/fa";
import { artists } from "../data/artistsData";

export default function Artistssongs() {
  const { slug } = useParams();
  const artist = artists.find((a) => a.slug === slug);
  const songs = artist?.songs || [];

  const [query, setQuery] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ✅ Player visibility
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // ✅ Playlist states
  const [playlistName, setPlaylistName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [viewPlaylist, setViewPlaylist] = useState(null);

  // ✅ Feedback
  const [message, setMessage] = useState("");

  const audioRef = useRef(null);

  // ✅ Load playlists
  useEffect(() => {
    const saved = localStorage.getItem("playlists");
    if (saved) setPlaylists(JSON.parse(saved));
  }, []);

  const savePlaylists = (updated) => {
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
  };

  // ✅ Add song (no duplicate inside same playlist)
  const addSongToPlaylist = (playlistName, song) => {

    // const current = playlists.find(playlist => playlist?.name === playlistName)?.songs?.find(s => s?.audio === song?.audio);
    // console.log(current);


    const updated = playlists.map((pl) => {
      if (pl.name === playlistName) {
        const alreadyExists = pl.songs.find((s) => s.audio === song.audio);

        if (alreadyExists) {
          setMessage(`⚠️ "${song.title}" already in "${playlistName}"`);
          return pl;
        }
        setMessage(`✅ "${song.title}" added to "${playlistName}"`);
        return { ...pl, songs: [...pl.songs, song] };
      }
      return pl;
    });
    savePlaylists(updated);
  };

  const createPlaylist = () => {
    if (!playlistName.trim()) return;
    const exists = playlists.some(
      (pl) => pl.name.toLowerCase() === playlistName.toLowerCase()
    );
    if (exists) return setMessage("⚠️ Playlist already exists!");
    const updated = [...playlists, { name: playlistName, songs: [] }];
    savePlaylists(updated);
    setPlaylistName("");
    setMessage(`✅ Playlist "${playlistName}" created!`);
  };

  const handleRemoveSong = (playlistName, songId) => {
    const updated = playlists.map((pl) =>
      pl.name === playlistName
        ? { ...pl, songs: pl.songs.filter((s) => s.id !== songId) }
        : pl
    );
    savePlaylists(updated);

    const refreshed = updated.find((pl) => pl.name === playlistName);
    setViewPlaylist(refreshed || null);
  };

  const handleDeletePlaylist = (playlistName) => {
    const updated = playlists.filter((pl) => pl.name !== playlistName);
    savePlaylists(updated);
    if (viewPlaylist?.name === playlistName) setViewPlaylist(null);
    setMessage(`🗑️ Playlist "${playlistName}" deleted`);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // ✅ Filter songs
  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  //  Handle audio progress + auto play next
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const setAudioData = () => setDuration(audio.duration);

    const handleSongEnd = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", handleSongEnd);

    if (isPlayerOpen) audio.play().catch(() => { });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentSongIndex, isPlayerOpen]);

  //  Auto-hide toast after 3s
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const playPause = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % filteredSongs.length);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const playPrev = () => {
    setCurrentSongIndex(
      (prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length
    );
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
    setIsPlayerOpen(false);
  };

  if (!artist) return <div className="text-white p-6">❌ Artist not found</div>;

  return (
    <div
      className={`p-6 min-h-screen text-white bg-gradient-to-br ${artist.bgGradient}`}
    >
      {/*  Feedback Toast */}
      {message && (
        <div className="fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {message}
        </div>
      )}

      {/* ✅ Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={artist.image || "/default.jpg"}
          alt={artist.name}
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        
        <div>
          <h1 className="text-4xl font-bold">{artist.name}</h1>
          <p className="mt-2 text-gray-200 max-w-lg">{artist.bio}</p>
        </div>
      </div>

      {/* ✅ Search */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title, album or year..."
        className="w-full md:w-2/3 px-4 py-2 mb-4 rounded-lg border border-white/30 bg-white/10 text-white"
      />

      {/* ✅ Songs */}
      <div className="bg-white/10 p-4 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <ul className="space-y-3">
          {filteredSongs.map((song, index) => (
            <li
              key={song.id}
              className={`p-3 rounded-lg transition ${currentSongIndex === index && isPlayerOpen
                ? "bg-black text-white"
                : "bg-white/5 hover:bg-white/20"
                }`}
            >
              <div className="flex justify-between items-center">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setIsPlayerOpen(true);
                    setTimeout(() => {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }, 100);
                  }}
                >
                  <span>{song.title || "Untitled"}</span>
                  <span className="ml-2 text-sm text-gray-300">
                    {song.album} • {song.year}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedSong(song);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-full hover:bg-gray-700"
                >
                  <FaEllipsisV />
                </button>
              </div>
            </li>
          ))}
          {filteredSongs.length === 0 && (
            <li className="text-gray-300 p-3">No songs found.</li>
          )}
        </ul>
      </div>

      {/* ✅ Playlist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => {
                setIsModalOpen(false);
                setViewPlaylist(null);
              }}
            >
              <FaTimes size={20} />
            </button>

            {viewPlaylist ? (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {viewPlaylist.name} - Songs
                </h2>
                {viewPlaylist.songs.length > 0 ? (
                  <ul className="space-y-2 mb-4">
                    {viewPlaylist.songs.map((song, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 bg-white/10 rounded-lg flex justify-between items-center"
                      >
                        <span>{song.title}</span>
                        <button
                          onClick={() =>
                            handleRemoveSong(viewPlaylist.name, song.id)
                          }
                          className="text-red-500 text-sm ml-2"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 mb-4">
                    No songs in this playlist
                  </p>
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
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span>{idx + 1}. {pl.name}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (selectedSong)
                                addSongToPlaylist(pl.name, selectedSong);
                            }}
                            className="px-2 py-1 bg-green-600 rounded-full hover:bg-green-700"
                          >
                            <FaPlus />
                          </button>
                          <button
                            onClick={() => setViewPlaylist(pl)}
                            className="px-3 py-1 bg-cyan-600 rounded-lg hover:bg-cyan-700 text-sm"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mb-4 text-gray-300">No playlist available</p>
                )}

                {/* Create playlist */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Create Playlist</h3>
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter playlist name..."
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
                  />
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-600 rounded-lg"
                    >
                      Close
                    </button>
                    <button
                      onClick={createPlaylist}
                      className="px-4 py-2 bg-cyan-600 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ Player */}
      {isPlayerOpen && filteredSongs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 p-4 flex flex-col">
          <button
            onClick={closePlayer}
            className="text-red-500 absolute top-3 right-6"
          >
            <FaTimes size={20} />
          </button>

          <div className="flex justify-center items-center gap-6 mb-3">
            <button onClick={playPrev}>
              <FaStepBackward size={20} />
            </button>
            <button
              onClick={playPause}
              className="bg-cyan-500 p-3 rounded-full"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext}>
              <FaStepForward size={20} />
            </button>
          </div>

          <div className="text-center mb-2 text-sm">
            {filteredSongs[currentSongIndex]?.title} •{" "}
            {filteredSongs[currentSongIndex]?.album}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-300">
            <span>{formatTime(currentTime)}</span>
            <div
              className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newTime = (clickX / rect.width) * duration;
                audioRef.current.currentTime = newTime;
              }}
            >
              <div
                className="h-full bg-cyan-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          <audio ref={audioRef} src={filteredSongs[currentSongIndex]?.audio} />
        </div>
      )}
    </div>
  );
}
