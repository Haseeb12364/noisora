import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/audio/background.mp3"));

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition"
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
      {isPlaying ? "Pause Music" : "Play Music"}
    </button>
  );
}
