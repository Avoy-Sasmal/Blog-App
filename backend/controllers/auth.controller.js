import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const jwtSecret =
  process.env.JWT_SECRET_KEY || "d10b83579ddd8fed941db4d39b798252";

// register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check user is already exist or  not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to database
    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "user Creation Error !! ",
      error: error,
    });

    console.log(`User Registration Error : ${error}`);
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(`User Login Error :${error}`);
    res.status(500).json({
      message: "Login Error",
      error: error.message,
    });
  }
};

// log out
const logout = async (req, res) => {
  try {
    // If using cookies
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, logout };
