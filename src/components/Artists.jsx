import ArtistCard from "./ArtistCard";

const artists = [
  { name: "Atif Aslam", image: "/assets/artists/atif.jpg" },
  { name: "Bilal saeed", image: "/assets/artists/bilal.jpg" },
  { name: "Aima baig", image: "/assets/artists/aima.webp" },
  { name: "Ali Zafar", image: "/assets/artists/ali_zafar.png" },
  { name: "Nusrat Fateh Ali Khan", image: "/assets/artists/nusrat.png" },
  { name: "Abida Parveen", image: "/assets/artists/abida.png" },
  { name: "Ali Sethi", image: "/assets/artists/ali_sethi.png" },
  { name: "Quratulain Balouch", image: "/assets/artists/qb.png" },
];

export default function Artists() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Pakistani Artists</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {artists.map((artist, index) => (
          <ArtistCard key={index} name={artist.name} image={artist.image} />
        ))}
      </div>
    </div>
  );
}
