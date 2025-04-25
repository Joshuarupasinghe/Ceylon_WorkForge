// src/pages/SuperAdminDashboard.jsx
import React, { useState } from 'react';
import {
  Users,
  BarChart2,
  Settings as SettingsIcon,
  CreditCard,
  LogOut,
  Edit2,
  Trash2
} from 'lucide-react';
import DashboardContent from '../../components/superadmin/DashboardContent';
import UsersComponent from '../../components/superadmin/UsersComponent';
import SuperAdminBilling from '../../components/superadmin/SuperBilling';
import CategoryManager from '../../components/superadmin/CategoryManager';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const SidebarLink = ({ icon: Icon, label }) => (
    <div
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        activeTab === label.toLowerCase()
          ? 'bg-teal-600 text-white'
          : 'text-gray-400 hover:bg-teal-700'
      }`}
      onClick={() => setActiveTab(label.toLowerCase())}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden md:block">{label}</span>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UsersComponent />;
      case 'billing':
        return <SuperAdminBilling />;
      case 'settings':
        return <CategoryManager />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col space-y-6 overflow-hidden md:h-screen">
        <h1 className="text-2xl font-bold text-teal-500 mb-6">Super Admin</h1>
        <div className="space-y-4">
          <SidebarLink icon={BarChart2} label="Dashboard" />
          <SidebarLink icon={Users} label="Users" />
          <SidebarLink icon={CreditCard} label="Billing" />
          <SidebarLink icon={SettingsIcon} label="Settings" />
        </div>
        <div className="mt-auto">
          <SidebarLink icon={LogOut} label="Logout" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-900">
        {renderContent()}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;