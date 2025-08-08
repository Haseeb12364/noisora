import { Link, useNavigate } from "react-router-dom";

const topGenres = [
    { name: "pakistani", img: "pakistani.jpg" },
    { name: "indian", img: "indian.avif" },
    { name: "english", img: "english.webp" },
    { name: "Pop", img: "pop1.webp" },
    { name: "Slowed Reverbs", img: "slow.jpg" },
];

const artists = [
  { name: "Atif Aslam", img: "Atif.jpg" },
  { name: "Aujla", img: "Aujla.jfif" },
  { name: "Neha kakar", img: "neha.jpg" },
{ name: "B praak", img: "B praak.avif" }

];
const songs = [
  { name: "Chl koina (Sarmad qadeer)", img: "Chlkoina.jpg"},
  { name: "Baarishein (Anuv jain)", img: "anuv.jpg" },
  { name: "Paigham (Amrinder gill)", img: "paigham.jpg" },

];

export default function Explore() {
    const Navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap mb-6">
                <div className="flex items-center gap-4">
                    <img
                        src="/musium logo.png"
                        className="w-12 h-12 object-contain"
                        alt="Musium Logo"
                    />
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                        Search
                    </h1>
                </div>
            </div>

            {/* Search Input */}
            <input
                className="w-full rounded-xl text-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                type="text"
                placeholder="Songs / Artists / Products & more..."
            />

            {/* Top Genres */}
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold px-2 mb-4 ">
                    Your Top Genres
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {topGenres.map((genre, index) => {
                        const genreCard = (
                            <div
                                className="rounded-xl flex justify-between items-center px-4 h-48 shadow-xl  transition-transform hover:scale-105"
                                style={{
                                    backgroundImage: `url(${genre.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <h4 className="text-white text-2xl font-bold">
                                    {genre.name}
                                </h4>
                            </div>
                        );

                        return genre.name.trim().toLowerCase() === "pakistani" ? (
                            <Link to="" key={index}>
                                {genreCard}
                            </Link>
                        ) : (
                            <div key={index}>{genreCard}</div>
                        );
                    })}
                </div>
            </div>

            {/* .................. */}
            <div className="mt-10">
               
              <div className="min-h-scree text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Artists</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {artists.map((artist, index) => (
          <div
            key={index}
            className="bg-gray-900 hover:bg-gray-800 rounded-full overflow-hidden cursor-pointer shadow-xl  transition-transform hover:scale-105"
          >
            <img
              src={artist.img}
        
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{artist.name}</h2>
            </div>
          </div>
        ))}
          <button
            className="  bg-white   text-black w-28 h-16 mt-16 ml-8 font-semibold px-6 py-3 rounded-full z-50 transition duration-300 shadow-lg hover:scale-105"
            onClick={()=>{
                Navigate("/Artists");
            }}
          >
            see all
          </button>

      </div>
    
    </div>

            </div>
            {/* ......................... */}

                <div className="mt-10">
               
              <div className="min-h-scree text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Trending songs</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-gray-900 hover:bg-gray-800 overflow-hidden cursor-pointer shadow-xl  transition-transform hover:scale-105"
          >
            <img
              src={song.img}
        
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{song.name}</h2>
            </div>
          </div>
        ))}
          <button
            className="  bg-white   text-black w-28 h-16 mt-16 ml-8 font-semibold px-6 py-3 rounded-full shadow-xl 2xl transition duration-300 z-50 hover:scale-105"
            onClick={()=>{
                Navigate("/Trendingsongs");
            }}
          >
            More
          </button>

      </div>
    
    </div>

            </div>
        </div>
    );
}
  