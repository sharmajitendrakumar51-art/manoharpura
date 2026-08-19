import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../api/axios";
import "../../assets/css/EditProfile.css";

const EditProfile = () => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    title: "",
    fullName: "",
    fatherName: "",
    nickName: "",
    gender: "",
    dob: "",
    category: "",
    caste: "",
    maritalStatus: "",
    occupation: "",

    mobile: "",
    whatsapp: "",
    email: "",

    aadhaar: "",
    pan: "",
    janAadhaar: "",

    permanentAddress: "",
    correspondenceAddress: "",

  });


  // ==========================================
  // FILES
  // ==========================================

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [janAadhaarCard, setJanAadhaarCard] = useState(null);
  const [panCard, setPanCard] = useState(null);


  // ==========================================
  // GET LOGGED-IN MEMBER
  // ==========================================

  const getProfile = async () => {

    try {

      setLoading(true);

      // --------------------------------------
      // GET LOGIN USER
      // --------------------------------------

      const userData =
        localStorage.getItem("user");

      const userEmail =
        localStorage.getItem("userEmail");


      let user = null;

      if (userData) {
        try {
          user = JSON.parse(userData);
        } catch (error) {
          console.log("USER JSON ERROR:", error);
        }
      }


      const email =
        user?.email ||
        userEmail;


      console.log("EDIT PROFILE USER:", user);
      console.log("USER EMAIL:", email);


      if (!email) {

        throw new Error(
          "Login user email not found"
        );

      }


      // --------------------------------------
      // GET MEMBERS
      // --------------------------------------

      const res = await api.get(
        "/member/get-members"
      );


      console.log(
        "ALL MEMBERS RESPONSE:",
        res.data
      );


      if (!res.data?.success) {

        throw new Error(
          res.data?.message ||
          "Unable to load members"
        );

      }


      const members =
        res.data.members || [];


      // --------------------------------------
      // FIND CURRENT USER
      // --------------------------------------

      const currentMember =
        members.find(
          (member) =>
            member.email
              ?.toLowerCase()
              .trim() ===
            email
              .toLowerCase()
              .trim()
        );


      console.log(
        "FOUND MEMBER:",
        currentMember
      );


      if (!currentMember) {

        throw new Error(
          "Your membership profile was not found"
        );

      }


      // --------------------------------------
      // SET PROFILE
      // --------------------------------------

      setProfile(currentMember);
     

      // --------------------------------------
      // SET FORM
      // --------------------------------------

      setFormData({

        title:
          currentMember.title || "",

        fullName:
          currentMember.fullName || "",

        fatherName:
          currentMember.fatherName || "",

        nickName:
          currentMember.nickName || "",

        gender:
          currentMember.gender || "",

        dob:
          currentMember.dob
            ? currentMember.dob.substring(0, 10)
            : "",

        category:
          currentMember.category || "",

        caste:
          currentMember.caste || "",

        maritalStatus:
          currentMember.maritalStatus || "",

        occupation:
          currentMember.occupation || "",

        mobile:
          currentMember.mobile || "",

        whatsapp:
          currentMember.whatsapp || "",

        email:
          currentMember.email || "",

        aadhaar:
          currentMember.aadhaar || "",

        pan:
          currentMember.pan || "",

        janAadhaar:
          currentMember.janAadhaar || "",

        permanentAddress:
          currentMember.permanentAddress || "",

        correspondenceAddress:
          currentMember.correspondenceAddress || "",

      });

    } catch (error) {

      console.error(
        "EDIT PROFILE ERROR:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to load profile",
      });

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {

    getProfile();

  }, []);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (
    e,
    setter
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setter(file);

  };


  // ==========================================
  // VIEW DOCUMENT
  // ==========================================

  const handleView = (url) => {

    if (!url) {

      Swal.fire({
        icon: "info",
        title: "Document Not Available",
        text: "This document is not uploaded.",
      });

      return;

    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  };
  
  const handleDeleteDocument = async (documentName) => {

  const result = await Swal.fire({

    title: "Delete Document?",

    text: "Are you sure you want to delete this document?",

    icon: "warning",

    showCancelButton: true,

    confirmButtonColor: "#dc3545",

    cancelButtonColor: "#6c757d",

    confirmButtonText: "Yes, Delete",

  });


  if (!result.isConfirmed) {
    return;
  }


  try {

    const data = new FormData();

    // Empty value bhejenge
    data.append(documentName, "");


    const res = await api.put(

      `/member/update-member/${profile._id}`,

      data,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );


    if (res.data?.success) {

      Swal.fire({

        icon: "success",

        title: "Deleted!",

        text: "Document deleted successfully.",

        timer: 1500,

        showConfirmButton: false,

      });


      // Profile dobara load karo

      getProfile();

    } else {

      throw new Error(
        res.data?.message ||
        "Unable to delete document"
      );

    }

  } catch (error) {

    console.error(
      "DELETE DOCUMENT ERROR:",
      error
    );


    Swal.fire({

      icon: "error",

      title: "Delete Failed",

      text:
        error.response?.data?.message ||
        "Unable to delete document",

    });

  }

};

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!profile?._id) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Member ID not found",
      });

      return;

    }


    try {

      setSaving(true);


      // --------------------------------------
      // FORM DATA
      // --------------------------------------

      const data = new FormData();


      // --------------------------------------
      // TEXT FIELDS
      // --------------------------------------

      Object.entries(formData).forEach(
        ([key, value]) => {

          data.append(
            key,
            value ?? ""
          );

        }
      );


      // --------------------------------------
      // FILES
      // --------------------------------------

      if (profilePhoto) {

        data.append(
          "profilePhoto",
          profilePhoto
        );

      }

      if (aadhaarFront) {

        data.append(
          "aadhaarFront",
          aadhaarFront
        );

      }

      if (aadhaarBack) {

        data.append(
          "aadhaarBack",
          aadhaarBack
        );

      }

      if (janAadhaarCard) {

        data.append(
          "janAadhaarCard",
          janAadhaarCard
        );

      }

      if (panCard) {

        data.append(
          "panCard",
          panCard
        );

      }


      // --------------------------------------
      // API
      // --------------------------------------

      console.log(
        "UPDATING MEMBER:",
        profile._id
      );


      const res = await api.put(

        `/member/update-member/${profile._id}`,

        data,

        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }

      );


      console.log(
        "UPDATE RESPONSE:",
        res.data
      );


      if (res.data?.success) {

        await Swal.fire({

          icon: "success",

          title: "Profile Updated!",

          text:
            "Your profile has been updated successfully.",

          confirmButtonText: "OK",

        });


        // Go back profile

        navigate("/user/profile");

      } else {

        throw new Error(
          res.data?.message ||
          "Profile update failed"
        );

      }

    } catch (error) {

      console.error(
        "UPDATE PROFILE ERROR:",
        error
      );

      Swal.fire({

        icon: "error",

        title: "Update Failed",

        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to update profile",

      });

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="edit-profile-loading">

        <div className="spinner-border text-primary"></div>

        <p>Loading Profile...</p>

      </div>

    );

  }


  // ==========================================
  // PROFILE NOT FOUND
  // ==========================================

  if (!profile) {

    return (

      <div className="edit-profile-loading">

        <h4>Profile Not Found</h4>

        <button
          className="btn btn-primary"
          onClick={() =>
            navigate("/user/profile")
          }
        >
          Back to Profile
        </button>

      </div>

    );

  }


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div className="edit-profile-page">


      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="edit-page-header">

        <div>

          <h1>
            Edit Profile
          </h1>

          <p>
            Update your personal and membership information.
          </p>

        </div>


        <button
          type="button"
          className="back-profile-btn"
          onClick={() =>
            navigate("/user/profile")
          }
        >

          <i className="bi bi-arrow-left"></i>

          Back to Profile

        </button>

      </div>


      <form
        onSubmit={handleSubmit}
        className="edit-profile-form"
      >


        {/* ======================================
            PROFILE PHOTO
        ====================================== */}

        <div className="edit-section">

          <div className="edit-section-title">

            <h2>
              <i className="bi bi-person-circle"></i>

              Profile Photo
            </h2>

          </div>


          <div className="profile-photo-edit">

            <div className="edit-photo-preview">

              {profilePhoto ? (

                <img
                  src={URL.createObjectURL(
                    profilePhoto
                  )}
                  alt="Preview"
                />

              ) : profile.profilePhoto?.url ? (

                <img
                  src={profile.profilePhoto.url}
                  alt={profile.fullName}
                />

              ) : (

                <i className="bi bi-person-fill"></i>

              )}

            </div>


            <div>

              <label className="upload-btn">

                <i className="bi bi-camera-fill"></i>

                Change Photo

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      setProfilePhoto
                    )
                  }
                />

              </label>

              <p className="upload-note">
                JPG, PNG or WEBP
              </p>

            </div>

          </div>

        </div>


        {/* ======================================
            PERSONAL INFORMATION
        ====================================== */}

        <div className="edit-section">

          <div className="edit-section-title">

            <h2>

              <i className="bi bi-person-fill"></i>

              Personal Information

            </h2>

          </div>


          <div className="edit-grid">


            <FormInput
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />


            <FormInput
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />


            <FormInput
              label="Father / Husband Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />


            <FormInput
              label="Nick Name"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
            />


            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={[
                "Male",
                "Female",
                "Other",
              ]}
            />


            <FormInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
            />


            <FormInput
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />


            <FormInput
              label="Caste"
              name="caste"
              value={formData.caste}
              onChange={handleChange}
            />


            <FormSelect
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={[
                "Married",
                "Unmarried",
                "Widow",
                "Widower",
                "Divorced",
              ]}
            />


            <FormInput
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* ======================================
            CONTACT INFORMATION
        ====================================== */}

        <div className="edit-section">

          <div className="edit-section-title">

            <h2>

              <i className="bi bi-telephone-fill"></i>

              Contact Information

            </h2>

          </div>


          <div className="edit-grid">


            <FormInput
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
            />


            <FormInput
              label="WhatsApp Number"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              type="tel"
            />


            <FormInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
            />


            <FormInput
              label="Aadhaar Number"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
            />


            <FormInput
              label="PAN Number"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
            />


            <FormInput
              label="Jan Aadhaar Number"
              name="janAadhaar"
              value={formData.janAadhaar}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* ======================================
            ADDRESS
        ====================================== */}

        <div className="edit-section">

          <div className="edit-section-title">

            <h2>

              <i className="bi bi-geo-alt-fill"></i>

              Address Information

            </h2>

          </div>


          <div className="edit-address-grid">


            <div className="form-field">

              <label>
                Permanent Address
              </label>

              <textarea
                name="permanentAddress"
                value={
                  formData.permanentAddress
                }
                onChange={handleChange}
                rows="4"
              />

            </div>


            <div className="form-field">

              <label>
                Correspondence Address
              </label>

              <textarea
                name="correspondenceAddress"
                value={
                  formData.correspondenceAddress
                }
                onChange={handleChange}
                rows="4"
              />

            </div>

          </div>

        </div>


        {/* ======================================
            DOCUMENTS
        ====================================== */}

        <div className="edit-section">

          <div className="edit-section-title">

            <h2>

              <i className="bi bi-file-earmark-text-fill"></i>

              Documents

            </h2>

          </div>


          <div className="document-grid">


            <DocumentUpload
  title="Aadhaar Front"
  existingFile={profile.aadhaarFront}
  file={aadhaarFront}
  setFile={setAadhaarFront}
  onView={() =>
    handleView(profile.aadhaarFront?.url)
  }
  onDelete={() =>
    handleDeleteDocument("aadhaarFront")
  }
