import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function AP() {
  const [query, setQuery] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);
  const audioRef = useRef(null);

  const [songs] = useState([
    { id: 1, title: "Argument", album: "Single", year: 2020, audio: "/Artists/Ap/Argument.mp3" },
    { id: 2, title: "Brown Munde", album: "Single", year: 2020, audio: "/Artists/Ap/Brown munde.mp3" },
    { id: 3, title: "Chances", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/Chances.mp3" },
    { id: 4, title: "Deadly", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/Deadly.mp3" },
    { id: 5, title: "Droptop", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/Droptop.mp3" },
    { id: 6, title: "Excuses", album: "Single", year: 2020, audio: "/Artists/Ap/excuses.mp3" },
    { id: 7, title: "Foreigns", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/forighns.mp3" },
    { id: 8, title: "Majhail", album: "Single", year: 2020, audio: "/Artists/Ap/Majhal.mp3" },
    { id: 9, title: "Most Wanted", album: "Single", year: 2021, audio: "/Artists/Ap/most wanted.mp3" },
    { id: 10, title: "Saada Pyaar", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/sada pyar.mp3" },
    { id: 11, title: "Smoke", album: "Hidden Gems", year: 2021, audio: "/Artists/Ap/Smokie.mp3" },
    { id: 12, title: "Top Boy", album: "Hidden Gems", year: 2021, audio: "/Artists/Ap/top boy.mp3" },
    { id: 13, title: "After midnight", album: "Not By Chance", year: 2020, audio: "/Artists/Ap/tu-ta-sanu.mp3" },
  ]);

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
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
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
    setIsExpanded(false);
  };

  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };

  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  return (
    <div
      className={`p-6 min-h-screen text-white transition-all duration-300 ${
        isExpanded ? "backdrop-blur-lg bg-black/80" : "bg-gradient-to-br from-cyan-900 to-black"
      }`}
    >
      {/* Artist Info */}
      {!isExpanded && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <img
              src="/ap.jpg"
              alt="AP dhillon"
              className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
            />
            <div>
              <h1 className="text-4xl font-bold">AP dhillon</h1>
              <p className="mt-2 text-gray-200 max-w-lg">
                AP Dhillon is a Canadian-Indian singer, rapper, and songwriter known
                for Punjabi hit tracks like "Brown Munde" and "Excuses".
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
          <div className="bg-white/10 p-4 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Songs</h2>
            <ul className="space-y-3">
              {filteredSongs.map((song, index) => (
                <li
                  key={song.id}
                  className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center ${
                    currentSongIndex === index ? "bg-black text-white" : "bg-white/5 hover:bg-white/20"
                  }`}
                  onClick={() => {
                    setCurrentSongIndex(index);
                    setTimeout(() => {
                      audioRef.current.play();
                      setIsPlaying(true);
                    }, 100);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span>{song.title}</span>
                    <span className="text-sm text-gray-300">
                      {song.album} • {song.year}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song.id);
                    }}
                    className="ml-4 text-red-500 hover:scale-110 transition"
                  >
                    {likedSongs.includes(song.id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                  </button>
                </li>
              ))}
              {filteredSongs.length === 0 && (
                <li className="text-gray-300 p-3">No songs found.</li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Player Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
          isExpanded ? "h-full flex flex-col justify-center items-center bg-black/90 backdrop-blur-lg" : "bg-black/80 backdrop-blur-lg cursor-pointer"
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {filteredSongs[currentSongIndex] && (
          <>
            {!isExpanded ? (
              <div className="w-full">
                {/* Song Info & Controls */}
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-sm">{filteredSongs[currentSongIndex].title}</div>
                    <div className="text-xs text-gray-400">{filteredSongs[currentSongIndex].album}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={(e) => { e.stopPropagation(); playPrev(); }}>
                      <FaStepBackward size={20} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); playPause(); }}
                      className="bg-white/10 p-3 rounded-full hover:bg-gray-600"
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); playNext(); }}>
                      <FaStepForward size={20} />
                    </button>
                  </div>
                </div>
                {/* ✅ Progress bar in compact mode */}
                <div className="flex items-center gap-2 w-full">
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
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-xs text-gray-300">{formatTime(duration)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center w-full relative">
                <button onClick={closePlayer} className="absolute top-4 right-4 text-red-500">
                  <FaTimes size={24} />
                </button>
                <img
                  src="/ap2.jpg"
                  alt="cover"
                  className="w-62 h-60 mx-auto rounded-2xl shadow-2xl mb-6"
                />
                <h2 className="text-2xl font-bold">{filteredSongs[currentSongIndex].title}</h2>
                <p className="text-gray-400 mb-6">{filteredSongs[currentSongIndex].album}</p>

                {/* Controls */}
                <div className="flex justify-center items-center gap-6 mb-6">
                  <button onClick={playPrev}>
                    <FaStepBackward size={30} />
                  </button>
                  <button
                    onClick={playPause}
                    className="bg-white/10 p-6 rounded-full hover:bg-gray-600"
                  >
                    {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
                  </button>
                  <button onClick={playNext}>
                    <FaStepForward size={30} />
                  </button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 w-96 mx-auto">
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
                    className="w-full accent-cyan-500"
                  />
                  <span className="text-xs text-gray-300">{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </>
        )}
        <audio ref={audioRef} src={filteredSongs[currentSongIndex]?.audio} />
      </div>
    </div>
  );
}
