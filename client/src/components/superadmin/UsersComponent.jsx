import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulated API call to fetch users
    const fetchUsers = async () => {
      const data = [
        { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', role: 'Freelancer', status: 'Active' },
        { id: 3, name: 'Mike Johnson', role: 'Client', status: 'Inactive' },
        { id: 4, name: 'Emily Brown', role: 'Freelancer', status: 'Active' },
        { id: 5, name: 'Robert Wilson', role: 'Client', status: 'Active' },
        { id: 6, name: 'Sophia Martinez', role: 'Freelancer', status: 'Inactive' },
        { id: 7, name: 'David Anderson', role: 'Admin', status: 'Active' },
        { id: 8, name: 'Olivia Taylor', role: 'Freelancer', status: 'Active' },
        { id: 9, name: 'James White', role: 'Client', status: 'Inactive' },
        { id: 10, name: 'Emma Harris', role: 'Freelancer', status: 'Active' },
      ];
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2" /> User Management
      </h2>
      
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* User List */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.role}</td>
                <td className={`py-2 font-semibold ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersComponent;
