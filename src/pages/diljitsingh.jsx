import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function Diljit() {
const [songs] = useState([
  { id: 1, title: "Born To Shine", album: "G.O.A.T.", year: 2020, audio: "/Artists/diljit/born to shine.mp3" },
  { id: 2, title: "Do You Know", album: "Do You Know (Single)", year: 2016, audio: "/Artists/diljit/do you know.mp3" },
  { id: 3, title: "GOAT", album: "G.O.A.T.", year: 2020, audio: "/Artists/diljit/goat.mp3" },
  { id: 4, title: "Clash", album: "G.O.A.T.", year: 2020, audio: "/Artists/diljit/Clash.mp3" },
  { id: 5, title: "Caviar", album: "MoonChild Era", year: 2021, audio: "/Artists/diljit/cavior.mp3" },
  { id: 6, title: "Feel My Love", album: "Back 2 Basics", year: 2012, audio: "/Artists/diljit/feel my love.mp3" },
  { id: 7, title: "Vibe (ft. Intense)", album: "MoonChild Era", year: 2021, audio: "/Artists/diljit/Intense-Vibe.mp3" },
  { id: 8, title: "Gabru Nu", album: "Back 2 Basics", year: 2012, audio: "/Artists/diljit/Gabru-nu.mp3" },
  { id: 9, title: "Lemonade", album: "Drive Thru", year: 2022, audio: "/Artists/diljit/Leamand.mp3" },
  { id: 10, title: "Lehanga", album: "Lehanga (Single)", year: 2019, audio: "/Artists/diljit/Leahnga.mp3" },
  { id: 11, title: "Jatt Da Pyaar", album: "Back 2 Basics", year: 2012, audio: "/Artists/diljit/jutt da pyar.mp3" },
  { id: 12, title: "Jatt Vailly Ho Gya", album: "Single", year: 2014, audio: "/Artists/diljit/jutt valey hogya.mp3" },
  { id: 13, title: "Lover", album: "MoonChild Era", year: 2021, audio: "/Artists/diljit/Lover.mp3" },
  { id: 14, title: "Peaches (ft. Anne-Marie)", album: "Drive Thru", year: 2022, audio: "/Artists/diljit/peaches.mp3" },
  { id: 15, title: "Raat Di Gedi (ft. Neeru Bajwa)", album: "Single", year: 2017, audio: "/Artists/diljit/raat de gedi.mp3" },
  { id: 16, title: "Thug Life", album: "G.O.A.T.", year: 2020, audio: "/Artists/diljit/Thug life.mp3" },
  { id: 17, title: "Welcome To My Hood", album: "Single", year: 2020, audio: "/Artists/diljit/Welcome.mp3" },
  { id: 18, title: "World Tour", album: "Back 2 Basics", year: 2012, audio: "/Artists/diljit/world tour.mp3" },
]);

     const [query, setQuery] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
    const [likedSongs, setLikedSongs] = useState([]); // store liked song IDs

  const audioRef = useRef(null);

  // Format seconds → mm:ss
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

    const setAudioData = () => {
      setDuration(audio.duration);
    };

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
  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };
  // Filter songs
  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/diljit.webp"
          alt=""
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">Diljit Singh</h1>
          <p className="mt-2 text-gray-200 max-w-lg">
            AP Dhillon is a Canadian-Indian singer, rapper, and songwriter known
            for Punjabi hit tracks like "Brown Munde" and "Excuses". His music
            blends Punjabi lyrics with modern hip-hop and R&B vibes.
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
              className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center ${currentSongIndex === index
                  ? "bg-black text-white"
                  : "bg-white/5 hover:bg-white/20"
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
                onClick={() => toggleLike(song.id)}
                className="ml-4 text-red-500 hover:scale-110 transition"
              >
                {likedSongs.includes(song.id) ? (
                  <FaHeart size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>
            </li>
          ))}
          {filteredSongs.length === 0 && (
            <li className="text-gray-300 p-3">No songs found.</li>
          )}
        </ul>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <button onClick={closePlayer} className="text-red-500">
            <FaTimes size={20} />
          </button>
          <div className="flex items-center gap-4">
            <button onClick={playPrev}>
              <FaStepBackward size={20} />
            </button>
            <button
              onClick={playPause}
              className="bg-white/10 p-3 rounded-full hover:bg-gray-600"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext}>
              <FaStepForward size={20} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          {filteredSongs[currentSongIndex] && (
            <>
              <div className="text-sm mb-1">
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
                  className="w-full"
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
