import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../assets/css/UserDashboard.css";

const UserDashboard = () => {

  const [counts, setCounts] = useState({
    totalMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    executiveMembers: 0,
  });

  // =========================
  // Get Dashboard Counts
  // =========================

  const getDashboardCounts = async () => {
    try {

      const res = await api.get("/member/dashboard-counts");

      if (res.data.success) {

        setCounts({
          totalMembers: res.data.totalMembers || 0,
          activeMembers: res.data.activeMembers || 0,
          inactiveMembers: res.data.inactiveMembers || 0,
          executiveMembers: res.data.executiveMembers || 0,
        });

      }

    } catch (error) {

      console.log(
        "Dashboard Count Error:",
        error
      );

    }
  };


  // =========================
  // Load Dashboard
  // =========================

  useEffect(() => {

    getDashboardCounts();

  }, []);


  return (

    <div className="user-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="user-dashboard-header">

        <div className="dashboard-heading">

          <h2>
            Dashboard
          </h2>

          <p>
            Welcome Back, Member 👋
          </p>

        </div>


        {/* Apply Membership */}

        <Link
    to="/user/membership/apply"
    className="apply-membership-btn"
>
    <i className="bi bi-person-plus-fill"></i>
    Apply Membership
</Link>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="dashboard-cards-row">


        {/* =========================
            TOTAL MEMBERS
        ========================= */}

        <div className="dashboard-card-wrapper">

          <div className="user-dashboard-card card-blue">

            <div className="card-content">

              <h6>
                Total
                <br />
                Members
              </h6>

              <h2>
                {counts.totalMembers}
              </h2>

            </div>

            <div className="card-icon">

              <i className="bi bi-people-fill"></i>

            </div>

          </div>

        </div>


        {/* =========================
            EXECUTIVE MEMBERS
        ========================= */}

        <div className="dashboard-card-wrapper">

          <div className="user-dashboard-card card-orange">

            <div className="card-content">

              <h6>
                Executive
                <br />
                Members
              </h6>

              <h2>
                {counts.executiveMembers}
              </h2>

            </div>

            <div className="card-icon">

              <i className="bi bi-person-badge-fill"></i>

            </div>

          </div>

        </div>


        {/* =========================
            ACTIVE MEMBERS
        ========================= */}

        <div className="dashboard-card-wrapper">

          <div className="user-dashboard-card card-purple">

            <div className="card-content">

              <h6>
                Active
                <br />
                Members
              </h6>

              <h2>
                {counts.activeMembers}
              </h2>

            </div>

            <div className="card-icon">

              <i className="bi bi-check-circle-fill"></i>

            </div>

          </div>

        </div>


        {/* =========================
            INACTIVE MEMBERS
        ========================= */}

        <div className="dashboard-card-wrapper">

          <div className="user-dashboard-card card-green">

            <div className="card-content">

              <h6>
                Inactive
                <br />
                Members
              </h6>

              <h2>
                {counts.inactiveMembers}
              </h2>

            </div>

            <div className="card-icon">

              <i className="bi bi-award-fill"></i>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default UserDashboard;