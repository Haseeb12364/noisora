import React, { useState, useRef, useEffect } from "react";
const TrendingSongs = [
  {
    id: 1,
    title: "Obsessed",
    artist: "Riar Saab & Abhijay Sharma",
    cover: "/obsessed.jfif",
    language: "Punjabi",
    audio: "/audio/obsessed.mp3",
    
  },
  {
    id: 2,
    title: "pal pal",
    artist: "Affan khan",
    cover: "/pal.jpg",
    language: "pakistani",
    audio: "/audio/pal pal.mp3",
  },
  {
    id: 3,
    title: "Chl koi na",
    artist: "Sarmad Qadeer",
    cover: "/Chlkoina.jpg",
    language: "Pakistani",
    audio: "/audio/chlkoina.mp3",

  },
  {
    id: 4,
    title: "paigham",
    artist: "Amrinder Gill",
    cover: "/paigham.jpg",
    language: "Punjabi",
    audio: "/audio/paigham.mp3",

  },
  {
    id: 5,
    title: "Baat",
    artist: "Asim Azhar, Qirat Haider",
    cover: "/baat..jpg",
    language: "pakistani",
    audio: "/audio/baat.mp3",
 
  },
  {
    id: 6,
    title: "White Brown Black",
    artist: "karan aujla",
    cover: "/wbb.jpg",
    language: "Punjabi",
    audio: "/audio/wbb.mp3",

  },
   {
    id: 7,
    title: "Haseen",
    artist: "Manish S Sharmaa",
    cover: "/haseen.jpg",
    language: "Punjabi",
    audio: "/audio/haseen.mp3",

  },
  {
    id: 8,
    title: "Supreme",
    artist: "Shubh",
    cover: "/supreme.jpg",
    language: "punjabi",
    audio: "/audio/supreme.mp3",
 
  },
  {
    id: 9,
    title: "Young GOAT",
    artist: "	Cheema Y × Gur Sidhu",
    cover: "/goat.jfif",
    language: "Punjabi",
    audio: "/audio/young goat.mp3",

  },
  {
    id: 10,
    title: "Shayad",
    artist: "Arijit Singh",
    cover: "/shayad.jpg",
    language: "hindi",
    audio: "/audio/shayad.mp3",
 
  },
  {
    id: 11,
    title: "Dil Pagal",
    artist: "bilal saeed",
    cover: "/pagal.jpg",
    language: "pakistani",
    audio: "/audio/dil pagal.mp3",

  },
  {
    id: 12,
    title: "Umeedon Ki	",
    artist: "Atif Aslam",
    cover: "/umeed.jpg",
    language: "Pakistani",
    audio: "/audio/umeedon ki.mp3",
  
  },
];

export default function Trendingsongs() {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const filteredSongs =
    selectedLanguage === "All"
      ? TrendingSongs
      : TrendingSongs.filter(
          (song) =>
            song.language.toLowerCase() === selectedLanguage.toLowerCase()
        );

  const currentSong =
    currentSongIndex !== null ? filteredSongs[currentSongIndex] : null;

  const toggleLike = (id) => {
    setLikedSongs((prev) =>
      prev.includes(id) ? prev.filter((songId) => songId !== id) : [...prev, id]
    );
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setProgress(0);
  };

  const handleNext = () => {
    if (currentSongIndex < filteredSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const closePlayer = () => {
    setCurrentSongIndex(null);
    if (audioRef.current) audioRef.current.pause();
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const updateProgress = () => {
        setProgress(audio.currentTime);
        setDuration(audio.duration);
      };

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", updateProgress);
      audio.addEventListener("ended", handleNext);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", updateProgress);
        audio.removeEventListener("ended", handleNext);
      };
    }
  }, [currentSongIndex]);

  return (
    <section className="w-full min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white px-4 lg:px-20 py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎵 Trending Asian Songs 2K25
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore top tracks from Punjabi, Hindi, and Pakistani artists.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap ">
          {["All", "Punjabi", "Hindi", "Pakistani"].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedLanguage === lang
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-gray-400 text-gray-700 dark:text-gray-300"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Songs Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredSongs.map((song, index) => (
            <div
              key={song.id}
              className="relative bg-gray-100 dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-xl transition hover:scale-[1.02]"
            >
              <button
                onClick={() => toggleLike(song.id)}
                className="absolute top-3 right-3 text-2xl"
              >
                {likedSongs.includes(song.id) ? "❤️" : "🤍"}
              </button>

              <img
                src={song.cover}
                alt={song.title}
                className="rounded-lg w-full h-52 object-cover mb-4"
              />

              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-gray-700 dark:text-gray-400">{song.artist}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {song.language}
              </p>

              <button
                onClick={() => playSong(index)}
                className="mt-4 px-4 py-2 bg-white text-black rounded-full"
              >
                ▶ Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Player */}
      {currentSong && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96 text-white relative">
            <button
              onClick={closePlayer}
              className="absolute top-3 right-3 text-2xl"
            >
              ✖
            </button>

            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold">{currentSong.title}</h2>
            <p className="text-gray-400">{currentSong.artist}</p>

            {/* Scrollable Progress Bar */}
            <div className="mt-4 w-full">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  setProgress(newTime);
                  audioRef.current.currentTime = newTime;
                }}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22c55e ${
                    (progress / duration) * 100
                  }%, #374151 ${(progress / duration) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-gray-400 text-sm mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentSongIndex === 0}
                className="px-4 py-2 bg-gray-700 rounded-full"
              >
                ⏮
              </button>
              <button
                onClick={() =>
                  audioRef.current.paused
                    ? audioRef.current.play()
                    : audioRef.current.pause()
                }
                className="px-4 py-2 bg-blue-500 rounded-full"
              >
                {audioRef.current && audioRef.current.paused ? "▶" : "⏸"}
              </button>
              <button
                onClick={handleNext}
                disabled={currentSongIndex === filteredSongs.length - 1}
                className="px-4 py-2 bg-gray-700 rounded-full"
              >
                ⏭
              </button>
            </div>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={currentSong.audio} autoPlay />
          </div>
        </div>
      )}
    </section>
  );
}
