// src/pages/Artists.jsx
import { Link } from "react-router-dom";
import { artists } from "../data/artistsData";

export default function Artists() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-white ">
      <h1 className="text-3xl font-bold mb-6 text-center">Artists</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((a) => (
          <Link
            key={a.slug}
            to={`/artist/${a.slug}`}
            className="block rounded-2xl shadow-lg hover:shadow-xl transition bg-gray-900 hover:bg-gray-800 overflow-hidden"
          >
            <img
              src={a.img}
              alt={a.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 items-center justify-center">
              <div className="font-semibold text-lg">{a.name}</div>
              <div className="text-sm text-gray-400 line-clamp-2">{a.bio}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
