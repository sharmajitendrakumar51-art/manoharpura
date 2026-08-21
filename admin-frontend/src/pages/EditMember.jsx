import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/AddMember.css";
import Swal from "sweetalert2";

const EditMember = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [photoPreview, setPhotoPreview] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [aadhaarFront, setAadhaarFront] = useState(null);
    const [aadhaarBack, setAadhaarBack] = useState(null);
    
    const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(null);
    const [aadhaarBackPreview, setAadhaarBackPreview] = useState(null);
    const [janAadhaarCard, setJanAadhaarCard] = useState(null);
    const [panCard, setPanCard] = useState(null);


    

{
    photoPreview ? (
        <img src={photoPreview} alt="Preview" />
    ) : (
        <div className="empty-photo">
            <i className="bi bi-person-circle"></i>
            <p>No Photo</p>
        </div>
    )
}


const handleAadhaarFront = (e) => {
    if (e.target.files[0]) {
        setAadhaarFront(e.target.files[0]);
    }
};

const handleAadhaarBack = (e) => {
    if (e.target.files[0]) {
        setAadhaarBack(e.target.files[0]);
    }
};

const handleJanAadhaarCard = (e) => {
    if (e.target.files[0]) {
        setJanAadhaarCard(e.target.files[0]);
    }
};

