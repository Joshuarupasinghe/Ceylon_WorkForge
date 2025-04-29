import { useState, useEffect } from "react";
import { Sidebar } from "../../components/clientUser/Sidebar";
import { Header } from "../../components/clientUser/Header";
import { DashboardSummary } from "../../components/clientUser/DashboardSummary";
import { Projects } from "../../components/clientUser/Projects";
import { Freelancers } from "../../components/clientUser/Freelancers";
import { Messages } from "../../components/clientUser/Messages";
import { Schedule } from "../../components/clientUser/Schedule";
import { Payment } from "../../components/clientUser/Payment";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("projects");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New message from Jane Smith", read: false },
    { id: 2, message: "Project deadline approaching", read: false },
    { id: 3, message: "Payment received", read: true }
  ]);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <main className="flex-1 p-6 md:ml-0 ml-20">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          markAsRead={markAsRead}
          unreadCount={unreadCount}
        />

        {activeTab === "projects" && (
          <>
            <DashboardSummary />
            <Projects searchQuery={searchQuery} />
          </>
        )}
        {activeTab === "freelancers" && <Freelancers searchQuery={searchQuery} />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "payment" && <Payment />}
      </main>
    </div>
  );
}