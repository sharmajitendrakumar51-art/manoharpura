import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "../components/UserSidebar";
import UserHeader from "../components/UserHeader";

import "../assets/css/UserLayout.css";

const UserLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="user-layout">

      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="user-main">

        <UserHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="user-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default UserLayout;