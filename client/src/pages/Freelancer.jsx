import React, { useState, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Home, FileText, CreditCard, BarChart2, Settings, Bell, Search, Camera, Send, Menu, X } from 'lucide-react';
import BillingSettings from '../components/BillingSettings';
import FreelanceChatRoom from '../components/FreelanceChatRoom';
import FreelanceProjects from '../components/projects';
import SettingsComponent from '../components/SettingsComponent';

// Import shadcn/ui components
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/Avatar';
import { Separator } from '../components/ui/Separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';

import { PieChart, Pie, Cell } from 'recharts'; // Import PieChart and Pie components from recharts
import { BarChart, Bar } from 'recharts';
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

  const freelancerStatusData = [
    { name: "Available", value: 10 },
    { name: "Busy", value: 5 },
    { name: "On Hold", value: 3 },
  ];

  const freelancerSkillsData = [
    { name: "Web Development", value: 12 },
    { name: "Graphic Design", value: 8 },
    { name: "SEO", value: 5 },
    { name: "Mobile Development", value: 10 },
  ];

  const SidebarLink = ({ icon: Icon, label, active }) => (
    <div 
      className={`flex items-center space-x-2 p-3 rounded cursor-pointer ${
        active ? 'bg-gray-700 text-teal-500' : 'text-gray-400'
      } hover:bg-gray-700 hover:text-teal-500 transition-colors duration-200`}
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
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-gray-400 text-sm">{title}</p>
            {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
          </div>
          <Badge variant={trend === 'up' ? 'success' : 'destructive'}>
            {percentage}%
          </Badge>
        </div>
        <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  );

  // Render the content for the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Stat Cards */}
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

            {/* Monthly Revenue Line Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: 'white' }} />
                      <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Stats Comparison Bar Chart
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Stats Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <XAxis dataKey="category" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: 'white' }} />
                      <Bar dataKey="value" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card> */}

            
            {/* Freelancer Skills Pie Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Freelancer Skills Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="115%" height="110%">
                    <PieChart>
                      <Pie
                        data={freelancerSkillsData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        labelLine={false}
                      >
                        {freelancerSkillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#9333EA', '#F59E0B', '#6EE7B7'][index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'projects':
        return <FreelanceProjects />;

      case 'stats':
        return (
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
            
            {/* Monthly Revenue Line Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: 'white' }} />
                      <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer Status Pie Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Freelancer Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="115%" height="110%">
                    <PieChart>
                      <Pie
                        data={freelancerStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        labelLine={false}
                      >
                        {freelancerStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#10B981', '#EF4444', '#FBBF24'][index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer Skills Pie Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Freelancer Skills Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={freelancerSkillsData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                        labelLine={false}
                      >
                        {freelancerSkillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#3B82F6', '#9333EA', '#F59E0B', '#6EE7B7'][index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'billings':
        return <BillingSettings />;
      
      case 'settings':
        return <SettingsComponent />;

      case 'chat':
        return <FreelanceChatRoom />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-gray-800 text-white hover:bg-gray-700"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Fixed on desktop, Drawer on mobile */}
        <aside
          className={`
            fixed md:sticky top-0 left-0 h-screen overflow-y-auto
            w-64 bg-gray-800 p-4 z-40
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center space-x-2 mb-6 mt-8 md:mt-0">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="font-bold text-white">FD</span>
              </div>
              <h2 className="text-xl font-bold text-white">FreeDash</h2>
            </div>
            <Separator className="my-4 bg-gray-700" />
            <div className="space-y-1">
              <SidebarLink icon={Home} label="Home" active={activeTab === 'home'} />
              <SidebarLink icon={FileText} label="Projects" active={activeTab === 'projects'} />
              <SidebarLink icon={CreditCard} label="Billings" active={activeTab === 'billings'} />
              <SidebarLink icon={BarChart2} label="Stats" active={activeTab === 'stats'} />
              <SidebarLink icon={Settings} label="Settings" active={activeTab === 'settings'} />
              <SidebarLink icon={Send} label="Chat" active={activeTab === 'chat'} />
            </div>
          </div>
        </aside>
  
        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 mt-12 md:mt-0 w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div 
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Avatar className="w-12 h-12 border-2 border-gray-700">
                    <AvatarImage src={profileImage || "/api/placeholder/48/48"} alt="Profile" />
                    <AvatarFallback className="bg-gray-700 text-white">DD</AvatarFallback>
                  </Avatar>
                  {isHovering && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
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
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="text"
                    className="pl-9 pr-4 py-2 bg-gray-800 border-gray-700 text-white w-full md:w-64"
                    placeholder="Search for users"
                  />
                </div>
                <Button variant="ghost" size="icon" className="p-2 hover:bg-gray-700 text-gray-400">
                  <Bell className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
