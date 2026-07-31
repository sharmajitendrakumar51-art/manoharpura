import { Link } from "react-router-dom";
import "../assets/css/Auth.css";
import mokshdhamlogo from "../assets/images/mokshdhamlogo.jpg";

const ForgotPassword = () => {
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

          <h1>Forgot Password?</h1>

          <h4>Don't worry, we've got you covered.</h4>

          <p>
            Enter your registered email address and we'll send you
            instructions to reset your password.
          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Reset Password 🔐</h2>

          <p>Enter your registered email</p>

          <form>

            <div className="form-group">

              <label>Email Address</label>

              <div className="input-box">

                <i className="bi bi-envelope-fill"></i>

                <input
                  type="email"
                  placeholder="Enter your email"
                />

              </div>

            </div>

            <button className="auth-btn">

              Send Reset Link

            </button>

          </form>

          <div className="bottom-text">

            Remember your password?

            <Link to="/login">

              Login

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;