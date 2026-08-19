import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// =====================================================
// USER SIGNUP
// =====================================================

export const userSignup = async (req, res) => {
  try {

    const {
      fullName,
      mobile,
      email,
      password,
    } = req.body;


    // ==========================
    // Required Fields
    // ==========================

    if (
      !fullName ||
      !mobile ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }


    // ==========================
    // Email Normalize
    // ==========================

    const normalizedEmail =
      email.toLowerCase().trim();


    // ==========================
    // Check Existing User
    // ==========================

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });


    if (existingUser) {

      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });

    }


    // ==========================
    // Password Hash
    // ==========================

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // ==========================
    // Create User
    // ==========================

    const user = await User.create({

      fullName: fullName.trim(),

      mobile: mobile.trim(),

      email: normalizedEmail,

      password: hashedPassword,

      role: "User",

    });


    // ==========================
    // Response
    // ==========================

    return res.status(201).json({

      success: true,

      message:
        "Account created successfully",

      user: {

        id: user._id,

        fullName: user.fullName,

        mobile: user.mobile,

        email: user.email,

        role: user.role,

      },

    });

  } catch (error) {

    console.error(
      "USER SIGNUP ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal Server Error",

    });

  }
};


// =====================================================
// USER LOGIN
// =====================================================

export const userLogin = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // ==========================
    // Required Fields
    // ==========================

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required",

      });

    }


    const normalizedEmail =
      email.toLowerCase().trim();


    // ==========================
    // Find User
    // ==========================

    const user =
      await User.findOne({
        email: normalizedEmail,
      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // ==========================
    // Active Check
    // ==========================

    if (!user.isActive) {

      return res.status(403).json({

        success: false,

        message:
          "Your account is inactive",

      });

    }


    // ==========================
    // Password Check
    // ==========================

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // ==========================
    // JWT
    // ==========================

    const token =
      jwt.sign(

        {
          userId: user._id,
          email: user.email,
          role: user.role,
          memberId: user.memberId,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d",
        }

      );


    // ==========================
    // Success
    // ==========================

    return res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        fullName:
          user.fullName,

        mobile:
          user.mobile,

        email:
          user.email,

        role:
          user.role,

        memberId:
          user.memberId,

      },

    });

  } catch (error) {

    console.error(
      "USER LOGIN ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal Server Error",

    });

  }

};