/>


            <DocumentUpload
  title="Aadhaar Back"
  existingFile={profile.aadhaarBack}
  file={aadhaarBack}
  setFile={setAadhaarBack}
  onView={() =>
    handleView(profile.aadhaarBack?.url)
  }
  onDelete={() =>
    handleDeleteDocument("aadhaarBack")
  }
/>


            <DocumentUpload
  title="Jan Aadhaar Card"
  existingFile={profile.janAadhaarCard}
  file={janAadhaarCard}
  setFile={setJanAadhaarCard}
  onView={() =>
    handleView(profile.janAadhaarCard?.url)
  }
  onDelete={() =>
    handleDeleteDocument("janAadhaarCard")
  }
/>


            <DocumentUpload
  title="PAN Card"
  existingFile={profile.panCard}
  file={panCard}
  setFile={setPanCard}
  onView={() =>
    handleView(profile.panCard?.url)
  }
  onDelete={() =>
    handleDeleteDocument("panCard")
  }
/>

          </div>

        </div>


        {/* ======================================
            BUTTONS
        ====================================== */}

        <div className="edit-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/user/profile")
            }
          >

            <i className="bi bi-x-circle"></i>

            Cancel

          </button>


          <button
            type="submit"
            className="save-btn"
            disabled={saving}
          >

            {saving ? (

              <>
                <span className="spinner-border spinner-border-sm me-2"></span>

                Saving...
              </>

            ) : (

              <>
                <i className="bi bi-check-circle"></i>

                Save Changes
              </>

            )}

          </button>

        </div>


      </form>

    </div>

  );

};


