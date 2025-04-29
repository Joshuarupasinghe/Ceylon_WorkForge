import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Bell, Menu, CreditCard, Settings, User, Search, Calendar, ChevronRight, MessageSquare, Briefcase, Users } from "lucide-react";
import BillingSettings from '../components/BillingSettings';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from Jane Smith", read: false },
    { id: 2, message: "Project deadline approaching", read: false },
    { id: 3, message: "Payment received", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Handle screen resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-10 h-screen bg-white dark:bg-gray-800 p-4 transition-all duration-300 transform ${
          sidebarOpen ? "w-64" : "w-20"
        } shadow-lg`}
      >
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <h2 className="text-xl font-bold text-gray-800 dark:text-teal-400">Ceylon Work Forge</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform transform hover:scale-110">
            <Menu className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <nav>
          <ul className="space-y-2">
            <SidebarItem
              icon={<Briefcase size={20} />}
              label="Projects"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Freelancers"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<MessageSquare size={20} />}
              label="Messages"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarOpen={sidebarOpen}
              badge={3}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              label="Schedule"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarOpen={sidebarOpen}
            />
            <SidebarItem
              icon={<CreditCard size={20} />}
              label="Payment"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0 ml-20">
        {/* Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markAsRead={markAsRead}
          unreadCount={unreadCount}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          showUserMenu={showUserMenu}
          setShowUserMenu={setShowUserMenu}
        />

        {/* Dashboard Summary */}
        {activeTab === "projects" && (
          <>
            <DashboardSummary />
            <Projects searchQuery={searchQuery} />
          </>
        )}
        {activeTab === "freelancers" && <Freelancers searchQuery={searchQuery} />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "payment" && <BillingSettings />}
      </main>
    </div>
  );

}

// Sidebar Item
function SidebarItem({ icon, label, activeTab, setActiveTab, sidebarOpen, badge }) {
  const isActive = activeTab === label.toLowerCase();

  return (
    <li
      className={`flex items-center p-3 cursor-pointer transition-all duration-200 rounded-lg ${
        isActive
          ? "bg-teal-500 text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      onClick={() => setActiveTab(label.toLowerCase())}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>

      {sidebarOpen && (
        <div className="flex items-center justify-between w-full">
          <span className="ml-3">{label}</span>
          {badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
    </li>
  );
}

// Header Component with Notifications, Settings, and User Profile
function Header({
  searchQuery,
  setSearchQuery,
  notifications,
  showNotifications,
  setShowNotifications,
  markAsRead,
  unreadCount,
  showSettings,
  setShowSettings,
  showUserMenu,
  setShowUserMenu
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Client Dashboard</h1>

      <div className="flex items-center space-x-2 w-full md:w-auto">
        {/* Search input */}
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
          {/* Notification Bell */}
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

          {/* Settings Icon */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Settings className="text-gray-600 dark:text-gray-300 cursor-pointer" />
          </button>

          {/* User Profile Icon */}
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

// Dashboard Summary Component
function DashboardSummary() {
  const summaryItems = [
    { title: "Active Projects", value: "5", change: "+2", up: true },
    { title: "Pending Tasks", value: "12", change: "-3", up: false },
    { title: "Total Budget", value: "$15,000", change: "+$2,500", up: true },
    { title: "Time Tracked", value: "87 hrs", change: "+12 hrs", up: true }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</p>
              </div>
              <div className={`text-sm ${item.up ? "text-green-500" : "text-red-500"}`}>
                {item.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Projects Component
function Projects({ searchQuery }) {
  const [projects, setProjects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress", deadline: "Mar 30, 2025", progress: 65, budget: "$4,500" },
    { id: 2, name: "Mobile App Development", status: "Planning", deadline: "Apr 15, 2025", progress: 20, budget: "$8,000" },
    { id: 3, name: "SEO Optimization", status: "On Hold", deadline: "Mar 25, 2025", progress: 40, budget: "$2,500" },
    { id: 4, name: "Brand Identity Design", status: "Completed", deadline: "Mar 10, 2025", progress: 100, budget: "$3,200" },
    { id: 5, name: "Content Marketing Strategy", status: "In Progress", deadline: "Apr 5, 2025", progress: 30, budget: "$1,800" }
  ]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getStatusColor(status) {
    switch (status) {
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Planning": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "On Hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Your Projects</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredProjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-left bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium">Project Name</th>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium">Status</th>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium">Deadline</th>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium">Progress</th>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium">Budget</th>
                  <th className="p-3 text-gray-500 dark:text-gray-400 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-3 text-gray-800 dark:text-white font-medium">{project.name}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{project.deadline}</td>
                    <td className="p-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {project.progress}%
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{project.budget}</td>
                    <td className="p-3">
                      <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No projects match your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Freelancers Component
function Freelancers({ searchQuery }) {
  const freelancers = [
    {
      id: 1,
      name: "John Doe",
      skill: "Web Developer",
      rating: 4.9,
      hourlyRate: "$45",
      projectsCompleted: 24,
      availability: "Available",
    },
    {
      id: 2,
      name: "Jane Smith",
      skill: "Graphic Designer",
      rating: 4.7,
      hourlyRate: "$38",
      projectsCompleted: 17,
      availability: "Available",
    },
    {
      id: 3,
      name: "Alice Brown",
      skill: "SEO Specialist",
      rating: 4.8,
      hourlyRate: "$42",
      projectsCompleted: 31,
      availability: "Busy",
    },
    {
      id: 4,
      name: "Robert Johnson",
      skill: "Mobile Developer",
      rating: 4.6,
      hourlyRate: "$50",
      projectsCompleted: 19,
      availability: "Available",
    },
    {
      id: 5,
      name: "Emma Wilson",
      skill: "Content Writer",
      rating: 4.9,
      hourlyRate: "$35",
      projectsCompleted: 27,
      availability: "Busy",
    },
  ];

  const filteredFreelancers = freelancers.filter(
    (freelancer) =>
      freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      freelancer.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getAvailabilityColor(availability) {
    return availability === "Available"
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  }

  function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "★" : "☆"}
          </span>
        ))}
        <span className="ml-1 text-gray-600 dark:text-gray-300">{rating}</span>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Freelancers</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredFreelancers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFreelancers.map((freelancer) => (
              <Card key={freelancer.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{freelancer.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{freelancer.skill}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(freelancer.availability)}`}
                    >
                      {freelancer.availability}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Rating:</span>
                      {getRatingStars(freelancer.rating)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate:</span>
                      <span className="text-gray-800 dark:text-white">{freelancer.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Projects Completed:</span>
                      <span className="text-gray-800 dark:text-white">{freelancer.projectsCompleted}</span>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                    Contact
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No freelancers match your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Messages Component
function Messages() {
  const conversations = [
    {
      id: 1,
      name: "Jane Smith",
      avatar: "/api/placeholder/32/32",
      lastMessage: "Hi, I've completed the design drafts. Can we schedule a call to discuss?",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Robert Johnson",
      avatar: "/api/placeholder/32/32",
      lastMessage: "The backend API integration is now complete. Let me know when you're ready to test.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "/api/placeholder/32/32",
      lastMessage: "I'll need your feedback on the latest blog post draft by tomorrow.",
      time: "Yesterday",
      unread: true,
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "/api/placeholder/32/32",
      lastMessage: "The bug fix has been deployed to the staging environment.",
      time: "Monday",
      unread: false,
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hi there! I've just finished the initial mockups for your website redesign.",
      time: "10:15 AM",
    },
    {
      id: 2,
      sender: "them",
      text: "I've focused on improving the user flow and modernizing the look and feel.",
      time: "10:16 AM",
    },
    {
      id: 3,
      sender: "me",
      text: "That sounds great! I'm excited to see what you've come up with.",
      time: "10:20 AM",
    },
    {
      id: 4,
      sender: "them",
      text: "Hi, I've completed the design drafts. Can we schedule a call to discuss?",
      time: "10:30 AM",
    },
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() === "") return;

    // In a real app, you would send this to an API
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  return (
    <Card className="h-[calc(100vh-12rem)]">
      <div className="h-full flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white">Messages</h2>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                  selectedConversation.id === conversation.id ? "bg-gray-50 dark:bg-gray-800" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center space-x-3">
                  <img src={conversation.avatar} alt={conversation.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800 dark:text-white">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        conversation.unread
                          ? "font-medium text-gray-800 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-8 h-8 rounded-full" />
              <h3 className="font-medium text-gray-800 dark:text-white">{selectedConversation.name}</h3>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "me" ? "text-blue-200" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={sendMessage} className="flex space-x-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Schedule Component
function Schedule() {
  const upcomingEvents = [
    { id: 1, title: "Client Meeting", date: "Mar 15, 2025", time: "10:00 AM", client: "ABC Corp" },
    { id: 2, title: "Project Review", date: "Mar 17, 2025", time: "2:30 PM", client: "XYZ Inc" },
    { id: 3, title: "Team Standup", date: "Mar 14, 2025", time: "9:00 AM", client: "Internal" },
    { id: 4, title: "Wireframe Presentation", date: "Mar 20, 2025", time: "11:00 AM", client: "123 Industries" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client: {event.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{event.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/40">
                  Reschedule
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
            + Add New Event
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
