export default function Topbar() {
  return (
    <header className= " h-20  text-white shadow-md px-6 flex justify-between items-center w-full ">
       <li className=""><a href="/">Home</a></li>
      <h1 className="text-xl font-semibold ml-60 italic"> Admin Dashboard</h1>
      <div className="flex items-center gap-4 ">
        <span className="text-white cursor-pointer">👤 Admin</span>
        <button className="bg-red-700 text-white px-3 py-1 top-0 rounded ">Logout</button>
      </div>
    </header>
  );
}
