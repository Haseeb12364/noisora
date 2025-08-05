import { Link } from "react-router-dom";

const topGenres = [
    { name: "pakistani", img: "pakistani.jpg" },
    { name: "indian", img: "indian.avif" },
    { name: "english", img: "english.webp" },
    { name: "Pop", img: "pop1.webp" },
    { name: "Slowed Reverbs", img: "slow.jpg" },
];

const browseAll = [
    { name: "Made for You", color: "#1E82AC", img: "" },
    { name: "Released", color: "#76259C", img: "" },
    { name: "Music Charts", color: "#25319C", img: "" },
    { name: "Podcasts", color: "#9C2542", img: "" },
    { name: "Bollywood", color: "#9C7425", img: "" },
    { name: "Pop Fusion", color: "#479775", img: "" },
];

export default function Explore() {
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
                    <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
                        Search
                    </h1>
                </div>
            </div>

            {/* Search Input */}
            <input
                className="glow-btn w-full rounded-xl text-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                                className="h-36 rounded-xl flex justify-between items-center px-4 hover:scale-105 transition-transform"
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
                            <Link to="/songs" key={index}>
                                {genreCard}
                            </Link>
                        ) : (
                            <div key={index}>{genreCard}</div>
                        );
                    })}
                </div>
            </div>

            {/* Browse All */}
            <div className="mt-10">
                <h2 className="text-xl sm:text-2xl font-semibold px-2 mb-4">
                    Browse All
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {browseAll.map((item, index) => (
                        <div
                            key={index}
                            className="h-52 rounded-xl flex flex-col justify-between p-4"
                            style={{ backgroundColor: item.color }}
                        >
                            <h4 className="text-white font-bold text-xl p-5">
                                {item.name}
                            </h4>
                            {item.img && (
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="h-34 w-44 self-end object-contain"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
  