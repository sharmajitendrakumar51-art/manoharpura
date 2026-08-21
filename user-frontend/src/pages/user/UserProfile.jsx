import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../api/axios";
import "../../assets/css/UserProfile.css";


const UserProfile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);


    // =====================================
    // GET LOGGED IN USER PROFILE
    // =====================================

    const getProfile = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            console.log("LOGIN USER:", user);


            // =================================
            // Get email
            // =================================

            const email =
                user?.email ||
                localStorage.getItem("userEmail");


            if (!email) {

                throw new Error(
                    "User email not found"
                );

            }


            // =================================
            // Get Member
            // =================================

            const res = await api.get(
                `/member/get-member-by-email/${encodeURIComponent(email)}`
            );


            console.log(
                "PROFILE RESPONSE:",
                res.data
            );


            if (res.data.success) {

                setProfile(
                    res.data.member
                );

            } else {

                throw new Error(
                    "Profile not found"
                );

            }


        } catch (error) {

            console.error(
                "PROFILE ERROR:",
                error
            );


            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    error.response?.data?.message ||
                    "Unable to load profile",

            });


        } finally {

            setLoading(false);

        }

    };
      

    

    useEffect(() => {

        getProfile();

    }, []);


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="user-profile-loading">

                <i className="bi bi-hourglass-split"></i>

                <p>
                    Loading Profile...
                </p>

            </div>

        );

    }


    // =====================================
    // PROFILE NOT FOUND
    // =====================================

    if (!profile) {

        return (

            <div className="user-profile-empty">

                <i className="bi bi-person-x"></i>

                <h3>
                    Profile not found
                </h3>

                <p>
                    Your membership profile is not available.
                </p>

                <button
                    onClick={() =>
                        navigate("/user/dashboard")
                    }
                    className="profile-back-btn"
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Dashboard
                </button>

            </div>

        );

    }


    // =====================================
    // VIEW PROFILE
    // =====================================

    return (

        <div className="user-profile-page">


            {/* =================================
                PROFILE HERO
            ================================= */}

           <div className="profile-hero">

    {/* PROFILE PHOTO */}
    <div className="profile-photo-wrapper">

        {profile.profilePhoto?.url ? (

            <img
                src={profile.profilePhoto.url}
                alt={profile.fullName}
                className="profile-main-photo"
            />

        ) : (

            <div className="profile-main-placeholder">

                <i className="bi bi-person-fill"></i>

            </div>

        )}

    </div>


    {/* PROFILE DETAILS */}
    <div className="profile-hero-details">

        <h1>

            {profile.title || ""}
            {" "}
            {profile.fullName}

        </h1>


        <div className="profile-badges">

            <span
                className={`profile-status ${
                    profile.status === "Active"
                        ? "active"
                        : "inactive"
                }`}
            >

                {profile.status || "Inactive"}

            </span>


            <span className="profile-membership">

                {profile.membershipType ||
                    "Membership"}

            </span>

        </div>


        <p className="membership-number">

            Membership No :

            {" "}

            <strong>
                {profile.membershipNo || "-"}
            </strong>

        </p>

    </div>

</div>


            {/* =================================
                PERSONAL INFORMATION
            ================================= */}

            <div className="profile-section">


                <div className="profile-section-header">

                    <h2>

                        <i className="bi bi-person-fill"></i>

                        Personal Information

                    </h2>

                </div>


                <div className="profile-info-grid">


                    <ProfileItem
                        label="Title"
                        value={profile.title}
                    />


                    <ProfileItem
                        label="Full Name"
                        value={profile.fullName}
                    />


                    <ProfileItem
                        label="Father / Husband Name"
                        value={profile.fatherName}
                    />


                    <ProfileItem
                        label="Nick Name"
                        value={profile.nickName}
                    />


                    <ProfileItem
                        label="Gender"
                        value={profile.gender}
                    />


                    <ProfileItem
                        label="Date of Birth"
                        value={
                            profile.dob
                                ? new Date(
                                    profile.dob
                                ).toLocaleDateString(
                                    "en-IN"
                                )
                                : "-"
                        }
                    />


                    <ProfileItem
                        label="Category"
                        value={profile.category}
                    />


                    <ProfileItem
                        label="Caste"
                        value={profile.caste}
                    />


                    <ProfileItem
                        label="Marital Status"
                        value={
                            profile.maritalStatus
                        }
                    />

                    <ProfileItem
                        label="Aadhaar Number"
                        value={profile.aadhaar}
                    />


                    <ProfileItem
                        label="PAN Number"
                        value={profile.pan}
                    />


                    <ProfileItem
                        label="Jan Aadhaar Number"
                        value={
                            profile.janAadhaar
                        }
                    />


                    <ProfileItem
                        label="Occupation"
                        value={
                            profile.occupation
                        }
                    />


                </div>

            </div>


            {/* =================================
                CONTACT INFORMATION
            ================================= */}

            <div className="profile-section">


                <div className="profile-section-header">

                    <h2>

                        <i className="bi bi-telephone-fill"></i>

                        Contact Information

                    </h2>

                </div>


                <div className="profile-info-grid">


                    <ProfileItem
                        label="Mobile Number"
                        value={profile.mobile}
                    />


                    <ProfileItem
                        label="WhatsApp Number"
                        value={profile.whatsapp}
                    />


                    <ProfileItem
                        label="Email Address"
                        value={profile.email}
                    />


                    {/* <ProfileItem
                        label="Aadhaar Number"
                        value={profile.aadhaar}
                    />


                    <ProfileItem
                        label="PAN Number"
                        value={profile.pan}
                    />


                    <ProfileItem
                        label="Jan Aadhaar Number"
                        value={
                            profile.janAadhaar
                        }
                    /> */}


                </div>

            </div>


            {/* =================================
                MEMBERSHIP INFORMATION
            ================================= */}

            <div className="profile-section">


                <div className="profile-section-header">

                    <h2>

                        <i className="bi bi-card-checklist"></i>

                        Membership Information

                    </h2>

                </div>


                <div className="membership-readonly-grid">


                    <div>

                        <span>
                            Membership Number
                        </span>

                        <strong>
                            {profile.membershipNo || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Membership Type
                        </span>

                        <strong>
                            {profile.membershipType || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Designation
                        </span>

                        <strong>
                            {profile.designation || "-"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Valid From
                        </span>

                        <strong>
                            {formatDate(profile.validFrom)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Valid To
                        </span>

                        <strong>
                            {formatDate(profile.validTo)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Status
                        </span>

                        <strong
                            className={
                                profile.status === "Active"
                                    ? "status-active"
                                    : "status-inactive"
                            }
                        >
                            {profile.status || "-"}
                        </strong>

                    </div>


                </div>

            </div>


            {/* =================================
                ADDRESS
            ================================= */}

            <div className="profile-section">


                <div className="profile-section-header">

                    <h2>

                        <i className="bi bi-geo-alt-fill"></i>

                        Address Information

                    </h2>

                </div>


                <div className="profile-info-grid">


                    <div className="profile-info-item full-width">

                        <span>
                            Permanent Address
                        </span>

                        <strong>
                            {profile.permanentAddress ||
                                "-"}
                        </strong>

                    </div>


                    <div className="profile-info-item full-width">

                        <span>
                            Correspondence Address
                        </span>

                        <strong>
                            {profile.correspondenceAddress ||
                                "-"}
                        </strong>

                    </div>


                </div>

            </div>


            {/* =================================
                UPLOADED DOCUMENTS
            ================================= */}

            <div className="profile-section">


                <div className="profile-section-header">

                    <h2>

                        <i className="bi bi-file-earmark-image"></i>

                        Uploaded Documents

                    </h2>

                </div>


                <div className="documents-grid">


                    <DocumentCard
                        title="Member Photo"
                        file={profile.profilePhoto}
                    />


                    <DocumentCard
                        title="Aadhaar Front"
                        file={profile.aadhaarFront}
                    />


                    <DocumentCard
                        title="Aadhaar Back"
                        file={profile.aadhaarBack}
                    />


                    <DocumentCard
                        title="Jan Aadhaar Card"
                        file={profile.janAadhaarCard}
                    />


                    <DocumentCard
                        title="PAN Card"
                        file={profile.panCard}
                    />


                </div>

            </div>


            {/* =================================
                BOTTOM BUTTONS
            ================================= */}

            <div className="profile-bottom-actions">


                <button
                    className="profile-back-btn"
                    onClick={() =>
                        navigate("/user/dashboard")
                    }
                >

                    <i className="bi bi-arrow-left"></i>

                    Back

                </button>


                <button
                    className="profile-edit-btn"
                    onClick={() =>
                        navigate("/user/profile/edit")
                    }
                >

                    <i className="bi bi-pencil-square"></i>

                    Edit Profile

                </button>


                <button
                    className="profile-print-btn"
                    onClick={() =>
                        window.print()
                    }
                >

                    <i className="bi bi-printer"></i>

                    Print

                </button>


            </div>


        </div>

    );

};


// =====================================
// PROFILE ITEM
// =====================================

const ProfileItem = ({
    label,
    value
}) => {

    return (

        <div className="profile-info-item">

            <span>
                {label}
            </span>

            <strong>
                {value || "-"}
            </strong>

        </div>

    );

};


// =====================================
// DOCUMENT CARD
// =====================================

const DocumentCard = ({
    title,
    file
}) => {


    const handleView = () => {

        if (!file?.url) {

            Swal.fire({
                icon: "info",
                title: "Document Not Available",
                text: `${title} is not uploaded.`,
            });

            return;

        }


        window.open(
            file.url,
            "_blank",
            "noopener,noreferrer"
        );

    };


    return (

        <div className="profile-document-card">


            <div className="document-card-icon">

                <i className="bi bi-file-earmark-image"></i>

            </div>


            <h4>
                {title}
            </h4>


            {file?.url ? (

                <button
                    className="document-view-button"
                    onClick={handleView}
                >

                    <i className="bi bi-eye-fill"></i>

                    View

                </button>

            ) : (

                <span className="document-not-found">

                    Not Uploaded

                </span>

            )}


        </div>

    );

};


// =====================================
// DATE FORMAT
// =====================================

const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "en-IN"
    );

};


export default UserProfile;