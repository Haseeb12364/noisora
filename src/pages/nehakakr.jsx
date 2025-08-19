import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";

export default function Neha() {
  const [songs] = useState([
    { id: 1, title: "Ankh Marey", album: "Simmba", year: 2018, audio: "/Artists/neha-kakr/Ankh mare.mp3" },
    { id: 2, title: "Badri Ki Dulhania", album: "Badrinath Ki Dulhania", year: 2017, audio: "/Artists/neha-kakr/badri ki dulhania.mp3" },
    { id: 3, title: "Chamma Chamma", album: "Fraud Saiyaan", year: 2019, audio: "/Artists/neha-kakr/Chama chama.mp3" },
    { id: 4, title: "Dil Ko Karaar Aaya", album: "Single", year: 2020, audio: "/Artists/neha-kakr/dil ko karar.mp3" },
    { id: 5, title: "Dilbar", album: "Satyameva Jayate", year: 2018, audio: "/Artists/neha-kakr/Dilbar.mp3" },
    { id: 6, title: "Gali Gali", album: "KGF", year: 2018, audio: "/Artists/neha-kakr/gali gali mn.mp3" },
    { id: 7, title: "Goa Beach", album: "Single", year: 2020, audio: "/Artists/neha-kakr/Goa beach.mp3" },
    { id: 8, title: "Garmi", album: "Street Dancer 3D", year: 2020, audio: "/Artists/neha-kakr/GArmi.mp3" },
    { id: 9, title: "Hook Up Song", album: "Student of the Year 2", year: 2019, audio: "/Artists/neha-kakr/hook up.mp3" },
    { id: 10, title: "Kala Chashma", album: "Baar Baar Dekho", year: 2016, audio: "/Artists/neha-kakr/kala chashma.mp3" },
    { id: 11, title: "Khuda Bhi Jab", album: "Bhushan Kumar’s Single", year: 2017, audio: "/Artists/neha-kakr/khuda b jab.mp3" },
    { id: 12, title: "Laila Main Laila", album: "Raees", year: 2017, audio: "/Artists/neha-kakr/laila o laila.mp3" },
    { id: 13, title: "Coca Cola (Luka Chuppi)", album: "Luka Chuppi", year: 2019, audio: "/Artists/neha-kakr/luka chupi.mp3" },
    { id: 14, title: "Mile Ho Tum (Mahi Ve)", album: "Fever", year: 2016, audio: "/Artists/neha-kakr/Mahi we.mp3" },
    { id: 15, title: "O Saki Saki", album: "Batla House", year: 2019, audio: "/Artists/neha-kakr/o saki saki.mp3" },
    { id: 16, title: "Pachtaoge", album: "Single", year: 2019, audio: "/Artists/neha-kakr/pochda hi ni.mp3" },
    { id: 17, title: "Qaafirana", album: "Kedarnath", year: 2018, audio: "/Artists/neha-kakr/Qafirana.mp3" },
    { id: 18, title: "Saiyaan Ji", album: "Single", year: 2021, audio: "/Artists/neha-kakr/sayan ji.mp3" },
    { id: 19, title: "Superstar", album: "Single", year: 2020, audio: "/Artists/neha-kakr/Suoerstar.mp3" },
    { id: 20, title: "Tera Suit", album: "Single", year: 2021, audio: "/Artists/neha-kakr/Tera suit.mp3" },
    { id: 21, title: "Teri Aankhon Mein", album: "Single", year: 2020, audio: "/Artists/neha-kakr/teri ankhon mn.mp3" },
    { id: 21, title: "Teri Aankhon Mein", album: "Single", year: 2020, audio: "/Artists/neha-kakr/niklay current.mp3" },
    { id: 21, title: "Teri Aankhon Mein", album: "Single", year: 2020, audio: "/Artists/neha-kakr/kla sona ni.mp3" },
    { id: 22, title: "Tera Ghata (Reprise)", album: "Single", year: 2018, audio: "/Artists/neha-kakr/teri ghta.mp3" },
    { id: 23, title: "Yaad Piya Ki Aane Lagi", album: "Single", year: 2019, audio: "/Artists/neha-kakr/yad piya ki anay lgi.mp3" },
  ]);


  const [query, setQuery] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  // Filter songs
  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.album.toLowerCase().includes(query.toLowerCase()) ||
      String(s.year).includes(query)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-purple-500 to-black min-h-screen text-white">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/neha.jpg"
          alt="Neha kakar"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">Neha kakar</h1>
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
              className={`p-3 rounded-lg cursor-pointer transition ${currentSongIndex === index
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
