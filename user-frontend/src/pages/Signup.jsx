import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/Auth.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";
import { toast } from "react-toastify";

const Signup = () => {

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSignup = (e) => {
  e.preventDefault();

  const { fullName, mobile, email, password, confirmPassword } = formData;

  if (!fullName || !mobile || !email || !password || !confirmPassword) {
    toast.warning("Please fill all fields");
    return;
  }

  if (fullName.length < 3) {
    toast.error("Full name must be at least 3 characters");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    toast.error("Enter a valid 10-digit mobile number");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error("Invalid email address");
    return;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  toast.success("Registration Successful 🎉");
};

const [formData, setFormData] = useState({
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
});


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className="auth-page">

      {/* Left Side */}

      <div className="auth-left">

        <div className="overlay">

          <img
            src={mokshdhamlogo}
            alt="Logo"
            className="auth-logo"
          />

          <h1>Manoharpura Ideal Mokshdham</h1>

          <h4>Seva • Samarpan • Sanskaar</h4>

          <p>
            Join our community by creating your account
            <br />
            and become a registered member.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account ✨</h2>

          <p>Fill your details to register</p>

          <form onSubmit={handleSignup}>

            {/* Name */}

            <div className="form-group">

              <label>Full Name</label>

              <div className="input-box">

                <i className="bi bi-person-fill"></i>

               <input
               type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                 onChange={handleChange}
               />

              </div>

            </div>

            {/* Mobile */}

            <div className="form-group">

              <label>Mobile Number</label>

              <div className="input-box">

                <i className="bi bi-telephone-fill"></i>

                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Email */}

            <div className="form-group">

              <label>Email Address</label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Password */}

           <div className="form-group">

  <label>Password</label>

  <div className="input-box">

    <i className="bi bi-lock-fill"></i>

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Create password"
      value={formData.password}
      onChange={handleChange}
    />

    <i
      className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} eye-icon`}
      onClick={() => setShowPassword(!showPassword)}
    ></i>

  </div>

</div>

            {/* Confirm Password */}

            <div className="form-group">

  <label>Confirm Password</label>

  <div className="input-box">

    <i className="bi bi-shield-lock-fill"></i>

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="Confirm password"
      value={formData.confirmPassword}
      onChange={handleChange}
    />

    <i
      className={`bi ${showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} eye-icon`}
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    ></i>

  </div>

</div>

            <button className="auth-btn">

              Create Account

            </button>

          </form>

          <div className="divider">

            <span>OR</span>

          </div>

          <button className="google-btn">

            <i className="bi bi-google"></i>

            Continue with Google

          </button>

          <div className="bottom-text">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;