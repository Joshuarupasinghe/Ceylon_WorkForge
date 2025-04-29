import { Briefcase, Users, MessageSquare, Calendar, CreditCard, Menu } from "lucide-react";

export function Sidebar({ activeTab, setActiveTab, sidebarOpen, toggleSidebar }) {
  return (
    <aside className={`fixed md:static z-10 h-screen bg-white dark:bg-gray-800 p-4 transition-all duration-300 transform ${
      sidebarOpen ? "w-64" : "w-20"
    } shadow-lg`}>
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
  );
}

function SidebarItem({ icon, label, activeTab, setActiveTab, sidebarOpen, badge }) {
  const isActive = activeTab === label.toLowerCase();
  return (
    <li
      className={`flex items-center p-3 cursor-pointer transition-all duration-200 rounded-lg ${
        isActive ? "bg-teal-500 text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
      onClick={() => setActiveTab(label.toLowerCase())}
    >
      <div className="flex items-center justify-center">{icon}</div>
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