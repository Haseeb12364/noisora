import { useEffect, useState } from "react";

export default function AtifSongsDummy() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/atif-songs.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load songs");
        return res.json();
      })
      .then((data) => {
        if (data?.results && Array.isArray(data.results)) {
          setSongs(data.results);
        } else {
          setError("Invalid data format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not fetch songs.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-4">Loading songs...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!songs.length)
    return <div className="text-yellow-400 p-4">No songs found.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        🎵 Atif Aslam Songs (Dummy API)
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <li
            key={song.trackId}
            className="bg-gray-800 p-4 rounded-xl flex items-center gap-4 shadow hover:scale-105 transition-transform duration-300"
          >
            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{song.trackName}</h2>
              <p className="text-sm text-gray-400">{song.artistName}</p>
              <audio controls src={song.previewUrl} className="mt-2 w-full" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
