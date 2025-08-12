import React, { useState, useRef, useEffect } from "react";



export default function AfsanaKhan() {
  const [songs] = useState([
    { id: 1, title: "umeddon ke", album: "Zeher", year: 2008, audio: "/audio/umeedon ki.mp3" },
    { id: 2, title: "dhere dhere sa", album: "Bol", year: 2004, audio: "/Artists/atif-aslam/tera hua.mp3" },
    { id: 3, title: "hona tha pyar", album: "Bol", year: 2011, audio: "/Artists/atif-aslam/hona tha pyar.mp3" },
    { id: 4, title: "Tu Jaane Na", album: "Ajab Si", year: 2008, audio: "/audio/tu-jaane-na.mp3" },
    { id: 5, title: "dekhte dekhte", album: "Batti Gul Meter Chalu", year: 2018, audio: "/Artists/atif-aslam-dekhte-dekhte.mp3" },
    { id: 6, title: "Pehli Dafa", album: "Single", year: 2016, audio: "/audio/pehli-dafa.mp3" },
    { id: 7, title: "Dil Diyan Gallan", album: "Tiger Zinda Hai", year: 2017, audio: "/Artists/atif-aslam/dil dya gallan.mp3" },
    { id: 8, title: "aj dil dukha ha", album: "Doorie", year: 2006, audio: "/Artists/atif-aslam/aj dil dukha ha.mp3" },
    { id: 9, title: "O Saathi", album: "Single", year: 2018, audio: "/audio/o-saathi.mp3" },
    { id: 10, title: "Tajdare-Haram", album: "Coke studio", year: 2015, audio: "/Artists/atif-aslam/Tajdare-Haram.mp3" },
  ]);

  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    audio.addEventListener("ended", handleEnd);
    return () => audio.removeEventListener("ended", handleEnd);
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

    // switch to a new song
    audio.src = song.audio;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setCurrent(song);
    setIsPlaying(true);
  };

  const toggleLike = (id) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden md:flex md:items-center">
        {/* Left: Image */}
        <div className="md:w-1/3 p-6 flex justify-center">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/afsana.jfif"
              alt="Atif Aslam"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl md:text-4xl font-bold">Atif Aslam</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Atif Aslam is a Pakistani playback singer and actor known for his soulful voice and wide
            range. He rose to prominence with the band Jal and later as a solo artist. His songs span
            pop, rock and filmi music and he has recorded many chart-topping tracks for Bollywood as
            well as Pakistan. This page shows a curated selection of popular songs.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Origin:</strong>
              <span>Pakistan</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Active:</strong>
              <span>2003 — present</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              <strong>Genres:</strong>
              <span>Pop, Rock, Filmi</span>
            </span>
          </div>

          {/* Search */}
          <div className="mt-6">
            <label htmlFor="search" className="sr-only">
              Search songs
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search songs, album or year..."
              className="w-full md:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>
      </div>

      {/* Songs list */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular Songs</h2>
          <div className="text-sm text-gray-500">{filtered.length} results</div>
        </div>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((s) => (
            <li
              key={s.id}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-sm font-medium">
                  {s.title.split(" ").slice(0,2).map(w=>w[0]).join("")}
                </div>
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.album} • {s.year}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => playSong(s)}
                  className="px-3 py-2 rounded-md border hover:bg-gray-50"
                >
                  {current && current.id === s.id && isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  onClick={() => toggleLike(s.id)}
                  aria-pressed={liked.includes(s.id)}
                  className={`px-3 py-2 rounded-md border ${liked.includes(s.id) ? "bg-red-50 border-red-200" : "hover:bg-gray-50"}`}
                >
                  {liked.includes(s.id) ? "♥ Liked" : "♡ Like"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Small player footer - visible when a song is selected */}
        {current && (
          <div className="fixed left-4 right-4 bottom-6 md:bottom-8 max-w-6xl mx-auto bg-white/95 backdrop-blur-md border rounded-xl p-3 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                {current.title.split(" ").slice(0,2).map(w=>w[0]).join("")}
              </div>
              <div>
                <div className="font-medium">{current.title}</div>
                <div className="text-xs text-gray-500">{current.album} • {current.year}</div>
              </div>
            </div>  

            <div className="flex items-center gap-3">
              <button
                onClick={() => playSong(current)}
                className="px-4 py-2 rounded-md border"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={() => {
                  audioRef.current.pause();
                  setCurrent(null);
                  setIsPlaying(false);
                }}
                className="px-3 py-2 rounded-md border hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
