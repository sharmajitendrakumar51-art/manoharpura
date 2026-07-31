import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/Members.css";
import Swal from "sweetalert2";

const Members = () => {
  
 const navigate = useNavigate();

const [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedMember, setSelectedMember] = useState(null);
 

const getMembers = async () => {
  try {
    setLoading(true);

    const res = await api.get("/member/get-members");

    if (res.data.success) {
      setMembers(res.data.members);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getMembers();
}, []);

const filteredMembers = members.filter((member) =>
  member.fullName.toLowerCase().includes(search.toLowerCase()) ||
  member.mobile.includes(search) ||
  member.email.toLowerCase().includes(search.toLowerCase())
);

  const handleDelete = async () => {
  try {
    await api.delete(`/member/delete-member/${selectedMember._id}`);

    Swal.fire({
      icon: "success",
      title: "Deleted",
      text: "Member deleted successfully",
    });

    // List Refresh
    getMembers();

    setShowDeleteModal(false);
    setSelectedMember(null);

  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "Delete Failed",
    });
  }
};

const handleStatusChange = async (id, currentStatus) => {
  try {
    const newStatus =
      currentStatus === "Active" ? "Inactive" : "Active";

    const res = await api.put(`/member/update-status/${id}`, {
      status: newStatus,
    });

    if (res.data.success) {
      getMembers(); // Table Refresh
    }

  } catch (error) {
    console.log(error);
  }
};

 return (

<>

<div className="members-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h2>Members Management</h2>

          <p>Manage all registered members.</p>

        </div>

        <button
  className="btn btn-primary add-btn"
  onClick={() => navigate("/members/add")}
>
    <i className="bi bi-plus-circle me-2"></i>

    Add Member
</button>

      </div>

      {/* Search */}

      <div className="member-toolbar">

        <div className="search-box">

          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search Member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="toolbar-btns">

          <button className="btn btn-success">
            <i className="bi bi-file-earmark-excel me-2"></i>
            Excel
          </button>

          <button className="btn btn-danger">
            <i className="bi bi-file-earmark-pdf me-2"></i>
            PDF
          </button>

        </div>

      </div>
  

      {/* Table */}

      <div className="table-responsive member-table">
        

        <table className="table align-middle">

          <thead>

            <tr>

              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

         <tbody>
  {loading ? (
    <tr>
      <td colSpan="8" className="text-center">
        Loading...
      </td>
    </tr>
  ) : filteredMembers.length === 0 ? (
    <tr>
      <td colSpan="8" className="text-center">
        No Members Found
      </td>
    </tr>
  ) : (
    filteredMembers.map((member, index) => (
      <tr key={member._id}>
        <td>{index + 1}</td>

        <td>
          <img
            src={member.profilePhoto?.url}
            alt={member.fullName}
            className="member-photo"
          />
        </td>

        <td>
          <h6>{member.fullName}</h6>
          <small>{member.designation}</small>
        </td>

        <td>{member.mobile}</td>

        <td>{member.email}</td>

        <td>{member.membershipType}</td>

        <td>
   <div className="form-check form-switch d-flex align-items-center justify-content-center gap-2">
    <input
        className="form-check-input custom-switch"
        type="checkbox"
        checked={member.status === "Active"}
        onChange={() =>
            handleStatusChange(member._id, member.status)
        }
    />

    <span
        className={`fw-bold ${
            member.status === "Active"
                ? "text-success"
                : "text-danger"
        }`}
    >
        {member.status}
    </span>
</div>
</td>

        <td>
          <button
            className="btn btn-sm btn-info me-2 mb-2"
           onClick={() => navigate(`/members/view/${member._id}`)}
          >
            <i className="bi bi-eye-fill"></i>
          </button>

          <button
            className="btn btn-sm btn-warning me-2 mb-2"
            onClick={() => navigate(`/members/edit/${member._id}`)}
          >
            <i className="bi bi-pencil-fill"></i>
          </button>

          <button
            className="btn btn-sm btn-danger mb-2"
            onClick={() => {
              setSelectedMember(member);
              setShowDeleteModal(true);
            }}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>

           </div>

    </div>

    {showDeleteModal && (

      <div
        className="modal fade show d-block"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header bg-danger text-white">

              <h5 className="modal-title">

                Delete Member

              </h5>

            </div>

            <div className="modal-body">

              <p>

                Are you sure you want to delete

                <strong>{selectedMember?.fullName}</strong> ?

              </p>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>

    )}

</>

);
};

export default Members;