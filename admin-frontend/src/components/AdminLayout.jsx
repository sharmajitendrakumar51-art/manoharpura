import { useState } from "react";
import { Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../assets/css/Admin.css";

const AdminLayout = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("adminToken");

  console.log("ADMIN TOKEN:", token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="admin-main">

        <Topbar
          setMobileOpen={setMobileOpen}
        />

        <main className="admin-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;