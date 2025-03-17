import React, { useState } from 'react';
import { Save, User, Key, CreditCard } from 'lucide-react';

const ClientSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState('');

  const handleSaveSettings = () => {
    // Save the updated settings
    console.log('Settings saved');
    // For now, we're just logging the changes to the console
  };

  const handlePasswordChange = () => {
    // Handle password change logic
    console.log('Password changed');
  };

  const handleBillingInfoUpdate = () => {
    // Handle billing information update
    console.log('Billing info updated');
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-white">Profile Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-teal-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 text-teal-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-white">Change Password</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Key className="w-6 h-6 text-teal-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current Password"
              className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Key className="w-6 h-6 text-teal-500" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none"
          >
            Save New Password
          </button>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-white">Billing Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <CreditCard className="w-6 h-6 text-teal-500" />
            <input
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              placeholder="Billing Address"
              className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={handleBillingInfoUpdate}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none"
          >
            Save Billing Information
          </button>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
};

export default ClientSettings;
