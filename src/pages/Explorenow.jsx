import { Link } from "react-router-dom";

const topGenres = [
    { name: "kpop", color: "#75C922", img: "kpop.png" },
    { name: "Indie", color: "#CF25A0", img: "Indie.png" },
    { name: "R&B", color: "#4A558F", img: "R&B.png" },
    { name: "Pop", color: "#BD6220", img: "Pop.png" },
    { name: "Slowed rewerbs", color: "#ffff" },
];

const browseAll = [
    { name: "Made for you", color: "#1E82AC", img: "you.png" },
    { name: "Released", color: "#76259C", img: "released.png" },
    { name: "Music Charts", color: "#25319C", img: "music.png" },
    { name: "Podcasts", color: "#9C2542", img: "podcast.png" },
    { name: "Bollywood", color: "#9C7425", img: "bollywood.png" },
    { name: "pop fusion", color: "#479775", img: "fusion.png" },
];

export default function Explore() {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-2">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
                <img
                    src="/musium logo.png"
                    className="w-10 h-10 md:w-14 md:h-14 object-contain"
                    alt="Logo"
                />
                <h1 className="text-xl md:text-3xl font-bold text-cyan-400">Search</h1>
            </div>

            {/* Search Box */}
            <input
                className="w-full rounded-lg text-sm md:text-lg px-4 py-2 md:py-3 mb-4 glow-btn"
                type="text"
                placeholder="Songs / Artists / Products & more..."
            />

            {/* Top Genres */}
            <div className="mt-2">
                <h2 className="text-lg md:text-2xl font-semibold mb-2">Your Top Genres</h2>
                <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible pb-3 scroll-smooth snap-x snap-mandatory">
                    {topGenres.map((genre, index) => {
                        const isKpop = genre.name.toLowerCase() === "kpop";

                        const card = (
                            <div
                                className="relative min-w-[160px] md:min-w-0 h-28 md:h-36 rounded-lg overflow-hidden flex-shrink-0 snap-start"
                                style={{ backgroundColor: genre.color }}
                            >
                                <h4 className="text-white font-semibold text-sm md:text-xl p-3 z-10 relative">
                                    {genre.name}
                                </h4>
                                {genre.img && (
                                    <img
                                        src={genre.img}
                                        alt={genre.name}
                                        className="absolute bottom-1 right-1 h-20 w-20 md:h-28 md:w-28 object-cover transform rotate-12 translate-x-1 translate-y-1"
                                    />
                                )}
                            </div>
                        );

                        return isKpop ? (
                            <Link to="/kpop" key={index}>
                                {card}
                            </Link>
                        ) : (
                            <div key={index}>{card}</div>
                        );
                    })}
                </div>
            </div>

            {/* Browse All */}
            <div className="mt-4">
                <h2 className="text-lg md:text-2xl font-semibold mb-2">Browse All</h2>
                <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible pb-3 scroll-smooth snap-x snap-mandatory">
                    {browseAll.map((item, index) => (
                        <div
                            key={index}
                            className="relative min-w-[160px] md:min-w-0 h-28 md:h-36 rounded-lg overflow-hidden flex-shrink-0 snap-start"
                            style={{ backgroundColor: item.color }}
                        >
                            <h4 className="text-white font-semibold text-sm md:text-xl p-3 z-10 relative">
                                {item.name}
                            </h4>
                            {item.img && (
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="absolute bottom-1 right-1 h-20 w-20 md:h-28 md:w-28 object-cover transform rotate-12 translate-x-1 translate-y-1"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
