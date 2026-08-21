import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import "../../assets/css/ApplyMembership.css";


const UploadedDocument = ({ file, onView, onDelete }) => {

    if (!file) return null;

    return (
        <div className="uploaded-document">

            <div className="uploaded-document-info">

                <i className="bi bi-file-earmark-text-fill"></i>

                <span title={file.name}>
                    {file.name}
                </span>

            </div>

            <div className="uploaded-document-actions">

                <button
                    type="button"
                    className="document-view-btn"
                    onClick={onView}
                >
                    <i className="bi bi-eye-fill"></i>
                    View
                </button>

                <button
                    type="button"
                    className="document-delete-btn"
                    onClick={onDelete}
                >
                    <i className="bi bi-trash-fill"></i>
                    Delete
                </button>

            </div>

        </div>
    );
};


const ApplyMembership = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [aadhaarFront, setAadhaarFront] = useState(null);
    const [aadhaarBack, setAadhaarBack] = useState(null);
    const [janAadhaarCard, setJanAadhaarCard] = useState(null);
    const [panCard, setPanCard] = useState(null);

    const [photoPreview, setPhotoPreview] = useState(null);

    const handleViewFile = (file) => {
    if (!file) return;

    const fileURL = URL.createObjectURL(file);

    window.open(fileURL, "_blank");

    setTimeout(() => {
        URL.revokeObjectURL(fileURL);
    }, 10000);
};

    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] = useState({

        title: "",
        fullName: "",
        nickName: "",
        fatherName: "",

        gender: "",
        dob: "",

        category: "",
        caste: "",
        occupation: "",
        maritalStatus: "",

        mobile: "",
        whatsapp: "",
        email: "",

        aadhaar: "",
        pan: "",
        janAadhaar: "",

        permanentAddress: "",
        correspondenceAddress: "",

        membershipType: "",

    });


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =========================================
    // PROFILE PHOTO
    // =========================================

    const handleProfilePhoto = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setProfilePhoto(file);

        setPhotoPreview(
            URL.createObjectURL(file)
        );

    };


    // =========================================
    // AADHAAR FRONT
    // =========================================

    const handleAadhaarFront = (e) => {

        const file = e.target.files[0];

        if (file) {
            setAadhaarFront(file);
        }

    };


    // =========================================
    // AADHAAR BACK
    // =========================================

    const handleAadhaarBack = (e) => {

        const file = e.target.files[0];

        if (file) {
            setAadhaarBack(file);
        }

    };


    // =========================================
    // JAN AADHAAR
    // =========================================

    const handleJanAadhaar = (e) => {

        const file = e.target.files[0];

        if (file) {
            setJanAadhaarCard(file);
        }

    };


    // =========================================
    // PAN
    // =========================================

    const handlePanCard = (e) => {

        const file = e.target.files[0];

        if (file) {
            setPanCard(file);
        }

    };


    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Basic validation

        if (!formData.fullName.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Full Name Required",
                text: "Please enter your full name.",
            });

            return;

        }


        if (!formData.mobile.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Mobile Number Required",
                text: "Please enter your mobile number.",
            });

            return;

        }


        if (!formData.email.trim()) {

            Swal.fire({
                icon: "warning",
                title: "Email Required",
                text: "Please enter your email address.",
            });

            return;

        }


        if (!formData.membershipType) {

            Swal.fire({
                icon: "warning",
                title: "Membership Type Required",
                text: "Please select membership type.",
            });

            return;

        }


        try {

            setLoading(true);


            // =========================================
            // FORM DATA
            // =========================================

            const form = new FormData();


            // Text fields

            Object.keys(formData).forEach((key) => {

                form.append(
                    key,
                    formData[key]
                );

            });


            // =========================================
            // DOCUMENTS
            // =========================================

            if (profilePhoto) {

                form.append(
                    "profilePhoto",
                    profilePhoto
                );

            }


            if (aadhaarFront) {

                form.append(
                    "aadhaarFront",
                    aadhaarFront
                );

            }


            if (aadhaarBack) {

                form.append(
                    "aadhaarBack",
                    aadhaarBack
                );

            }


            if (janAadhaarCard) {

                form.append(
                    "janAadhaarCard",
                    janAadhaarCard
                );

            }


            if (panCard) {

                form.append(
                    "panCard",
                    panCard
                );

            }


            // =========================================
            // API
            // =========================================

            const response = await api.post(
                "/member/add-member",
                form
            );


            console.log(
                "APPLICATION RESPONSE:",
                response.data
            );


            if (response.data.success) {

                await Swal.fire({

                    icon: "success",

                    title: "Application Submitted!",

                    text:
                        response.data.message ||
                        "Your membership application has been submitted successfully.",

                    confirmButtonText: "OK",

                });


                navigate("/dashboard");

            } else {

                Swal.fire({

                    icon: "error",

                    title: "Application Failed",

                    text:
                        response.data.message ||
                        "Unable to submit membership application.",

                });

            }


        } catch (error) {

            console.log(
                "APPLICATION ERROR:",
                error
            );

            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );


            Swal.fire({

                icon: "error",

                title: "Something Went Wrong",

                text:
                    error.response?.data?.message ||
                    "Unable to submit application.",

            });

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // RESET
    // =========================================

    const handleReset = () => {

        setFormData({

            title: "",
            fullName: "",
            nickName: "",
            fatherName: "",

            gender: "",
            dob: "",

            category: "",
            caste: "",
            occupation: "",
            maritalStatus: "",

            mobile: "",
            whatsapp: "",
            email: "",

            aadhaar: "",
            pan: "",
            janAadhaar: "",

            permanentAddress: "",
            correspondenceAddress: "",

            membershipType: "",

        });


        setProfilePhoto(null);
        setAadhaarFront(null);
        setAadhaarBack(null);
        setJanAadhaarCard(null);
        setPanCard(null);

        setPhotoPreview(null);

    };


    return (

        <div className="apply-membership-page">


            {/* =====================================
                PAGE HEADER
            ===================================== */}

            <div className="apply-page-header">

                <div>

                    <h2>
                        Apply for Membership
                    </h2>

                    <p>
                        Fill in your details to submit your membership application.
                    </p>

                </div>


                <button
                    type="button"
                    className="apply-back-btn"
                    onClick={() => navigate(-1)}
                >

                    <i className="bi bi-arrow-left"></i>

                    Back

                </button>

            </div>



            {/* =====================================
                FORM CARD
            ===================================== */}

            <div className="apply-membership-card">


                <form onSubmit={handleSubmit}>


                    {/* =====================================
                        PERSONAL INFORMATION
                    ===================================== */}

                    <div className="apply-section">

                        <div className="apply-section-title">

                            <div className="section-icon">
                                <i className="bi bi-person-fill"></i>
                            </div>

                            <div>
                                <h4>
                                    Personal Information
                                </h4>

                                <p>
                                    Enter your basic personal details.
                                </p>
                            </div>

                        </div>


                        <div className="row g-3">


                            {/* Title */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Title
                                </label>

                                <select
                                    className="form-select"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Mr.">
                                        Mr.
                                    </option>

                                    <option value="Mrs.">
                                        Mrs.
                                    </option>

                                    <option value="Miss">
                                        Miss
                                    </option>

                                    <option value="Dr.">
                                        Dr.
                                    </option>

                                </select>

                            </div>


                            {/* Full Name */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Full Name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                />

                            </div>


                            {/* Nick Name */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Nick Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="nickName"
                                    value={formData.nickName}
                                    onChange={handleChange}
                                    placeholder="To be provided by Admin"
                                    disabled
                                />

                            </div>


                            {/* Father Name */}

                           <div className="col-lg-6 col-md-6">

                                <label>
                                    Father / Husband Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter father / husband name"
                                />

                            </div>


                            {/* Gender */}

                           <div className="col-lg-6 col-md-6">

                                <label>
                                    Gender
                                </label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* DOB */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Date of Birth
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Category */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Category <span>*</span>
                                </label>

                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="General">
                                        General
                                    </option>

                                    <option value="EWS">
                                        EWS
                                    </option>

                                    <option value="SC">
                                        SC
                                    </option>

                                    <option value="ST">
                                        ST
                                    </option>

                                    <option value="OBC">
                                        OBC
                                    </option>

                                    <option value="MBC">
                                        MBC
                                    </option>

                                </select>

                            </div>


                            {/* Caste */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Caste
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="caste"
                                    value={formData.caste}
                                    onChange={handleChange}
                                    placeholder="Enter caste"
                                />

                            </div>


                            {/* Marital Status */}

                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Marital Status
                                </label>

                                <select
                                    className="form-select"
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Status
                                    </option>

                                    <option value="Married">
                                        Married
                                    </option>

                                    <option value="Unmarried">
                                        Unmarried
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>
                            
                            
                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Aadhaar Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="aadhaar"
                                    value={formData.aadhaar}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhaar number"
                                />

                            </div>


                            <div className="col-lg-6 col-md-6">

                                <label>
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    placeholder="Enter PAN number"
                                />

                            </div>


                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Jan Aadhaar
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="janAadhaar"
                                    value={formData.janAadhaar}
                                    onChange={handleChange}
                                    placeholder="Enter Jan Aadhaar"
                                />

                            </div>

                            {/* Occupation */}

                            <div className="col-12">

                                <label>
                                    Occupation
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                    placeholder="Enter your occupation"
                                />

                            </div>

                        </div>

                    </div>



                    {/* =====================================
                        CONTACT INFORMATION
                    ===================================== */}

                    <div className="apply-section">

                        <div className="apply-section-title">

                            <div className="section-icon">
                                <i className="bi bi-telephone-fill"></i>
                            </div>

                            <div>

                                <h4>
                                    Contact Information
                                </h4>

                                <p>
                                    Provide your contact and identification details.
                                </p>

                            </div>

                        </div>


                        <div className="row g-3">


                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Mobile Number <span>*</span>
                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                />

                            </div>


                           <div className="col-lg-6 col-md-6">

                                <label>
                                    WhatsApp Number
                                </label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="Enter WhatsApp number"
                                />

                            </div>


                            <div className="col-lg-6 col-md-6">

                                <label>
                                    Email <span>*</span>
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />

                            </div>


                            {/* <div className="col-lg-4 col-md-6">

                                <label>
                                    Aadhaar Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="aadhaar"
                                    value={formData.aadhaar}
                                    onChange={handleChange}
                                    placeholder="Enter Aadhaar number"
                                />

                            </div>


                            <div className="col-lg-4 col-md-6">

                                <label>
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="pan"
                                    value={formData.pan}
                                    onChange={handleChange}
                                    placeholder="Enter PAN number"
                                />

                            </div>


                            <div className="col-lg-4 col-md-6">

                                <label>
                                    Jan Aadhaar
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="janAadhaar"
                                    value={formData.janAadhaar}
                                    onChange={handleChange}
                                    placeholder="Enter Jan Aadhaar"
                                />

                            </div> */}

                        </div>

                    </div>



                    {/* =====================================
                        ADDRESS
                    ===================================== */}

                    <div className="apply-section">

                        <div className="apply-section-title">

                            <div className="section-icon">
                                <i className="bi bi-geo-alt-fill"></i>
                            </div>

                            <div>

                                <h4>
                                    Address Information
                                </h4>

                                <p>
                                    Provide your residential address.
                                </p>

                            </div>

                        </div>


                        <div className="row g-3">


                            <div className="col-lg-6">

                                <label>
                                    Permanent Address
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="permanentAddress"
                                    value={formData.permanentAddress}
                                    onChange={handleChange}
                                    placeholder="Enter permanent address"
                                />

                            </div>


                            <div className="col-lg-6">

                                <label>
                                    Correspondence Address
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="correspondenceAddress"
                                    value={formData.correspondenceAddress}
                                    onChange={handleChange}
                                    placeholder="Enter correspondence address"
                                />

                            </div>

                        </div>

                    </div>



                    {/* =====================================
                        MEMBERSHIP
                    ===================================== */}

                    <div className="apply-section">

                        <div className="apply-section-title">

                            <div className="section-icon">
                                <i className="bi bi-card-checklist"></i>
                            </div>

                            <div>

                                <h4>
                                    Membership Information
                                </h4>

                                <p>
                                    Select your preferred membership plan.
                                </p>

                            </div>

                        </div>


                        <div className="membership-options">

                           
                            
                            <label
                                className={
                                    `membership-option ${
                                        formData.membershipType ===
                                        "2 Years Membership"
                                            ? "selected"
                                            : ""
                                    }`
                                }
                            >

                                <input
                                    type="radio"
                                    name="membershipType"
                                    value="2 Years Membership"
                                    checked={
                                        formData.membershipType ===
                                        "2 Years Membership"
                                    }
                                    onChange={handleChange}
                                />

                                <div>

                                    <strong>
                                        2 Years Membership
                                    </strong>

                                    <span>
                                        Valid for two year only
                                    </span>

                                </div>

                            </label>

                            <label
                                className={
                                    `membership-option ${
                                        formData.membershipType ===
                                        "Lifetime Membership"
                                            ? "selected"
                                            : ""
                                    }`
                                }
                            >

                                <input
                                    type="radio"
                                    name="membershipType"
                                    value="Lifetime Membership"
                                    checked={
                                        formData.membershipType ===
                                        "Lifetime Membership"
                                    }
                                    onChange={handleChange}
                                />

                                <div>

                                    <strong>
                                        Lifetime Membership
                                    </strong>

                                    <span>
                                        if donated ₹11000
                                    </span>

                                </div>

                            </label>




                            {/* <label
                                className={
                                    `membership-option ${
                                        formData.membershipType ===
                                        "1 Years Membership"
                                            ? "selected"
                                            : ""
                                    }`
                                }
                            >

                                <input
                                    type="radio"
                                    name="membershipType"
                                    value="1 Years Membership"
                                    checked={
                                        formData.membershipType ===
                                        "1 Years Membership"
                                    }
                                    onChange={handleChange}
                                />

                                <div>

                                    <strong>
                                        1 Year Membership
                                    </strong>

                                    <span>
                                        Valid for one year
                                    </span>

                                </div>

                            </label> */}

                        </div>

                    </div>



                    {/* =====================================
                        DOCUMENTS
                    ===================================== */}

                    <div className="apply-section">

                        <div className="apply-section-title">

                            <div className="section-icon">
                                <i className="bi bi-cloud-upload-fill"></i>
                            </div>

                            <div>

                                <h4>
                                    Upload Documents
                                </h4>

                                <p>
                                    JPG, JPEG, PNG or PDF. Maximum 600KB per file.
                                </p>

                            </div>

                        </div>


                        <div className="row g-4">


                            {/* Profile */}

                            <div className="col-lg-4 col-md-6">

                                <div className="document-box">

                                    <label>
                                        Member Photo
                                    </label>


                                    {profilePhoto ? (

                                        <div className="document-preview">

                                            <img
                                                src={photoPreview}
                                                alt="Member Preview"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    setProfilePhoto(null);
                                                    setPhotoPreview(null);

                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </div>

                                    ) : (

                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/jpeg,image/png,image/jpg"
                                            onChange={handleProfilePhoto}
                                        />

                                    )}

                                </div>

                            </div>


                            {/* Aadhaar Front */}

                            <div className="col-lg-4 col-md-6">

                                <div className="document-box">

                                    <label>
                                        Aadhaar Front
                                    </label>

                                   {!aadhaarFront ? (

    <input
        type="file"
        className="form-control"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        onChange={handleAadhaarFront}
    />

) : (

    <UploadedDocument
        file={aadhaarFront}

        onView={() =>
            handleViewFile(aadhaarFront)
        }

        onDelete={() =>
            setAadhaarFront(null)
        }
    />

)}

                                </div>

                            </div>


                            {/* Aadhaar Back */}

                            <div className="col-lg-4 col-md-6">

                                <div className="document-box">

                                    <label>
                                        Aadhaar Back
                                    </label>

                                   {!aadhaarBack ? (

    <input
        type="file"
        className="form-control"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        onChange={handleAadhaarBack}
    />

) : (

    <UploadedDocument
        file={aadhaarBack}

        onView={() =>
            handleViewFile(aadhaarBack)
        }

        onDelete={() =>
            setAadhaarBack(null)
        }
    />

)}

                                </div>

                            </div>


                            {/* Jan Aadhaar */}

                            <div className="col-lg-4 col-md-6">

                                <div className="document-box">

                                    <label>
                                        Jan Aadhaar Card
                                    </label>

                               {!janAadhaarCard ? (

    <input
        type="file"
        className="form-control"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        onChange={handleJanAadhaar}
    />

) : (

    <UploadedDocument
        file={janAadhaarCard}

        onView={() =>
            handleViewFile(janAadhaarCard)
        }

        onDelete={() =>
            setJanAadhaarCard(null)
        }
    />

)}

                                </div>

                            </div>


                            {/* PAN */}

                            <div className="col-lg-4 col-md-6">

                                <div className="document-box">

                                    <label>
                                        PAN Card
                                    </label>

                                   {!panCard ? (

    <input
        type="file"
        className="form-control"
        accept="image/jpeg,image/png,image/jpg,application/pdf"
        onChange={handlePanCard}
    />

) : (

    <UploadedDocument
        file={panCard}

        onView={() =>
            handleViewFile(panCard)
        }

        onDelete={() =>
            setPanCard(null)
        }
    />

)}

                                </div>

                            </div>

                        </div>

                    </div>



                    {/* =====================================
                        BUTTONS
                    ===================================== */}

                    <div className="apply-form-actions">

                        <button
                            type="button"
                            className="btn-reset"
                            onClick={handleReset}
                            disabled={loading}
                        >

                            <i className="bi bi-arrow-counterclockwise"></i>

                            Reset

                        </button>


                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >

                            {loading ? (

                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    Submitting...
                                </>

                            ) : (

                                <>
                                    <i className="bi bi-send-fill"></i>
                                    Apply for Membership
                                </>

                            )}

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

};

export default ApplyMembership;