import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaTimes } from "react-icons/fa";

export default function AfsanaKhan() {
  const [songs] = useState([
    { id: 1, title: "khalija", album: "Zeher", year: 2008, audio: "/Artists/Afsana-khan/khalija.mp3" },
    { id: 2, title: "Mohat ke kabil..", album: "Bol", year: 2004, audio: "/Artists/Afsana-khan/mohabat ke kabil.mp3" },
        { id: 2, title: "dhere dhere sa", album: "Bol", year: 2004, audio: "/Artists/atif-aslam/tera hua.mp3" },

    { id: 3, title: "hona tha pyar", album: "Bol", year: 2011, audio: "/Artists/atif-aslam/hona tha pyar.mp3" },
    { id: 4, title: "Tu Jaane Na", album: "Ajab Si", year: 2008, audio: "/audio/tu-jaane-na.mp3" },
    // { id: 5, title: "dekhte dekhte", album: "Batti Gul Meter Chalu", year: 2018, audio: "/Artists/atif-aslam-dekhte-dekhte.mp3" },
    // { id: 6, title: "Pehli Dafa", album: "Single", year: 2016, audio: "/audio/pehli-dafa.mp3" },
    // { id: 7, title: "Dil Diyan Gallan", album: "Tiger Zinda Hai", year: 2017, audio: "/Artists/atif-aslam/dil dya gallan.mp3" },
    // { id: 8, title: "aj dil dukha ha", album: "Doorie", year: 2006, audio: "/Artists/atif-aslam/aj dil dukha ha.mp3" },
    // { id: 9, title: "O Saathi", album: "Single", year: 2018, audio: "/audio/o-saathi.mp3" },
    // { id: 10, title: "Tajdare-Haram", album: "Coke studio", year: 2015, audio: "/Artists/atif-aslam/Tajdare-Haram.mp3" },
  ]);

  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(() => {
    try {
      const raw = localStorage.getItem("liked-afsana");
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
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("ended", handleEnd);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("ended", handleEnd);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("liked-afsana", JSON.stringify(liked));
  }, [liked]);

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.album.toLowerCase().includes(query.toLowerCase()) ||
    String(s.year).includes(query)
  );

  const playSong = (song) => {
    const audio = audioRef.current;

    // If clicking the same song while playing → pause
    if (current && current.id === song.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    // If clicking the same song while paused → play
    if (current && current.id === song.id && !isPlaying) {
      audio.play();
      setIsPlaying(true);
      return;
    }
    // Play a new song
    audio.src = song.audio;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setCurrent(song);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Artist Profile */}
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden md:flex md:items-center">
        <div className="md:w-1/3 p-6 flex justify-center">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-2xl">
            <img src="/afsana.jfif" alt="Afsana Khan" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl md:text-4xl font-bold">Afsana Khan</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Afsana Khan is a Punjabi playback singer and songwriter known for her powerful vocals and energetic performances. 
            She blends Punjabi folk with modern beats, making her a standout voice in contemporary music.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Origin:</strong> <span>India</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Active:</strong> <span>2012 — present</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Genres:</strong> <span>Punjabi Pop -Romantic & Sad Songs</span>
            </span>
          </div>

          {/* Search */}
          <div className="mt-6">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search songs, album or year..."
              className="w-full md:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </div>

      {/* Songs List */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Songs</h2>
          <div className="text-sm text-gray-500">{filtered.length} results</div>
        </div>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <li key={s.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-medium">
                  {s.title.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.album} • {s.year}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => playSong(s)} className="px-3 py-2 rounded-md border hover:bg-gray-50">
                  {current && current.id === s.id && isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => toggleLike(s.id)}
                  className={`px-3 py-2 rounded-md border ${liked.includes(s.id) ? "bg-red-50 border-red-200" : "hover:bg-gray-50"}`}
                >
                  {liked.includes(s.id) ? "♥ Liked" : "♡ Like"}
                </button>
              </div>
            </li>
          ))}
        </ul>
   {/* Player Modal */}
        {current && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
              <button
                onClick={() => {
                  audioRef.current.pause();
                  setCurrent(null);
                  setIsPlaying(false);
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg mb-4">
                  <img src="/afsana.jfif" alt={current.title} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-bold">{current.title}</h2>
                <p className="text-gray-500 text-sm">{current.album} • {current.year}</p>
              </div>
              {/* Progress Bar */}
              <div className="mt-6">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={progress}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    setProgress(e.target.value);
                  }}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              {/* Controls */}
              <div className="mt-6 flex items-center justify-center gap-6">
                <button onClick={handlePrevSong} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FaStepBackward size={18} />
                </button>
                <button onClick={() => playSong(current)} className="p-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 shadow-lg">
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>
                <button onClick={handleNextSong} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                  <FaStepForward size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
