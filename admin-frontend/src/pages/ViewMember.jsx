import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/ViewMember.css";

const ViewMember = () => {

    const navigate = useNavigate();
const { id } = useParams();

const [member, setMember] = useState(null);
const [loading, setLoading] = useState(true);

const getMember = async () => {
  try {
    setLoading(true);
    
    
    const res = await api.get(`/member/get-member/${id}`);
console.log(member);
    if (res.data.success) {
      setMember(res.data.member);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getMember();
}, []);

if (loading) {
  return (
    <div className="text-center mt-5">
      <h4>Loading...</h4>
    </div>
  );
}

if (!member) {
  return (
    <div className="text-center mt-5">
      <h4>Member Not Found</h4>
    </div>
  );
}
   
    return (

        <div className="container-fluid view-member-page">

            {/* Header */}

            <div className="page-header">

                <h2>Member Details</h2>

                <p>
                    View complete member information.
                </p>

            </div>

            <div className="member-view-card">

    <div className="profile-section">

        <img
             src={member.profilePhoto?.url}
            alt="Profile"
            className="profile-image"
        />

        <h3>

            {member.title} {member.fullName}

        </h3>

        <div className="mt-2">

            <span className="badge bg-success me-2">

                {member.status}

            </span>

            <span className="badge bg-primary">

                {member.membershipType}

            </span>

        </div>

        <h6 className="mt-3">

            Membership No :
            <strong> {member.membershipNo}</strong>

        </h6>

    </div>

    <div className="info-card">

    <h4>

        <i className="bi bi-person-fill me-2"></i>

        Personal Information

    </h4>

    <div className="row">

        <div className="col-md-4 mb-3">

            <strong>Title</strong>

            <p>{member.title}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Full Name</strong>

            <p>{member.fullName}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Father / Husband Name</strong>

            <p>{member.fatherName}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Nick Name</strong>

            <p>{member.nickName}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Gender</strong>

            <p>{member.gender}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Date of Birth</strong>

            <p>{member.dob}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Category</strong>

            <p>{member.category}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Caste</strong>

            <p>{member.caste}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Marital Status</strong>

            <p>{member.maritalStatus}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Occupation</strong>

            <p>{member.occupation}</p>

        </div>

    </div>

</div>

<div className="info-card">

    <h4>

        <i className="bi bi-telephone-fill me-2"></i>

        Contact Information

    </h4>

    <div className="row">

        <div className="col-md-4 mb-3">

            <strong>Mobile Number</strong>

            <p>{member.mobile}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>WhatsApp Number</strong>

            <p>{member.whatsapp}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Email Address</strong>

            <p>{member.email}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Aadhaar Number</strong>

            <p>{member.aadhaar}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>PAN Number</strong>

            <p>{member.pan}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Jan Aadhaar Number</strong>

            <p>{member.janAadhaar}</p>

        </div>

    </div>

</div>

<div className="info-card">

    <h4>

        <i className="bi bi-geo-alt-fill me-2"></i>

        Address Information

    </h4>

    <div className="row">

        <div className="col-md-6 mb-3">

            <strong>Permanent Address</strong>

            <p>{member.permanentAddress}</p>

        </div>

        <div className="col-md-6 mb-3">

            <strong>Correspondence Address</strong>

            <p>{member.correspondenceAddress}</p>

        </div>

    </div>

</div>

<div className="info-card">

    <h4>

        <i className="bi bi-card-checklist me-2"></i>

        Membership Information

    </h4>

    <div className="row">

        <div className="col-md-4 mb-3">

            <strong>Membership Type</strong>

            <p>

                <span className="badge bg-primary">

                    {member.membershipType}

                </span>

            </p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Membership Number</strong>

            <p>{member.membershipNo}</p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Status</strong>

            <p>

                <span className="badge bg-success">

                    {member.status}

                </span>

            </p>

        </div>

        <div className="col-md-4 mb-3">

            <strong>Executive Committee</strong>

            <p>

                {
                    member.isExecutiveCommittee ?

                        <span className="badge bg-success">

                            Yes

                        </span>

                        :

                        <span className="badge bg-secondary">

                            No

                        </span>
                }

            </p>

        </div>

        {
            member.isExecutiveCommittee && (

                <div className="col-md-4 mb-3">

                    <strong>Assigned Designation</strong>

                    <p>{member.designation}</p>

                </div>

            )
        }

        <div className="col-md-4 mb-3">
    <strong>Valid From</strong>

    <p>
        {member?.validFrom
            ? new Date(member.validFrom).toLocaleDateString("en-GB")
            : "-"}
    </p>
</div>

{
    member.membershipType !== "Lifetime Membership" && (

        <div className="col-md-4 mb-3">
            <strong>Valid To</strong>

            <p>
                {member?.validTo
                    ? new Date(member.validTo).toLocaleDateString("en-GB")
                    : "-"}
            </p>
        </div>

    )
}
    </div>

</div>

<div className="info-card">

    <h4>

        <i className="bi bi-file-earmark-image-fill me-2"></i>

        Uploaded Documents

    </h4>

    <div className="row">

        {/* Profile Photo */}

        <div className="col-lg-4 col-md-6 mb-4">

            <div className="document-card">

    <h6>Member Photo</h6>

    <button
      className="btn btn-primary btn-sm"
      onClick={() => window.open(member.profilePhoto?.url, "_blank")}
      disabled={!member.profilePhoto?.url}
    >
      <i className="bi bi-eye"></i> View
    </button>

  </div>

        </div>

        {/* Aadhaar Front */}

       <div className="col-lg-4 col-md-6 mb-4">

  <div className="document-card">

    <h6>Aadhaar Front</h6>

    <button
      className="btn btn-primary btn-sm"
      onClick={() => window.open(member.aadhaarFront?.url, "_blank")}
      disabled={!member.aadhaarFront?.url}
    >
      <i className="bi bi-eye"></i> View
    </button>

  </div>

</div>

        {/* Aadhaar Back */}

       <div className="col-lg-4 col-md-6 mb-4">

  <div className="document-card">

    <h6>Aadhaar Back</h6>

    <button
      className="btn btn-primary btn-sm"
      onClick={() => window.open(member.aadhaarBack?.url, "_blank")}
      disabled={!member.aadhaarBack?.url}
    >
      <i className="bi bi-eye"></i> View
    </button>

  </div>

</div>

        {/* Jan Aadhaar */}

       <div className="col-lg-4 col-md-6 mb-4">

  <div className="document-card">

    <h6>Jan Aadhaar Card</h6>

    <button
      className="btn btn-primary btn-sm"
      onClick={() => window.open(member.janAadhaarCard?.url, "_blank")}
      disabled={!member.janAadhaarCard?.url}
    >
      <i className="bi bi-eye"></i> View
    </button>

  </div>

</div>

        {/* PAN */}

    <div className="col-lg-4 col-md-6 mb-4">

  <div className="document-card">

    <h6>PAN Card</h6>

    <button
      className="btn btn-primary btn-sm"
      onClick={() => window.open(member.panCard?.url, "_blank")}
      disabled={!member.panCard?.url}
    >
      <i className="bi bi-eye"></i> View
    </button>

  </div>

</div>

    </div>

</div>

<div className="button-group">

    <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
    >

        <i className="bi bi-arrow-left me-2"></i>

        Back

    </button>

    <button
    className="btn btn-warning"
    onClick={() => navigate(`/members/edit/${id}`)}
>
    <i className="bi bi-pencil-square me-2"></i>
    Edit
</button>

    <button
        className="btn btn-primary"
        onClick={() => window.print()}
    >

        <i className="bi bi-printer me-2"></i>

        Print

    </button>

</div>

</div>

</div>

);

};

export default ViewMember;