import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const DashboardContent = () => {
  const userData = [
    { name: 'Jan', users: 1000, freelancers: 400, revenue: 5000, sales: 200, cancellations: 10 },
    { name: 'Feb', users: 1200, freelancers: 500, revenue: 7000, sales: 250, cancellations: 15 },
    { name: 'Mar', users: 1500, freelancers: 600, revenue: 8500, sales: 300, cancellations: 12 },
    { name: 'Apr', users: 1700, freelancers: 750, revenue: 9500, sales: 350, cancellations: 8 },
    { name: 'May', users: 2000, freelancers: 900, revenue: 12000, sales: 400, cancellations: 10 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Growth & Revenue Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">User Growth & Revenue</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#4ADE80" name="Total Users" />
              <Line type="monotone" dataKey="freelancers" stroke="#38BDF8" name="Freelancers" />
              <Line type="monotone" dataKey="revenue" stroke="#FACC15" name="Revenue ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Active Users & Freelancers Bar Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Active Users & Freelancers</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#4ADE80" name="Total Users" />
              <Bar dataKey="freelancers" fill="#38BDF8" name="Freelancers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Sales Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Total Sales</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#FACC15" name="Total Sales" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Cancellations Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Cancellations</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="cancellations" fill="#EF4444" name="Cancellations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
