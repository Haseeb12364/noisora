export default function UsersTable() {
  const users = [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" },
  ];

  return (
    <div className=" ml-80 mt-10 bg-slate-300 shadow  mr-12 ">
      <table className="min-w-full table-auto"> 
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm ">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3">{user.id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

