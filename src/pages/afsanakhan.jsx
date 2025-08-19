import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";

export default function Afsanakhan() {
const [songs] = useState([
  { id: 1, title: "Khalija", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/khalija.mp3" },
  { id: 2, title: "Kaash Tera Ishq Main Hota", album: "Single", year: 2019, audio: "/Artists/Afsana-khan/kaash.mp3" },
  { id: 4, title: "Mohabbat Ke Kabil", album: "Single", year: 2022, audio: "/Artists/Afsana-Khan/mohabat ke kabil.mp3" },
  { id: 5, title: "Dhakka", album: "Single", year: 2019, audio: "/Artists/Afsana-Khan/Dhaaka.mp3" },
  { id: 6, title: "Dila Himmat Kar", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/dila himat kr.mp3" },
  { id: 7, title: "Hanju", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/Hanju.mp3" },
  { id: 8, title: "Koi Si", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/koi_si.mp3" },
  { id: 9, title: "Taweez", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/taweez.mp3" },
  { id: 10, title: "855", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/855.mp3" },
  { id: 11, title: "Bechari", album: "Single", year: 2022, audio: "/Artists/Afsana-khan/Bechari.mp3" },
  { id: 12, title: "Bazaar", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/Bazzar.mp3" },
  { id: 13, title: "Badmashi", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/Badmasi.mp3" },
  { id: 14, title: "Jutti Jharrke", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/jutti Jharrke.mp3" },
  { id: 15, title: "Mohalla", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/mohala.mp3" },
  { id: 16, title: "Mohabbat Ke Kabil (Reprise)", album: "Single", year: 2022, audio: "/Artists/Afsana-khan/mohabat k kabil.mp3" },
  { id: 17, title: "Larebaz", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/Larebaz.mp3" },
  { id: 18, title: "Sajna Merya", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/sajna merya.mp3" },
  { id: 19, title: "Naina De Thekay", album: "Single", year: 2020, audio: "/Artists/Afsana-khan/naina de thekay.mp3" },
  { id: 20, title: "Rabba Mereya", album: "Single", year: 2021, audio: "/Artists/Afsana-khan/Rabba_Mere.mp3" },
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
    <div className="p-6 bg-gradient-to-br from-red-500 to-black min-h-screen text-white">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/afsana.jpg"
          alt="AP dhillon"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">Afsana khan</h1>
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
              className={`p-3 rounded-lg cursor-pointer transition ${
                currentSongIndex === index
                  ? "bg-red-900 text-white"
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
              className="bg-red-600 p-3 rounded-full hover:bg-gray-600"
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
