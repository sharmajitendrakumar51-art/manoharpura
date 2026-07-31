import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import "../assets/css/Admin.css";

const AdminLayout = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

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