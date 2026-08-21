import { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import "../../assets/css/ChangePassword.css";

const ChangePassword = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      alert("Please enter your current password.");
      return;
    }

    if (!formData.newPassword) {
      alert("Please enter your new password.");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("New password must contain at least 8 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log("Password Change Request:", formData);

    // Backend API yaha connect karenge
    alert("Password changed successfully!");

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="change-password-page">

      <div className="change-password-card">

        {/* Card Header */}
        <div className="change-password-header">
          <div className="password-icon">
            <Lock size={28} />
          </div>

          <div>
            <h2>Change Password</h2>
            <p>
              Update your account password to keep your account secure.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Current Password */}
          <div className="password-field">
            <label>Current Password</label>

            <div className="password-input-wrapper">
              <Lock size={19} className="input-icon" />

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
              />

              <button
                type="button"
                className="password-eye"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="password-field">
            <label>New Password</label>

            <div className="password-input-wrapper">
              <Lock size={19} className="input-icon" />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
              />

              <button
                type="button"
                className="password-eye"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="password-field">
            <label>Confirm New Password</label>

            <div className="password-input-wrapper">
              <Lock size={19} className="input-icon" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password"
              />

              <button
                type="button"
                className="password-eye"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="password-requirements">

            <h4>Password Requirements</h4>

            <div className="requirement">
              <CheckCircle size={17} />
              <span>At least 8 characters</span>
            </div>

            <div className="requirement">
              <CheckCircle size={17} />
              <span>One uppercase letter</span>
            </div>

            <div className="requirement">
              <CheckCircle size={17} />
              <span>One number</span>
            </div>

            <div className="requirement">
              <CheckCircle size={17} />
              <span>One special character</span>
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="change-password-btn"
          >
            <Lock size={18} />
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;