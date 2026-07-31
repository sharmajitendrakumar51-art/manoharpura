import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/Dashboard.css";
const Dashboard = () => {

    const [counts, setCounts] = useState({
  totalMembers: 0,
  activeMembers: 0,
  inactiveMembers: 0,
  executiveMembers: 0,
});

const [recentMembers, setRecentMembers] = useState([]);

const getDashboardCounts = async () => {
  try {

    const res = await api.get("/member/dashboard-counts");

    if (res.data.success) {
      setCounts(res.data);
    }

  } catch (error) {
    console.log(error);
  }
};


const getRecentMembers = async () => {
  try {

    const res = await api.get("/member/recent-members");

    if (res.data.success) {
      setRecentMembers(res.data.members);
    }

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getDashboardCounts();
  getRecentMembers();
}, []);

    return (

        <div className="dashboard">

            {/* Header */}

            <div className="dashboard-header">

                <div>

                    <h2>Dashboard</h2>

                    <p>

                        Welcome Back, Admin 👋

                    </p>

                </div>

                <div>

                    <Link
                        to="/members/add"
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-circle me-2"></i>

                        Add Member

                    </Link>

                </div>

            </div>

            {/* Statistics */}

            <div className="row">

                <div className="col-lg-3 col-md-6 mb-4">

                    <div className="dashboard-card card-blue">

                        <div>

                            <h6>Total Members</h6>

                            <h2>{counts.totalMembers}</h2>

                        </div>

                        <i className="bi bi-people-fill"></i>

                    </div>

                </div>

                

                <div className="col-lg-3 col-md-6 mb-4">

                    <div className="dashboard-card card-orange">

                        <div>

                            <h6>Executive Members</h6>

                           <h2>{counts.executiveMembers}</h2>

                        </div>

                        <i className="bi bi-person-badge-fill"></i>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-4">

                    <div className="dashboard-card card-purple">

                        <div>

                            <h6>Active Members</h6>

                            <h2>{counts.activeMembers}</h2>

                        </div>

                        <i className="bi bi-check-circle-fill"></i>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6 mb-4">

                    <div className="dashboard-card card-green">

                        <div>

                            <h6>Inactive Members</h6>
                            <h2>{counts.inactiveMembers}</h2>

                        </div>

                        <i className="bi bi-award-fill"></i>

                    </div>

                </div>

            </div>

                        <div className="row">

                {/* Recent Members */}

                <div className="col-lg-8">

                    <div className="dashboard-box">

                        <div className="dashboard-box-header">

                            <h5>

                                <i className="bi bi-people-fill me-2"></i>

                                Recent Active Members

                            </h5>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead>

                                    <tr>

                                        <th>#</th>

                                        <th>Name</th>

                                        <th>Mobile</th>

                                        <th>Category</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>
<tbody>

  {recentMembers.length > 0 ? (

    recentMembers.map((member, index) => (

      <tr key={member._id}>

        <td>{index + 1}</td>

        <td>{member.fullName}</td>

        <td>{member.mobile}</td>

        <td>{member.membershipType}</td>

        <td>

          <span
            className={`badge ${
              member.status === "Active"
                ? "bg-success"
                : "bg-danger"
            }`}
          >
            {member.status}
          </span>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td colSpan="5" className="text-center">
        No Recent Members Found
      </td>

    </tr>

  )}

</tbody>

                            </table>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="col-lg-4">

                    {/* Quick Actions */}

                    <div className="dashboard-box mb-4">

                        <h5>

                            <i className="bi bi-lightning-charge-fill me-2"></i>

                            Quick Actions

                        </h5>

                        <div className="d-grid gap-2 mt-3">

                            <Link
                                to="/members/add"
                                className="btn btn-primary"
                            >

                                <i className="bi bi-plus-circle me-2"></i>

                                Add Member

                            </Link>

                            <Link
                                to="/members"
                                className="btn btn-success"
                            >

                                <i className="bi bi-people me-2"></i>

                                Members List

                            </Link>

                            <Link
                                to="/gallery"
                                className="btn btn-warning text-white"
                            >

                                <i className="bi bi-images me-2"></i>

                                Gallery

                            </Link>

                            <Link
                                to="/events"
                                className="btn btn-info text-white"
                            >

                                <i className="bi bi-calendar-event me-2"></i>

                                Events

                            </Link>

                        </div>

                    </div>

                    {/* Recent Activity */}

                    <div className="dashboard-box">

                        <h5>

                            <i className="bi bi-bell-fill me-2"></i>

                            Recent Activity

                        </h5>

                        <ul className="activity-list">

                            <li>

                                ✅ New Member Added

                            </li>

                            <li>

                                📷 Gallery Updated

                            </li>

                            <li>

                                📅 Event Created

                            </li>

                            <li>

                                👥 Committee Updated

                            </li>

                            <li>

                                📄 Membership Approved

                            </li>

                        </ul>

                    </div>

                </div>

            </div>

                    </div>

    );

};

export default Dashboard;
