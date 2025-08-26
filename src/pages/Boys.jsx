// import { useParams } from "react-router-dom";
// import artists from "./artists";

// const Boys = () => {
//   const { slug } = useParams();
//   const current = artists.find((artist) => artist.artist === slug);

//   if (!current) {
//     return (
//       <div className="text-center text-red-500 text-lg mt-10">
//         ❌ Artist Not Found
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       {/* Artist Name */}
//       <h1 className="text-3xl font-bold text-emerald-400 mb-6 capitalize">
//         {current.artist.replace("-", " ")}
//       </h1>

//       {/* Songs List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {current.songs.map((song) => (
//           <div
//             key={song.id}
//             className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:shadow-emerald-500/40 transition"
//           >
//             <h2 className="text-xl font-semibold text-emerald-300">
//               {song.title}
//             </h2>
//             <p className="text-sm text-gray-400">
//               Album: {song.album} ({song.year})
//             </p>

//             {/* Audio Player */}
//             <audio controls className="mt-3 w-full">
//               <source src={song.audio} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           </div>    
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Boys;