const handlePanCard = (e) => {
    if (e.target.files[0]) {
        setPanCard(e.target.files[0]);
    }
};

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
        maritalStatus:"",

        mobile: "",
        whatsapp: "",
        email: "",
        aadhaar: "",
        pan: "",
        janAadhaar: "",

        permanentAddress: "",
        correspondenceAddress: "",

        membershipType: "",
        
        designation: "",
        membershipNo: "",
        validFrom: "",
        validTo: "",
        isExecutiveCommittee: false,

        status: "Active"

    });


  const getMember = async () => {
    try {
        const res = await api.get(`/member/get-member/${id}`);

        console.log("API Response:", res.data);

        if (res.data.success) {
            const member = res.data.member;

            setFormData({
    ...member,
    dob: member.dob ? member.dob.split("T")[0] : "",
    validFrom: member.validFrom ? member.validFrom.split("T")[0] : "",
    validTo: member.validTo ? member.validTo.split("T")[0] : "",
});

            setPhotoPreview(member.profilePhoto?.url || null);
        }
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    getMember();
}, []);

   

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
    };

    if (name === "membershipType") {

        const today = new Date();
        const currentDate = today.toISOString().split("T")[0];

        if (value === "Lifetime Membership") {

            updatedData.validFrom = currentDate;
            updatedData.validTo = "";

        } else if (value === "2 Years Membership") {

            const afterTwoYears = new Date(today);
            afterTwoYears.setFullYear(afterTwoYears.getFullYear() + 2);

            updatedData.validFrom = currentDate;
            updatedData.validTo = afterTwoYears.toISOString().split("T")[0];

        } else if (value === "Executive Membership") {

            updatedData.validFrom = "";
            updatedData.validTo = "";

        }
    }

    setFormData(updatedData);
};

  const handlePhoto = (e) => {

  const file = e.target.files?.[0];

  if (!file) return;


  // Image validation
  if (!file.type.startsWith("image/")) {

    Swal.fire({
      icon: "error",
      title: "Invalid File",
      text: "Please select an image file.",
    });

    return;
  }


  // Size validation - 5MB
  if (file.size > 5 * 1024 * 1024) {

    Swal.fire({
      icon: "error",
      title: "File Too Large",
      text: "Profile photo must be less than 5MB.",
    });

    return;
  }


  console.log("NEW PROFILE PHOTO:", {
    name: file.name,
    type: file.type,
    size: file.size,
  });


  setProfilePhoto(file);

  setPhotoPreview(
    URL.createObjectURL(file)
  );
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const form = new FormData();

    // ==========================
// Text + Deleted File Fields
// ==========================

Object.keys(formData).forEach((key) => {

    const fileFields = [
        "profilePhoto",
        "aadhaarFront",
        "aadhaarBack",
        "janAadhaarCard",
        "panCard"
    ];

    // ==========================
    // FILE FIELDS
    // ==========================

    if (fileFields.includes(key)) {

        // Agar document delete kiya hai
        if (formData[key] === null) {

            form.append(key, "");

        }

        return;
    }


    // ==========================
    // NORMAL TEXT FIELDS
    // ==========================

    form.append(
        key,
        formData[key] ?? ""
    );

});


    // ==========================
    // Profile Photo
    // ==========================

    if (profilePhoto) {
      form.append("profilePhoto", profilePhoto);
    }


    // ==========================
    // Aadhaar Front
    // ==========================

    if (aadhaarFront) {
      form.append("aadhaarFront", aadhaarFront);
    }


    // ==========================
    // Aadhaar Back
    // ==========================

    if (aadhaarBack) {
      form.append("aadhaarBack", aadhaarBack);
    }


    // ==========================
    // Jan Aadhaar
    // ==========================

    if (janAadhaarCard) {
      form.append("janAadhaarCard", janAadhaarCard);
    }


    // ==========================
    // PAN Card
    // ==========================

    if (panCard) {
      form.append("panCard", panCard);
    }


    // ==========================
    // DEBUG
    // ==========================

    console.log("Selected Profile Photo:", profilePhoto);

    for (const [key, value] of form.entries()) {
      console.log(
        "FORM DATA:",
        key,
        value instanceof File
          ? {
              name: value.name,
              type: value.type,
              size: value.size,
            }
          : value
      );
    }


    // ==========================
    // UPDATE API
    // ==========================

    const response = await api.put(
      `/member/update-member/${id}`,
      form
    );


    // ==========================
    // RESPONSE
    // ==========================

    console.log(
      "UPDATE MEMBER RESPONSE:",
      response.data
    );

    console.log(
      "UPDATED PROFILE PHOTO:",
      response.data?.member?.profilePhoto
    );


    // ==========================
    // SUCCESS
    // ==========================

    if (response.data.success) {

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Member updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/members");
    }

  } catch (error) {

    console.log("FULL UPDATE ERROR:", error);

    console.log(
      "UPDATE RESPONSE:",
      error.response
    );

    console.log(
      "UPDATE RESPONSE DATA:",
      error.response?.data
    );

    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Failed to update member",
    });
  }
};
    return (

        <div className="container-fluid add-member-page">

            <div className="page-header">

                <h2>Edit Member</h2>

                <p>

                   Update member information.

                </p>

            </div>

            <div className="member-card">

                <form onSubmit={handleSubmit}>
                  <div className="card-section">

    <h4>

        <i className="bi bi-person-fill"></i>

        Personal Information

    </h4>

    <div className="row">

        <div className="col-md-6 mb-3">

            <label>Title</label>

            <select
                className="form-select"
                name="title"
                value={formData.title}
                onChange={handleChange}
            >

                <option value="">Select</option>

                <option>Mr.</option>

                <option>Mrs.</option>

                <option>Miss</option>

                <option>Dr.</option>

            </select>

        </div>

        <div className="col-md-6 mb-3">

            <label>Full Name</label>

            <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Father / Husband Name</label>

            <input
                type="text"
                className="form-control"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Nick Name</label>

            <input
                type="text"
                className="form-control"
                name="nickName"
                value={formData.nickName}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Gender</label>

            <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
            >

                <option value="">Select</option>

                <option>Male</option>

                <option>Female</option>

                <option>Other</option>

            </select>

        </div>

        <div className="col-md-6 mb-3">

            <label>Date of Birth</label>

            <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
            />

        </div>


        <div className="col-md-6 mb-3">

            <label>Caste</label>

            <input
                type="text"
                className="form-control"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
            />

        </div>

          <div className="col-md-6 mb-3">

    <label>Category <span className="text-danger">*</span></label>

    <select
        className="form-select"
        name="category"
        value={formData.category}
        onChange={handleChange}
    >

        <option value="">Select Category</option>

        <option value="General">General</option>

        <option value="EWS">EWS</option>

        <option value="SC">SC</option>

        <option value="ST">ST</option>

        <option value="OBC">OBC</option>

        <option value="MBC">MBC</option>

    </select>

</div>

<div className="col-md-6 mb-3">

    <label>Marital Status <span className="text-danger">*</span></label>

    <select
        className="form-select"
        name="category"
        value={formData.Marital}
        onChange={handleChange}
    >

        <option value="">Select Status</option>

        <option value="Married">Married</option>

        <option value="Unmarried">Unmarried</option>

        <option value="Other">Other</option>

    </select>

</div>

<div className="col-md-6 mb-3">

            <label>Occupation</label>

            <input
                type="text"
                className="form-control"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
            />

        </div>

    </div>

</div>
<div className="card-section">

    <h4>

        <i className="bi bi-telephone-fill"></i>

        Contact Information

    </h4>

    <div className="row">

        <div className="col-md-6 mb-3">

            <label>Mobile Number</label>

            <input
                type="text"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>WhatsApp Number</label>

            <input
                type="text"
                className="form-control"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Email</label>

            <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Aadhaar Number</label>

            <input
                type="text"
                className="form-control"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>PAN Number</label>

            <input
                type="text"
                className="form-control"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
            />

        </div>

        <div className="col-md-6 mb-3">

            <label>Jan Aadhaar</label>

            <input
                type="text"
                className="form-control"
                name="janAadhaar"
                value={formData.janAadhaar}
                onChange={handleChange}
            />

        </div>

    </div>

</div>

<div className="card-section">

    <h4>

        <i className="bi bi-geo-alt-fill"></i>

        Address Information

    </h4>

    <div className="row">

        <div className="col-md-6 mb-3">

            <label>Permanent Address</label>

            <textarea
                className="form-control"
                rows="4"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
            ></textarea>

        </div>

        <div className="col-md-6 mb-3">

            <label>Correspondence Address</label>

            <textarea
                className="form-control"
                rows="4"
                name="correspondenceAddress"
                value={formData.correspondenceAddress}
                onChange={handleChange}
            ></textarea>

        </div>

    </div>

</div>

<div className="card-section">

    <h4>

        <i className="bi bi-card-checklist"></i>

        Membership Information

    </h4>

    <div className="row">

        <div className="col-md-6 mb-3">

            <label>Membership Type</label>

            <select
                className="form-select"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
            >

                <option value="">Select</option>

                <option>Lifetime Membership</option>

                <option>2 Years Membership</option>

                <option>Executive Membership</option>

            </select>

        </div>

       <div className="col-md-6 mb-3 mt-4">

    <div className="form-check">

        <input
            className="form-check-input"
            type="checkbox"
            id="isExecutiveCommittee"
            name="isExecutiveCommittee"
            checked={formData.isExecutiveCommittee}
            onChange={handleChange}
        />

        <label
            className="form-check-label fw-semibold"
            htmlFor="isExecutiveCommittee"
        >
            Has been elected to the Executive Committee?
        </label>

    </div>

</div>

        <div className="col-md-6 mb-3">

    <label>Assigned Designation</label>

    <select
        className="form-select"
        name="designation"
        value={formData.designation}
        onChange={handleChange}
    >
        <option value="">Select Designation</option>

        <option value="Patron">Patron</option>
        <option value="President">President</option>
        <option value="Vice President">Vice President</option>
        <option value="Secretary">Secretary</option>
        <option value="Joint Secretary">Joint Secretary</option>
        <option value="Treasurer">Treasurer</option>
        <option value="Co Treasurer">Co Treasurer</option>
        <option value="Organisation Secretary">Organisation Secretary</option>
        <option value="Public Relation Officer">Public Relation Officer</option>
        <option value="Executive Member">Executive Member</option>

    </select>

</div>

        <div className="col-md-6 mb-3">

            <label>Membership Number</label>

            <input
                type="text"
                className="form-control"
                name="membershipNo"
                value={formData.membershipNo}
                onChange={handleChange}
            />

        </div>

      {
    formData.membershipType !== "Lifetime Membership" && (

        <div className="col-md-6 mb-3">

            <label>Valid To</label>

            <input
                type="date"
                className="form-control"
                name="validTo"
                value={formData.validTo}
                onChange={handleChange}
                disabled={formData.membershipType === "2 Years Membership"}
            />

        </div>

    )
}

       <div className="col-md-6 mb-3">
    <label>Valid From</label>

    <input
        type="date"
        className="form-control"
        name="validFrom"
        value={formData.validFrom}
        onChange={handleChange}
        disabled={
            formData.membershipType === "Lifetime Membership" ||
            formData.membershipType === "2 Years Membership"
        }
    />
</div>

    </div>

</div>

<div className="card-section">

    <h4>

        <i className="bi bi-cloud-upload-fill"></i>

        Upload Documents

    </h4>

    <div className="row">

        <div className="col-md-4 text-center mb-4">

            <label className="form-label">

                Member Photo

            </label>

          <input
    type="file"
    className="form-control"
    accept="image/*"
    onChange={handlePhoto}
/>
            <div className="photo-preview mt-3">

               {
    photoPreview ?

    <img src={photoPreview} alt="Preview" />

    :

    <div className="empty-photo">

        <i className="bi bi-person-circle"></i>

        <p>No Photo</p>

    </div>
}

            </div>

        </div>

        <div className="col-md-4 mb-4">

            <label>Aadhaar Front</label>
{
    !aadhaarFront && !formData?.aadhaarFront?.url ? (

        <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleAadhaarFront}
        />

    ) : (

        <div className="mt-2">

            <button
                type="button"
                className="btn btn-primary btn-sm me-2"
                onClick={() =>
                    window.open(
                        aadhaarFront
                            ? URL.createObjectURL(aadhaarFront)
                            : formData.aadhaarFront?.url,
                        "_blank"
                    )
                }
            >
                <i className="bi bi-eye"></i> View
            </button>

            <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {

                    setAadhaarFront(null);

                    setFormData({
                        ...formData,
                        aadhaarFront: null,
                    });

                }}
            >
                <i className="bi bi-trash"></i> Delete
            </button>

        </div>

    )
}

        </div>

       
       <div className="col-md-4 mb-4">

    <label>Aadhaar Back</label>

    {
        !aadhaarBack && !formData?.aadhaarBack?.url ? (

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleAadhaarBack}
            />

        ) : (

            <div className="mt-2">

                <button
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                        window.open(
                            aadhaarBack
                                ? URL.createObjectURL(aadhaarBack)
                                : formData.aadhaarBack?.url,
                            "_blank"
                        )
                    }
                >
                    <i className="bi bi-eye"></i> View
                </button>

                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        setAadhaarBack(null);

                        setFormData({
                            ...formData,
                            aadhaarBack: null,
                        });
                    }}
                >
                    <i className="bi bi-trash"></i> Delete
                </button>

            </div>

        )
    }

