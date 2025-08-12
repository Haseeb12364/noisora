import React from "react";
import { useNavigate } from "react-router-dom";      

const artists = [
  { name: "Atif Aslam", image: "/Atif1.jpg" },
  { name: "Arijit singh", image: "/arijit.webp" },  
  { name: "Shubh", image: "/Shubh.jpg" },
  { name: "Sidhu mosewala", image: "/sidhu.jfif" },
  { name: "Ali Zafar", image: "/Ali.webp" },
  { name: "Afsana Khan", image: "/afsana.jfif" },
  { name: "Diljit singh", image: "/diljit.webp" },
   { name: "Neha kkakr", image: "/neha.jpg" },
  { name: "Momina Mustehsan", image: "/momina.jpg" },
     { name: "Ap dhillon", image: "/ap.jpg" },
    { name: "Talha Anjum", image: "/TALHA.JPG" },
  { name: "karan aujla", image: "/karan aujla.jfif" },
  { name: "B praak", image: "/B praak.avif" },
  { name: "bilal saeed", image: "/bilal saeed.jfif" },
  { name: "Rahat Fateh Ali", image: "/rahat.jpg" },
];

export default function Artists() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Artists</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {artists.map((artist, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/artist/${artist.name.toLowerCase().replace(/\s/g, "")}`)
            }
            className="bg-gray-900 hover:bg-gray-800 rounded-full overflow-hidden cursor-pointer shadow-xl  transition-transform hover:scale-105"
          >
            <img
              src={artist.image}

              className="w-full h-52 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{artist.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
