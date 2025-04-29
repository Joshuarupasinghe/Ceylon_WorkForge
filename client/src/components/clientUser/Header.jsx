import { Bell, Settings, User, Search } from "lucide-react";
import { useState } from 'react';

export function Header({
  searchQuery,
  setSearchQuery,
  notifications,
  markAsRead,
  unreadCount
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Client Dashboard</h1>
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <div className="relative flex-1 md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Bell className="text-gray-600 dark:text-gray-300 cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700">
                <div className="p-2 bg-gray-100 dark:bg-gray-700">
                  <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p className="text-sm text-gray-800 dark:text-white">{notification.message}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-3 text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Settings className="text-gray-600 dark:text-gray-300 cursor-pointer" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <User className="text-gray-600 dark:text-gray-300 cursor-pointer" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 dark:border-gray-700">
                <ul>
                  <li className="p-3 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    View Profile
                  </li>
                  <li className="p-3 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}