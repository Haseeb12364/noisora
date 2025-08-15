import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";

export default function AtifAslam() {
  const [songs] = useState([
    { id: 1, title: "Umeedon Ke", album: "Zeher", year: 2008, audio: "/audio/umeedon ki.mp3" },
    { id: 2, title: "Dheere Dheere Sa", album: "Bol", year: 2004, audio: "/Artists/atif-aslam/tera hua.mp3" },
    { id: 3, title: "Hona Tha Pyar", album: "Bol", year: 2011, audio: "/Artists/atif-aslam/hona tha pyar.mp3" },
    { id: 4, title: "Tu Jaane Na", album: "Ajab Si", year: 2008, audio: "/audio/tu-jaane-na.mp3" },
    { id: 5, title: "Dekhte Dekhte", album: "Batti Gul Meter Chalu", year: 2018, audio: "/Artists/atif-aslam-dekhte-dekhte.mp3" },
    { id: 6, title: "Pehli Dafa", album: "Single", year: 2016, audio: "/audio/pehli-dafa.mp3" },
    { id: 7, title: "Dil Diyan Gallan", album: "Tiger Zinda Hai", year: 2017, audio: "/Artists/atif-aslam/dil dya gallan.mp3" },
    { id: 8, title: "Aj Dil Dukha Hai", album: "Doorie", year: 2006, audio: "/Artists/atif-aslam/aj dil dukha ha.mp3" },
    { id: 9, title: "O Saathi", album: "Single", year: 2018, audio: "/audio/o-saathi.mp3" },
    { id: 10, title: "Tajdar-e-Haram", album: "Coke Studio", year: 2015, audio: "/Artists/atif-aslam/Tajdare-Haram.mp3" },
  ]);

  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(() => {
    try {
      const raw = localStorage.getItem("liked-atif");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnd = () => setIsPlaying(false);
    const updateProgress = () => setProgress(audio.currentTime);
    audio.addEventListener("ended", handleEnd);
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("ended", handleEnd);
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("liked-atif", JSON.stringify(liked));
  }, [liked]);

  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  const playSong = (song) => {
    const audio = audioRef.current;
    if (current && current.id === song.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    if (current && current.id === song.id && !isPlaying) {
      audio.play();
      setIsPlaying(true);
      return;
    }
    audio.src = song.audio;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setCurrent(song);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === current.id);
    if (currentIndex < songs.length - 1) {
      playSong(songs[currentIndex + 1]);
    }
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((s) => s.id === current.id);
    if (currentIndex > 0) {
      playSong(songs[currentIndex - 1]);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 font-sans">
      {/* Artist Info */}
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden flex flex-col md:flex-row md:items-center border border-white/30">
        {/* Left: Image */}
        <div className="w-full md:w-1/3 p-6 flex justify-center">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white/20">
            <img
              src="/Atif Aslam.jpg"
              alt="Atif Aslam"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-2/3 p-6 text-white">
          <h1 className="text-4xl font-extrabold">Atif Aslam</h1>
          <p className="mt-3 text-sm md:text-base text-white/80 leading-relaxed">
            Pakistani playback singer and actor with a soulful voice and a versatile range. Known globally for his
            Bollywood and Pakistani hits. Explore his timeless collection below.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span className="px-3 py-1 rounded-full bg-white/20">Origin: Pakistan</span>
            <span className="px-3 py-1 rounded-full bg-white/20">Active: 2003 — Present</span>
            <span className="px-3 py-1 rounded-full bg-white/20">Genres: Pop, Rock, Filmi</span>
          </div>

          {/* Search */}
          <div className="mt-5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search songs, album or year..."
              className="w-full md:w-2/3 px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Songs List */}
      <section className="mt-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-semibold text-white">Popular Songs</h2>
          <div className="text-sm text-white/60">{filtered.length} results</div>
        </div>

        <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <li
              key={s.id}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-lg p-4 rounded-2xl shadow-lg flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-200 to-black text-white flex items-center justify-center font-bold">
                  {s.title
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium text-white truncate">{s.title}</div>
                  <div className="text-xs text-white/60">{s.album} • {s.year}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => playSong(s)}
                  className="px-3 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm"
                >
                  {current && current.id === s.id && isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => toggleLike(s.id)}
                  className={`px-3 py-1.5 rounded-full border text-sm ${
                    liked.includes(s.id)
                      ? "bg-red-500 border-red-500 text-white"
                      : "border-white/40 text-white hover:bg-white/20"
                  }`}
                >
                  {liked.includes(s.id) ? "♥" : "♡"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Player Overlay */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundImage: `url('/Atif Aslam.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl relative animate-fadeIn">
            {/* Close */}
            <button
              onClick={() => {
                audioRef.current.pause();
                setCurrent(null);
                setIsPlaying(false);
              }}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <FaTimes size={20} />
            </button>

            {/* Song Title */}
            <h2 className="text-2xl font-bold">{current.title}</h2>
            <p className="text-white/60">{current.album} • {current.year}</p>

            {/* Disc */}
            <div
              className="mx-auto mt-6 w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-lg"
              style={{
                animation: isPlaying ? "spin 8s linear infinite" : "none",
              }}
            >
              <img src="/Atif Aslam.jpg" alt={current.title} className="w-full h-full object-cover" />
            </div>

            {/* Progress */}
            <div className="mt-6">
              <input
                type="range"
                min="0"
                max={audioRef.current.duration || 0}
                value={progress}
                onChange={(e) => {
                  audioRef.current.currentTime = e.target.value;
                }}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(audioRef.current.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                onClick={handlePrevSong}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20"
              >
                <FaStepBackward size={18} />
              </button>
              <button
                onClick={() => playSong(current)}
                className="p-4 bg-cyan-500 rounded-full hover:bg-pink-600 shadow-lg"
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button
                onClick={handleNextSong}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20"
              >
                <FaStepForward size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
