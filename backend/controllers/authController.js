import jwt from "jsonwebtoken";

// ==========================
// Admin Login
// ==========================

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (
      email.toLowerCase().trim() !==
      process.env.ADMIN_EMAIL.toLowerCase().trim()
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: process.env.ADMIN_EMAIL,
        role: "Admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",

      token,

      admin: {
        email: process.env.ADMIN_EMAIL,
        role: "Admin",
      },
    });

  } catch (error) {

    console.log("Admin Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};