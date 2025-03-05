import React, { useState } from 'react';
import { Users, BarChart2, Settings, CreditCard, LogOut } from 'lucide-react';
import BillingSettings from '../components/BillingSettings';
import DashboardContent from '../components/DashboardContent';
import UsersComponent from '../components/UsersComponent';
import SuperAdminBilling from '../components/SuperBilling';


const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const SidebarLink = ({ icon: Icon, label }) => (
    <div 
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        activeTab === label.toLowerCase() ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-teal-700'
      }`}
      onClick={() => setActiveTab(label.toLowerCase())}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersComponent/>;
      case 'billing':
        return <SuperAdminBilling />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-teal-500">Super Admin</h1>
        <SidebarLink icon={BarChart2} label="Dashboard" />
        <SidebarLink icon={Users} label="Users" />
        <SidebarLink icon={CreditCard} label="Billing" />
        <SidebarLink icon={Settings} label="Settings" />
        <div className="mt-auto">
          <SidebarLink icon={LogOut} label="Logout" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
};



const UserManagement = () => (
  <div>
    <h2 className="text-2xl font-bold">User Management</h2>
    <p className="text-gray-400">Manage users and roles</p>
  </div>
);

const Billing = () => (
  <div>
    <h2 className="text-2xl font-bold">Billing & Transactions</h2>
    <p className="text-gray-400">Monitor platform revenue</p>
  </div>
);

const SettingsPage = () => (
  <div>
    <h2 className="text-2xl font-bold">Platform Settings</h2>
    <p className="text-gray-400">Adjust platform configurations</p>
  </div>
);

export default SuperAdminDashboard;
