import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 top-20 bg-gray-500 text-white h-screen p-4 z-50 sticky">
      <h2 className="   text-4xl font-bold p-4   justify-center items-center ">  🎼 Admin</h2>
        
      <nav className="mt-4">
        <ul className="space-y-3 p-4 text-white font-bold text-xl">
          <li><Link to="/admin" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link></li>
          <hr className=''></hr>
          <li><Link to="/admin/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link></li>
           <hr></hr>
          <li><Link to="/admin/songs" className="block hover:bg-gray-700 p-2 rounded">Songs</Link></li>
           <hr></hr>
          <li><Link to="/admin/artists" className="block hover:bg-gray-700 p-2 rounded">Artists</Link></li>
           <hr></hr>
          <li><Link to="/admin/uploads" className="block hover:bg-gray-700 p-2 rounded">Upload Content</Link></li>
           <hr></hr>
          <li><Link to="/logout" className="block hover:bg-red-600 p-2 items-center text-center justify-center rounded-full mr-3 bg-blue-700 text-xl mt-32"> Logout</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