// =====================================================
// FORM INPUT
// =====================================================

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => {

  return (

    <div className="form-field">

      <label>
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />

    </div>

  );

};


// =====================================================
// FORM SELECT
// =====================================================

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {

  return (

    <div className="form-field">

      <label>
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
      >

        <option value="">
          Select {label}
        </option>

        {options.map(
          (option) => (

            <option
              key={option}
              value={option}
            >
              {option}
            </option>

          )
        )}

      </select>

    </div>

  );

};


// =====================================================
// DOCUMENT UPLOAD
// =====================================================

const DocumentUpload = ({
  title,
  existingFile,
  file,
  setFile,
  onView,
  onDelete,
}) => {

  // =====================================
  // GET DOCUMENT URL
  // =====================================

  const documentUrl =
    typeof existingFile === "string"
      ? existingFile
      : existingFile?.url ||
        existingFile?.secure_url ||
        existingFile?.secureUrl ||
        "";


  const hasExistingFile = !!documentUrl;

  const hasNewFile = !!file;


  console.log(`${title} DOCUMENT:`, existingFile);
  console.log(`${title} URL:`, documentUrl);


  return (

    <div className="document-upload-card">

      {/* =================================
          TITLE
      ================================= */}

      <h3>
        {title}
      </h3>


      {/* =================================
          EXISTING DOCUMENT
      ================================= */}

      {hasExistingFile && !hasNewFile && (

        <div className="existing-document">

          <div className="document-name">

            <i className="bi bi-file-earmark-check-fill"></i>

            <span>
              Document Uploaded
            </span>

          </div>


          {/* ACTION BUTTONS */}

          <div className="document-actions">

            {/* VIEW */}

            <button
              type="button"
              className="document-view-btn"
              onClick={() => {

                window.open(
                  documentUrl,
                  "_blank",
                  "noopener,noreferrer"
                );

              }}
            >

              <i className="bi bi-eye-fill"></i>

              View

            </button>


            {/* DELETE */}

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

      )}


      {/* =================================
          NEW FILE SELECTED
      ================================= */}

      {hasNewFile && (

        <div className="new-selected-document">

          <div className="document-name">

            <i className="bi bi-file-earmark-check-fill"></i>

            <span title={file.name}>

              {file.name}

            </span>

          </div>


          <button
            type="button"
            className="document-remove-btn"
            onClick={() => setFile(null)}
          >

            <i className="bi bi-x-circle"></i>

            Remove

          </button>

        </div>

      )}


      {/* =================================
          UPLOAD / CHANGE FILE
      ================================= */}

      <label className="document-upload-btn">

        <i className="bi bi-cloud-arrow-up"></i>


        {hasExistingFile || hasNewFile
          ? "Change File"
          : "Upload New File"
        }


        <input
          type="file"
          hidden
          accept="image/*,.pdf"
          onChange={(e) => {

            const selectedFile =
              e.target.files?.[0];

            if (selectedFile) {

              setFile(selectedFile);

            }

          }}
        />

      </label>

    </div>

  );
};

export default EditProfile;