import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import Orders from "./dashboard/Orders";
import Wishlist from "./dashboard/Wishlist";
import SavedCards from "./dashboard/SavedCards";
import UPISection from "./dashboard/UPISection";
import AddressBook from "./dashboard/AddressBook";
import Profile from "./dashboard/Profile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("lastTab") || "Orders"
  );

  // ✅ Check login status securely
  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // ✅ Remember last opened tab
  useEffect(() => {
    localStorage.setItem("lastTab", activeTab);
  }, [activeTab]);

  // ✅ Render sections based on selected tab
  const renderSection = () => {
    switch (activeTab) {
      case "Orders":
        return <Orders />;
      case "Wishlist":
        return <Wishlist />;
      case "SavedCards":
        return <SavedCards />;
      case "UPI":
        return <UPISection />;
      case "Address":
        return <AddressBook />;
      case "Profile":
        return <Profile />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Your Dashboard
          </h1>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
