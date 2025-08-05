import { useNavigate } from "react-router-dom";

export default function ArtistCard({ name, image }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigates to /artists/artist-name format
    navigate(`/artists/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition p-4 rounded-xl flex flex-col items-center shadow-md"
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-emerald-500"
      />
      <h2 className="text-center text-sm font-semibold">{name}</h2>
    </div>
  );
}