</div>


        <div className="col-md-4 mb-4">

    <label>Jan Aadhaar Card</label>

    {
        !janAadhaarCard && !formData?.janAadhaarCard?.url ? (

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleJanAadhaarCard}
            />

        ) : (

            <div className="mt-2">

                <button
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                        window.open(
                            janAadhaarCard
                                ? URL.createObjectURL(janAadhaarCard)
                                : formData.janAadhaarCard?.url,
                            "_blank"
                        )
                    }
                >
                    <i className="bi bi-eye"></i> View
                </button>

                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        setJanAadhaarCard(null);

                        setFormData({
                            ...formData,
                            janAadhaarCard: null,
                        });
                    }}
                >
                    <i className="bi bi-trash"></i> Delete
                </button>

            </div>

        )
    }

</div>

<div className="col-md-4 mb-4">

    <label>PAN Card</label>

    {
        !panCard && !formData?.panCard?.url ? (

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handlePanCard}
            />

        ) : (

            <div className="mt-2">

                <button
                    type="button"
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                        window.open(
                            panCard
                                ? URL.createObjectURL(panCard)
                                : formData.panCard?.url,
                            "_blank"
                        )
                    }
                >
                    <i className="bi bi-eye"></i> View
                </button>

                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                        setPanCard(null);

                        setFormData({
                            ...formData,
                            panCard: null,
                        });
                    }}
                >
                    <i className="bi bi-trash"></i> Delete
                </button>

            </div>

        )
    }

</div>
    
    </div>

</div>

<div className="button-group">

    <button
        type="reset"
        className="btn btn-secondary"
    >

        Reset

    </button>

    <button
        type="button"
        className="btn btn-warning"
        onClick={() => navigate(-1)}
    >

        Back

    </button>

 <button
    type="submit"
    className="btn btn-success"
>
    <i className="bi bi-check-circle me-2"></i>

    Update Member

</button>

</div>

                </form>

            </div>

        </div>

    )

}

export default EditMember;