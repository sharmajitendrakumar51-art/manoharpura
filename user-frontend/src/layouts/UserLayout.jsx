import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserSidebar from "../components/UserSidebar";
import UserHeader from "../components/UserHeader";

import "../assets/css/UserLayout.css";

const UserLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="user-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <UserSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />


      {/* =========================
          MAIN AREA
      ========================= */}

      <div className="user-main">

        {/* FIXED HEADER */}

        <UserHeader
          onMenuClick={() => setSidebarOpen(true)}
        />


        {/* SCROLLABLE CONTENT */}

        <main className="user-content">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default UserLayout;