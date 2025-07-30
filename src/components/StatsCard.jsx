export default function StatsCard({ title, value }) {
  return (
    <div className="bg-white text-black rounded shadow p-4 w-full ml-80 justify-center items-center h-40 mt-12" >
      <h3 className="text-black ">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
