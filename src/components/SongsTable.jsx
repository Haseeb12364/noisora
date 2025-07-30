export default function SongsTable() {
  const songs = [
    { id: 1, title: "No Love", artist: "Eminem" },
    { id: 2, title: "Blinding Lights", artist: "The Weeknd" },
  ];

  return (
    <div className="overflow-x-auto bg-white shadow rounded mt-6">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Artist</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 bg-black W-FULL">
          {songs.map((song) => (
            <tr key={song.id}>
              <td className="p-3">{song.id}</td>
              <td className="p-3">{song.title}</td>
              <td className="p-3">{song.artist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
