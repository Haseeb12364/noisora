import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";

export default function AfsanaKhan() {
  const [songs] = useState([
    { id: 1, title: "Titliaan", album: "Single",img:"/afsana.jfif", year: 2020, audio: "/Artists/Afsana-Khan/khalija.mp3" },
    { id: 2, title: "Bazaar", album: "Single", year: 2019, audio: "/Artists/AfsanaKhan/bazaar.mp3" },
    { id: 3, title: "Dhakka", album: "Single", year: 2021, audio: "/Artists/AfsanaKhan/dhakka.mp3" },
    { id: 4, title: "Chandigarh", album: "Single", year: 2022, audio: "/Artists/AfsanaKhan/chandigarh.mp3" },
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
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
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
    setTimeout(() => {
      audioRef.current.play();
      setIsPlaying(true);
    }, 100);
  };

  const playPrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
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
  };

  return (
    <div className="p-6 bg-gradient-to-br from-red-500 to-black min-h-screen text-white">
      {/* Artist Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src="/afsana.jfif"
          alt="Afsana Khan"
          className="w-40 h-40 rounded-full shadow-lg border-4 border-white object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">Afsana Khan</h1>
          <p className="mt-2 text-gray-200 max-w-lg">
            Afsana Khan is a Punjabi playback singer known for her powerful vocals
            and hit songs like "Titliaan" and "Bazaar". She has collaborated with many
            top artists in the Punjabi music industry.
          </p>
        </div>
      </div>

      {/* Song List */}
      <div className="bg-white/10 p-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Songs</h2>
        <ul className="space-y-3">
          {songs.map((song, index) => (
            <li
              key={song.id}
              className={`p-3 rounded-lg cursor-pointer transition ${
                currentSongIndex === index
                  ? "bg-black 500 text-white"
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
              className="bg-white- p-3 rounded-full hover:bg-gray-600"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button onClick={playNext}>
              <FaStepForward size={20} />
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm mb-1">
            {songs[currentSongIndex].title} • {songs[currentSongIndex].album}
          </div>
          <div className="w-full bg-white/20 h-1 rounded">
            <div
              className="bg-pink-500 h-1 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <audio ref={audioRef} src={songs[currentSongIndex].audio} />
      </div>
    </div>
  );
}
