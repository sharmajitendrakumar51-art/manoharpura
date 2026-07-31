import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Auth.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

import { toast } from "react-toastify";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.warning("Please fill all fields");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Invalid email address");
    return;
  }

  if (formData.password.length < 8) {
    toast.error("Password must be at least 8 characters");
    return;
  }

  toast.success("Login Successfully 🎉");
};

   const [formData, setFormData] = useState({
  email: "",
  password: "",
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

          <img src={mokshdhamlogo} alt="Logo" className="auth-logo" />

          <h1>Manoharpura Ideal Mokshdham</h1>

          <h4>Seva • Samarpan • Sanskaar</h4>

          <p>
            Welcome to the official portal of
            <br />
            Manoharpura Ideal Mokshdham Vikas Samiti.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back 👋</h2>

          <p>Please login to continue</p>

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="form-group">

              <label>Email Address</label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"  name="email"
                  placeholder="Enter your email" value={formData.email}
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
  placeholder="Enter password"
  value={formData.password}
  onChange={handleChange}
/>

    <i
      className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"} eye-icon`}
      onClick={() => setShowPassword(!showPassword)}
    ></i>

  </div>

</div>
            {/* Remember */}

            <div className="auth-options">

              <label>

                <input type="checkbox" />

                Remember Me

              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            {/* Button */}

            <button type="submit" className="auth-btn">

              Login

            </button>

          </form>

          <div className="divider">

            <span>OR</span>

          </div>

          {/* Google */}

          <button className="google-btn">

            <i className="bi bi-google"></i>

            Continue with Google

          </button>

          {/* Signup */}

          <div className="bottom-text">

            Don't have an account?

            <Link to="/signup">

              Sign Up

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;