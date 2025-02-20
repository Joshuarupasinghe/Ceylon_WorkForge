import React, { useState, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Home, FileText, CreditCard, BarChart2, Settings, Bell, Search, Camera, Send, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [profileImage, setProfileImage] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const statsData = {
    currentJobs: 56000,
    skilledUsers: 230986,
    currentUsers: 563667,
    sales: 657689,
    cancellation: '1 out of 38',
    satisfaction: 3.9,
    balance: 707.1998,
    projects: {
      currentOrders: 4987,
      skilledUsersOnProjects: 456,
      ordersInQueue: 3453,
      usersWithProjects: 3454,
    }
  };

  const trafficData = {
    views: 7265,
    visits: 3671,
    newUsers: 156,
    activeUsers: 2318,
  };

  const lineChartData = [
    { name: 'Jan', value: 10000 },
    { name: 'Feb', value: 15000 },
    { name: 'Mar', value: 12000 },
    { name: 'Apr', value: 18000 },
    { name: 'May', value: 16000 }
  ];

  const SidebarLink = ({ icon: Icon, label, active }) => (
    <div 
      className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${
        active ? 'text-teal-500' : 'text-gray-400'
      } hover:text-teal-500 transition-colors duration-200`}
      onClick={() => {
        setActiveTab(label.toLowerCase());
        setIsMobileMenuOpen(false);
      }}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </div>
  );

  const StatCard = ({ title, value, percentage, trend = 'up', subtitle }) => (
    <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
        </div>
        <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
          trend === 'up' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
        }`}>
          {percentage}%
        </div>
      </div>
      <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-gray-800 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Mobile Drawer */}
        <div className={`
          fixed md:relative w-64 h-screen bg-gray-800 p-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="space-y-2 mt-12 md:mt-0">
            <SidebarLink icon={Home} label="Home" active={activeTab === 'home'} />
            <SidebarLink icon={FileText} label="Projects" active={activeTab === 'projects'} />
            <SidebarLink icon={CreditCard} label="Billings" active={activeTab === 'billings'} />
            <SidebarLink icon={BarChart2} label="Stats" active={activeTab === 'stats'} />
            <SidebarLink icon={Settings} label="Settings" active={activeTab === 'settings'} />
            <SidebarLink icon={Send} label="Chat" active={activeTab === 'chat'} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4 md:p-8 mt-12 md:mt-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div 
                className="relative w-12 h-12 rounded-full overflow-hidden cursor-pointer group"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => fileInputRef.current?.click()}
              >
                <img
                  src={profileImage || "/api/placeholder/48/48"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isHovering && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">
                  {activeTab === 'home' ? 'Hello David' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-gray-400">
                  {activeTab === 'home' ? 'Welcome back!' : `Manage your ${activeTab.toLowerCase()}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  className="w-full md:w-auto pl-10 pr-4 py-2 bg-gray-800 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Search for users"
                />
              </div>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="space-y-6">
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard title="Current Jobs" value={statsData.currentJobs} percentage={100} />
                <StatCard title="Skilled Users" value={statsData.skilledUsers} percentage={100} />
                <StatCard title="Current Users" value={statsData.currentUsers} percentage={100} />
                <StatCard 
                  title="Sales" 
                  subtitle="Total sales today"
                  value={`$${statsData.sales}`} 
                  percentage={100} 
                />
                <StatCard 
                  title="Cancellation"
                  value={statsData.cancellation} 
                  percentage={100}
                  trend="down" 
                />
                <StatCard 
                  title="User Satisfaction"
                  value={statsData.satisfaction} 
                  percentage={100} 
                />
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(trafficData).map(([key, value]) => (
                    <StatCard
                      key={key}
                      title={key.replace(/([A-Z])/g, ' $1').trim()}
                      value={value}
                      percentage={15}
                    />
                  ))}
                </div>
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Settings</h2>

                {/* Account Deactivation Section */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Account Deactivation</h3>
                  <p className="text-gray-400 mb-4">
                    If you're sure you want to deactivate your account, click the button below. This action cannot be undone.
                  </p>
                  <button className="w-full md:w-64 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
                    Deactivate Account
                  </button>
                </div>

                {/* Profile Settings */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Profile Settings</h3>
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <button className="mt-4 w-full md:w-32 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                    Save Changes
                  </button>
                </div>

                {/* Account Settings */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Account Settings</h3>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-300 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-gray-700 text-white rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="w-full md:w-64 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                    Change Password
                  </button>
                </div>

                {/* Security Settings */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6 mb-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Security Question</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter your security question"
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                      />
                      </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Answer</label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-700 text-white rounded-md"
                        placeholder="Enter your answer"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                      />
                    </div>

                    {/* Two Factor Authentication */}
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="text-gray-300">Enable Two-Factor Authentication</span>
                    </div>

                    <button className="w-full md:w-64 mt-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                      Save Security Settings
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Receive email notifications</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Receive push notifications</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Receive SMS notifications</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Receive weekly digest</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Receive important updates</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full md:w-32 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                    Save Settings
                  </button>
                </div>

                {/* Privacy Settings */}
                <div className="bg-gray-800 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Make profile public</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Show online status</span>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 bg-gray-600 rounded"
                      />
                      <span className="ml-4 text-gray-300">Allow others to message me</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full md:w-32 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-200">
                    Save Privacy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;